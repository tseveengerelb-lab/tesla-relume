import { Actions, ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function TestDriveCta({ steps }: { steps: string[] }) {
  return (
    <Section id="test-drive">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-20">
        <h2 className="w-full text-h2 lg:min-w-px lg:flex-[1_0_0]">ТУРШИЖ ЖОЛООДОХ</h2>
        <div className="flex w-full flex-col gap-8 lg:min-w-px lg:flex-[1_0_0]">
          <ul className="text-md text-body">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <Actions>
            <ButtonLink href="#order">ТИЙМ</ButtonLink>
            <ButtonLink href="#order" variant="secondary">
              ОДОО АВАХ
            </ButtonLink>
          </Actions>
        </div>
      </div>
    </Section>
  );
}
