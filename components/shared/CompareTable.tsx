import type { CompareHeader, SpecRow, SpecValue } from "@/data/types";
import { BoolIcon } from "@/components/ui/BoolIcon";
import { cx } from "@/lib/cx";

type CompareTableProps = {
  headers: CompareHeader[];
  rows: SpecRow[];
};

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

function Value({ value }: { value: SpecValue }) {
  return typeof value === "boolean" ? <BoolIcon value={value} /> : value;
}

/**
 * Spec table. The first model column is highlighted.
 * Headers and value columns may differ in count (the Figma home table has two
 * headers over three value columns): both are spread over a shared grid of
 * lcm(headers, values) columns.
 */
export function CompareTable({ headers, rows }: CompareTableProps) {
  const valueCount = Math.max(...rows.map((row) => row.values.length));
  const columns = lcm(headers.length, valueCount);
  const headerSpan = columns / headers.length;
  const valueSpan = columns / valueCount;
  const simple = columns === 1;

  const border = "border-b border-line";
  const highlight = (index: number) => index === 0 && "bg-surface";

  return (
    <div className="w-full overflow-x-auto">
      <table className={cx("w-full table-fixed border-collapse", !simple && "max-lg:min-w-[720px]")}>
        <colgroup>
          <col className={cx("w-[404px] max-lg:w-[240px]", simple && "max-md:w-[55%]")} />
          <col span={columns} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className={cx(border, "py-6 pr-6 pl-0 text-left align-bottom text-lg font-bold")}>
              Үзүүлэлт
            </th>
            {headers.map((header, index) => (
              <th
                key={header.name}
                scope="col"
                colSpan={headerSpan > 1 ? headerSpan : undefined}
                className={cx(border, "p-6 text-center font-normal", highlight(index))}
              >
                <span className="mb-2 block text-lg font-bold">{header.name}</span>
                <span className="block text-body">{header.price}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className={cx(border, "py-4 pr-6 pl-0 text-left font-normal text-body")}>
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td
                  key={index}
                  colSpan={valueSpan > 1 ? valueSpan : undefined}
                  className={cx(
                    border,
                    "px-6 py-4 text-center font-semibold",
                    simple && "max-md:px-2",
                    highlight(index),
                  )}
                >
                  <Value value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
