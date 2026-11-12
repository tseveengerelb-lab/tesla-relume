/**
 * Descriptions of the design tokens for the /style-guide page.
 * The values themselves live in app/globals.css (@theme); keep the hex and px
 * figures here in step with that file. Swatches and specimens on the page use
 * the real utility classes, so they always render the live values.
 */

export type ColorToken = {
  name: string;
  token: string;
  /** Static class so Tailwind generates it. */
  swatch: string;
  value: string;
  usage: string;
  /** Light swatches need an outline to stay visible on white. */
  outlined?: boolean;
  /** WCAG contrast against white (or of white text on it, for the accent). */
  contrast?: string;
};

export const colorGroups: { title: string; colors: ColorToken[] }[] = [
  {
    title: "Үндсэн",
    colors: [
      { name: "Canvas", token: "white", swatch: "bg-white", value: "#FFFFFF", usage: "Хуудасны дэвсгэр", outlined: true },
      { name: "Ink", token: "ink", swatch: "bg-ink", value: "#171A20", usage: "Гарчиг, үндсэн текст, идэвхтэй хүрээ", contrast: "17.4:1" },
      { name: "Body", token: "body", swatch: "bg-body", value: "#393C41", usage: "Тайлбар текст, хүснэгтийн мөр", contrast: "11.1:1" },
      { name: "Muted", token: "muted", swatch: "bg-muted", value: "#8E8E8E", usage: "Зөвхөн placeholder. Үндсэн текстэд хэрэглэхгүй", contrast: "3.3:1" },
    ],
  },
  {
    title: "Гадаргуу ба хүрээ",
    colors: [
      { name: "Surface", token: "surface", swatch: "bg-surface", value: "#F4F4F4", usage: "Карт, хоёрдогч товч, тодруулсан багана", outlined: true },
      { name: "Surface hover", token: "surface-hover", swatch: "bg-surface-hover", value: "#EEEEEE", usage: "Хоёрдогч товчны hover", outlined: true },
      { name: "Line", token: "line", swatch: "bg-line", value: "#D0D1D2", usage: "Талбарын доод зураас, хүснэгтийн хүрээ" },
    ],
  },
  {
    title: "Онцлох өнгө",
    colors: [
      { name: "Accent", token: "accent", swatch: "bg-accent", value: "#4F39F6 · indigo-600", usage: "Үндсэн товч, сонгосон checkbox", contrast: "6.5:1" },
      { name: "Accent hover", token: "accent-hover", swatch: "bg-accent-hover", value: "#432DD7 · indigo-700", usage: "Үндсэн товчны hover", contrast: "8.1:1" },
    ],
  },
];

export type TypeToken = {
  name: string;
  className: string;
  /** Desktop / ≤1100px / ≤767px */
  size: string;
  meta: string;
  sample: string;
  usage: string;
};

export const typeScale: TypeToken[] = [
  { name: "Heading 1", className: "text-h1", size: "72 / 56 / 40", meta: "Medium 500 · 1.2 · +0.01em", sample: "Tesla-гаа сонгоорой", usage: "Хуудасны гол гарчиг (h1)" },
  { name: "Heading 2", className: "text-h2", size: "52 / 44 / 32", meta: "Medium 500 · 1.2 · +0.01em", sample: "Хувилбар ба үнэ", usage: "Хэсгийн гарчиг (h2)" },
  { name: "Heading 5", className: "text-h5", size: "28 / 28 / 24", meta: "Medium 500 · 1.4 · +0.01em", sample: "$54,990", usage: "Картын гарчиг, хувилбарын үнэ" },
  { name: "Heading 6", className: "text-h6", size: "22", meta: "Medium 500 · 1.4 · +0.01em", sample: "Явах зай, EPA", usage: "Үзүүлэлтийн шошго" },
  { name: "Large", className: "text-lg font-semibold", size: "22", meta: "Semibold 600 · 1.6", sample: "$36,990-с эхэлнэ", usage: "Картын үнэ, хүснэгтийн толгой" },
  { name: "Medium", className: "text-md", size: "18", meta: "Regular 400 · 1.6", sample: "Бүх хувилбар нь хурдан, Performance нь уралдааны замд бэлэн.", usage: "Гарчгийн доорх тайлбар" },
  { name: "Regular", className: "text-base", size: "16", meta: "Regular 400 · 1.6", sample: "Урд суудлууд нь халаалт, агааржуулалттай.", usage: "Үндсэн текст, товч" },
  { name: "Small", className: "text-sm", size: "14", meta: "Regular 400 · 1.6", sample: "Спорт седан · 0–97 км/цаг 2.9 секундэд", usage: "Картын тайлбар, checkbox" },
  { name: "Tagline", className: "font-semibold leading-normal", size: "16", meta: "Semibold 600 · 1.5", sample: "Спорт седан", usage: "Гарчгийн дээрх ангилал" },
];

export const spacingTokens = [
  { name: "page", className: "px-page", values: [64, 32, 20], usage: "Хуудасны хоёр талын зай" },
  { name: "section", className: "py-section", values: [112, 80, 64], usage: "Хэсэг хоорондын босоо зай" },
];

/** Gaps used between elements, from Tailwind's 4px scale. */
export const gapScale = [
  { className: "gap-2", px: 8, usage: "Шошго ба утга" },
  { className: "gap-4", px: 16, usage: "Товчнууд, tagline ба гарчиг" },
  { className: "gap-6", px: 24, usage: "Формын талбарууд, картын дотор" },
  { className: "gap-8", px: 32, usage: "Картын сүлжээ" },
  { className: "gap-12", px: 48, usage: "Үзүүлэлтийн жагсаалт" },
  { className: "gap-20", px: 80, usage: "Хэсгийн гарчиг ба агуулга" },
];

export const containers = [
  { name: "content", className: "max-w-content", px: 1280, usage: "Хэсгийн агуулгын дээд өргөн" },
  { name: "title", className: "max-w-title", px: 768, usage: "Төвлөрсөн гарчиг, hero" },
  { name: "form", className: "max-w-form", px: 560, usage: "Захиалгын форм" },
];

export const breakpoints = [
  { name: "Гар утас", prefix: "(үндсэн)", range: "0–767px", note: "1 багана, padding 20px" },
  { name: "Таблет", prefix: "md:", range: "768–1100px", note: "2 багана, зураг дээд талд" },
  { name: "Компьютер", prefix: "lg:", range: "1101px+", note: "3–5 багана, зураг хажууд" },
];
