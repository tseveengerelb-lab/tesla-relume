import Image from "next/image";
import Link from "next/link";
import type { ProductCardData } from "@/data/types";

/**
 * The whole card is one link to the model page (Gestalt: uniform connectedness),
 * so photo, name and price read and act as a single unit. Proximity: 16px inside
 * the card against 32px between cards.
 */
export function ProductCard({ card }: { card: ProductCardData }) {
  return (
    <article className="text-center">
      <Link
        href={`/${card.slug}`}
        className="group flex flex-col gap-4 rounded-lg focus-visible:outline-offset-4"
      >
        <div className="relative aspect-[296/364.8] w-full">
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            sizes="(min-width: 1101px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-md font-semibold underline-offset-4 group-hover:underline">{card.name}</h3>
            <p className="text-sm">{card.description}</p>
          </div>
          <p className="text-lg font-semibold">{card.price}</p>
        </div>
      </Link>
    </article>
  );
}
