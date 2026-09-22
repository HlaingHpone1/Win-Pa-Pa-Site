import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { company, nav } from "@/content/site";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tCommon = await getTranslations("Common");

  return (
    <footer className="mt-auto bg-primary text-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 text-white transition-opacity duration-300 ease-out hover:opacity-80">
            <Image
              src="/logo_winpapa.jpg"
              alt={tCommon("logoAlt", { name: company.fullName })}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="font-display text-lg font-semibold tracking-tight">
              {company.fullName}
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-6 text-white/90">{tCommon("description")}</p>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-semibold text-white">{t("pages")}</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/90 transition-colors duration-300 ease-out hover:text-white"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-semibold text-white">{t("press")}</p>
          <ul className="mt-4 space-y-4">
            <li>
              <FooterLine icon={<LocationIcon />} label={tCommon("location")}>
                <address className="not-italic text-sm leading-6">
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
                <p className="text-sm leading-6">{tCommon("hours")}</p>
              </FooterLine>
            </li>
            <li>
              <FooterLine icon={<PhoneIcon />} label={tCommon("phone")}>
                <ul className="space-y-1">
                  {company.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replaceAll("-", "")}`}
                        className="text-sm text-white transition-opacity duration-300 ease-out hover:opacity-80"
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
                  className="break-all text-sm text-white transition-opacity duration-300 ease-out hover:opacity-80"
                >
                  {company.email}
                </a>
              </FooterLine>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/20">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/85 sm:flex-row sm:items-center sm:justify-between">
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
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/15 text-white">
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
