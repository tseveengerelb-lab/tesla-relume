import Image from "next/image";
import { homeCompare, homeTestDriveSteps, orderDescription, showcases } from "@/data/content";
import { Hero } from "@/components/home/Hero";
import { ModelShowcase } from "@/components/home/ModelShowcase";
import { VehicleGrid } from "@/components/home/VehicleGrid";
import { CompareTable } from "@/components/shared/CompareTable";
import { FeatureList } from "@/components/shared/Features";
import { OrderForm } from "@/components/shared/OrderForm";
import { TestDriveCta } from "@/components/shared/TestDriveCta";
import { Actions, ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

// The vehicle cards come from Supabase; rebuild this page at most once a minute
// so edits in the database show up without a redeploy.
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <VehicleGrid />

      {showcases.map((showcase) => (
        <ModelShowcase key={showcase.id} showcase={showcase} />
      ))}

      <Section padding="features" aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">
          Онцлог шинж чанарууд
        </h2>
        <FeatureList />
      </Section>

      <TestDriveCta steps={homeTestDriveSteps} />
      <OrderForm title="Захиалгаа өгөх" description={orderDescription} />

      <Section id="compare">
        {/* The Figma frame keeps an empty 24px tagline and its 16px gap above the title. */}
        <SectionTitle title="Бүх загварыг харьцуулах" className="pt-10" />
        <CompareTable headers={homeCompare.headers} rows={homeCompare.rows} />
        <Actions className="items-center gap-6">
          <ButtonLink href="#" variant="secondary">
            Товч
          </ButtonLink>
          <ButtonLink href="#" variant="link">
            Товч
            <Image src="/icons/chevron-right.svg" alt="" width={24} height={24} unoptimized className="brightness-0" />
          </ButtonLink>
        </Actions>
      </Section>
    </>
  );
}
