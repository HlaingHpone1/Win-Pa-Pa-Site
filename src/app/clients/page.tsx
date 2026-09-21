import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { clientsPage, sectors, testimonials } from "@/content/clients";

export const metadata: Metadata = {
  title: "Our Clients",
  description: clientsPage.lead,
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow={clientsPage.eyebrow}
        title={clientsPage.title}
        lead={clientsPage.lead}
      />

      <section className="border-b border-hairline bg-white">
        <Container className="py-16">
          <ul className="grid border-t border-l border-hairline sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <li
                key={sector}
                className="flex min-h-28 items-center border-r border-b border-hairline p-6"
              >
                <p className="font-display text-xl font-semibold leading-snug">
                  {sector}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="grid gap-8 py-16 lg:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.sector}
              className="rounded-2xl border border-hairline bg-white p-6"
            >
              <p className="font-display text-3xl leading-none text-primary">“</p>
              <p className="mt-2 text-base leading-7 text-ink">{item.quote}</p>
              <footer className="mt-6 text-xs tracking-[0.16em] text-primary-dark uppercase">
                {item.sector}
              </footer>
            </blockquote>
          ))}
        </Container>
      </section>
    </>
  );
}
