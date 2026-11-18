import { Actions, ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

/** "Цагаа товлох: өөрт тохирох..." → title and detail. */
function splitStep(step: string) {
  const [title, ...rest] = step.split(":");
  return { title: title.trim(), detail: rest.join(":").trim() };
}

/**
 * Numbered steps joined by a vertical line (Gestalt: uniform connectedness):
 * the line says "one sequence" without extra words. Identical markers make the
 * steps read as peers (similarity); each title sits tight to its own detail
 * (proximity).
 */
export function TestDriveSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const { title, detail } = splitStep(step);
        const last = index === steps.length - 1;
        return (
          <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && <span aria-hidden className="absolute top-8 bottom-0 left-[15px] w-px bg-line" />}
            <span className="flex size-8 flex-none items-center justify-center rounded-full bg-surface text-sm font-semibold tabular-nums">
              {index + 1}
            </span>
            <div className="flex flex-col pt-1">
              <span className="font-semibold">{title}</span>
              {detail && <span className="text-body">{detail}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function TestDriveCta({ steps }: { steps: string[] }) {
  return (
    <Section id="test-drive">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-20">
        {/* Similarity: same sentence case as every other heading and button on the site. */}
        <h2 className="w-full text-h2 lg:min-w-px lg:flex-[1_0_0]">Туршиж жолоодох</h2>
        <div className="flex w-full flex-col gap-10 lg:min-w-px lg:flex-[1_0_0]">
          <TestDriveSteps steps={steps} />
          {/*
            Prägnanz: one button, labelled with what it really does. The order form is
            where a specialist picks up the request and arranges the drive; two buttons
            with different words that open the same form only made people choose.
          */}
          <Actions>
            <ButtonLink href="#order">Хүсэлт илгээх</ButtonLink>
          </Actions>
        </div>
      </div>
    </Section>
  );
}
