"use server";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

export async function setLocaleAction(locale: Locale) {
  const cookieStore = await cookies();
  const nextLocale = isLocale(locale) ? locale : DEFAULT_LOCALE;

  cookieStore.set(LOCALE_COOKIE, nextLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
