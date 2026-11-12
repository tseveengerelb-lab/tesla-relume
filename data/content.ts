import type { CompareHeader, Feature, SpecRow, StatItem } from "./types";
import { requireModel } from "./models";

export const siteName = "Улаанбаатарт Tesla-гаа сонгоорой";

export const siteDescription =
  "Model 3, Model Y, Cybertruck, Roadster загваруудыг харьцуулж, туршиж жолоодоод, Улаанбаатарт захиалгаа өгөөрэй.";

export const testDriveSteps = [
  "Цагаа товлох: өөрт тохирох өдөр, цагаа сонгоно",
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

export type Showcase = {
  id: string;
  tagline: string;
  title: string;
  description: string;
  modelSlug: string;
  reverse?: boolean;
  stats: StatItem[];
};

const model3Stats = requireModel("model-3").stats;

/** Home page model sections, as written in Figma. */
export const showcases: Showcase[] = [
  {
    id: "model-3",
    tagline: "Спорт седан",
    title: "Model 3",
    description: "RWD $36,990 · Premium RWD $42,490 · Premium AWD $47,490 · Performance $54,990",
    modelSlug: "model-3",
    stats: model3Stats,
  },
  {
    id: "model-y",
    tagline: "Дунд оврын SUV",
    title: "Model Y",
    description:
      "Илүү их зай, илүү их ачаа, ижил програм хангамж. RWD $39,990 · AWD $41,990 · Premium RWD $45,990 · Premium AWD $49,990 · Performance $57,990",
    modelSlug: "model-y",
    reverse: true,
    stats: requireModel("model-y").stats,
  },
  {
    id: "cybertruck",
    tagline: "Пикап",
    title: "Cybertruck",
    description:
      "Зэвэрдэггүй ган их бие, хүчирхэг чирэх чадвар, Cyberbeast-д суперкарын хурд. AWD $69,990 · Premium AWD $79,990 · Cyberbeast $99,990",
    modelSlug: "cybertruck",
    stats: [
      { value: "2.6–4.1 с", label: "0–97 км/цаг, хувилбараар" },
      { value: "483–523 км", label: "Явах зай, EPA" },
      { value: "845 м.х.", label: "Cyberbeast-ийн хүч" },
    ],
  },
  // As written in Figma: the image is the Roadster, the text is Model 3.
  {
    id: "roadster",
    tagline: "Спорт седан",
    title: "Model 3",
    description:
      "Бүх хувилбар нь хурдан, Performance нь уралдааны замд бэлэн. Standard RWD $36,990 · Premium RWD $42,490 · Premium AWD $47,490 · Performance AWD $54,990",
    modelSlug: "roadster",
    reverse: true,
    stats: model3Stats,
  },
];

/** Home page compare table, as in Figma: two model headers over three value columns. */
export const homeCompare: { headers: CompareHeader[]; rows: SpecRow[] } = {
  headers: [
    { name: "Model 3", price: "$36,990-с эхэлнэ" },
    { name: "Model Y", price: "$39,990-с эхэлнэ" },
  ],
  rows: [
    { label: "0–97 км/цаг", values: ["2.9 с", "3.3 с", "2.6 с"] },
    { label: "Бүх дугуйн хөтлөгчтэй хувилбартай", values: [true, true, true] },
    { label: "Програм хангамжийн алсын шинэчлэлт", values: [true, true, true] },
    { label: "Хойд дугуйн хөтлөгчтэй хувилбартай", values: [true, true, false] },
    { label: "Седан их биетэй", values: [true, false, false] },
  ],
};
