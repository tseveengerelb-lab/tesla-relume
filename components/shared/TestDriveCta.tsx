import { Section } from "@/components/ui/Section";
import { TestDriveForm } from "./TestDriveForm";

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
          <h2 className="text-h2">Туршиж жолоодох</h2>
          <TestDriveSteps steps={steps} />
        </div>
        <div className="w-full lg:min-w-px lg:flex-[1_0_0]">
          <TestDriveForm model={model} />
        </div>
      </div>
    </Section>
  );
}
