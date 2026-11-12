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
