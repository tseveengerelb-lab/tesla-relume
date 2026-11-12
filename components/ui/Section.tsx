import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

const paddings = {
  default: "py-section",
  /** Stats rows sit directly under the model hero. */
  tight: "py-0",
  modelHero: "pt-6 pb-section md:pt-16",
  /** The Figma frame keeps a 29px empty title above its 80px gap. */
  features: "pb-section pt-section md:pt-[calc(var(--spacing-section)+109px)]",
};

type SectionProps = ComponentProps<"section"> & {
  padding?: keyof typeof paddings;
};

/** Page section with side padding and the centred 1280px column. */
export function Section({ padding = "default", className, children, ...rest }: SectionProps) {
  return (
    <section className={cx("overflow-clip bg-canvas px-page", paddings[padding], className)} {...rest}>
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-20">{children}</div>
    </section>
  );
}
