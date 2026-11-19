import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { CalBookingButton } from "./CalBooking";import { TestDriveSteps } from "./TestDriveSteps";

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
          {/* Booking runs on Cal.com: live availability, no double bookings, and an
              email confirmation, all in a popup so the visitor never leaves the page. */}
          <div className="flex flex-col gap-4 rounded-lg bg-surface p-6 md:p-8">
            <p className="text-h6">Өөрт тохирох цагаа сонгоно уу</p>
            <p className="text-body">
              Хуанлиас сул цагаа сонгоод нэр, утсаа үлдээхэд л болно. Баталгаажуулалт имэйлээр ирнэ.
            </p>
            <CalBookingButton model={model} className="mt-2 w-full md:w-auto md:self-start">
              Цаг товлох
            </CalBookingButton>
            <p className="text-sm text-body">Туршилтын жолоодлого үнэ төлбөргүй.</p>          </div>
        </Reveal>
      </div>
    </Section>
  );
}
