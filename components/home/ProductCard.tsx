import Image from "next/image";
import Link from "next/link";
import type { ProductCardData } from "@/data/types";
import { Tilt } from "@/components/motion/Tilt";

/**
 * The whole card is one link to the model page (Gestalt: uniform connectedness),
 * so photo, name and price read and act as a single unit. Proximity: 16px inside
 * the card against 32px between cards. Text is left-aligned on the photo's edge
 * (continuity), which reads faster than centred lines of uneven length.
 */
export function ProductCard({ card }: { card: ProductCardData }) {
  return (
    <Tilt className="h-full">
      <article className="h-full">
        <Link
          href={`/${card.slug}`}
          className="group flex h-full flex-col gap-4 rounded-lg focus-visible:outline-offset-4"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg md:aspect-[296/364.8]">
            <Image
              src={card.image.src}
              alt={card.image.alt}
              fill
              sizes="(min-width: 1101px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-tesla group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h3 className="text-lg font-semibold underline-offset-4 group-hover:underline">{card.name}</h3>
            <p className="text-sm text-body">{card.description}</p>
            {/* mt-auto: prices line up across the row even when descriptions wrap differently. */}
            <p className="mt-auto pt-3 text-md font-semibold">{card.price}</p>
          </div>
        </Link>
      </article>
    </Tilt>
  );
}
