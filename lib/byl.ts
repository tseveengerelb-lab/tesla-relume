/**
 * Byl payments (https://byl.mn/docs). Server-only: the token must never reach the browser,
 * so it is read from non-NEXT_PUBLIC env vars and only imported by server code.
 */

const apiBase = "https://byl.mn/api/v1";

/** Deposit charged when an order is placed, in tögrög. Set BYL_DEPOSIT_AMOUNT to change it. */
export const depositAmount = Number(process.env.BYL_DEPOSIT_AMOUNT ?? 100_000);

/** A product not registered in Byl, priced in the request itself. */
type PriceDataItem = {
  price_data: {
    unit_amount: number;
    product_data: { name: string; client_reference_id?: string };
  };
  quantity: number;
};

export type CreateCheckoutInput = {
  items: PriceDataItem[];
  success_url?: string;
  cancel_url?: string;
  /** Pre-fills the email; Byl creates and links a customer from it and emails the receipt. */
  customer_email?: string;
  /** Our order id, up to 48 characters; comes back in the checkout.completed webhook. */
  client_reference_id?: string;
  phone_number_collection?: boolean;
  delivery_address_collection?: boolean;
};

/** Create returns only id and url. */
export type BylCheckoutLink = { id: number; url: string };

function config() {
  const token = process.env.BYL_TOKEN?.trim();
  const projectId = process.env.BYL_PROJECT_ID?.trim();
  return token && projectId ? { token, projectId } : null;
}

export const bylConfigured = () => config() !== null;

export class BylError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "BylError";
  }
}

async function bylFetch<T>(path: string, init: { method: "GET" | "POST"; body?: unknown }): Promise<T> {
  const cfg = config();
  if (!cfg) throw new BylError(0, "BYL_TOKEN or BYL_PROJECT_ID is not set");

  const res = await fetch(`${apiBase}/projects/${encodeURIComponent(cfg.projectId)}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      // Without it Byl may answer errors as HTML.
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    // 401: token missing/wrong/deleted. 403: token is for another project. 422: validation.
    throw new BylError(res.status, json?.message ?? `Byl responded ${res.status}`);
  }
  return json.data as T;
}

export const createCheckout = (input: CreateCheckoutInput) =>
  bylFetch<BylCheckoutLink>("/checkouts", { method: "POST", body: input });
