"use client";

import styled from "styled-components";
import { useI18n } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";

const Switcher = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.88);
`;

const LocaleButton = styled.button<{ $isActive: boolean }>`
  min-width: 42px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background-color: ${(props) => (props.$isActive ? "#083b4d" : "transparent")};
  color: ${(props) => (props.$isActive ? "#ffffff" : "#4b5563")};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;

const LOCALE_LABELS: Record<Locale, string> = {
  ko: "KO",
  en: "EN",
};

export default function LanguageSwitcher() {
  const { locale, isPending, setLocale, t } = useI18n();

  return (
    <Switcher aria-label={t("common.language")}>
      {(["ko", "en"] as Locale[]).map((nextLocale) => (
        <LocaleButton
          key={nextLocale}
          type="button"
          disabled={isPending}
          $isActive={locale === nextLocale}
          onClick={() => setLocale(nextLocale)}
        >
          {LOCALE_LABELS[nextLocale]}
        </LocaleButton>
      ))}
    </Switcher>
  );
}
