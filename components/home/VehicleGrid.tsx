import { models } from "@/data/models";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "./ProductCard";

export function VehicleGrid() {
  return (
    <Section id="vehicles">
      <SectionTitle title="Автомашинууд" />
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {models.map((model) => (
          <ProductCard key={model.slug} model={model} />
        ))}
      </div>
      <ButtonLink href="#compare" variant="secondary">
        Бүх загварыг харьцуулах
      </ButtonLink>
    </Section>
  );
}
