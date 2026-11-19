"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/order-actions";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { Checkbox, TextField, TextLink } from "@/components/ui/Field";

type OrderFormFieldsProps = {
  submitLabel: string;
  model?: string;
  /** Already formatted, e.g. "100,000₮". */
  deposit: string;
};

/**
 * Proximity: the contact fields form one group; the agreement, the price note and
 * the button form a second, tighter group at the end — everything about "paying"
 * sits together, right where the decision is made.
 */
export function OrderFormFields({ submitLabel, model, deposit }: OrderFormFieldsProps) {
  const [state, action, pending] = useActionState(placeOrder, undefined);
  const values = state?.values;

  return (
    <form action={action} className="flex w-full max-w-form flex-col gap-10">
      {model && <input type="hidden" name="model" value={model} />}

      <div className="flex flex-col gap-6">
        <TextField
          id="full-name"
          label="Овог нэр"
          type="text"
          autoComplete="name"
          defaultValue={values?.["full-name"]}
          required
        />
        <TextField id="email" label="И-мэйл" type="email" autoComplete="email" defaultValue={values?.email} required />
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="phone"
            label="Утасны дугаар"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="9911 2233"
            pattern="[+0-9 ]{8,16}"
            title="8 оронтой утасны дугаар"
            defaultValue={values?.phone}
            required
          />
          <TextField
            id="zip"
            label="Шуудангийн код"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="14200"
            pattern="[0-9]{5}"
            maxLength={5}
            title="5 оронтой шуудангийн код"
            defaultValue={values?.zip}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Checkbox id="terms" required>
          <TextLink href="#">Үйлчилгээний нөхцөл</TextLink>-ийг зөвшөөрч байна
        </Checkbox>
        <p className="text-sm text-body">
          Захиалга баталгаажуулах урьдчилгаа <span className="font-semibold text-ink tabular-nums">{deposit}</span>.
          Дараагийн алхамд Byl-ээр (QPay, SocialPay, карт) төлнө.
        </p>
        {state?.error && (
          <p role="alert" className="text-sm text-red-400">
            {state.error}
          </p>
        )}
        <Magnetic className="mt-2 w-full md:w-auto md:self-start">
          <LoadingButton pending={pending} pendingLabel="Төлбөр рүү шилжиж байна…" className="w-full">
            {submitLabel}
          </LoadingButton>
        </Magnetic>
      </div>
    </form>
  );
}
