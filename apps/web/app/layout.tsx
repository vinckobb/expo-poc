"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {Navbar} from "../components/navbar";

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
        <Navbar></Navbar>

        <SafeAreaProvider>
          {children}
        </SafeAreaProvider>
      </body>
    </html>
  );
}
