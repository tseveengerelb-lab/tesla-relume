import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageRef } from "@/data/types";
import { cx } from "@/lib/cx";
import { ImageReveal } from "@/components/motion/ImageReveal";

type MediaSplitProps = {
  image: ImageRef;
  /** Image on the right instead of the left (desktop only). */
  reverse?: boolean;
  priority?: boolean;
  children: ReactNode;
};

/** Photo beside a fixed 428px column on desktop; stacked below 1101px. */
export function MediaSplit({ image, reverse = false, priority = false, children }: MediaSplitProps) {
  const frame = "relative aspect-[3/2] flex-none lg:aspect-auto lg:min-h-[568px] lg:min-w-px lg:flex-[1_0_0]";
  const photo = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      sizes="(min-width: 1101px) 60vw, 100vw"
      className="rounded-lg object-cover"
    />
  );
  return (
    <div className={cx("flex w-full flex-col lg:items-stretch", reverse ? "lg:flex-row-reverse" : "lg:flex-row")}>
      {priority ? (
        // The page's main photo shows at once: hiding it would delay the largest paint.
        <div className={frame}>{photo}</div>
      ) : (
        <ImageReveal className={frame}>{photo}</ImageReveal>
      )}
      {children}
    </div>
  );
}
