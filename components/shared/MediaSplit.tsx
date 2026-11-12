import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageRef } from "@/data/types";
import { cx } from "@/lib/cx";

type MediaSplitProps = {
  image: ImageRef;
  /** Image on the right instead of the left (desktop only). */
  reverse?: boolean;
  priority?: boolean;
  children: ReactNode;
};

/** Photo beside a fixed 428px column on desktop; stacked below 1101px. */
export function MediaSplit({ image, reverse = false, priority = false, children }: MediaSplitProps) {
  return (
    <div className={cx("flex w-full flex-col lg:items-stretch", reverse ? "lg:flex-row-reverse" : "lg:flex-row")}>
      <div className="relative aspect-[3/2] flex-none lg:aspect-auto lg:min-h-[568px] lg:min-w-px lg:flex-[1_0_0]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1101px) 60vw, 100vw"
          className="rounded-lg object-cover"
        />
      </div>
      {children}
    </div>
  );
}
