"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cx } from "@/lib/cx";

type NavLink = { href: string; label: string };

/**
 * Morphing tabs: one highlight sits behind the current page's link and slides to
 * whichever link the pointer is over (shared layout, layoutId), then glides back
 * when the pointer leaves. One moving shape reads as "you are here / you could
 * go here" better than separate boxes blinking on and off.
 */
export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? links.find((link) => link.href === pathname)?.href ?? null;

  return (
    <nav
      aria-label="Автомашинууд"
      className="order-3 flex w-full items-center justify-between md:order-none md:w-auto md:justify-start"
      onPointerLeave={() => setHovered(null)}
    >
      {links.map(({ href, label }) => {
        const current = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={current ? "page" : undefined}
            onPointerEnter={() => setHovered(href)}
            onFocus={() => setHovered(href)}
            onBlur={() => setHovered(null)}
            className={cx(
              "relative whitespace-nowrap rounded px-1.5 py-1 transition-colors duration-330 ease-tesla md:px-4",
              current || hovered === href ? "text-ink" : "text-ink/85",
            )}
          >
            <AnimatePresence>
              {active === href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded bg-ink/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </AnimatePresence>
            <span className="relative">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Order button for the navbar. Pages with an order form scroll to it; other pages
 * (success, admin, style guide) go to the home page's form.
 */
export function NavOrderLink({ formPaths }: { formPaths: string[] }) {
  const pathname = usePathname();
  const href = formPaths.includes(pathname) ? "#order" : "/#order";

  return (
    <Link
      href={href}
      className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-lg bg-accent px-3.5 text-sm font-medium text-white transition-colors duration-330 ease-tesla hover:bg-accent-hover"
    >
      Захиалах
    </Link>
  );
}
