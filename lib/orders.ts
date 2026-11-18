import type { SupabaseClient } from "@supabase/supabase-js";
import { getCheckout, type BylCheckout } from "@/lib/byl";

export type OrderStatus = "pending" | "awaiting_verification" | "paid";

/**
 * Marks an order paid from a completed Byl checkout. Shared by the webhook and the
 * success page, so whichever arrives first wins and the other is a no-op.
 * Returns false when no order row has that id.
 */
export async function markOrderPaid(
  db: SupabaseClient,
  orderId: string,
  checkout: Pick<BylCheckout, "id" | "updated_at"> & { amount_total: string | number; phone_number?: string | null },
) {
  const { data, error } = await db
    .from("orders")
    .update({
      status: "paid",
      amount_paid: Number(checkout.amount_total),
      // Keep a phone saved by an earlier event if this one has none.
      ...(checkout.phone_number ? { phone: checkout.phone_number } : {}),
      byl_checkout_id: checkout.id,
      paid_at: checkout.updated_at,
    })
    .eq("id", orderId)
    .select("id");
  if (error) throw error;
  return Boolean(data?.length);
}

/**
 * Asks Byl whether an order's checkout is paid and records it if so.
 * Used by /order/success, which works without webhooks (Byl test mode, unverified business).
 * The answer comes from Byl's API, so opening the page cannot fake a payment.
 */
export async function confirmOrderFromByl(db: SupabaseClient, orderId: string): Promise<OrderStatus | null> {
  const { data: order } = await db
    .from("orders")
    .select("status, byl_checkout_id")
    .eq("id", orderId)
    .maybeSingle<{ status: OrderStatus; byl_checkout_id: number | null }>();

  if (!order) return null;
  if (order.status === "paid" || !order.byl_checkout_id) return order.status;

  const checkout = await getCheckout(order.byl_checkout_id);
  // Guard against a checkout id that somehow belongs to another order.
  if (checkout.client_reference_id !== orderId) return order.status;

  if (checkout.status === "complete") {
    await markOrderPaid(db, orderId, checkout);
    return "paid";
  }
  if (checkout.status === "pending" && order.status !== "awaiting_verification") {
    // Buyer reported a bank transfer; it is not paid until you confirm it in Byl.
    await db.from("orders").update({ status: "awaiting_verification" }).eq("id", orderId).neq("status", "paid");
    return "awaiting_verification";
  }
  return order.status;
}
