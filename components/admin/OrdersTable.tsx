export type OrderRow = {
  id: string;
  model: string | null;
  full_name: string | null;
  email: string;
  postal_code: string | null;
  phone: string | null;
  amount: number;
  amount_paid: number | null;
  status: "pending" | "awaiting_verification" | "paid";
  created_at: string;
  paid_at: string | null;
};

const statusLabel: Record<OrderRow["status"], { text: string; className: string }> = {
  paid: { text: "Төлөгдсөн", className: "bg-accent text-white" },
  awaiting_verification: { text: "Шилжүүлэг шалгах", className: "bg-amber-400 text-black" },
  pending: { text: "Төлөөгүй", className: "bg-surface text-body" },
};

const money = (n: number | null) => (n == null ? "—" : `${Number(n).toLocaleString("en-US")}₮`);

const date = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Ulaanbaatar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export function OrdersTable({ orders }: { orders: OrderRow[] }) {
  if (!orders.length) return <p className="w-full text-body">Одоогоор захиалга алга.</p>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            <th className="py-3 pr-4 font-medium">Огноо</th>
            <th className="py-3 pr-4 font-medium">Загвар</th>
            <th className="py-3 pr-4 font-medium">Захиалагч</th>
            <th className="py-3 pr-4 font-medium">Утас</th>
            <th className="py-3 pr-4 font-medium">Шуудан</th>
            <th className="py-3 pr-4 font-medium">Төлсөн</th>
            <th className="py-3 font-medium">Төлөв</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const status = statusLabel[o.status];
            return (
              <tr key={o.id} className="border-b border-line align-top">
                <td className="whitespace-nowrap py-3 pr-4">{date(o.created_at)}</td>
                <td className="py-3 pr-4">{o.model ?? "—"}</td>
                <td className="py-3 pr-4">
                  <div>{o.full_name ?? "—"}</div>
                  <a href={`mailto:${o.email}`} className="text-body underline-offset-4 hover:underline">
                    {o.email}
                  </a>
                </td>
                <td className="whitespace-nowrap py-3 pr-4">{o.phone ?? "—"}</td>
                <td className="py-3 pr-4">{o.postal_code ?? "—"}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  {o.status === "paid" ? money(o.amount_paid) : <span className="text-muted">{money(o.amount)}</span>}
                </td>
                <td className="py-3">
                  <span className={`inline-block whitespace-nowrap px-2 py-0.5 text-xs font-medium ${status.className}`}>
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
