import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Navigation from "@/components/shared/navigation/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "GR Pest Control",
    template: "%s | GR Pest Control",
  },

  description:
    "Professional pest control solutions for homes and businesses in Shimla.",

  robots: {
    index: true,
    follow: true,
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-[#0F172A]">
        <Navigation />

        <main className="min-h-full flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}