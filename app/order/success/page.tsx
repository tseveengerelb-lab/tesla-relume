import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { confirmOrderFromByl, type OrderStatus } from "@/lib/orders";
import { getServiceSupabase } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Захиалга",
  robots: { index: false },
};

type Props = { searchParams: Promise<{ order?: string | string[] }> };

const messages: Record<OrderStatus | "unknown", { tagline: string; title: string; description: string }> = {
  paid: {
    tagline: "Баярлалаа",
    title: "Төлбөр амжилттай төлөгдлөө",
    description:
      "Урьдчилгааны баримтыг и-мэйлээр тань илгээлээ. Бүтээгдэхүүний мэргэжилтэн тантай удахгүй холбогдож захиалгыг баталгаажуулна.",
  },
  awaiting_verification: {
    tagline: "Шалгагдаж байна",
    title: "Банкны шилжүүлгийг шалгаж байна",
    description: "Шилжүүлэг баталгаажмагц захиалга тань идэвхжинэ. Бид тантай и-мэйлээр холбогдоно.",
  },
  pending: {
    tagline: "Хүлээгдэж байна",
    title: "Төлбөр хараахан баталгаажаагүй байна",
    description:
      "Төлбөр төлсөн бол хэдэн секундийн дараа хуудсаа шинэчилнэ үү. Төлөөгүй бол захиалгын хуудас руу буцаж дахин оролдоно уу.",
  },
  unknown: {
    tagline: "Баярлалаа",
    title: "Захиалгыг тань хүлээн авлаа",
    description: "Бүтээгдэхүүний мэргэжилтэн тантай удахгүй холбогдож захиалгыг баталгаажуулна.",
  },
};

/** Byl's success_url. Confirms the payment with Byl's API rather than trusting the visit. */
async function orderStatus(orderId: string | undefined): Promise<OrderStatus | "unknown"> {
  // Order ids are ours ("order_<uuid>"); anything else is not worth a database call.
  if (!orderId || !/^order_[0-9a-f-]{36}$/.test(orderId)) return "unknown";
  const db = getServiceSupabase();
  if (!db) return "unknown";
  try {
    return (await confirmOrderFromByl(db, orderId)) ?? "unknown";
  } catch (err) {
    console.error("Order confirm failed", orderId, err);
    return "unknown";
  }
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { order } = await searchParams;
  const orderId = Array.isArray(order) ? order[0] : order;
  const status = await orderStatus(orderId);
  const text = messages[status];

  return (
    <Section>
      <SectionTitle as="h1" tagline={text.tagline} title={text.title} description={text.description} />
      <div className="flex flex-wrap justify-center gap-4">
        {status === "pending" && orderId && (
          <ButtonLink href={`/order/success?order=${orderId}`} variant="secondary">
            Дахин шалгах
          </ButtonLink>
        )}
        <ButtonLink href="/">Нүүр хуудас руу буцах</ButtonLink>
      </div>
    </Section>
  );
}
