import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

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
    "Professional pest control solutions for homes and businesses in Sydney.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "GR Pest Control",
    description:
      "Professional pest control solutions for homes and businesses in Sydney.",
    type: "website",
    siteName: "GR Pest Control",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GR Pest Control — Professional Pest Control in Sydney",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "GR Pest Control",
    description:
      "Professional pest control solutions for homes and businesses in Sydney.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <main className="min-h-full flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}