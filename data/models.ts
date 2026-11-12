import type { Model } from "./types";

const awd = "Бүх дугуйн хөтлөгчтэй хувилбартай";
const rwd = "Хойд дугуйн хөтлөгчтэй хувилбартай";
const ota = "Програм хангамжийн алсын шинэчлэлт";

export const models: Model[] = [
  {
    slug: "model-3",
    name: "Model 3",
    tagline: "Спорт седан",
    image: { src: "/images/model-3.jpg", alt: "Цөлийн замд зогсож буй улаан Model 3" },
    priceFrom: "$36,990-с эхэлнэ",
    heroText: "$36,990-с эхэлнэ. Бүх хувилбар нь хурдан, Performance нь уралдааны замд бэлэн.",
    metaDescription:
      "Model 3 спорт седаны хувилбар, үнэ, үзүүлэлтийг үзэж, туршиж жолоодоод, Улаанбаатарт захиалгаа өгөөрэй.",
    card: {
      description: "Спорт седан · 0–97 км/цаг 2.9 секундэд (Performance)",
      price: "$36,990-с эхэлнэ",
    },
    stats: [
      { value: "2.9 с", label: "0–97 км/цаг (Performance)" },
      { value: "~507 км", label: "Явах зай, EPA (Performance)" },
      { value: "5", label: "Суудал" },
    ],
    trims: [
      { name: "RWD", price: "$36,990" },
      { name: "Premium RWD", price: "$42,490" },
      { name: "Premium AWD", price: "$47,490" },
      { name: "Performance", price: "$54,990" },
    ],
    specs: [
      { label: "0–97 км/цаг", values: ["2.9 с (Performance)"] },
      { label: "Явах зай, EPA", values: ["~507 км (Performance)"] },
      { label: "Суудал", values: ["5"] },
      { label: awd, values: [true] },
      { label: rwd, values: [true] },
      { label: ota, values: [true] },
      { label: "Седан их биетэй", values: [true] },
    ],
    showFeatures: true,
  },
  {
    slug: "model-y",
    name: "Model Y",
    tagline: "Дунд оврын SUV",
    image: { src: "/images/model-y.jpg", alt: "Усны эрэг дээр зогсож буй мөнгөлөг Model Y" },
    priceFrom: "$39,990-с эхэлнэ",
    heroText: "$39,990-с эхэлнэ. Илүү их зай, илүү их ачаа, ижил програм хангамж.",
    metaDescription:
      "Model Y дунд оврын SUV-ийн хувилбар, үнэ, үзүүлэлтийг үзэж, туршиж жолоодоод, Улаанбаатарт захиалгаа өгөөрэй.",
    card: {
      description: "Гэр бүлийн SUV · Сонголтоор 7 суудал (Premium AWD)",
      price: "$39,990-с эхэлнэ",
    },
    stats: [
      { value: "5 буюу 7", label: "Суудал (Premium AWD-д 7)" },
      { value: "~575 км", label: "Дээд явах зай, EPA" },
      { value: "5", label: "Хувилбар" },
    ],
    trims: [
      { name: "RWD", price: "$39,990" },
      { name: "AWD", price: "$41,990" },
      { name: "Premium RWD", price: "$45,990" },
      { name: "Premium AWD", price: "$49,990" },
      { name: "Performance", price: "$57,990" },
    ],
    specs: [
      { label: "0–97 км/цаг", values: ["3.3 с"] },
      { label: "Дээд явах зай, EPA", values: ["~575 км"] },
      { label: "Суудал", values: ["5 буюу 7"] },
      { label: "Их бие", values: ["SUV"] },
      { label: awd, values: [true] },
      { label: rwd, values: [true] },
      { label: ota, values: [true] },
    ],
  },
  {
    slug: "cybertruck",
    name: "Cybertruck",
    tagline: "Пикап",
    image: {
      src: "/images/cybertruck.jpg",
      alt: "Цөлийн хадны дунд зогсож буй зэвэрдэггүй ган Cybertruck",
    },
    priceFrom: "$69,990-с эхэлнэ",
    heroText:
      "$69,990-с эхэлнэ. Зэвэрдэггүй ган их бие, хүчирхэг чирэх чадвар, Cyberbeast-д суперкарын хурд.",
    metaDescription:
      "Cybertruck пикапын хувилбар, үнэ, үзүүлэлтийг үзэж, туршиж жолоодоод, Улаанбаатарт захиалгаа өгөөрэй.",
    card: {
      description: "Зэвэрдэггүй ган пикап · 523 км хүртэл явах зай",
      price: "$69,990-с эхэлнэ",
    },
    stats: [
      { value: "2.6–4.1 с", label: "0–97 км/цаг, хувилбараар" },
      { value: "523 км", label: "Дээд явах зай, EPA" },
      { value: "845 м.х.", label: "Cyberbeast-ийн хүч" },
    ],
    trims: [
      { name: "AWD", price: "$69,990" },
      { name: "Premium AWD", price: "$79,990" },
      { name: "Cyberbeast", price: "$99,990" },
    ],
    specs: [
      { label: "0–97 км/цаг", values: ["2.6–4.1 с (хувилбараар)"] },
      { label: "Явах зай, EPA", values: ["483–523 км"] },
      { label: "Хүч", values: ["845 м.х. (Cyberbeast)"] },
      { label: "Их бие", values: ["Зэвэрдэггүй ган пикап"] },
      { label: awd, values: [true] },
      { label: rwd, values: [false] },
      { label: ota, values: [true] },
    ],
  },
  {
    slug: "roadster",
    name: "Roadster",
    tagline: "Цахилгаан гиперкар",
    image: { src: "/images/roadster.jpg", alt: "Уулс дундуур давхиж буй улаан Roadster" },
    priceFrom: "Урьдчилгаа: $50,000",
    heroText: "2028 онд үйлдвэрлэхээр төлөвлөсөн. Одоо урьдчилгаа төлж, дарааллаа баталгаажуулаарай.",
    metaDescription:
      "Roadster цахилгаан гиперкарыг $50,000-ийн урьдчилгаагаар Улаанбаатарт урьдчилан захиалаарай.",
    card: {
      description: "Цахилгаан гиперкар · 2028 онд үйлдвэрлэхээр төлөвлөсөн",
      price: "Урьдчилгаа: $50,000",
    },
    stats: [
      { value: "$50,000", label: "Урьдчилгаа" },
      { value: "2028", label: "Үйлдвэрлэл эхлэх төлөвлөгөөт он" },
    ],
    preorder: true,
  },
];

export function getModel(slug: string): Model | undefined {
  return models.find((model) => model.slug === slug);
}

export function requireModel(slug: string): Model {
  const model = getModel(slug);
  if (!model) throw new Error(`Unknown model: ${slug}`);
  return model;
}
