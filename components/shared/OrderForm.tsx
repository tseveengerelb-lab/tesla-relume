import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

const fade = "transition-[border-color] duration-330 ease-tesla";

function TextField({ id, label, ...input }: ComponentProps<"input"> & { id: string; label: string }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        className={`h-12 w-full border-b border-line bg-transparent py-2 outline-none focus:border-ink focus-visible:outline-none ${fade}`}
        {...input}
      />
    </div>
  );
}

/** Tall field with the Figma resize grip; the textarea itself does not resize. */
function TextAreaField({ id, label, ...textarea }: ComponentProps<"textarea"> & { id: string; label: string }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <div className={`relative h-[180px] border-b border-line focus-within:border-ink ${fade}`}>
        <textarea
          id={id}
          name={id}
          className="block h-full w-full resize-none bg-transparent p-3 outline-none placeholder:text-muted focus-visible:outline-none"
          {...textarea}
        />
        {/* Plain <img>: the grip lines are sub-pixel SVGs that next/image cannot size. */}
        <span className="textarea-grip textarea-grip--inner"><img src="/icons/resize-line-1.svg" alt="" /></span>
        <span className="textarea-grip textarea-grip--outer"><img src="/icons/resize-line-2.svg" alt="" /></span>
      </div>
    </div>
  );
}

function TermsCheckbox() {
  return (
    <div className="flex w-full items-center gap-2 pb-4 text-sm">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        required
        className={
          "m-0 size-[18px] flex-none cursor-pointer appearance-none border border-line bg-transparent " +
          "bg-size-[14px] bg-center bg-no-repeat checked:border-accent checked:bg-accent" +
          "checked:bg-[url(/icons/check.svg)] transition-[background-color,border-color] duration-330 ease-tesla"
        }
      />
      <label htmlFor="terms">
        <a
          href="#"
          className="shadow-[inset_0_-1px_0_0_currentColor] transition-shadow duration-330 ease-tesla hover:shadow-[inset_0_-2px_0_0_currentColor]"
        >
          Үйлчилгээний нөхцөл
        </a>
        -ийг зөвшөөрч байна
      </label>
    </div>
  );
}

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
        <TermsCheckbox />
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Section>
  );
}
