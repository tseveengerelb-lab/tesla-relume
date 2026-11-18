import Image from "next/image";
import { Actions, ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * Fills the first screen below the navbar. Figure–ground: a gradient darkens the
 * photo behind the text, so the words stay the figure however busy the image is.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[min(calc(100svh-72px),880px)] items-center overflow-clip px-page py-section text-white">
      <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/50 to-canvas" />
      <div className="relative z-[2] mx-auto flex max-w-title flex-col items-center gap-10">
        <SectionTitle
          as="h1"
          tagline="Цахилгаан автомашин"
          title="Tesla-гаа сонгоорой"
          description="Улаанбаатарт захиалж, туршиж жолоодоорой."
          inverse
        />
        <Actions className="justify-center">
          <ButtonLink href="#order">Захиалах</ButtonLink>
          <ButtonLink href="#compare" variant="secondary">
            Загвар харьцуулах
          </ButtonLink>
        </Actions>
      </div>
    </section>
  );
}
