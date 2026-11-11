import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProcessSteps } from "@/components/process-steps";
import { SectionHeading } from "@/components/section-heading";
import { aboutMeta, aboutValues } from "@/content/site";

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

      <section className="section-y bg-white">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="grain relative overflow-hidden rounded-brand bg-ink p-5 sm:p-6">
            <div className="flex items-center gap-5 lg:flex-col lg:items-stretch">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-brand lg:aspect-[4/5] lg:h-auto lg:w-full">
                <Image
                  src="/about/founder.jpg"
                  alt={t("founder.imageAlt")}
                  fill
                  sizes="(min-width: 1024px) 36vw, 96px"
                  className="object-cover object-[center_20%]"
                />
                <p className="text-eyebrow absolute bottom-4 left-4 hidden rounded-brand bg-primary px-3 py-2 text-ink lg:inline-block">
                  {t("est", { year: aboutMeta.founded })}
                </p>
              </div>
              <div className="lg:px-2 lg:pb-2">
                <h2 className="text-subtitle text-white">{t("founder.name")}</h2>
                <p className="text-body mt-1 text-white/65">{t("founder.role")}</p>
                <p className="text-eyebrow mt-3 text-primary">{t("founder.since")}</p>
              </div>
            </div>
          </article>

          <div>
            <SectionHeading
              eyebrow={t("founder.welcomeEyebrow")}
              title={t("founder.welcomeTitle")}
            />
            <div className="text-lead mt-6 space-y-5">
              {welcome.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 inline-flex items-center gap-4 rounded-brand border border-hairline bg-paper p-3 pr-5">
              <span className="text-subtitle flex h-12 min-w-12 items-center justify-center rounded-brand bg-primary px-2 text-ink">
                {aboutMeta.experience}
              </span>
              <span className="text-sm font-medium text-ink">{t("experienceLabel")}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow={t("eyebrow")} title={t("storyTitle")} />
          <div className="text-lead space-y-5 lg:pt-10">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <SectionHeading title={t("purposeTitle")} />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="grain relative overflow-hidden rounded-brand bg-ink p-8 sm:p-10">
              <p className="text-eyebrow text-primary">01</p>
              <h3 className="text-subtitle mt-6 text-white">{t("mission.title")}</h3>
              <p className="text-body mt-4 text-white/70">{t("mission.body")}</p>
            </article>
            <article className="rounded-brand bg-primary p-8 sm:p-10">
              <p className="text-eyebrow text-ink/70">02</p>
              <h3 className="text-subtitle mt-6">{t("vision.title")}</h3>
              <p className="text-body mt-4 text-ink/80">{t("vision.body")}</p>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeading title={t("valuesTitle")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {aboutValues.map((value, index) => (
              <article
                key={value}
                className="rounded-brand border border-hairline bg-white p-6 transition-colors duration-300 ease-out hover:border-primary"
              >
                <span className="text-eyebrow flex h-10 w-10 items-center justify-center rounded-brand bg-primary-soft text-primary-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-subtitle mt-6">{t(`values.${value}.title`)}</h3>
                <p className="text-body mt-3">{t(`values.${value}.body`)}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="grain section-y relative overflow-hidden bg-ink">
        <Container className="relative">
          <SectionHeading tone="dark" title={t("processTitle")} />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </Container>
      </section>
    </>
  );
}
