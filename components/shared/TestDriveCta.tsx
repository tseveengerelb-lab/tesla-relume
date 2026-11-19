import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { TestDriveForm } from "./TestDriveForm";
import { TestDriveSteps } from "./TestDriveSteps";

export { TestDriveSteps };

/**
 * Steps on the left, the request form on the right: the explanation and the action
 * sit side by side, so nobody has to jump to another part of the page (proximity).
 * Free, so it never leads to the paid order form.
 */
export function TestDriveCta({ steps, model }: { steps: string[]; model?: string }) {
  return (
    <Section id="test-drive">
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <div className="flex w-full flex-col gap-10 lg:min-w-px lg:flex-[1_0_0]">
          {/* Similarity: same sentence case as every other heading and button on the site. */}
          <Reveal>
            <h2 className="text-h2">Туршиж жолоодох</h2>
          </Reveal>
          <TestDriveSteps steps={steps} />
        </div>
        <Reveal delay={0.2} className="w-full lg:min-w-px lg:flex-[1_0_0]">
          <TestDriveForm model={model} />
        </Reveal>
      </div>
    </Section>
  );
}
