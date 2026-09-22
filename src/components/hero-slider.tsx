"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { heroSlides } from "@/content/site";

const INTERVAL_MS = 3000;

export function HeroSlider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Home");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative -mt-[4.25rem] h-[100dvh] overflow-hidden"
      aria-roledescription="carousel"
      aria-label={t("sliderLabel")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {heroSlides.map((slide, slideIndex) => (
            <div
              key={slide.id}
              className="relative h-full w-full shrink-0 grow-0 basis-full"
              aria-hidden={slideIndex !== index}
            >
              <Image
                src={slide.src}
                alt={t(`slides.${slide.id}`)}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-paper/25"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center pt-[4.25rem]">
        {children}
        <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-full max-w-[1120px] gap-2 px-5 sm:px-8">
          {heroSlides.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <button
                key={slide.id}
                type="button"
                aria-label={t("goToSlide", { index: slideIndex + 1 })}
                aria-current={active ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  active ? "w-10 bg-primary" : "w-5 bg-ink/25 hover:bg-ink/40"
                }`}
                onClick={() => setIndex(slideIndex)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
