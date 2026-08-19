import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import FAQBreadcrumb from "@/components/faq/FAQBreadcrumb";
import FAQHero from "@/components/faq/FAQHero";
import FAQCategoryNav from "@/components/faq/FAQCategoryNav";
import FAQContent from "@/components/faq/FAQContent";
import FAQCTA from "@/components/faq/FAQCTA";

import { getSiteSettings } from "@/features/about/queries/getSiteSettings";

import {
  getActiveFAQs,
} from "@/features/faq/queries/getActiveFAQs";

import {
  getFAQCategories,
} from "@/features/faq/queries/getFAQCategories";

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
      "Pest Control FAQs Sydney | GR Pest Control",

    description:
      "Find answers to common questions about pest control services, treatments, preparation, safety and pest management for homes and businesses across Sydney.",

    path: "/faq",

    image:
      "/og-image.jpg",

    imageAlt:
      "GR Pest Control — Frequently Asked Questions",
  });

/* =========================================================
   TYPES
========================================================= */

interface FAQPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

/* =========================================================
   PAGE
========================================================= */

export default async function FAQPage({
  searchParams,
}: FAQPageProps) {
  const params =
    await searchParams;

  const requestedCategory =
    params.category
      ?.trim()
      .toLowerCase() ?? "";

  await connectDB();

  /* =======================================================
     DATABASE
  ======================================================= */

  const [
    settings,
    allFAQs,
    categories,
  ] = await Promise.all([
    getSiteSettings(),

    getActiveFAQs(),

    getFAQCategories(),
  ]);

  /* =======================================================
     SETTINGS
  ======================================================= */

  if (!settings) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

  /* =======================================================
     CATEGORY FILTER
  ======================================================= */

  const activeCategory =
    categories.find(
      (category) =>
        category
          .trim()
          .toLowerCase() ===
        requestedCategory,
    ) ?? "";

  const filteredFAQs =
    activeCategory
      ? allFAQs.filter(
          (faq) =>
            faq.category
              .trim()
              .toLowerCase() ===
            activeCategory
              .trim()
              .toLowerCase(),
        )
      : allFAQs;

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
     FAQ CONTENT DATA
  ======================================================= */

  const faqItems =
    filteredFAQs.map(
      (faq) => ({
        id:
          faq.id,

        question:
          faq.question,

        answer:
          faq.answer,

        category:
          faq.category,

        featured:
          faq.featured,
      }),
    );

  /* =======================================================
     FAQ JSON-LD
  ======================================================= */

  const faqPageSchema = {
    "@type":
      "FAQPage",

    "@id":
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://gr-pest-control.vercel.app"}/faq#faqpage`,

    mainEntity:
      filteredFAQs.map(
        (faq) => ({
          "@type":
            "Question",

          name:
            faq.question,

          acceptedAnswer: {
            "@type":
              "Answer",

            text:
              faq.answer,
          },
        }),
      ),
  };

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
          "Frequently Asked Questions",

        url:
          "/faq",
      },
    ]);

  /* =======================================================
     WEB PAGE
  ======================================================= */

  const webPageSchema =
    createWebPageSchema({
      name:
        "Pest Control FAQs Sydney | GR Pest Control",

      description:
        "Find answers to common questions about pest control services, treatments, preparation, safety and pest management for homes and businesses across Sydney.",

      url:
        "/faq",
    });

  /* =======================================================
     JSON-LD GRAPH
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
      breadcrumbSchema,
      webPageSchema,
      faqPageSchema,
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

        <FAQBreadcrumb />

        {/* =================================================
            HERO
        ================================================== */}

        <FAQHero
          businessName={
            settings.businessName
          }

          faqCount={
            filteredFAQs.length
          }

          categoryCount={
            categories.length
          }
        />

        {/* =================================================
            CATEGORY NAV
        ================================================== */}

        <FAQCategoryNav
          categories={
            categories
          }

          activeCategory={
            activeCategory
          }
        />

        {/* =================================================
            FAQ CONTENT
        ================================================== */}

        <FAQContent
          items={
            faqItems
          }
        />

        {/* =================================================
            FINAL CTA
        ================================================== */}

        <FAQCTA
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