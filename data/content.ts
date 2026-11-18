import type { CompareHeader, Feature, SpecRow } from "./types";

export const siteName = "Улаанбаатарт Tesla-гаа сонгоорой";

export const siteDescription =
  "Model 3, Model Y, Cybertruck, Roadster загваруудыг харьцуулж, туршиж жолоодоод, Улаанбаатарт захиалгаа өгөөрэй.";

export const testDriveSteps = [
  "Цагаа товлох: өдөр, цагаа сонгоод хүсэлт илгээнэ. Бид залгаж баталгаажуулна",
  "Үнэмлэхээ авчрах: хүчинтэй жолоочийн үнэмлэх л хангалттай",
  "Жолоогоо барих: таныг ирэхэд машин цэнэглэгдсэн, бэлэн байна",
];

export const homeTestDriveSteps = [
  "Загвараа сонгох: Model 3, Model Y эсвэл Cybertruck",
  ...testDriveSteps,
];

export const orderDescription =
  "Мэдээллээ үлдээгээрэй. Захиалгыг тань баталгаажуулахаар бүтээгдэхүүний мэргэжилтэн тантай холбогдоно.";

export const preorderDescription =
  "Мэдээллээ үлдээгээрэй. Урьдчилсан захиалгыг тань баталгаажуулахаар бүтээгдэхүүний мэргэжилтэн тантай холбогдоно.";

export const features: Feature[] = [
  {
    title: "Агааржуулалттай спорт суудал",
    description:
      "Урд суудлууд нь сайжруулсан хажуугийн тулгуур, жолоодоход илүү таатай гүн байрлалтай бөгөөд таныг тухтай байлгах халаалт, агааржуулалттай.",
    image: { src: "/images/feature-seats.jpg", alt: "Агааржуулалттай цагаан урд спорт суудал" },
  },
  {
    title: "Карбон файбер чимэглэл",
    description: "Хөнгөн карбон файбер чимэглэл, нарийн нэхмэл хээ нь зөвхөн Model 3 Performance-д байдаг.",
    image: {
      src: "/images/feature-carbon.jpg",
      alt: "Жолооны хүрдний хажуух карбон файбер самбарын чимэглэл",
    },
  },
  {
    title: "Студийн чанартай дуу",
    description:
      "Tesla-гийн бүтээсэн аудио систем нь 15 чанга яригч, хос сабвуфер, хос өсгөгчтэй тул дуунд бүрэн автана.",
    image: {
      src: "/images/feature-sound.jpg",
      alt: "Чанга яригчийн байршлыг харуулсан улаан машины дээд талын зураг",
    },
  },
];

/**
 * Home page model sections. Name, tagline, text and stats come from data/models.ts,
 * so a section can never show one model's photo with another model's words.
 */
export type Showcase = {
  modelSlug: string;
  /** Photo on the right (desktop). Alternating sides keeps the long page rhythmic. */
  reverse?: boolean;
};

export const showcases: Showcase[] = [
  { modelSlug: "model-3" },
  { modelSlug: "model-y", reverse: true },
  { modelSlug: "cybertruck" },
  { modelSlug: "roadster", reverse: true },
];

/** Home page compare table: one header per value column. */
export const homeCompare: { headers: CompareHeader[]; rows: SpecRow[] } = {
  headers: [
    { name: "Model 3", price: "$36,990-с эхэлнэ" },
    { name: "Model Y", price: "$39,990-с эхэлнэ" },
    { name: "Cybertruck", price: "$69,990-с эхэлнэ" },
  ],
  rows: [
    { label: "0–97 км/цаг", values: ["2.9 с", "3.3 с", "2.6 с"] },
    { label: "Бүх дугуйн хөтлөгчтэй хувилбартай", values: [true, true, true] },
    { label: "Програм хангамжийн алсын шинэчлэлт", values: [true, true, true] },
    { label: "Хойд дугуйн хөтлөгчтэй хувилбартай", values: [true, true, false] },
    { label: "Седан их биетэй", values: [true, false, false] },
  ],
};
