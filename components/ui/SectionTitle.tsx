import type { ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { cx } from "@/lib/cx";

type SectionTitleProps = {
  title: string;
  tagline?: string;
  description?: string;
  as?: "h1" | "h2";
  /** White text over a photo. */
  inverse?: boolean;
  className?: string;
};

/**
 * Tagline, heading and description arrive one after another as the block scrolls
 * in. The page's h1 also gets the word-by-word blur-in.
 */
export function SectionTitle({
  title,
  tagline,
  description,
  as: Heading = "h2",
  inverse = false,
  className,
}: SectionTitleProps) {
  const isH1 = Heading === "h1";
  const heading: ReactNode = (
    <Heading className={isH1 ? "text-h1" : "text-h2"}>
      {isH1 ? <TextReveal text={title} delay={0.15} /> : title}
    </Heading>
  );

  return (
    <Stagger className={cx("flex w-full max-w-title flex-col gap-4 text-center", className)}>
      {tagline && (
        <StaggerItem>
          <p className="font-semibold leading-normal">
            <ScrambleText text={tagline} />
          </p>
        </StaggerItem>
      )}
      {description ? (
        <div className="flex flex-col gap-6">
          {isH1 ? heading : <StaggerItem>{heading}</StaggerItem>}
          <StaggerItem>
            <p className={cx("text-md", inverse ? "text-white" : "text-body")}>{description}</p>
          </StaggerItem>
        </div>
      ) : isH1 ? (
        heading
      ) : (
        <StaggerItem>{heading}</StaggerItem>
      )}
    </Stagger>
  );
}
