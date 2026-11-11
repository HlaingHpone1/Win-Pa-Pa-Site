"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/i18n/config";
import { setLocale } from "@/i18n/locale";

const labels: Record<Locale, string> = {
  en: "EN",
  my: "မြန်မာ",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Common");
  const [pending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex items-center gap-1 rounded-brand border border-white/10 bg-white/5 p-1 text-sm"
    >
      {locales.map((item) => {
        const active = locale === item;
        return (
          <span key={item} className="flex">
            <button
              type="button"
              disabled={pending}
              aria-pressed={active}
              className={`min-h-10 rounded-brand px-3 tracking-wide transition-colors duration-300 ease-out ${
                active ? "bg-primary font-semibold text-ink" : "text-white/70 hover:text-white"
              }`}
              onClick={() => {
                if (active) {
                  return;
                }
                startTransition(async () => {
                  await setLocale(item);
                  router.refresh();
                });
              }}
            >
              {labels[item]}
            </button>
          </span>
        );
      })}
    </div>
  );
}
