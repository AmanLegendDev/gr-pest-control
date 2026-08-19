import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";
import QuoteReviewClient from "@/components/quote/QuoteReviewClient";

export const dynamic =
  "force-dynamic";

/* =========================================================
   METADATA

   Review is a temporary user-flow page.
   It should not appear in search results.
========================================================= */

export const metadata: Metadata = {
  title: "Review Your Quote Request | GR Pest Control",

  description:
    "Review your GR Pest Control quote request before submitting.",

  robots: {
    index: false,
    follow: true,

    googleBot: {
      index: false,
      follow: true,
    },
  },

  alternates: {
    canonical: "/quote/review",
  },
};

/* =========================================================
   PAGE
========================================================= */

export default async function QuoteReviewPage() {
  await connectDB();

  const settingsDoc =
    await SiteSettings.findOne({
      active: true,
    })
      .lean()
      .exec();

  if (!settingsDoc) {
    return (
      <main className="min-h-screen bg-white">
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-[#062B63]">
              Website settings not configured
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please configure the website settings from the admin panel.
            </p>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     SETTINGS
  ======================================================= */

  const settings = {
    id: String(
      settingsDoc._id,
    ),

    businessName:
      settingsDoc.businessName,

    shortDescription:
      settingsDoc.shortDescription,

    logo: settingsDoc.logo
      ? {
          url:
            settingsDoc.logo.url,

          publicId:
            settingsDoc.logo.publicId,

          alt:
            settingsDoc.logo.alt,
        }
      : undefined,

    email:
      settingsDoc.email,

    phone:
      settingsDoc.phone,

    whatsapp:
      settingsDoc.whatsapp,

    address:
      settingsDoc.address,

    city:
      settingsDoc.city,

    state:
      settingsDoc.state,

    pincode:
      settingsDoc.pincode,

    socialLinks: {
      facebook:
        settingsDoc.socialLinks?.facebook ??
        "",

      instagram:
        settingsDoc.socialLinks?.instagram ??
        "",

      youtube:
        settingsDoc.socialLinks?.youtube ??
        "",

      googleBusiness:
        settingsDoc.socialLinks?.googleBusiness ??
        "",
    },

    primaryCTA:
      settingsDoc.primaryCTA ||
      "Get a Free Quote",

    currency:
      settingsDoc.currency ||
      "AUD",

    businessHours:
      settingsDoc.businessHours?.map(
        (hour) => ({
          day:
            hour.day,

          open:
            hour.open,

          close:
            hour.close,

          closed:
            hour.closed,
        }),
      ) ?? [],

    siteTitle:
      settingsDoc.siteTitle,

    siteDescription:
      settingsDoc.siteDescription,

    favicon: settingsDoc.favicon
      ? {
          url:
            settingsDoc.favicon.url,

          publicId:
            settingsDoc.favicon.publicId,

          alt:
            settingsDoc.favicon.alt,
        }
      : undefined,

    active:
      settingsDoc.active,

    createdAt:
      new Date(
        settingsDoc.createdAt,
      ).toISOString(),

    updatedAt:
      new Date(
        settingsDoc.updatedAt,
      ).toISOString(),
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar
        settings={
          settings
        }
      />

      <QuoteReviewClient />

      <Footer
        settings={
          settings
        }
      />
    </main>
  );
}