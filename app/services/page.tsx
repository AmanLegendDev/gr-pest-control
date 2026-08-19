import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import ServicesHero from "@/components/services/ServicesHero";
import ServicesPageClient from "@/components/services/ServicesPageClient";

import {
  getActiveServices,
} from "@/features/services/queries/getActiveServices";

import {
  createStaticPageMetadata,
} from "@/lib/seo/metadata";

import {
  createJsonLdGraph,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo/schemas";

import JsonLd from "@/components/seo/JsonLd";

/* =========================================================
   PAGE CONFIG
========================================================= */

export const dynamic = "force-dynamic";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata =
  createStaticPageMetadata({
    title:
      "Pest Control Services Sydney | GR Pest Control",

    description:
      "Explore professional pest control services for homes and businesses across Sydney. View termite, cockroach, rodent, ant and other pest management solutions from GR Pest Control.",

    path: "/services",

    image:
      "/og-image.jpg",

    imageAlt:
      "GR Pest Control — Professional Pest Control Services in Sydney",
  });

/* =========================================================
   PAGE
========================================================= */

export default async function ServicesPage() {
  await connectDB();

  /* =======================================================
     DATABASE
  ======================================================= */

  const [
    services,
    settingsDoc,
  ] = await Promise.all([
    getActiveServices(),

    SiteSettings.findOne({
      active: true,
    })
      .lean()
      .exec(),
  ]);

  /* =======================================================
     SETTINGS FALLBACK
  ======================================================= */

  if (!settingsDoc) {
    return (
      <main className="min-h-screen bg-white">
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-[#062B63]">
              Website settings not configured
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please configure the website
              settings from the admin panel.
            </p>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     SETTINGS VIEW MODEL
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
        settingsDoc.socialLinks
          ?.facebook ?? "",

      instagram:
        settingsDoc.socialLinks
          ?.instagram ?? "",

      youtube:
        settingsDoc.socialLinks
          ?.youtube ?? "",

      googleBusiness:
        settingsDoc.socialLinks
          ?.googleBusiness ?? "",
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
     BREADCRUMBS
  ======================================================= */

  const breadcrumbItems = [
    {
      name: "Home",
      url: "/",
    },

    {
      name: "Services",
      url: "/services",
    },
  ];

  /* =======================================================
     JSON-LD
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
      /* ---------------------------------------------------
         BREADCRUMB
      ---------------------------------------------------- */

      createBreadcrumbSchema(
        breadcrumbItems,
      ),

      /* ---------------------------------------------------
         WEB PAGE
      ---------------------------------------------------- */

      createWebPageSchema({
        name:
          "Pest Control Services Sydney | GR Pest Control",

        description:
          "Explore professional pest control services for homes and businesses across Sydney. View practical pest management solutions from GR Pest Control.",

        url:
          "/services",
      }),
    ]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* ===================================================
          STRUCTURED DATA
      ==================================================== */}

      <JsonLd
        data={jsonLd}
      />

      <main className="min-h-screen bg-[#F8FAFC]">
        {/* =================================================
            NAVIGATION
        ================================================== */}

        <Navbar
          settings={
            settings
          }
        />

        {/* =================================================
            HERO
        ================================================== */}

        <ServicesHero />

        {/* =================================================
            SERVICES
        ================================================== */}

        <ServicesPageClient
          services={
            services
          }
        />

        {/* =================================================
            FOOTER
        ================================================== */}

        <Footer
          settings={
            settings
          }
        />
      </main>
    </>
  );
}