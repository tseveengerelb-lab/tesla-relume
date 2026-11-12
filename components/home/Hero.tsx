import Image from "next/image";
import { Actions, ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Hero() {
  return (
    <section className="relative overflow-clip px-page py-section text-white">
      <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 z-[1] bg-black/40" />
      <div className="relative z-[2] mx-auto flex max-w-title flex-col items-center gap-8">
        <SectionTitle
          as="h1"
          tagline="Цахилгаан"
          title="Tesla-гаа сонгоорой"
          description="УЛААНБААТАР хотод"
          inverse
        />
        <Actions>
          <ButtonLink href="#order">Захиалах</ButtonLink>
          <ButtonLink href="#compare" variant="secondary">
            Загвар харьцуулах
          </ButtonLink>
        </Actions>
      </div>
    </section>
  );
}
