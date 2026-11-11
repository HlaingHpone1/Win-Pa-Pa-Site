import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { company, nav } from "@/content/site";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tCommon = await getTranslations("Common");

  return (
    <footer className="grain relative mt-auto overflow-hidden bg-ink text-white">
      <Container className="relative pt-20">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-eyebrow text-primary">{tCommon("cta")}</p>
            <p className="text-heading mt-4 text-white">
              {t("ctaTitle")}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact#quote" arrow>
              {tCommon("cta")}
            </Button>
            <Button href={`tel:${company.phones[0].replaceAll("-", "")}`} variant="dark">
              {company.phones[0]}
            </Button>
          </div>
        </div>
      </Container>
      <Container className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 text-white transition-opacity duration-300 ease-out hover:opacity-85">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-brand bg-white">
              <Image
                src="/logo_winpapa.jpg"
                alt={tCommon("logoAlt", { name: company.fullName })}
                width={44}
                height={44}
                className="h-11 w-11 object-cover"
              />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              {company.fullName}
            </span>
          </Link>
          <p className="text-body max-w-xs text-white/65">{tCommon("description")}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-eyebrow text-primary">{t("pages")}</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 transition-colors duration-300 ease-out hover:text-primary"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-eyebrow text-primary">{t("press")}</p>
          <ul className="mt-4 space-y-4">
            <li>
              <FooterLine icon={<LocationIcon />} label={tCommon("location")}>
                <address className="not-italic text-sm leading-6 text-white/70">
                  {(tCommon.raw("address") as string[]).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </FooterLine>
            </li>
            <li>
              <FooterLine icon={<TimeIcon />} label={tCommon("hoursLabel")}>
                <p className="text-sm leading-6 text-white/70">{tCommon("hours")}</p>
              </FooterLine>
            </li>
            <li>
              <FooterLine icon={<PhoneIcon />} label={tCommon("phone")}>
                <ul className="space-y-1">
                  {company.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replaceAll("-", "")}`}
                        className="text-sm text-white transition-colors duration-300 ease-out hover:text-primary"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </FooterLine>
            </li>
            <li>
              <FooterLine icon={<EmailIcon />} label={tCommon("email")}>
                <a
                  href={`mailto:${company.email}`}
                  className="break-all text-sm text-white transition-colors duration-300 ease-out hover:text-primary"
                >
                  {company.email}
                </a>
              </FooterLine>
            </li>
          </ul>
        </div>
      </Container>
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("copyright", {
              year: new Date().getFullYear(),
              name: company.fullName,
            })}
          </p>
          <p>{t("cityLine")}</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterLine({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-brand border border-white/10 bg-white/5 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="sr-only">{label}</p>
        {children}
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 18s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="10" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function TimeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 6.2V10l2.6 2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5.4 3.8h2.2l1.1 2.8-1.4 1.4a10.5 10.5 0 0 0 5.7 5.7l1.4-1.4 2.8 1.1v2.2c0 .8-.6 1.4-1.4 1.4C8.6 17 3 11.4 3 4.8c0-.8.6-1 1.4-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="5" width="14" height="10.4" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 6.4 10 11l6-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
