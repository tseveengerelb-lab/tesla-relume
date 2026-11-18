"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";

type NavLink = { href: string; label: string };

export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Автомашинууд"
      className="order-3 flex w-full items-center justify-between md:order-none md:w-auto md:justify-start"
    >
      {links.map(({ href, label }) => {
        const current = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={current ? "page" : undefined}
            className={cx(
              "whitespace-nowrap rounded px-1.5 py-1 transition-colors duration-330 ease-tesla hover:bg-ink/5 md:px-4",
              current && "bg-ink/5",
            )}
          >
            {label}
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
