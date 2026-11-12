import { getProductCards } from "@/data/product-cards";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "./ProductCard";

/** Vehicle cards, read from the Supabase `models` table. */
export async function VehicleGrid() {
  const cards = await getProductCards();

  return (
    <Section id="vehicles">
      <SectionTitle title="Автомашинууд" />
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <ProductCard key={card.slug} card={card} />
        ))}
      </div>
      <ButtonLink href="#compare" variant="secondary">
        Бүх загварыг харьцуулах
      </ButtonLink>
    </Section>
  );
}
