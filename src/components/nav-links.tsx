"use client";

import Link from "next/link";
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

  return (
    <ul className={className}>
      {nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`relative inline-flex min-h-11 items-center text-sm tracking-wide transition-colors ${
                active
                  ? "font-medium text-ink"
                  : "text-slate hover:text-ink"
              } whitespace-nowrap ${linkClassName}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
              {active ? (
                <span
                  aria-hidden
                  className="absolute bottom-2 left-0 h-0.5 w-6 rounded-full bg-primary"
                />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
