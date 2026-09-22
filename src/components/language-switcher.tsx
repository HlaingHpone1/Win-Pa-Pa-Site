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
      className="flex items-center gap-1 text-sm"
    >
      {locales.map((item, index) => {
        const active = locale === item;
        return (
          <span key={item} className="flex items-center gap-1">
            {index > 0 ? (
              <span className="text-slate/40" aria-hidden>
                |
              </span>
            ) : null}
            <button
              type="button"
              disabled={pending}
              aria-pressed={active}
              className={`min-h-11 px-1.5 tracking-wide transition-colors duration-300 ease-out ${
                active ? "font-medium text-ink" : "text-slate hover:text-ink"
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
