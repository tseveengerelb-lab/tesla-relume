"use server";

import { testDriveMaxDays, testDriveModels, testDriveSlots, ubDate } from "@/data/test-drive";
import { getServiceSupabase } from "@/lib/supabase-admin";

export type TestDriveState =
  | { ok: true; summary: string }
  | { ok?: false; error: string; values: Record<string, string> }
  | undefined;

const text = (form: FormData, key: string, max = 120) => String(form.get(key) ?? "").trim().slice(0, max);

/** Saves a free test drive request. A specialist calls back to confirm the time. */
export async function requestTestDrive(_prev: TestDriveState, form: FormData): Promise<TestDriveState> {
  const model = text(form, "td-model", 40);
  const name = text(form, "td-name");
  const rawPhone = text(form, "td-phone", 20);
  const phone = rawPhone.replace(/\D/g, "").replace(/^976(?=\d{8}$)/, "");
  const date = text(form, "td-date", 10);
  const time = text(form, "td-time", 20);

  const fail = (error: string): TestDriveState => ({
    error,
    values: { "td-model": model, "td-name": name, "td-phone": rawPhone, "td-date": date, "td-time": time },
  });

  // Honeypot: people never see this field; bots fill every input.
  if (text(form, "td-company")) return { ok: true, summary: "" };

  if (!(testDriveModels as readonly string[]).includes(model)) return fail("Загвараа сонгоно уу.");
  if (!name) return fail("Овог нэрээ оруулна уу.");
  if (!/^\d{8}$/.test(phone)) return fail("Утасны дугаараа 8 оронтойгоор оруулна уу.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < ubDate(1) || date > ubDate(testDriveMaxDays)) {
    return fail(`Маргаашаас хойш ${testDriveMaxDays} хоногийн дотор өдөр сонгоно уу.`);
  }
  if (!(testDriveSlots as readonly string[]).includes(time)) return fail("Цагаа сонгоно уу.");

  const db = getServiceSupabase();
  if (!db) return fail("Систем түр ажиллахгүй байна. Түр хүлээгээд дахин оролдоно уу.");

  const { error } = await db
    .from("test_drives")
    .insert({ model, full_name: name, phone, preferred_date: date, preferred_time: time });
  if (error) {
    console.error("Test drive insert failed", error.message);
    return fail("Хүсэлт илгээж чадсангүй. Түр хүлээгээд дахин оролдоно уу.");
  }

  return { ok: true, summary: `${model} · ${date} · ${time}` };
}
