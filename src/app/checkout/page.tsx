import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Checkout");

  return {
    title: t("eyebrow"),
    robots: { index: false },
  };
}

export default async function CheckoutPage() {
  const t = await getTranslations("Checkout");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <section className="section-y">
        <Container>
          <CheckoutForm />
        </Container>
      </section>
    </>
  );
}
