import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import ServiceAreasHero from "@/components/service-areas/ServiceAreasHero";
import FeaturedServiceAreas from "@/components/service-areas/FeaturedServiceAreas";
import ServiceAreasGrid from "@/components/service-areas/ServiceAreasGrid";
import ServiceAreasHelpCTA from "@/components/service-areas/ServiceAreasHelpCTA";
import ServiceAreasFinalCTA from "@/components/service-areas/ServiceAreasFinalCTA";

import {
  getActiveServiceAreas,
} from "@/features/service-areas/queries/getActiveServiceAreas";

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
      "Pest Control Service Areas Sydney | GR Pest Control",

    description:
      "Find GR Pest Control service areas across Sydney and surrounding suburbs. Explore local pest control coverage for homes, apartments, businesses and commercial properties.",

    path: "/service-areas",

    image:
      "/og-image.jpg",

    imageAlt:
      "GR Pest Control — Pest Control Service Areas across Sydney",
  });

/* =========================================================
   PAGE
========================================================= */

export default async function ServiceAreasPage() {
  await connectDB();

  /* =======================================================
     DATABASE
  ======================================================= */

  const [
    areas,
    settingsDoc,
  ] = await Promise.all([
    getActiveServiceAreas(),

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
              Please configure the website settings from the admin panel.
            </p>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     FEATURED / REGULAR
  ======================================================= */

  const featuredAreas =
    areas.filter(
      (area) =>
        area.featured,
    );

  const regularAreas =
    areas.filter(
      (area) =>
        !area.featured,
    );

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
     BREADCRUMB
  ======================================================= */

  const breadcrumbItems = [
    {
      name: "Home",
      url: "/",
    },

    {
      name: "Service Areas",
      url: "/service-areas",
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
          "Pest Control Service Areas Sydney | GR Pest Control",

        description:
          "Find GR Pest Control service areas across Sydney and surrounding suburbs. Explore local pest control coverage for homes, apartments, businesses and commercial properties.",

        url:
          "/service-areas",
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
        data={
          jsonLd
        }
      />

      <Navbar
        settings={
          settings
        }
      />

      <main className="min-h-screen bg-[#F8FAFC] mt-16">
        {/* =================================================
            HERO
        ================================================== */}

        <ServiceAreasHero
          areaCount={
            areas.length
          }
        />

        {/* =================================================
            FEATURED AREAS
        ================================================== */}

        <FeaturedServiceAreas
          areas={
            featuredAreas
          }
        />

        {/* =================================================
            ALL AREAS
        ================================================== */}

        <ServiceAreasGrid
          areas={
            regularAreas
          }
        />

        {/* =================================================
            COVERAGE HELP
        ================================================== */}

        <ServiceAreasHelpCTA />

        {/* =================================================
            FINAL CTA
        ================================================== */}

        <ServiceAreasFinalCTA
          areaCount={
            areas.length
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