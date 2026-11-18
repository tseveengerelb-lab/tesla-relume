export type TestDriveRow = {
  id: string;
  model: string;
  full_name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  status: "new" | "contacted" | "done" | "cancelled";
  created_at: string;
};

const statusLabel: Record<TestDriveRow["status"], { text: string; className: string }> = {
  new: { text: "Шинэ", className: "bg-accent text-white" },
  contacted: { text: "Холбогдсон", className: "bg-surface text-ink" },
  done: { text: "Жолоодсон", className: "bg-surface text-body" },
  cancelled: { text: "Цуцалсан", className: "bg-surface text-muted" },
};

const created = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Ulaanbaatar",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

/** Requested time first: that is what staff plan around. */
export function TestDrivesTable({ requests }: { requests: TestDriveRow[] }) {
  if (!requests.length) return <p className="w-full text-body">Одоогоор хүсэлт алга.</p>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            <th className="py-3 pr-4 font-medium">Хүссэн цаг</th>
            <th className="py-3 pr-4 font-medium">Загвар</th>
            <th className="py-3 pr-4 font-medium">Нэр</th>
            <th className="py-3 pr-4 font-medium">Утас</th>
            <th className="py-3 pr-4 font-medium">Илгээсэн</th>
            <th className="py-3 font-medium">Төлөв</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => {
            const status = statusLabel[r.status];
            return (
              <tr key={r.id} className="border-b border-line align-top">
                <td className="whitespace-nowrap py-3 pr-4 font-semibold tabular-nums">
                  {r.preferred_date} · {r.preferred_time}
                </td>
                <td className="py-3 pr-4">{r.model}</td>
                <td className="py-3 pr-4">{r.full_name}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <a href={`tel:${r.phone}`} className="underline-offset-4 hover:underline">
                    {r.phone}
                  </a>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-body">{created(r.created_at)}</td>
                <td className="py-3">
                  <span className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ${status.className}`}>
                    {status.text}
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
