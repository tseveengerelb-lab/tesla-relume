import type { ComponentProps, ReactNode } from "react";

const fade = "transition-[border-color] duration-330 ease-tesla";

type Labelled = { id: string; label: string };

/** Underlined text input. */
export function TextField({ id, label, ...input }: ComponentProps<"input"> & Labelled) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        className={`h-12 w-full border-b border-line bg-transparent py-2 outline-none focus:border-ink focus-visible:outline-none ${fade}`}
        {...input}
      />
    </div>
  );
}

/** Tall field with the Figma resize grip; the textarea itself does not resize. */
export function TextAreaField({ id, label, ...textarea }: ComponentProps<"textarea"> & Labelled) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <div className={`relative h-[180px] border-b border-line focus-within:border-ink ${fade}`}>
        <textarea
          id={id}
          name={id}
          className="block h-full w-full resize-none bg-transparent p-3 outline-none placeholder:text-muted focus-visible:outline-none"
          {...textarea}
        />
        {/* Plain <img>: the grip lines are sub-pixel SVGs that next/image cannot size. */}
        <span className="textarea-grip textarea-grip--inner"><img src="/icons/resize-line-1.svg" alt="" /></span>
        <span className="textarea-grip textarea-grip--outer"><img src="/icons/resize-line-2.svg" alt="" /></span>
      </div>
    </div>
  );
}

const checkboxClass = [
  "m-0 size-[18px] flex-none cursor-pointer appearance-none border border-line bg-transparent",
  "bg-size-[14px] bg-center bg-no-repeat",
  "checked:border-accent checked:bg-accent checked:bg-[url(/icons/check.svg)]",
  "transition-[background-color,border-color] duration-330 ease-tesla",
].join(" ");

/** Square checkbox; checked fills with the accent and a white check. */
export function Checkbox({
  id,
  children,
  ...input
}: Omit<ComponentProps<"input">, "type" | "children"> & { id: string; children: ReactNode }) {
  return (
    <div className="flex w-full items-center gap-2 text-sm">
      <input id={id} name={id} type="checkbox" className={checkboxClass} {...input} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

/** Inline text link underlined by an inset shadow that thickens on hover. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="shadow-[inset_0_-1px_0_0_currentColor] transition-shadow duration-330 ease-tesla hover:shadow-[inset_0_-2px_0_0_currentColor]"
    >
      {children}
    </a>
  );
}
