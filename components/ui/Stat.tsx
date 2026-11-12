import type { StatItem } from "@/data/types";
import { cx } from "@/lib/cx";

type StatProps = StatItem & {
  /** In a row of three the value scales with the viewport (72px at 1440). */
  fluid?: boolean;
};

export function Stat({ value, label, fluid = false }: StatProps) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-2 font-medium">
      <p
        className={cx(
          "text-[48px] leading-[1.2] tracking-[0.01em]",
          fluid ? "md:text-[clamp(var(--text-h2),5vw,var(--text-h1))]" : "md:text-[length:var(--text-h1)]",
        )}
      >
        {value}
      </p>
      <p className="text-h6 text-body">{label}</p>
    </div>
  );
}
