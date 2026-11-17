import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Захиалга хүлээн авлаа",
  robots: { index: false },
};

/**
 * Byl's success_url. Landing here does not prove payment (anyone can open it);
 * confirm orders from the checkout.completed webhook instead.
 */
export default function OrderSuccessPage() {
  return (
    <Section>
      <SectionTitle
        as="h1"
        tagline="Баярлалаа"
        title="Захиалгыг тань хүлээн авлаа"
        description="Урьдчилгааны баримтыг и-мэйлээр тань илгээлээ. Бүтээгдэхүүний мэргэжилтэн тантай удахгүй холбогдож захиалгыг баталгаажуулна."
      />
      <ButtonLink href="/">Нүүр хуудас руу буцах</ButtonLink>
    </Section>
  );
}
