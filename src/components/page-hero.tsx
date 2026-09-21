import { Container } from "@/components/container";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="border-b border-hairline bg-white">
      <Container className="py-16 sm:py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-primary-dark uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-semibold sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 sm:text-lg">{lead}</p>
      </Container>
    </section>
  );
}
