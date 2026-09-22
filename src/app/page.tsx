import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { CountUpStats } from "@/components/count-up-stats";
import { HeroSlider } from "@/components/hero-slider";
import { ProductCard } from "@/components/product-card";
import { featuredProducts } from "@/content/products";
import { homeServices, homeStats } from "@/content/site";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <HeroSlider>
        <Container>
          <p className="text-xs font-medium tracking-[0.18em] text-primary-dark uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 max-w-xl whitespace-pre-line text-5xl leading-[0.95] font-semibold sm:text-6xl md:text-7xl [html[lang=my]_&]:leading-[1.5]!">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 sm:text-lg">
            {t("lead")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">{t("primaryCta")}</Button>
            <Button href="/products" variant="secondary">
              {t("secondaryCta")}
            </Button>
          </div>
        </Container>
      </HeroSlider>

      <section className="border-b border-hairline bg-white">
        <Container className="grid gap-6 py-16 sm:grid-cols-2">
          {homeServices.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group overflow-hidden rounded-3xl border border-hairline bg-paper transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_40px_-24px_rgba(17,24,39,0.35)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <Image
                  src={service.image}
                  alt={t(`services.${service.id}.imageAlt`)}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-8">
                <p className="font-display text-sm font-semibold text-primary-dark">
                  {service.index}
                </p>
                <h2 className="mt-6 text-3xl font-semibold">
                  {t(`services.${service.id}.title`)}
                </h2>
                <p className="mt-3 text-sm leading-6">
                  {t(`services.${service.id}.body`)}
                </p>
                <p className="mt-8 text-sm font-medium text-ink transition-colors duration-300 ease-out group-hover:text-primary-dark">
                  {tCommon("viewProducts")}
                </p>
              </div>
            </Link>
          ))}
        </Container>
      </section>

      <section className="bg-primary text-white">
        <Container>
          <CountUpStats
            stats={homeStats.map((stat) => ({
              ...stat,
              label: t(`stats.${stat.id}`),
            }))}
          />
        </Container>
      </section>

      <section className="border-b border-hairline bg-white">
        <Container className="py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                {t("featuredHeading")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6">
                {t("featuredKicker")}
              </p>
            </div>
            <Button href="/products" variant="ghost">
              {tCommon("allProducts")}
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col items-start gap-6 py-20 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-3 text-base leading-7">{t("ctaBody")}</p>
          </div>
          <Button href="/contact">{tCommon("cta")}</Button>
        </Container>
      </section>
    </>
  );
}
