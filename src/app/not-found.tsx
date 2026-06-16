"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/LocaleProvider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f9fafb",
      }}
    >
      <section
        style={{
          width: "min(420px, 100%)",
          padding: 28,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          background: "#ffffff",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ color: "#111827", fontSize: 22, fontWeight: 800 }}>
          {t("system.notFoundTitle")}
        </h1>
        <p style={{ marginTop: 10, color: "#6b7280", fontSize: 14 }}>
          {t("system.notFoundDescription")}
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 22,
            minHeight: 42,
            padding: "0 18px",
            borderRadius: 10,
            background: "#083b4d",
            color: "#ffffff",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          {t("common.home")}
        </Link>
      </section>
    </main>
  );
}
