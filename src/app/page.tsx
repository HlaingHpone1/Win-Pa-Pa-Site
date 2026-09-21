import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ProductCard } from "@/components/product-card";
import { featuredProducts } from "@/content/products";
import { company, home } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden border-b border-hairline">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-primary-dark uppercase">
              {home.eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl text-5xl leading-[0.95] font-semibold sm:text-6xl md:text-7xl">
              Print.
              <br />
              Bind.
              <br />
              Publish.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 sm:text-lg">{home.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={home.primaryCta.href}>{home.primaryCta.label}</Button>
              <Button href={home.secondaryCta.href} variant="secondary">
                {home.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden
              className="absolute -right-3 -bottom-3 h-full w-full rounded-3xl bg-primary"
            />
            <div className="relative rounded-3xl border border-hairline bg-white p-8">
              <CropMarks />
              <Image
                src="/logo_winpapa.jpg"
                alt={`${company.fullName} logo`}
                width={320}
                height={320}
                className="mx-auto h-auto w-full max-w-[240px] rounded-2xl object-cover"
                priority
              />
              <p className="mt-6 text-center font-display text-sm font-semibold tracking-[0.2em] text-ink uppercase">
                {company.fullName}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline bg-white">
        <Container className="grid gap-6 py-16 sm:grid-cols-2">
          {home.services.map((service) => (
            <Link
              key={service.index}
              href={service.href}
              className="group rounded-3xl border border-hairline bg-paper p-8 transition-colors hover:border-primary"
            >
              <p className="font-display text-sm font-semibold text-primary-dark">
                {service.index}
              </p>
              <h2 className="mt-8 text-3xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-sm leading-6">{service.body}</p>
              <p className="mt-8 text-sm font-medium text-ink group-hover:text-primary-dark">
                View products →
              </p>
            </Link>
          ))}
        </Container>
      </section>

      <section className="border-b border-hairline">
        <Container className="grid gap-8 py-10 sm:grid-cols-3">
          {home.stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-b border-hairline bg-white">
        <Container className="py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">{home.featuredHeading}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6">{home.featuredKicker}</p>
            </div>
            <Button href="/products" variant="ghost">
              All products →
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
            <h2 className="text-3xl font-semibold sm:text-4xl">{home.ctaTitle}</h2>
            <p className="mt-3 text-base leading-7">{home.ctaBody}</p>
          </div>
          <Button href="/contact">{company.cta}</Button>
        </Container>
      </section>
    </>
  );
}

function CropMarks() {
  return (
    <>
      <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-ink/30" />
      <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-ink/30" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-ink/30" />
      <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-ink/30" />
    </>
  );
}
