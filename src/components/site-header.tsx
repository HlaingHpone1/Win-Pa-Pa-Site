import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { CartButton } from "@/components/cart/cart-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { company } from "@/content/site";

export async function SiteHeader() {
  const t = await getTranslations("Common");

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 rounded-brand border border-white/10 bg-ink/80 pr-2 pl-2 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:pl-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-white transition-opacity duration-300 ease-out hover:opacity-85"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-brand bg-white">
            <Image
              src="/logo_winpapa.jpg"
              alt={t("logoAlt", { name: company.fullName })}
              width={44}
              height={44}
              className="h-11 w-11 object-cover"
              priority
            />
          </span>
          <span className="font-display text-base leading-tight font-semibold tracking-tight whitespace-nowrap">
            {company.name}
            <span className="hidden font-sans text-xs font-normal tracking-wide text-white/60 sm:block xl:hidden">
              {t("shortTag")}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <NavLinks className="flex items-center" linkClassName="px-2.5" />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <LanguageSwitcher />
          </div>
          <CartButton />
          <div className="hidden sm:block">
            <Button href="/contact#quote" arrow>
              {t("cta")}
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
