import { Button } from "@/components/ui/Button";
import { Checkbox, TextAreaField, TextField, TextLink } from "@/components/ui/Field";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

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
      <form className="flex w-full max-w-form flex-col items-center gap-6" action="#" method="post">
        {model && <input type="hidden" name="model" value={model} />}
        <TextField id="full-name" label="Овог нэр" type="text" autoComplete="name" required />
        <TextField id="email" label="И-мэйл" type="email" autoComplete="email" required />
        <TextAreaField id="zip" label="Шуудангийн код" placeholder="ж.нь 94301" autoComplete="postal-code" required />
        <div className="w-full pb-4">
          <Checkbox id="terms" required>
            <TextLink href="#">Үйлчилгээний нөхцөл</TextLink>-ийг зөвшөөрч байна
          </Checkbox>
        </div>
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Section>
  );
}
