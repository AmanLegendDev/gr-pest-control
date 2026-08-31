import type { Metadata, Viewport } from "next";
import { EB_Garamond } from "next/font/google";

import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: [
    "400",
    "500",
    "600",
    "700",
  ],
});

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.grpestscontrol.com.au/"
).replace(/\/+$/, "");

const SITE_NAME = "GR Pest Control";

const SITE_DESCRIPTION =
  "Professional pest control services for homes and businesses across Sydney. Get practical pest management solutions from GR Pest Control.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Pest Control Sydney | GR Pest Control",
    template:
      "%s | GR Pest Control",
  },

  description:
    SITE_DESCRIPTION,

  verification: {
    google:
      "NoQCEVO8vcHFSKucCXp5yjx-J35uSsct_9xEpagnj5k",

    other: {
      "msvalidate.01":
        "6C56034BC8A4093CC1774D376348B66E",
    },
  },

  applicationName:
    SITE_NAME,

  authors: [
    {
      name: SITE_NAME,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: SITE_NAME,

    title:
      "Pest Control Sydney | GR Pest Control",

    description:
      SITE_DESCRIPTION,

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt:
          "GR Pest Control — Professional Pest Control in Sydney",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Pest Control Sydney | GR Pest Control",

    description:
      SITE_DESCRIPTION,

    images: [
      "/og-image.jpg",
    ],
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  category:
    "Pest Control",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#062B63",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${ebGaramond.variable} h-full antialiased`}
    >
      <body
        className="
          min-h-full
          bg-white
          font-serif
          text-[#0F172A]
        "
      >
        <main className="min-h-full flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}