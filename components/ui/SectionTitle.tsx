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

export function SectionTitle({
  title,
  tagline,
  description,
  as: Heading = "h2",
  inverse = false,
  className,
}: SectionTitleProps) {
  const heading = <Heading className={Heading === "h1" ? "text-h1" : "text-h2"}>{title}</Heading>;

  return (
    <div className={cx("flex w-full max-w-title flex-col gap-4 text-center", className)}>
      {tagline && <p className="font-semibold leading-normal">{tagline}</p>}
      {description ? (
        <div className="flex flex-col gap-6">
          {heading}
          <p className={cx("text-md", inverse ? "text-white" : "text-body")}>{description}</p>
        </div>
      ) : (
        heading
      )}
    </div>
  );
}
