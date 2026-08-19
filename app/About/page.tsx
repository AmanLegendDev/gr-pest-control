import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import AboutBreadcrumb from "@/components/about/AboutBreadcrumb";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutTrust from "@/components/about/AboutTrust";
import AboutApproach from "@/components/about/AboutApproach";
import AboutValues from "@/components/about/AboutValues";
import AboutAreas from "@/components/about/AboutAreas";
import AboutCTA from "@/components/about/AboutCTA";

import {
  getSiteSettings,
} from "@/features/about/queries/getSiteSettings";

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

export const dynamic =
  "force-dynamic";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata =
  createStaticPageMetadata({
    title:
      "About GR Pest Control | Professional Pest Control Sydney",

    description:
      "Learn more about GR Pest Control, our professional approach to pest management, the properties we serve and the Sydney areas covered by our team.",

    path: "/about",

    image:
      "/og-image.jpg",

    imageAlt:
      "GR Pest Control — Professional Pest Control Services in Sydney",
  });

/* =========================================================
   PAGE
========================================================= */

export default async function AboutPage() {
  await connectDB();

  /* =======================================================
     DATABASE
  ======================================================= */

  const [
    settings,
    serviceAreas,
  ] = await Promise.all([
    getSiteSettings(),

    getActiveServiceAreas(),
  ]);

  if (!settings) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

  /* =======================================================
     SERIALIZABLE SETTINGS
  ======================================================= */

  const navbarFooterSettings = {
    id:
      settings.id,

    businessName:
      settings.businessName,

    shortDescription:
      settings.shortDescription,

    logo:
      settings.logo,

    email:
      settings.email,

    phone:
      settings.phone,

    whatsapp:
      settings.whatsapp,

    address:
      settings.address,

    city:
      settings.city,

    state:
      settings.state,

    pincode:
      settings.pincode,

    socialLinks:
      settings.socialLinks,

    primaryCTA:
      settings.primaryCTA,

    currency:
      settings.currency,

    businessHours:
      settings.businessHours,

    siteTitle:
      settings.siteTitle,

    siteDescription:
      settings.siteDescription,

    favicon:
      settings.favicon,

    active:
      settings.active,

    createdAt:
      settings.createdAt,

    updatedAt:
      settings.updatedAt,
  };

  /* =======================================================
     ABOUT AREA DATA
  ======================================================= */

  const areas =
    serviceAreas.map(
      (area) => ({
        id:
          String(area.id),

        name:
          area.name,

        slug:
          area.slug,

        shortDescription:
          area.shortDescription,

        nearbyAreas:
          area.nearbyAreas ??
          [],

        featured:
          Boolean(
            area.featured,
          ),
      }),
    );

  /* =======================================================
     BREADCRUMBS
  ======================================================= */

  const breadcrumbSchema =
    createBreadcrumbSchema([
      {
        name:
          "Home",

        url:
          "/",
      },

      {
        name:
          "About Us",

        url:
          "/about",
      },
    ]);

  /* =======================================================
     WEB PAGE
  ======================================================= */

  const webPageSchema =
    createWebPageSchema({
      name:
        "About GR Pest Control | Professional Pest Control Sydney",

      description:
        "Learn more about GR Pest Control, our professional approach to pest management, the properties we serve and the Sydney areas covered by our team.",

      url:
        "/about",
    });

  /* =======================================================
     JSON-LD
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
      breadcrumbSchema,
      webPageSchema,
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

      <main className="min-h-screen bg-[#F8FAFC]">
        {/* =================================================
            NAVBAR
        ================================================== */}

        <Navbar
          settings={
            navbarFooterSettings
          }
        />

        {/* =================================================
            BREADCRUMB
        ================================================== */}

        <AboutBreadcrumb
          businessName={
            settings.businessName
          }
        />

        {/* =================================================
            HERO
        ================================================== */}

        <AboutHero
          businessName={
            settings.businessName
          }

          shortDescription={
            settings.shortDescription
          }

          city={
            settings.city
          }

          state={
            settings.state
          }

          primaryCTA={
            settings.primaryCTA
          }
        />

        {/* =================================================
            STORY
        ================================================== */}

        <AboutStory
          businessName={
            settings.businessName
          }

          shortDescription={
            settings.shortDescription
          }

          city={
            settings.city
          }

          state={
            settings.state
          }
        />

        {/* =================================================
            TRUST
        ================================================== */}

        <AboutTrust
          businessName={
            settings.businessName
          }
        />

        {/* =================================================
            APPROACH
        ================================================== */}

        <AboutApproach />

        {/* =================================================
            VALUES
        ================================================== */}

        <AboutValues />

        {/* =================================================
            SERVICE AREAS
        ================================================== */}

        <AboutAreas
          areas={
            areas
          }

          city={
            settings.city
          }

          state={
            settings.state
          }
        />

        {/* =================================================
            FINAL CTA
        ================================================== */}

        <AboutCTA
          businessName={
            settings.businessName
          }

          primaryCTA={
            settings.primaryCTA
          }

          phone={
            settings.phone
          }
        />

        {/* =================================================
            FOOTER
        ================================================== */}

        <Footer
          settings={
            navbarFooterSettings
          }
        />
      </main>
    </>
  );
}