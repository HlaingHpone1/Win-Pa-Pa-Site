import Image from "next/image";
import { Container } from "@/components/container";

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="grain relative -mt-[4.75rem] overflow-hidden bg-ink pt-[4.75rem]">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl"
      />
      <Container
        className={`relative grid items-center gap-12 py-16 sm:py-20 ${
          image ? "lg:grid-cols-[1.1fr_0.9fr]" : ""
        }`}
      >
        <div>
          <p className="text-eyebrow inline-flex items-center gap-2 rounded-brand border border-primary/30 bg-primary/10 px-3 py-2 text-primary">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
          <h1 className="text-heading mt-6 max-w-3xl text-white">{title}</h1>
          <p className="text-lead mt-6 max-w-2xl text-white/70">{lead}</p>
        </div>
        {image ? (
          <div className="reg-marks relative mx-2.5 sm:mx-0">
            <div className="relative aspect-video overflow-hidden rounded-brand border border-white/10">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
