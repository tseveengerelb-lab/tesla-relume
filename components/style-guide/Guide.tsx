import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export const guideSections = [
  { id: "brand", title: "Брэнд" },
  { id: "colors", title: "Өнгө" },
  { id: "typography", title: "Типографи" },
  { id: "layout", title: "Зай ба layout" },
  { id: "shape", title: "Хэлбэр ба хөдөлгөөн" },
  { id: "buttons", title: "Товч" },
  { id: "forms", title: "Форм" },
  { id: "icons", title: "Дүрс" },
  { id: "components", title: "Компонент" },
  { id: "imagery", title: "Зураг" },
] as const;

type SectionId = (typeof guideSections)[number]["id"];

const number = (id: SectionId) => String(guideSections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px] leading-normal text-body">{children}</code>
  );
}

export function GuideSection({
  id,
  description,
  children,
}: {
  id: SectionId;
  description: string;
  children: ReactNode;
}) {
  const title = guideSections.find((s) => s.id === id)?.title;
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-16 first:border-t-0 first:pt-0">
      <p className="text-sm font-medium tabular-nums text-muted">{number(id)}</p>
      <h2 className="mt-2 text-h5">{title}</h2>
      <p className="mt-3 max-w-[640px] text-base text-body">{description}</p>
      <div className="mt-10 flex flex-col gap-12">{children}</div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="mb-4 text-md font-semibold">{children}</h3>;
}

/** Framed live example with a caption underneath. */
export function Specimen({
  caption,
  code,
  tone = "white",
  flush = false,
  className,
  children,
}: {
  caption?: string;
  code?: string;
  tone?: "white" | "surface" | "dark";
  /** No inner padding, for full-bleed examples. */
  flush?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    white: "border border-line bg-white",
    surface: "bg-surface",
    dark: "bg-ink text-white",
  };
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <div className={cx("rounded-lg", !flush && "p-6 md:p-8", tones[tone], className)}>{children}</div>
      {(caption || code) && (
        <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-body">
          {caption && <span>{caption}</span>}
          {code && <Code>{code}</Code>}
        </figcaption>
      )}
    </figure>
  );
}

/** Bulleted guidance in Tesla's plain, short style. */
export function Rules({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
      {items.map((item) => (
        <li key={item} className="bg-white p-6 text-base text-body">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SideNav() {
  return (
    <nav aria-label="Загварын заавар" className="sticky top-28">
      <ol className="flex flex-col gap-1 border-l border-line">
        {guideSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-body transition-colors duration-330 ease-tesla hover:border-ink hover:text-ink"
            >
              <span className="tabular-nums text-muted">{number(s.id)}</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ChipNav() {
  return (
    <nav aria-label="Загварын заавар" className="-mx-page overflow-x-auto px-page">
      <ol className="flex w-max gap-2">
        {guideSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block whitespace-nowrap rounded bg-surface px-3 py-1.5 text-sm text-body transition-colors duration-330 ease-tesla hover:bg-surface-hover hover:text-ink"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
