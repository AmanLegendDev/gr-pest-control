import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import QuoteSuccessCard from "@/components/quote/QuoteSuccessCard";

interface SuccessPageProps {
  searchParams: Promise<{
    reference?: string;
  }>;
}

export const dynamic =
  "force-dynamic";

/* =========================================================
   METADATA

   Success page is a confirmation step,
   not a search landing page.
========================================================= */

export const metadata: Metadata = {
  title:
    "Quote Request Received | GR Pest Control",

  description:
    "Your GR Pest Control quote request has been successfully received.",

  robots: {
    index: false,
    follow: true,

    googleBot: {
      index: false,
      follow: true,
    },
  },

  alternates: {
    canonical: "/quote/success",
  },
};

/* =========================================================
   PAGE
========================================================= */

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params =
    await searchParams;

  const reference =
    params.reference?.trim() ||
    "Pending";

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

      <section
        className="
          px-4
          pb-20
          pt-32
          sm:px-6
          sm:pb-24
          lg:px-8
          lg:pt-36
        "
      >
        <div className="mx-auto max-w-4xl">
          <QuoteSuccessCard
            reference={
              reference
            }

            phone={
              settings.phone
            }
          />
        </div>
      </section>

      <Footer
        settings={
          settings
        }
      />
    </main>
  );
}