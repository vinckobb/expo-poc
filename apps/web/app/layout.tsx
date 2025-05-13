"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import "./globals.css";
import "@monorepo/i18n";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="side-menu">
          <ul>
            <li>
              <Link href="/">{t("home.link")}</Link>
            </li>
            <li>
              <Link href="/profile">{t("profile.link")}</Link>
            </li>
            <li>
              <Link href="/explore">{t("explore.link")}</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <SafeAreaProvider>
            {children}
          </SafeAreaProvider>
        </div>
      </body>
    </html>
  );
}
