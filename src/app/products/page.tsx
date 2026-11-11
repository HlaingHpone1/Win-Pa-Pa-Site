import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { productGroupIds, products } from "@/content/products";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Products");

  return {
    title: t("eyebrow"),
    description: t("lead"),
  };
}

export default async function ProductsPage() {
  const t = await getTranslations("Products");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        image="/hero/products.jpg"
        imageAlt={t("bannerAlt")}
      />

      <div className="sticky top-[5.5rem] z-40 -mt-7 mb-0">
        <Container>
          <nav
            aria-label={t("eyebrow")}
            className="inline-flex gap-1 rounded-brand border border-hairline bg-white/90 p-1.5 shadow-[0_12px_32px_-18px_rgba(14,17,11,0.4)] backdrop-blur-md"
          >
            {productGroupIds.map((groupId, index) => (
              <a
                key={groupId}
                href={`#${groupId}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-brand px-4 text-sm font-semibold text-ink transition-colors duration-300 ease-out hover:bg-primary"
              >
                <span className="text-eyebrow text-primary-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {t(`groups.${groupId}.title`)}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {productGroupIds.map((groupId, index) => (
        <section
          key={groupId}
          id={groupId}
          className="section-y scroll-mt-28 even:bg-white"
        >
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="text-display leading-none! text-transparent [-webkit-text-stroke:1.5px_var(--primary)]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <SectionHeading
                  title={t(`groups.${groupId}.title`)}
                  lead={t(`groups.${groupId}.intro`)}
                />
              </div>
              <Button href="/contact#quote" variant="secondary" arrow>
                {tCommon("cta")}
              </Button>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((product) => product.kind === groupId)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
