import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
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
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      {productGroupIds.map((groupId) => (
        <section
          key={groupId}
          id={groupId}
          className="scroll-mt-24 border-b border-hairline even:bg-white"
        >
          <Container className="py-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  {t(`groups.${groupId}.title`)}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6">
                  {t(`groups.${groupId}.intro`)}
                </p>
              </div>
              <Button href="/contact" variant="secondary">
                {tCommon("cta")}
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
