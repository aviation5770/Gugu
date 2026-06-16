"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "@/app/actions/locale";
import { getDictionary, type Locale } from "./config";

type TranslationKey = string;

type LocaleContextValue = {
  locale: Locale;
  isPending: boolean;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolveTranslation(locale: Locale, key: TranslationKey) {
  const keys = key.split(".");
  let current: unknown = getDictionary(locale);

  for (const currentKey of keys) {
    if (!current || typeof current !== "object" || !(currentKey in current)) {
      return key;
    }

    current = (current as Record<string, unknown>)[currentKey];
  }

  return typeof current === "string" ? current : key;
}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState(initialLocale);
  const [isPending, startTransition] = useTransition();

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      isPending,
      setLocale(nextLocale) {
        startTransition(async () => {
          await setLocaleAction(nextLocale);
          setLocaleState(nextLocale);
          router.refresh();
        });
      },
      t(key) {
        const translated = resolveTranslation(locale, key);

        if (translated !== key) {
          return translated;
        }

        return resolveTranslation("ko", key);
      },
    }),
    [isPending, locale, router],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const context = useContext(LocaleContext);

  if (!context) {
    return {
      locale: "ko" as Locale,
      isPending: false,
      setLocale: () => undefined,
      t(key: TranslationKey) {
        return resolveTranslation("ko", key);
      },
    };
  }

  return context;
}
