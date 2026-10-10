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
              className={`group relative inline-flex min-h-11 items-center text-sm tracking-wide transition-colors duration-300 ease-out ${
                active
                  ? "font-medium text-ink"
                  : "text-slate hover:text-ink"
              } whitespace-nowrap ${linkClassName}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="relative">
                {t(item.key)}
                <span
                  aria-hidden
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none ${
                    active ? "w-6 group-hover:w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
