import Image from "next/image";
import type { Model } from "@/data/types";

export function ProductCard({ model }: { model: Model }) {
  return (
    <article className="flex flex-col gap-4 text-center">
      <div className="relative aspect-[296/364.8] w-full">
        <Image
          src={model.image.src}
          alt={model.image.alt}
          fill
          sizes="(min-width: 1101px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-md font-semibold">{model.name}</h3>
          <p className="text-sm">{model.card.description}</p>
        </div>
        <p className="text-lg font-semibold">{model.card.price}</p>
      </div>
    </article>
  );
}
