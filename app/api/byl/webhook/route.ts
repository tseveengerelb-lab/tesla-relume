import { createHmac, timingSafeEqual } from "node:crypto";
import { markOrderPaid } from "@/lib/orders";
import { getServiceSupabase } from "@/lib/supabase-admin";

/**
 * Byl webhook (https://byl.mn/docs/webhook).
 * Register https://<your-domain>/api/byl/webhook in Byl → project → Webhooks,
 * and put the endpoint's Signing secret in BYL_WEBHOOK_SECRET.
 *
 * Byl retries anything that is not a 2xx within 5 seconds, so every update here is
 * idempotent: receiving the same event twice leaves the order unchanged.
 */

type CheckoutCompleted = {
  id: number;
  status: string;
  client_reference_id: string | null;
  customer_email: string | null;
  phone_number?: string | null;
  amount_total: string | number;
  items?: { price_data?: unknown; product?: { name?: string } }[];
  updated_at: string;
};

type PaymentAwaitingVerification = {
  payable: { type: "checkout" | "invoice"; id: number };
  phone_number?: string | null;
};

type BylEvent = {
  id: number;
  type: string;
  data: { object: unknown };
};

function signatureValid(rawBody: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(rawBody).digest("hex"));
  const given = Buffer.from(signature.trim());
  // timingSafeEqual throws on different lengths.
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export async function POST(request: Request) {
  const secret = process.env.BYL_WEBHOOK_SECRET;
  if (!secret) {
    console.error("BYL_WEBHOOK_SECRET is not set; rejecting webhook");
    // 5xx so Byl keeps retrying until the secret is configured.
    return new Response("Webhook not configured", { status: 503 });
  }

  // The raw body, exactly as sent: re-serialising JSON would change the signature.
  const rawBody = await request.text();
  if (!signatureValid(rawBody, request.headers.get("byl-signature"), secret)) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: BylEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const db = getServiceSupabase();
  if (!db) {
    console.error("SUPABASE_SECRET_KEY is not set; cannot record Byl event", event.id);
    return new Response("Database not configured", { status: 503 });
  }

  if (event.type === "checkout.completed") {
    const checkout = event.data.object as CheckoutCompleted;
    const orderId = checkout.client_reference_id;
    if (!orderId) return Response.json({ ok: true, ignored: "no client_reference_id" });

    let found: boolean;
    try {
      found = await markOrderPaid(db, orderId, checkout);
    } catch (error) {
      console.error("Byl webhook: order update failed", orderId, error);
      return new Response("Database error", { status: 500 }); // Byl will retry
    }

    // The form's insert failed earlier: record the payment from Byl's data so it is not lost.
    if (!found) {
      const { error: insertError } = await db.from("orders").upsert({
        id: orderId,
        email: checkout.customer_email ?? "",
        full_name: null,
        model: checkout.items?.[0]?.product?.name ?? null,
        amount: Number(checkout.amount_total),
        status: "paid",
        amount_paid: Number(checkout.amount_total),
        phone: checkout.phone_number ?? null,
        byl_checkout_id: checkout.id,
        paid_at: checkout.updated_at,
      });
      if (insertError) {
        console.error("Byl webhook: order insert failed", orderId, insertError.message);
        return new Response("Database error", { status: 500 });
      }
    }

    return Response.json({ ok: true });
  }

  if (event.type === "payment.awaiting_verification") {
    // Buyer says they made a bank transfer; it is not paid until you confirm it in Byl.
    const payment = event.data.object as PaymentAwaitingVerification;
    if (payment.payable?.type === "checkout") {
      const { error } = await db
        .from("orders")
        .update({ status: "awaiting_verification", phone: payment.phone_number ?? null })
        .eq("byl_checkout_id", payment.payable.id)
        .neq("status", "paid"); // never downgrade a paid order
      if (error) {
        console.error("Byl webhook: awaiting update failed", payment.payable.id, error.message);
        return new Response("Database error", { status: 500 });
      }
    }
    return Response.json({ ok: true });
  }

  // Other events (invoice.*, subscription.*, …) are not used by this site.
  return Response.json({ ok: true, ignored: event.type });
}
