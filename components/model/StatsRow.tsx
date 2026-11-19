import type { StatItem } from "@/data/types";
import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const columns: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export function StatsRow({ stats, label }: { stats: StatItem[]; label: string }) {
  return (
    <Section padding="tight" aria-label={label}>
      <Stagger className={`grid w-full grid-cols-1 gap-8 ${columns[stats.length] ?? "md:grid-cols-3"}`}>
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="flex">
            <Stat {...stat} fluid />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
