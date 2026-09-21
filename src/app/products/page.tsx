import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { productGroups, products, productsPage } from "@/content/products";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Products",
  description: productsPage.lead,
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow={productsPage.eyebrow}
        title={productsPage.title}
        lead={productsPage.lead}
      />

      {productGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="scroll-mt-24 border-b border-hairline even:bg-white"
        >
          <Container className="py-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">{group.title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6">{group.intro}</p>
              </div>
              <Button href="/contact" variant="secondary">
                {company.cta}
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((product) => product.kind === group.id)
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
