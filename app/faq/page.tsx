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

import { getActiveFAQs } from "@/features/faq/queries/getActiveFAQs";
import { getFAQCategories } from "@/features/faq/queries/getFAQCategories";

export const metadata: Metadata = {
  title:
    "Frequently Asked Questions | GR Pest Control",

  description:
    "Find answers to common questions about GR Pest Control services, treatments, preparation, safety and pest control solutions.",

  alternates: {
    canonical: "/faq",
  },

  openGraph: {
    title:
      "Frequently Asked Questions | GR Pest Control",

    description:
      "Answers to common questions about GR Pest Control services and treatments.",

    type: "website",
  },
};

export const dynamic =
  "force-dynamic";

interface FAQPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

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

  const [
    settings,
    allFAQs,
    categories,
  ] = await Promise.all([
    getSiteSettings(),
    getActiveFAQs(),
    getFAQCategories(),
  ]);

  if (!settings) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

  /*
   * =========================
   * CATEGORY FILTER
   * =========================
   */

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

  /*
   * =========================
   * NAVBAR / FOOTER SETTINGS
   * =========================
   */

  const navbarFooterSettings = {
    id: settings.id,

    businessName:
      settings.businessName,

    shortDescription:
      settings.shortDescription,

    logo: settings.logo,

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

  /*
   * =========================
   * FAQ JSON-LD
   * =========================
   */

  const faqSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "FAQPage",

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

  /*
   * =========================
   * FAQ CONTENT DATA
   * =========================
   */

  const faqItems =
    filteredFAQs.map(
      (faq) => ({
        id: faq.id,

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

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================
          NAVBAR
      ========================== */}

      <Navbar
        settings={
          navbarFooterSettings
        }
      />

      {/* =========================
          BREADCRUMB
          ALWAYS BELOW NAVBAR
      ========================== */}

      <FAQBreadcrumb />

      {/* =========================
          HERO
      ========================== */}

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

      {/* =========================
          CATEGORY NAV
      ========================== */}

      <FAQCategoryNav
        categories={
          categories
        }
        activeCategory={
          activeCategory
        }
      />

      {/* =========================
          SEARCH + POPULAR
          + ACCORDION
      ========================== */}

      <FAQContent
        items={faqItems}
      />

      {/* =========================
          FINAL CTA
      ========================== */}

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

      {/* =========================
          FOOTER
      ========================== */}

      <Footer
        settings={
          navbarFooterSettings
        }
      />

      {/* =========================
          FAQ JSON-LD
      ========================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              faqSchema,
            ),
        }}
      />
    </main>
  );
}