import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { depositAmount } from "@/lib/byl";
import { Reveal } from "@/components/motion/Reveal";
import { OrderFormFields } from "./OrderFormFields";

type OrderFormProps = {
  title: string;
  tagline?: string;
  description: string;
  submitLabel?: string;
  /** Sent as a hidden field on model pages. */
  model?: string;
};

export function OrderForm({
  title,
  tagline = "Захиалга",
  description,
  submitLabel = "Захиалга өгөх",
  model,
}: OrderFormProps) {
  return (
    <Section id="order">
      <SectionTitle tagline={tagline} title={title} description={description} />
      <Reveal className="flex w-full justify-center">
        <OrderFormFields
          submitLabel={submitLabel}
          model={model}
          deposit={`${depositAmount.toLocaleString("en-US")}₮`}
        />
      </Reveal>
    </Section>
  );
}
