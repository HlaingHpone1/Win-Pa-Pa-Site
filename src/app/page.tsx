import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { CountUpStats } from "@/components/count-up-stats";
import { HeroSlider } from "@/components/hero-slider";
import { Marquee } from "@/components/marquee";
import { ProcessSteps } from "@/components/process-steps";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { sectorIds, testimonials } from "@/content/clients";
import { featuredProducts, products } from "@/content/products";
import { aboutMeta, homeServices, homeStats } from "@/content/site";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const tNav = await getTranslations("Nav");
  const tAbout = await getTranslations("About");
  const tProducts = await getTranslations("Products");
  const tClients = await getTranslations("Clients");

  const titleLines = t("title").split("\n");
  const lastLine = titleLines.pop();
  const featuredQuote = testimonials[0];

  return (
    <>
      <HeroSlider>
        <Container>
          <p data-hero className="text-eyebrow inline-flex items-center gap-2 rounded-brand border border-primary/30 bg-primary/10 px-3 py-2 text-primary">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t("eyebrow")}
          </p>
          <h1 className="text-display mt-6 max-w-2xl text-white">
            {titleLines.map((line) => (
              <span key={line} data-hero className="block">
                {line}
              </span>
            ))}
            <span data-hero className="block">
              <span data-hero-mark className="highlight text-white">{lastLine}</span>
            </span>
          </h1>
          <p data-hero className="text-lead mt-6 max-w-xl text-white/75">{t("lead")}</p>
          <div data-hero className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact#quote" arrow>
              {t("primaryCta")}
            </Button>
            <Button href="/products" variant="dark">
              {t("secondaryCta")}
            </Button>
          </div>
          <div data-hero className="mt-12 inline-flex items-center gap-4 rounded-brand border border-white/10 bg-white/5 p-3 pr-5 backdrop-blur-md">
            <span className="text-subtitle flex h-12 min-w-12 items-center justify-center rounded-brand bg-primary px-2 text-ink">
              {aboutMeta.experience}
            </span>
            <span className="text-sm leading-5 text-white/75">
              {tAbout("experienceLabel")}
              <span className="block text-white/50">
                {tAbout("est", { year: aboutMeta.founded })}
              </span>
            </span>
          </div>
        </Container>
      </HeroSlider>

      <Marquee items={products.map((product) => tProducts(`items.${product.id}.name`))} />

      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow={t("servicesEyebrow")}
            title={t("servicesHeading")}
          />
          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-2">
            {homeServices.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-brand bg-ink p-8 sm:min-h-[30rem]"
              >
                <Image
                  src={service.image}
                  alt={t(`services.${service.id}.imageAlt`)}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10"
                />
                <p className="text-eyebrow absolute top-6 left-6 rounded-brand bg-primary px-3 py-2 text-ink">
                  {service.index}
                </p>
                <h3 className="text-title text-white">
                  {t(`services.${service.id}.title`)}
                </h3>
                <p className="text-body mt-3 max-w-md text-white/75">
                  {t(`services.${service.id}.body`)}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
                  {tCommon("viewProducts")}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary">
        <Container>
          <CountUpStats
            stats={homeStats.map((stat) => ({
              ...stat,
              label: t(`stats.${stat.id}`),
            }))}
          />
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={tNav("products")}
              title={t("featuredHeading")}
              lead={t("featuredKicker")}
            />
            <Button href="/products" variant="secondary">
              {tCommon("allProducts")}
            </Button>
          </div>
          <div data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="grain section-y relative overflow-hidden bg-ink">
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow={t("processEyebrow")}
            title={tAbout("processTitle")}
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={tNav("clients")}
              title={tClients("title")}
              lead={tClients("lead")}
            />
            <ul data-reveal-group className="mt-8 flex flex-wrap gap-2">
              {sectorIds.map((sector) => (
                <li
                  key={sector}
                  className="rounded-brand border border-hairline bg-paper px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-300 ease-out hover:border-primary hover:bg-primary-soft"
                >
                  {tClients(`sectors.${sector}`)}
                </li>
              ))}
            </ul>
          </div>
          <figure className="reg-marks relative mx-2.5 rounded-brand bg-primary p-8 sm:p-10">
            <p aria-hidden className="text-display leading-none! text-ink/25">
              “
            </p>
            <blockquote className="text-subtitle mt-2 text-ink">
              {tClients(`testimonials.${featuredQuote.id}`)}
            </blockquote>
            <figcaption className="text-eyebrow mt-8 text-ink/70">
              {tClients(`sectors.${featuredQuote.sector}`)}
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <div className="grain reg-marks relative mx-2.5 overflow-hidden rounded-brand bg-ink px-6 py-14 sm:mx-0 sm:px-14 sm:py-16">
            <div
              aria-hidden
              className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <SectionHeading tone="dark" title={t("ctaTitle")} lead={t("ctaBody")} />
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
