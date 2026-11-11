"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({
  onNavigate,
  className = "",
  linkClassName = "",
}: {
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
}) {
  const pathname = usePathname() ?? "/";
  const t = useTranslations("Nav");

  return (
    <ul className={className}>
      {nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`inline-flex min-h-11 items-center gap-2 rounded-brand text-sm tracking-wide whitespace-nowrap transition-colors duration-300 ease-out ${
                active
                  ? "bg-white/10 font-medium text-white"
                  : "text-white/65 hover:bg-white/5 hover:text-white"
              } ${linkClassName}`}
              aria-current={active ? "page" : undefined}
            >
              <span
                aria-hidden
                className={`h-1.5 w-1.5 shrink-0 rounded-full bg-primary transition-opacity duration-300 ease-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
              {t(item.key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
