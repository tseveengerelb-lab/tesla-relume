/**
 * Cal.com API v2 (https://cal.com/docs/api-reference/v2). Server-only: CAL_API_KEY
 * must never reach the browser, so it has no NEXT_PUBLIC_ prefix and only server
 * code imports this file.
 */

import { calLink } from "@/data/test-drive";

const apiBase = "https://api.cal.com/v2";
const apiVersion = "2026-05-01";

/** The event slug is the last part of the booking link: "user/tesla-tst-drive" → "tesla-tst-drive". */
const eventSlug = calLink.split("/").pop()!;

export type CalBooking = {
  uid: string;
  title: string;
  start: string;
  end: string;
  status: "accepted" | "pending" | "cancelled" | "rejected" | string;
  attendees: { name: string; email: string; phoneNumber?: string | null }[];
  bookingFieldsResponses?: Record<string, unknown>;
  eventType?: { slug?: string };
  createdAt?: string;
};

export type CalResult = { ok: true; bookings: CalBooking[] } | { ok: false; error: string };

async function list(status: "upcoming" | "past", key: string): Promise<CalBooking[]> {
  const url = new URL(`${apiBase}/bookings`);
  url.searchParams.set("status", status);
  url.searchParams.set("limit", "100");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${key}`, "cal-api-version": apiVersion },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const body = (await res.json()) as { data?: CalBooking[] };
  return body.data ?? [];
}

/** Test drive bookings: upcoming first (soonest on top), then past (latest on top). */
export async function getTestDriveBookings(): Promise<CalResult | null> {
  const key = process.env.CAL_API_KEY;
  if (!key) return null;

  try {
    const [upcoming, past] = await Promise.all([list("upcoming", key), list("past", key)]);
    const ours = (b: CalBooking) => !b.eventType?.slug || b.eventType.slug === eventSlug;
    return {
      ok: true,
      bookings: [
        ...upcoming.filter(ours).sort((a, b) => a.start.localeCompare(b.start)),
        ...past.filter(ours).sort((a, b) => b.start.localeCompare(a.start)),
      ],
    };
  } catch (e) {
    console.error("Cal.com bookings fetch failed", e);
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
