import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { company } from "@/content/site";

export async function SiteHeader() {
  const t = await getTranslations("Common");

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/90 backdrop-blur-md">
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 text-ink transition-opacity duration-300 ease-out hover:opacity-80">
          <Image
            src="/logo_winpapa.jpg"
            alt={t("logoAlt", { name: company.fullName })}
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
            priority
          />
          <span className="font-display text-base font-semibold tracking-tight">
            {company.name}
            <span className="hidden font-sans text-xs font-normal tracking-wide text-slate sm:block">
              {t("shortTag")}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks className="flex items-center gap-7" />
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button href="/contact">{t("cta")}</Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
