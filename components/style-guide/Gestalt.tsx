import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/*
 * Small abstract diagrams for the Gestalt section of /style-guide.
 * Each one shows the law with dots alone, before the live example shows it in
 * the site's real components.
 */

function Dot({ className }: { className?: string }) {
  // The fill comes from className when given, so two bg-* classes never compete.
  return <span className={cx("block size-4 flex-none rounded-full", className ?? "bg-ink")} />;
}

function Canvas({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden className="flex h-36 items-center justify-center rounded-lg bg-surface">
      {children}
    </div>
  );
}

/** Two clusters: 8px apart inside, 48px between. */
export function ProximityDiagram() {
  return (
    <Canvas>
      <div className="flex gap-12">
        {[0, 1].map((group) => (
          <div key={group} className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }, (_, i) => (
              <Dot key={i} />
            ))}
          </div>
        ))}
      </div>
    </Canvas>
  );
}

/** Evenly spaced dots; a white region pulls three of them together. */
export function CommonRegionDiagram() {
  return (
    <Canvas>
      <div className="flex items-center gap-4">
        <Dot />
        <div className="-mx-2 flex gap-4 rounded-lg bg-white p-2 outline outline-line">
          <Dot />
          <Dot />
          <Dot />
        </div>
        <Dot />
      </div>
    </Canvas>
  );
}

/** Same spacing everywhere; colour alone sorts the columns. */
export function SimilarityDiagram() {
  return (
    <Canvas>
      <div className="grid grid-cols-6 gap-4">
        {Array.from({ length: 18 }, (_, i) => (
          <Dot key={i} className={i % 2 === 0 ? "bg-accent" : "border-2 border-ink"} />
        ))}
      </div>
    </Canvas>
  );
}

/** Even row of dots; a line binds pairs more strongly than spacing could. */
export function ConnectednessDiagram() {
  return (
    <Canvas>
      <div className="flex items-center gap-4">
        {[0, 1, 2].map((pair) => (
          <div key={pair} className="relative flex gap-4">
            <span className="absolute top-1/2 right-2 left-2 h-0.5 -translate-y-1/2 bg-ink" />
            <Dot className="relative bg-ink" />
            <Dot className="relative bg-ink" />
          </div>
        ))}
      </div>
    </Canvas>
  );
}

/** Read as a circle over a square, not one complex outline. */
export function PragnanzDiagram() {
  return (
    <Canvas>
      <div className="relative size-24">
        <span className="absolute top-0 left-0 size-16 border-2 border-ink" />
        <span className="absolute right-0 bottom-0 size-16 rounded-full border-2 border-ink" />
      </div>
    </Canvas>
  );
}

/** One law: diagram, definition and how the site uses it, beside a live example. */
export function GestaltLaw({
  name,
  title,
  definition,
  diagram,
  usage,
  children,
}: {
  name: string;
  title: string;
  definition: string;
  diagram: ReactNode;
  usage: string[];
  children: ReactNode;
}) {
  return (
    <article className="grid gap-8 border-t border-line pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="flex flex-col gap-6">
        {diagram}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-body">{name}</p>
          <h3 className="text-h6">{title}</h3>
          <p className="text-base text-body">{definition}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Сайтад</p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-body marker:text-line">
            {usage.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </article>
  );
}
