export type ImageRef = {
  src: string;
  alt: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type Trim = {
  name: string;
  price: string;
};

/** A table cell: text, or true/false rendered as a check or cross icon. */
export type SpecValue = string | boolean;

export type SpecRow = {
  label: string;
  values: SpecValue[];
};

export type CompareHeader = {
  name: string;
  price: string;
};

/** What a home page vehicle card shows; read from the Supabase `models` table. */
export type ProductCardData = {
  slug: string;
  name: string;
  description: string;
  price: string;
  image: ImageRef;
};

export type Feature = {
  title: string;
  description: string;
  image: ImageRef;
};

export type Model = {
  slug: string;
  name: string;
  /** Short category shown above the name, e.g. "Спорт седан". */
  tagline: string;
  image: ImageRef;
  /** "$36,990-с эхэлнэ" */
  priceFrom: string;
  heroText: string;
  metaDescription: string;
  /** Card on the home page vehicle grid. */
  card: { description: string; price: string };
  stats: StatItem[];
  trims?: Trim[];
  /** Single-model spec table; each row holds one value. */
  specs?: SpecRow[];
  showFeatures?: boolean;
  /** Not yet in production: reserve instead of order, and no test drive. */
  preorder?: boolean;
};
