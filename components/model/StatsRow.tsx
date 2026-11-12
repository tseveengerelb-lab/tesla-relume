import type { StatItem } from "@/data/types";
import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";

const columns: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export function StatsRow({ stats, label }: { stats: StatItem[]; label: string }) {
  return (
    <Section padding="tight" aria-label={label}>
      <div className={`grid w-full grid-cols-1 gap-8 ${columns[stats.length] ?? "md:grid-cols-3"}`}>
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} fluid />
        ))}
      </div>
    </Section>
  );
}
