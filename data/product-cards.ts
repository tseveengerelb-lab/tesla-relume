import { getSupabase } from "@/lib/supabase";
import { models } from "./models";
import type { Model, ProductCardData } from "./types";

type ModelRow = {
  slug: string;
  name: string;
  card_description: string;
  card_price: string;
  image_url: string;
  image_alt: string;
};

export function toProductCard(model: Model): ProductCardData {
  return {
    slug: model.slug,
    name: model.name,
    description: model.card.description,
    price: model.card.price,
    image: model.image,
  };
}

/**
 * Product cards from the Supabase `models` table, in sort_order.
 * Falls back to data/models.ts when Supabase is not configured or the query
 * fails, and logs why, so the page still renders.
 */
export async function getProductCards(): Promise<ProductCardData[]> {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn("[product-cards] Supabase env vars missing; using data/models.ts");
    return models.map(toProductCard);
  }

  const { data, error } = await supabase
    .from("models")
    .select("slug, name, card_description, card_price, image_url, image_alt")
    .order("sort_order")
    .returns<ModelRow[]>();

  if (error || !data?.length) {
    console.error("[product-cards] Supabase query failed; using data/models.ts", error ?? "no rows");
    return models.map(toProductCard);
  }

  return data.map((row) => ({
    slug: row.slug,
    name: row.name,
    description: row.card_description,
    price: row.card_price,
    image: { src: row.image_url, alt: row.image_alt },
  }));
}
