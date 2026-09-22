import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, localeCookie } from "./config";

export default getRequestConfig(async () => {
  const store = await cookies();
  const candidate = store.get(localeCookie)?.value;
  const locale = isLocale(candidate) ? candidate : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
