/** Shared by the test drive form and its server action, so both accept the same choices. */

export const testDriveModels = ["Model 3", "Model Y", "Cybertruck"] as const;

export const testDriveSlots = ["10:00–12:00", "12:00–14:00", "14:00–16:00", "16:00–18:00"] as const;

/** How far ahead a drive can be booked. */
export const testDriveMaxDays = 60;

/** "YYYY-MM-DD" for today + `days`, in Ulaanbaatar time (UTC+8, no daylight saving). */
export function ubDate(days = 0) {
  const now = new Date(Date.now() + 8 * 60 * 60 * 1000 + days * 24 * 60 * 60 * 1000);
  return now.toISOString().slice(0, 10);
}
