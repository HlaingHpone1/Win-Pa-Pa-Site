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
  const banner = Boolean(image);

  return (
    <section
      className={
        banner
          ? "relative isolate min-h-[22rem] overflow-hidden sm:min-h-[28rem]"
          : "border-b border-hairline bg-white"
      }
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/20"
          />
        </>
      ) : null}
      <Container
        className={
          banner
            ? "relative z-10 flex min-h-[22rem] flex-col justify-center py-16 sm:min-h-[28rem] sm:py-20"
            : "py-16 sm:py-20"
        }
      >
        <p className="text-xs font-medium tracking-[0.18em] text-primary-dark uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-semibold sm:text-5xl md:text-6xl [html[lang=my]_&]:leading-[1.45]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 sm:text-lg">{lead}</p>
      </Container>
    </section>
  );
}
