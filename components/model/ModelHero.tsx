import type { Model } from "@/data/types";
import { Actions, ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Section } from "@/components/ui/Section";
import { MediaSplit } from "@/components/shared/MediaSplit";
import { CalBookingButton } from "@/components/shared/CalBooking";

export function ModelHero({ model }: { model: Model }) {
  return (
    <Section padding="modelHero">
      <MediaSplit image={model.image} reverse priority>
        <div className="flex w-full flex-none flex-col items-start justify-center gap-4 pt-8 lg:w-[428px] lg:pt-0 lg:pr-12">
          <p className="font-semibold leading-normal">{model.tagline}</p>
          <h1 className="text-h1">{model.name}</h1>
          <p className="text-md text-body">{model.heroText}</p>
          <Actions className="mt-4">
            {model.preorder ? (
              <>
                <Magnetic>
                  <ButtonLink href="#order">Урьдчилан захиалах</ButtonLink>
                </Magnetic>
                <ButtonLink href="/#vehicles" variant="secondary">
                  Бусад загвар
                </ButtonLink>
              </>
            ) : (
              <>
                <Magnetic>
                  <ButtonLink href="#order">Захиалах</ButtonLink>
                </Magnetic>
                <CalBookingButton model={model.name} variant="secondary">
                  Туршиж жолоодох
                </CalBookingButton>
              </>
            )}
          </Actions>
        </div>
      </MediaSplit>
    </Section>
  );
}
