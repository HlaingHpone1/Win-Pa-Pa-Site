import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { company } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact");

  return {
    title: t("eyebrow"),
    description: t("lead"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        image="/hero/contact.jpg"
        imageAlt={t("bannerAlt")}
      />

      <section className="section-y">
        <Container className="grid items-start gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grain relative overflow-hidden rounded-brand bg-ink p-6 sm:p-8 lg:sticky lg:top-28">
            <p className="text-eyebrow flex items-center gap-2 text-primary">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("press")}
            </p>
            <ul className="mt-8 space-y-6">
              <li>
                <Detail icon={<LocationIcon />} label={tCommon("location")}>
                  <address className="not-italic text-base leading-7 text-white/75">
                    {(tCommon.raw("address") as string[]).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </Detail>
              </li>
              <li>
                <Detail icon={<TimeIcon />} label={tCommon("hoursLabel")}>
                  <p className="text-base leading-7 text-white/75">{tCommon("hours")}</p>
                </Detail>
              </li>
              <li>
                <Detail icon={<PhoneIcon />} label={tCommon("phone")}>
                  <ul className="space-y-1">
                    {company.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replaceAll("-", "")}`}
                          className="font-display text-base font-semibold text-white transition-colors duration-300 ease-out hover:text-primary sm:text-lg"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Detail>
              </li>
              <li>
                <Detail icon={<EmailIcon />} label={tCommon("email")}>
                  <a
                    href={`mailto:${company.email}`}
                    className="break-all text-white transition-colors duration-300 ease-out hover:text-primary"
                  >
                    {company.email}
                  </a>
                </Detail>
              </li>
            </ul>
          </div>
          <div id="quote" className="scroll-mt-24">
            <QuoteForm />
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="overflow-hidden rounded-brand border border-hairline">
            <iframe
              title={tCommon("mapIframeTitle", { name: company.fullName })}
              src={company.mapEmbedSrc}
              width="600"
              height="450"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="block h-[26rem] w-full border-0 sm:h-[32rem]"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand border border-white/10 bg-white/5 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-eyebrow text-white/50">
          {label}
        </p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 6.2V10l2.6 2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="5" width="14" height="10.4" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 6.4 10 11l6-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
