import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { about } from "@/content/site";

export const metadata: Metadata = {
  title: "About us",
  description: about.lead,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} lead={about.lead} />

      <section className="border-b border-hairline bg-white">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-3xl border border-hairline bg-paper p-6 sm:p-8">
            <div className="flex items-center gap-5 lg:flex-col lg:items-stretch">
              <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-hairline bg-white lg:aspect-[4/5] lg:h-auto lg:w-full">
                <p className="font-display text-3xl font-semibold tracking-tight text-ink lg:text-6xl">
                  WP
                </p>
                <p className="mt-2 hidden rounded-full bg-primary px-3 py-1 text-xs font-medium tracking-wide text-ink lg:mt-4 lg:inline-block">
                  Est. {about.founded}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{about.founder.name}</h2>
                <p className="mt-1 text-sm">{about.founder.role}</p>
                <p className="mt-3 text-xs font-medium tracking-[0.16em] text-primary-dark uppercase">
                  {about.founder.since}
                </p>
              </div>
            </div>
          </article>

          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-primary-dark uppercase">
              {about.founder.welcomeEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              {about.founder.welcomeTitle}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7">
              {about.founder.welcome.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 font-display text-4xl font-semibold text-ink">
              {about.experience}
              <span className="ml-2 text-lg font-medium text-slate">
                {about.experienceLabel}
              </span>
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline">
        <Container className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl">{about.storyTitle}</h2>
          <div className="space-y-5 text-base leading-7">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline bg-white">
        <Container className="py-16">
          <h2 className="text-3xl font-semibold sm:text-4xl">{about.purposeTitle}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-hairline bg-paper p-8">
              <p className="font-display text-sm font-semibold text-primary-dark">01</p>
              <h3 className="mt-4 text-2xl font-semibold">{about.mission.title}</h3>
              <p className="mt-4 text-sm leading-7">{about.mission.body}</p>
            </article>
            <article className="rounded-2xl border border-hairline bg-paper p-8">
              <p className="font-display text-sm font-semibold text-primary-dark">02</p>
              <h3 className="mt-4 text-2xl font-semibold">{about.vision.title}</h3>
              <p className="mt-4 text-sm leading-7">{about.vision.body}</p>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline">
        <Container className="py-16">
          <h2 className="text-3xl font-semibold sm:text-4xl">{about.valuesTitle}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {about.values.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-hairline bg-white p-6"
              >
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-6">{value.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <h2 className="text-3xl font-semibold sm:text-4xl">{about.processTitle}</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.process.map((item) => (
              <li key={item.step} className="border-t border-primary pt-6">
                <p className="font-display text-sm font-semibold text-primary-dark">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
