import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://gugu.vercel.app"),
  title: {
    default: "구구 | 고학년을 위한 소수 구구단",
    template: "%s | 구구",
  },
  description:
    "선생님은 편하게, 학생은 집중해서 연습하는 고학년 맞춤 소수 구구단 학습 서비스",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "구구 | 고학년을 위한 소수 구구단",
    description:
      "클래스 생성, 학생 명단 자동 발급, 타임어택 랭킹을 제공하는 고학년 구구단 학습 서비스",
    url: "/",
    siteName: "구구",
    images: [
      {
        url: "/images/gugu.svg",
        width: 1200,
        height: 630,
        alt: "구구 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE;

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
