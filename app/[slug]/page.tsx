import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { orderDescription, preorderDescription, testDriveSteps } from "@/data/content";
import { getModel, models } from "@/data/models";
import { ModelHero } from "@/components/model/ModelHero";
import { StatsRow } from "@/components/model/StatsRow";
import { TrimGrid } from "@/components/model/TrimGrid";
import { CompareTable } from "@/components/shared/CompareTable";
import { FeatureList } from "@/components/shared/Features";
import { OrderForm } from "@/components/shared/OrderForm";
import { TestDriveCta } from "@/components/shared/TestDriveCta";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const model = getModel((await params).slug);
  if (!model) return {};
  return { title: model.name, description: model.metaDescription };
}

export default async function ModelPage({ params }: Props) {
  const model = getModel((await params).slug);
  if (!model) notFound();

  return (
    <>
      <ModelHero model={model} />
      <StatsRow stats={model.stats} label={model.preorder ? "Гол мэдээлэл" : "Гол үзүүлэлтүүд"} />

      {model.trims && <TrimGrid trims={model.trims} />}

      {model.showFeatures && (
        <Section id="features">
          <SectionTitle title="Онцлог" />
          <FeatureList />
        </Section>
      )}

      {model.specs && (
        <Section id="specs">
          <SectionTitle title="Дэлгэрэнгүй үзүүлэлт" />
          <CompareTable headers={[{ name: model.name, price: model.priceFrom }]} rows={model.specs} />
          <ButtonLink href="/#compare" variant="secondary">
            Бүх загварыг харьцуулах
          </ButtonLink>
        </Section>
      )}

      {!model.preorder && <TestDriveCta steps={testDriveSteps} />}

      {model.preorder ? (
        <OrderForm
          tagline="Урьдчилсан захиалга"
          title={`${model.name} урьдчилан захиалах`}
          description={preorderDescription}
          submitLabel="Урьдчилан захиалах"
          model={model.name}
        />
      ) : (
        <OrderForm title={`${model.name} захиалах`} description={orderDescription} model={model.name} />
      )}
    </>
  );
}
