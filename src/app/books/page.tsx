import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { BookCatalog } from "@/components/books/book-catalog";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Books");

  return {
    title: t("eyebrow"),
    description: t("lead"),
  };
}

export default async function BooksPage() {
  const t = await getTranslations("Books");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        image="/hero/books.jpg"
        imageAlt={t("bannerAlt")}
      />

      <section className="section-y">
        <Container>
          <BookCatalog />
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="grain reg-marks relative mx-2.5 overflow-hidden rounded-brand bg-ink px-6 py-14 sm:mx-0 sm:px-14 sm:py-16">
            <div
              aria-hidden
              className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <SectionHeading tone="dark" title={t("bulkTitle")} lead={t("bulkBody")} />
              <Button href="/contact#quote" arrow>
                {tCommon("cta")}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
