import type { CalBooking } from "@/lib/cal";

const statusLabel: Record<string, { text: string; className: string }> = {
  accepted: { text: "Баталгаажсан", className: "bg-accent text-white" },
  pending: { text: "Хүлээгдэж буй", className: "bg-surface text-ink" },
  cancelled: { text: "Цуцалсан", className: "bg-surface text-muted" },
  rejected: { text: "Татгалзсан", className: "bg-surface text-muted" },
};

const ubTime = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Ulaanbaatar", hour12: false, ...opts });

/** "Загвар: Model Y" is pre-filled into the notes from the model page's button. */
function modelOf(b: CalBooking) {
  const notes = b.bookingFieldsResponses?.notes;
  const match = typeof notes === "string" ? notes.match(/Загвар:\s*([^\n]+)/) : null;
  return match?.[1].trim() ?? "—";
}

function phoneOf(b: CalBooking) {
  const field = b.bookingFieldsResponses?.attendeePhoneNumber;
  return b.attendees[0]?.phoneNumber || (typeof field === "string" ? field : "");
}

/** Booked time first: that is what staff plan around. Upcoming rows come before past ones. */
export function CalBookingsTable({ bookings }: { bookings: CalBooking[] }) {
  if (!bookings.length) return <p className="w-full text-body">Одоогоор захиалга алга.</p>;
  const now = new Date().toISOString();

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            <th className="py-3 pr-4 font-medium">Цаг</th>
            <th className="py-3 pr-4 font-medium">Загвар</th>
            <th className="py-3 pr-4 font-medium">Нэр</th>
            <th className="py-3 pr-4 font-medium">Холбоо барих</th>
            <th className="py-3 font-medium">Төлөв</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => {
            const who = b.attendees[0];
            const phone = phoneOf(b);
            const past = b.end < now;
            const status = statusLabel[b.status] ?? { text: b.status, className: "bg-surface text-body" };
            return (
              <tr key={b.uid} className={`border-b border-line align-top ${past ? "text-body" : ""}`}>
                <td className="whitespace-nowrap py-3 pr-4 font-semibold tabular-nums">
                  {ubTime(b.start, { year: "numeric", month: "2-digit", day: "2-digit" })} ·{" "}
                  {ubTime(b.start, { hour: "2-digit", minute: "2-digit" })}–
                  {ubTime(b.end, { hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="py-3 pr-4">{modelOf(b)}</td>
                <td className="py-3 pr-4">{who?.name ?? "—"}</td>
                <td className="py-3 pr-4">
                  <div className="flex flex-col gap-0.5">
                    {who?.email && (
                      <a href={`mailto:${who.email}`} className="underline-offset-4 hover:underline">
                        {who.email}
                      </a>
                    )}
                    {phone && (
                      <a href={`tel:${phone}`} className="whitespace-nowrap underline-offset-4 hover:underline">
                        {phone}
                      </a>
                    )}
                  </div>
                </td>
                <td className="py-3">
                  <span className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ${status.className}`}>
                    {past && b.status === "accepted" ? "Өнгөрсөн" : status.text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
