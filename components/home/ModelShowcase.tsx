import type { Showcase } from "@/data/content";
import { requireModel } from "@/data/models";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stat } from "@/components/ui/Stat";
import { MediaSplit } from "@/components/shared/MediaSplit";

export function ModelShowcase({ showcase }: { showcase: Showcase }) {
  const { image } = requireModel(showcase.modelSlug);

  return (
    <Section id={showcase.id}>
      <SectionTitle tagline={showcase.tagline} title={showcase.title} description={showcase.description} />
      <MediaSplit image={image} reverse={showcase.reverse}>
        <div className="flex w-full flex-none flex-col gap-8 pt-8 lg:w-[428px] lg:gap-12 lg:p-12">
          {showcase.stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </MediaSplit>
    </Section>
  );
}
