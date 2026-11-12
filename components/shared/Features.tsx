import Image from "next/image";
import { features } from "@/data/content";
import type { Feature } from "@/data/types";

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="w-full overflow-hidden rounded-lg bg-surface lg:min-w-px lg:flex-[1_0_0]">
      <div className="relative aspect-[405.33/270] w-full">
        <Image
          src={feature.image.src}
          alt={feature.image.alt}
          fill
          sizes="(min-width: 1101px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <h3 className="text-h5">{feature.title}</h3>
        <p className="text-base text-body">{feature.description}</p>
      </div>
    </article>
  );
}

export function FeatureList() {
  return (
    <div className="flex w-full flex-col items-start gap-8 lg:flex-row">
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </div>
  );
}
