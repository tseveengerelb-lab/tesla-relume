"use client";

import { useActionState, useEffect, useState } from "react";
import { requestTestDrive } from "@/app/test-drive-actions";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { testDriveMaxDays, testDriveModels, testDriveSlots, ubDate } from "@/data/test-drive";

/**
 * Free test drive request. Common region: the form sits on its own surface panel,
 * so it reads as one task, separate from the paid order form further down.
 * Proximity: date and time share a row because they answer one question ("when?").
 * Field ids carry a td- prefix: the order form on the same page uses the plain names.
 */
export function TestDriveForm({ model }: { model?: string }) {
  const [state, action, pending] = useActionState(requestTestDrive, undefined);
  // Set after mount: pages are prerendered, so a date baked in at build time would go stale.
  const [range, setRange] = useState<{ min: string; max: string }>();
  useEffect(() => setRange({ min: ubDate(1), max: ubDate(testDriveMaxDays) }), []);

  if (state?.ok) {
    return (
      <div role="status" className="flex flex-col gap-2 rounded-lg bg-surface p-6 md:p-8">
        <p className="text-h6">Хүсэлтийг тань хүлээн авлаа</p>
        {state.summary && <p className="font-semibold tabular-nums">{state.summary}</p>}
        <p className="text-body">Манай мэргэжилтэн тантай утсаар холбогдож цагийг баталгаажуулна. Төлбөргүй.</p>
      </div>
    );
  }

  const values = state && !state.ok ? state.values : undefined;

  return (
    // Keyed on the returned values: React resets a form after an action but does not
    // re-apply a changed defaultValue to <select>, so the form remounts with them instead.
    <form
      key={values ? JSON.stringify(values) : "empty"}
      action={action}
      className="flex flex-col gap-6 rounded-lg bg-surface p-6 md:p-8"
    >
      <SelectField id="td-model" label="Загвар" defaultValue={values?.["td-model"] ?? model ?? ""} required>
        <option value="" disabled>
          Сонгох
        </option>
        {testDriveModels.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </SelectField>
      <TextField id="td-name" label="Овог нэр" type="text" autoComplete="name" defaultValue={values?.["td-name"]} required />
      <TextField
        id="td-phone"
        label="Утасны дугаар"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="9911 2233"
        pattern="[+0-9 ]{8,16}"
        title="8 оронтой утасны дугаар"
        defaultValue={values?.["td-phone"]}
        required
      />
      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          id="td-date"
          label="Өдөр"
          type="date"
          min={range?.min}
          max={range?.max}
          defaultValue={values?.["td-date"]}
          required
        />
        <SelectField id="td-time" label="Цаг" defaultValue={values?.["td-time"] ?? ""} required>
          <option value="" disabled>
            Сонгох
          </option>
          {testDriveSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </SelectField>
      </div>

      {/* Honeypot for bots; hidden from people and screen readers. */}
      <input type="text" name="td-company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-3">
        {state && !state.ok && (
          <p role="alert" className="text-sm text-red-400">
            {state.error}
          </p>
        )}
        <Button type="submit" disabled={pending} className="w-full disabled:opacity-60 md:w-auto md:self-start">
          {pending ? "Илгээж байна…" : "Цаг товлох"}
        </Button>
        <p className="text-sm text-body">Туршилтын жолоодлого үнэ төлбөргүй.</p>
      </div>
    </form>
  );
}
