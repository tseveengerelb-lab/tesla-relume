"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BylError, bylConfigured, createCheckout, depositAmount } from "@/lib/byl";
import { getServiceSupabase } from "@/lib/supabase-admin";

/** On error, the submitted values come back so the form can refill itself (React resets it after an action). */
export type OrderState = { error?: string; values?: Record<string, string> } | undefined;

const text = (form: FormData, key: string, max = 120) => String(form.get(key) ?? "").trim().slice(0, max);

/** This site's origin, so Byl can send the customer back. */
function siteOrigin(h: Headers) {
  const origin = h.get("origin");
  if (origin) return origin;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return `${h.get("x-forwarded-proto") ?? "https"}://${host}`;
}

/** Same-origin page the form was on, for cancel_url; falls back to the home page. */
function sameOriginReferer(referer: string | null, origin: string) {
  if (!referer) return origin;
  try {
    const url = new URL(referer);
    return url.origin === origin ? `${url.origin}${url.pathname}#order` : origin;
  } catch {
    return origin;
  }
}

/**
 * Saves the order, opens a Byl checkout for the deposit and sends the customer to Byl's payment page.
 * The amount is fixed on the server; nothing in the form can change it.
 * The order becomes "paid" only when Byl's webhook arrives (app/api/byl/webhook).
 */
export async function placeOrder(_prev: OrderState, form: FormData): Promise<OrderState> {
  const name = text(form, "full-name");
  const email = text(form, "email");
  const postalCode = text(form, "zip", 20).replace(/\D/g, "");
  // Accept "9911 2233", "99112233" or "+976 9911 2233"; store the 8 digits.
  const phone = text(form, "phone", 20).replace(/\D/g, "").replace(/^976(?=\d{8}$)/, "");
  const model = text(form, "model", 40) || "Tesla";
  const fail = (error: string): OrderState => ({
    error,
    values: { "full-name": name, email, phone: text(form, "phone", 20), zip: text(form, "zip", 20) },
  });

  if (!name) return fail("Овог нэрээ оруулна уу.");
  if (!/^\S+@\S+\.\S+$/.test(email)) return fail("И-мэйл хаягаа зөв оруулна уу.");
  if (!/^\d{8}$/.test(phone)) return fail("Утасны дугаараа 8 оронтойгоор оруулна уу.");
  if (postalCode && !/^\d{5}$/.test(postalCode)) return fail("Шуудангийн код 5 оронтой байна.");
  if (form.get("terms") !== "on") return fail("Үйлчилгээний нөхцөлийг зөвшөөрнө үү.");
  if (!bylConfigured()) return fail("Төлбөрийн систем тохируулаагүй байна. Түр хүлээгээд дахин оролдоно уу.");

  const h = await headers();
  const origin = siteOrigin(h);
  const orderId = `order_${crypto.randomUUID()}`;
  const db = getServiceSupabase();

  // Saving is best-effort: a database hiccup should not stop a customer from paying.
  // If the row is missing, the webhook still records the payment from Byl's data.
  if (db) {
    const { error } = await db.from("orders").insert({
      id: orderId,
      model,
      full_name: name,
      email,
      phone,
      postal_code: postalCode || null,
      amount: depositAmount,
    });
    if (error) console.error("Order insert failed", orderId, error.message);
  } else {
    console.warn("SUPABASE_SECRET_KEY is not set; order", orderId, "is not saved");
  }

  let checkout: { id: number; url: string };
  try {
    checkout = await createCheckout({
      items: [
        {
          price_data: {
            unit_amount: depositAmount,
            // Shown on Byl's page and in the dashboard; the name ties the payment to the buyer.
            product_data: { name: `${model} захиалгын урьдчилгаа — ${name}`.slice(0, 255) },
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      client_reference_id: orderId,
      // The phone is already on our form; asking again on Byl's page would be a second, identical question.
      phone_number_collection: false,
      // The success page asks Byl whether this order is paid (works without webhooks).
      success_url: `${origin}/order/success?order=${orderId}`,
      cancel_url: sameOriginReferer(h.get("referer"), origin),
    });
  } catch (err) {
    console.error("Byl checkout failed", err instanceof BylError ? `${err.status} ${err.message}` : err);
    return fail("Төлбөрийн хуудас нээж чадсангүй. Түр хүлээгээд дахин оролдоно уу.");
  }

  if (db) {
    const { error } = await db.from("orders").update({ byl_checkout_id: checkout.id }).eq("id", orderId);
    if (error) console.error("Order checkout id save failed", orderId, error.message);
  }

  // Outside try/catch: redirect() works by throwing.
  redirect(checkout.url);
}
