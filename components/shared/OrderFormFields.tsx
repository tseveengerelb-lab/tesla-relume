"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/order-actions";
import { Button } from "@/components/ui/Button";
import { Checkbox, TextAreaField, TextField, TextLink } from "@/components/ui/Field";

type OrderFormFieldsProps = {
  submitLabel: string;
  model?: string;
  /** Already formatted, e.g. "100,000₮". */
  deposit: string;
};

export function OrderFormFields({ submitLabel, model, deposit }: OrderFormFieldsProps) {
  const [state, action, pending] = useActionState(placeOrder, undefined);

  return (
    <form action={action} className="flex w-full max-w-form flex-col items-center gap-6">
      {model && <input type="hidden" name="model" value={model} />}
      <TextField id="full-name" label="Овог нэр" type="text" autoComplete="name" required />
      <TextField id="email" label="И-мэйл" type="email" autoComplete="email" required />
      <TextAreaField id="zip" label="Шуудангийн код" placeholder="ж.нь 94301" autoComplete="postal-code" required />
      <div className="w-full pb-4">
        <Checkbox id="terms" required>
          <TextLink href="#">Үйлчилгээний нөхцөл</TextLink>-ийг зөвшөөрч байна
        </Checkbox>
      </div>
      <p className="w-full text-sm text-muted">
        Захиалга баталгаажуулах урьдчилгаа {deposit}. Byl-ээр (QPay, SocialPay, карт) төлнө.
      </p>
      {state?.error && (
        <p role="alert" className="w-full text-sm text-red-400">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="disabled:opacity-60">
        {pending ? "Төлбөр рүү шилжиж байна…" : submitLabel}
      </Button>
    </form>
  );
}
