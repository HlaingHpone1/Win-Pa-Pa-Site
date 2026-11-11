import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { sectorIds, testimonials } from "@/content/clients";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Clients");

  return {
    title: t("eyebrow"),
    description: t("lead"),
  };
}

export default async function ClientsPage() {
  const t = await getTranslations("Clients");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        image="/hero/clients-group.jpg"
        imageAlt={t("bannerAlt")}
      />

      <section className="section-y bg-white">
        <Container>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sectorIds.map((sector, index) => (
              <li
                key={sector}
                className="group flex min-h-32 flex-col justify-between rounded-brand border border-hairline bg-paper p-6 transition-colors duration-300 ease-out hover:border-primary hover:bg-primary"
              >
                <span className="text-eyebrow text-primary-ink transition-colors duration-300 ease-out group-hover:text-ink/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-subtitle mt-6 text-ink">{t(`sectors.${sector}`)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-y">
        <Container className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => {
            const featured = index === 0;
            return (
              <figure
                key={item.id}
                className={`flex flex-col rounded-brand p-8 ${
                  featured
                    ? "grain relative overflow-hidden bg-ink"
                    : "border border-hairline bg-white"
                }`}
              >
                <p
                  aria-hidden
                  className={`text-display leading-none! ${featured ? "text-primary" : "text-primary/40"}`}
                >
                  “
                </p>
                <blockquote
                  className={`text-lead mt-2 flex-1 ${featured ? "text-white" : "text-ink"}`}
                >
                  {t(`testimonials.${item.id}`)}
                </blockquote>
                <figcaption
                  className={`text-eyebrow mt-8 ${featured ? "text-primary" : "text-primary-ink"}`}
                >
                  {t(`sectors.${item.sector}`)}
                </figcaption>
              </figure>
            );
          })}
        </Container>
      </section>
    </>
  );
}
