import Image from "next/image";
import type { ProductCardData } from "@/data/types";

export function ProductCard({ card }: { card: ProductCardData }) {
  return (
    <article className="flex flex-col gap-4 text-center">
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
          <h3 className="text-md font-semibold">{card.name}</h3>
          <p className="text-sm">{card.description}</p>
        </div>
        <p className="text-lg font-semibold">{card.price}</p>
      </div>
    </article>
  );
}
