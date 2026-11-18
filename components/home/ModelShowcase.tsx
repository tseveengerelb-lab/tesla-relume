import Image from "next/image";
import type { Showcase } from "@/data/content";
import { requireModel } from "@/data/models";
import { Actions, ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stat } from "@/components/ui/Stat";
import { MediaSplit } from "@/components/shared/MediaSplit";

/**
 * One model on the home page. Everything shown comes from the same model record,
 * so photo, name and figures always agree (Prägnanz: one section, one model).
 * The links sit right under the figures they act on (proximity).
 */
export function ModelShowcase({ showcase }: { showcase: Showcase }) {
  const model = requireModel(showcase.modelSlug);

  return (
    <Section id={model.slug}>
      <SectionTitle tagline={model.tagline} title={model.name} description={model.heroText} />
      <MediaSplit image={model.image} reverse={showcase.reverse}>
        <div className="flex w-full flex-none flex-col gap-8 pt-8 lg:w-[428px] lg:gap-12 lg:p-12">
          {model.stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
          <Actions className="items-center gap-6">
            <ButtonLink href={`/${model.slug}`} variant="secondary">
              {model.preorder ? "Урьдчилан захиалах" : "Дэлгэрэнгүй"}
            </ButtonLink>
            {!model.preorder && (
              <ButtonLink href={`/${model.slug}#order`} variant="link">
                Захиалах
                <Image src="/icons/chevron-right.svg" alt="" width={24} height={24} unoptimized className="brightness-0 invert" />
              </ButtonLink>
            )}
          </Actions>
        </div>
      </MediaSplit>
    </Section>
  );
}
