import type { Trim } from "@/data/types";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

const desktopColumns: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

export function TrimCard({ trim }: { trim: Trim }) {
  return (
    <article className="flex flex-col items-start gap-2 rounded-lg bg-surface p-6">
      <h3 className="text-md font-semibold">{trim.name}</h3>
      <p className="mb-4 text-h5">{trim.price}</p>
      <ButtonLink href="#order" variant="secondary-on-surface">
        Захиалах
      </ButtonLink>
    </article>
  );
}

export function TrimGrid({ trims }: { trims: Trim[] }) {
  return (
    <Section id="trims">
      <SectionTitle title="Хувилбар ба үнэ" />
      <div
        className={`grid w-full grid-cols-1 gap-8 md:grid-cols-2 ${desktopColumns[trims.length] ?? "lg:grid-cols-4"}`}
      >
        {trims.map((trim) => (
          <TrimCard key={trim.name} trim={trim} />
        ))}
      </div>
    </Section>
  );
}
