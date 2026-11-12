import Image from "next/image";
import Link from "next/link";
import { models } from "@/data/models";
import { ButtonLink } from "@/components/ui/Button";
import { NavLinks } from "./NavLinks";

const links = models.map((model) => ({ href: `/${model.slug}`, label: model.name }));

export function Navbar() {
  return (
    <header className="navbar-frost sticky top-0 z-10 flex min-h-[72px] items-center px-page py-3 md:py-0">
      <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 md:flex-nowrap md:gap-8">
        <div className="flex min-w-px flex-[1_0_0] items-center">
          <Link href="/">
            {/* The SVG fills with currentColor, which renders black inside <img>. */}
            <Image
              src="/icons/tesla-logo.svg"
              alt="Tesla"
              width={156}
              height={16}
              unoptimized
              priority
              className="h-4 w-[156px] brightness-0"
            />
          </Link>
        </div>
        <NavLinks links={links} />
        <div className="flex min-w-px flex-[1_0_0] items-center justify-end">
          <ButtonLink href="#" size="sm">
            нэвтрэх
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
