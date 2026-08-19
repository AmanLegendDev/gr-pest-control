import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import ContactBreadcrumb from "@/components/contact/ContactBreadcrumb";
import ContactHero from "@/components/contact/ContactHero";
import ContactMethods from "@/components/contact/ContactMethods";
import ContactLocation from "@/components/contact/ContactLocation";
import ContactHours from "@/components/contact/ContactHours";
import ContactCTA from "@/components/contact/ContactCTA";

import { getSiteSettings } from "@/features/about/queries/getSiteSettings";

import {
  createStaticPageMetadata,
} from "@/lib/seo/metadata";

import {
  createJsonLdGraph,
  createBreadcrumbSchema,
  createLocalBusinessSchema,
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
      "Contact GR Pest Control Sydney | Get in Touch",

    description:
      "Contact GR Pest Control for professional pest management services across Sydney. Call, email or WhatsApp our team, check our location and business hours.",

    path: "/contact",

    image:
      "/og-image.jpg",

    imageAlt:
      "GR Pest Control — Contact and Pest Control Services in Sydney",
  });

/* =========================================================
   PAGE
========================================================= */

export default async function ContactPage() {
  await connectDB();

  const settings =
    await getSiteSettings();

  if (!settings) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

  /* =======================================================
     NAVBAR / FOOTER SETTINGS
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
     SOCIAL LINKS
  ======================================================= */

  const sameAs = [
    settings.socialLinks?.facebook,
    settings.socialLinks?.instagram,
    settings.socialLinks?.youtube,
    settings.socialLinks?.googleBusiness,
  ].filter(
    (value): value is string =>
      Boolean(value?.trim()),
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
          "Contact",

        url:
          "/contact",
      },
    ]);

  /* =======================================================
     LOCAL BUSINESS
  ======================================================= */

  const localBusinessSchema =
    createLocalBusinessSchema({
      name:
        settings.businessName,

      url:
        "/contact",

      logo:
        settings.logo?.url,

      email:
        settings.email,

      phone:
        settings.phone,

      description:
        settings.shortDescription,

      sameAs,

      areaServed: [
        settings.city,
      ].filter(Boolean),

      openingHours:
        settings.businessHours,

      address: {
        streetAddress:
          settings.address,

        addressLocality:
          settings.city,

        addressRegion:
          settings.state,

        postalCode:
          settings.pincode,

        addressCountry:
          "AU",
      },
    });

  /* =======================================================
     WEB PAGE
  ======================================================= */

  const webPageSchema =
    createWebPageSchema({
      name:
        "Contact GR Pest Control Sydney | Get in Touch",

      description:
        "Contact GR Pest Control for professional pest management services across Sydney. Call, email or WhatsApp our team, check our location and business hours.",

      url:
        "/contact",
    });

  /* =======================================================
     JSON-LD GRAPH
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
      breadcrumbSchema,
      localBusinessSchema,
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

        <ContactBreadcrumb />

        {/* =================================================
            HERO
        ================================================== */}

        <ContactHero
          businessName={
            settings.businessName
          }

          city={
            settings.city
          }

          phone={
            settings.phone
          }

          email={
            settings.email
          }
        />

        {/* =================================================
            CONTACT METHODS
        ================================================== */}

        <ContactMethods
          phone={
            settings.phone
          }

          email={
            settings.email
          }

          whatsapp={
            settings.whatsapp
          }
        />

        {/* =================================================
            LOCATION
        ================================================== */}

        <ContactLocation
          businessName={
            settings.businessName
          }

          address={
            settings.address
          }

          city={
            settings.city
          }

          state={
            settings.state
          }

          pincode={
            settings.pincode
          }
        />

        {/* =================================================
            BUSINESS HOURS
        ================================================== */}

        <ContactHours
          businessHours={
            settings.businessHours
          }
        />

        {/* =================================================
            FINAL CTA
        ================================================== */}

        <ContactCTA
          businessName={
            settings.businessName
          }

          primaryCTA={
            settings.primaryCTA
          }

          phone={
            settings.phone
          }

          whatsapp={
            settings.whatsapp
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