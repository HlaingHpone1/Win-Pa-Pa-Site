import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { aboutMeta, aboutProcess, aboutValues } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About");

  return {
    title: t("eyebrow"),
    description: t("lead"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");
  const story = t.raw("story") as string[];
  const welcome = t.raw("founder.welcome") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        image="/hero/about-team-smile.jpg"
        imageAlt={t("bannerAlt")}
      />

      <section className="border-b border-hairline bg-white">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-3xl border border-hairline bg-paper p-6 sm:p-8">
            <div className="flex items-center gap-5 lg:flex-col lg:items-stretch">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-hairline bg-white lg:aspect-[4/5] lg:h-auto lg:w-full">
                <Image
                  src="/about/founder.jpg"
                  alt={t("founder.imageAlt")}
                  fill
                  sizes="(min-width: 1024px) 36vw, 96px"
                  className="object-cover object-[center_20%]"
                />
                <p className="absolute bottom-4 left-4 hidden rounded-full bg-primary px-3 py-1 text-xs font-medium tracking-wide text-ink lg:inline-block">
                  {t("est", { year: aboutMeta.founded })}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{t("founder.name")}</h2>
                <p className="mt-1 text-sm">{t("founder.role")}</p>
                <p className="mt-3 text-xs font-medium tracking-[0.16em] text-primary-dark uppercase">
                  {t("founder.since")}
                </p>
              </div>
            </div>
          </article>

          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-primary-dark uppercase">
              {t("founder.welcomeEyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              {t("founder.welcomeTitle")}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7">
              {welcome.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 font-display text-4xl font-semibold text-ink">
              {aboutMeta.experience}
              <span className="ml-2 text-lg font-medium text-slate">
                {t("experienceLabel")}
              </span>
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline">
        <Container className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("storyTitle")}</h2>
          <div className="space-y-5 text-base leading-7">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline bg-white">
        <Container className="py-16">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("purposeTitle")}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-hairline bg-paper p-8">
              <p className="font-display text-sm font-semibold text-primary-dark">01</p>
              <h3 className="mt-4 text-2xl font-semibold">{t("mission.title")}</h3>
              <p className="mt-4 text-sm leading-7">{t("mission.body")}</p>
            </article>
            <article className="rounded-2xl border border-hairline bg-paper p-8">
              <p className="font-display text-sm font-semibold text-primary-dark">02</p>
              <h3 className="mt-4 text-2xl font-semibold">{t("vision.title")}</h3>
              <p className="mt-4 text-sm leading-7">{t("vision.body")}</p>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline">
        <Container className="py-16">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("valuesTitle")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {aboutValues.map((value) => (
              <article
                key={value}
                className="rounded-2xl border border-hairline bg-white p-6"
              >
                <h3 className="text-xl font-semibold">{t(`values.${value}.title`)}</h3>
                <p className="mt-3 text-sm leading-6">{t(`values.${value}.body`)}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("processTitle")}</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutProcess.map((item) => (
              <li key={item.id} className="border-t border-primary pt-6">
                <p className="font-display text-sm font-semibold text-primary-dark">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{t(`process.${item.id}.title`)}</h3>
                <p className="mt-2 text-sm leading-6">{t(`process.${item.id}.body`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
