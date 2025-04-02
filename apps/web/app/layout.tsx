"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="side-menu">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/explore">Explore</Link>
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
