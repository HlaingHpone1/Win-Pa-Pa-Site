export const locales = ["en", "my"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "my";

export const localeCookie = "NEXT_LOCALE";

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
