import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary" | "secondary-on-surface" | "link";

const base =
  "inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer " +
  "transition-[color,background-color,border-color,box-shadow] duration-330 ease-tesla " +
  "shadow-[inset_0_0_0_0_transparent] focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_currentColor]";

const variants: Record<Variant, string> = {
  primary: "border border-accent bg-accent text-white hover:border-accent-hover hover:bg-accent-hover",
  secondary: "border border-transparent bg-surface text-body hover:bg-surface-hover hover:text-ink",
  // On a surface card the secondary button drops back to the canvas colour.
  "secondary-on-surface": "border border-transparent bg-canvas text-body hover:bg-surface-hover hover:text-ink",
  link: "gap-2 hover:underline",
};

type ButtonStyle = {
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
};

function buttonClass({ variant = "primary", size = "md", className }: Omit<ButtonStyle, "children">) {
  const padding = variant === "link" ? "" : size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5";
  return cx(base, variants[variant], padding, className);
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonStyle & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...rest
}: ButtonStyle & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

export function Actions({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("flex flex-wrap gap-4", className)}>{children}</div>;
}
