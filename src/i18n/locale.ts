"use server";

import { cookies } from "next/headers";
import { isLocale, localeCookie } from "./config";

export async function setLocale(locale: string) {
  if (!isLocale(locale)) {
    return;
  }

  const store = await cookies();

  store.set(localeCookie, locale, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}
