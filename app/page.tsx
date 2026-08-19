import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import Navigation from "@/components/shared/navigation/Navigation";
import TrustBar from "@/components/home/TrustBar";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import {
  getFeaturedServiceAreas,
} from "@/features/service-areas/queries/getServiceAreas";

import {
  getActiveGallery,
} from "@/features/gallery/queries/getGallery";

import ServicesPreview from "@/components/home/ServicesPreview";

import {
  getFeaturedServices,
} from "@/features/services/queries/getFeaturedServices";

import WhyChooseUs from "@/components/home/WhyChooseUs";
import SolutionsSection from "@/components/home/SolutionsSection";
import ProcessSection from "@/components/home/ProcessSection";

import ServiceAreasPreview from "@/components/home/ServiceAreasPreview";
import GalleryPreview from "@/components/home/GalleryPreview";

import {
  getActiveTestimonials,
} from "@/features/testimonials/queries/getTestimonials";

import TestimonialsPreview from "@/components/home/TestimonialsPreview";

import {
  getActiveFAQs,
} from "@/features/faq/queries/getFAQs";

import FAQPreview from "@/components/home/FAQPreview";

import {
  getPublishedBlogs,
} from "@/features/blogs/queries/getBlogs";

import BlogPreview from "@/components/home/BlogPreview";
import QuoteCTA from "@/components/home/QuoteCTA";
import Footer from "@/components/shared/footer/Footer";

import JsonLd from "@/components/seo/JsonLd";

import {
  createJsonLdGraph,
  createLocalBusinessSchema,
  createWebPageSchema,
  createWebSiteSchema,
} from "@/lib/seo/schemas";

/* =========================================================
   SEO CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://gr-pest-control.vercel.app"
).replace(/\/+$/, "");

const DEFAULT_TITLE =
  "Pest Control Sydney | GR Pest Control";

const DEFAULT_DESCRIPTION =
  "Professional pest control services for homes and businesses across Sydney. Get practical pest management solutions from GR Pest Control.";

/* =========================================================
   HOMEPAGE METADATA
========================================================= */

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();

  const settings = await SiteSettings.findOne({
    active: true,
  })
    .select({
      businessName: 1,
      shortDescription: 1,
      siteTitle: 1,
      siteDescription: 1,
    })
    .lean()
    .exec();

  const businessName =
    settings?.businessName?.trim() ||
    "GR Pest Control";

  const title =
    settings?.siteTitle?.trim() ||
    DEFAULT_TITLE;

  const description =
    settings?.siteDescription?.trim() ||
    settings?.shortDescription?.trim() ||
    DEFAULT_DESCRIPTION;

  return {
    title,

    description,

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
      siteName: businessName,
      title,
      description,

      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${businessName} — Professional Pest Control in Sydney`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function HomePage() {
  await connectDB();

  const [
    services,
    serviceAreas,
    gallery,
    testimonials,
    faqs,
    blogs,
  ] = await Promise.all([
    getFeaturedServices(3),
    getFeaturedServiceAreas(3),
    getActiveGallery(5),
    getActiveTestimonials(3),
    getActiveFAQs(5),
    getPublishedBlogs(3),
  ]);

  const settingsDoc =
    await SiteSettings.findOne({
      active: true,
    })
      .lean()
      .exec();

  if (!settingsDoc) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />

        <section className="flex min-h-screen items-center justify-center px-6 pt-28">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#062B63]">
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
     VIEW MODEL
  ======================================================= */

  const settings = {
    businessName:
      settingsDoc.businessName,

    shortDescription:
      settingsDoc.shortDescription,

    logo: settingsDoc.logo
      ? {
          url: settingsDoc.logo.url,
          publicId:
            settingsDoc.logo.publicId,
          alt: settingsDoc.logo.alt,
        }
      : undefined,

    email: settingsDoc.email,

    phone: settingsDoc.phone,

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
          day: hour.day,
          open: hour.open,
          close: hour.close,
          closed: hour.closed,
        }),
      ) ?? [],

    siteTitle:
      settingsDoc.siteTitle,

    siteDescription:
      settingsDoc.siteDescription,

    favicon: settingsDoc.favicon
      ? {
          url: settingsDoc.favicon.url,
          publicId:
            settingsDoc.favicon.publicId,
          alt: settingsDoc.favicon.alt,
        }
      : undefined,

    active:
      settingsDoc.active,

    id: String(
      settingsDoc._id,
    ),

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
     BUSINESS SOCIAL LINKS
  ======================================================= */

  const sameAs = [
    settings.socialLinks.facebook,
    settings.socialLinks.instagram,
    settings.socialLinks.youtube,
    settings.socialLinks.googleBusiness,
  ].filter(
    (value): value is string =>
      Boolean(value?.trim()),
  );

  /* =======================================================
     AREA COVERAGE
  ======================================================= */

  const areaServed = serviceAreas
    .map(
      (area) =>
        area.name?.trim(),
    )
    .filter(
      (value): value is string =>
        Boolean(value),
    );

  /* =======================================================
     JSON-LD GRAPH
  ======================================================= */

  const jsonLd = createJsonLdGraph([
    createLocalBusinessSchema({
      name:
        settings.businessName,

      url:
        SITE_URL,

      logo:
        settings.logo?.url,

      email:
        settings.email,

      phone:
        settings.phone,

      description:
        settings.shortDescription,

      sameAs,

      priceRange:
        "$$",

      areaServed,

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
    }),

    createWebSiteSchema({
      name:
        settings.businessName,

      url:
        SITE_URL,
    }),

    createWebPageSchema({
      name:
        settings.siteTitle ||
        DEFAULT_TITLE,

      description:
        settings.siteDescription ||
        settings.shortDescription ||
        DEFAULT_DESCRIPTION,

      url: "/",
    }),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* =====================================================
          STRUCTURED DATA
      ====================================================== */}

      <JsonLd data={jsonLd} />

      {/* =====================================================
          WEBSITE
      ====================================================== */}

      <Navigation />

      <Hero settings={settings} />

      <TrustBar settings={settings} />

      <ServicesPreview
        services={services}
      />

      <WhyChooseUs
        settings={settings}
      />

      <SolutionsSection
        services={services}
      />

      <ProcessSection />

      <ServiceAreasPreview
        serviceAreas={
          serviceAreas
        }
      />

      <GalleryPreview
        gallery={gallery}
      />

      <TestimonialsPreview
        testimonials={
          testimonials
        }
      />

      <FAQPreview
        faqs={faqs}
      />

      <BlogPreview
        blogs={blogs}
      />

      <QuoteCTA
        settings={settings}
      />

      <Footer
        settings={settings}
      />
    </main>
  );
}