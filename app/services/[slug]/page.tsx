import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailBenefits from "@/components/services/ServiceDetailBenefits";
import ServiceDetailProcess from "@/components/services/ServiceDetailProcess";
import ServiceDetailFAQ from "@/components/services/ServiceDetailFAQ";
import ServiceDetailFinalCTA from "@/components/services/ServiceDetailFinalCTA";

import {
  getServiceBySlug,
} from "@/features/services/queries/getServiceBySlug";

import {
  createServiceMetadata,
} from "@/lib/seo/metadata";

import {
  createJsonLdGraph,
  createServiceSchema,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo/schemas";

import JsonLd from "@/components/seo/JsonLd";

/* =========================================================
   TYPES
========================================================= */

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

/* =========================================================
   SITE URL
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://gr-pest-control.vercel.app"
).replace(/\/+$/, "");

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const service =
    await getServiceBySlug(slug);

  /*
   * Important:
   * Invalid/inactive service must not become
   * a normal indexable page.
   */
  if (!service) {
    return {
      title: "Service Not Found",

      description:
        "The requested pest control service could not be found.",

      robots: {
        index: false,
        follow: false,

        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  return createServiceMetadata({
    title:
      service.seoTitle ||
      `${service.title} | GR Pest Control`,

    description:
      service.seoDescription ||
      service.shortDescription,

    slug:
      service.slug,

    image:
      service.heroImage?.url,

    imageAlt:
      service.heroImage?.alt ||
      service.title,
  });
}

/* =========================================================
   PAGE
========================================================= */

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  await connectDB();

  /* =======================================================
     DATABASE
  ======================================================= */

  const [
    service,
    settingsDoc,
  ] = await Promise.all([
    getServiceBySlug(slug),

    SiteSettings.findOne({
      active: true,
    })
      .lean()
      .exec(),
  ]);

  /* =======================================================
     INVALID SERVICE
  ======================================================= */

  if (!service) {
    notFound();
  }

  /* =======================================================
     WEBSITE SETTINGS
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
          url: settingsDoc.logo.url,
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
     BREADCRUMB DATA
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

    {
      name: service.title,
      url: `/services/${service.slug}`,
    },
  ];

  /* =======================================================
     JSON-LD
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
      /* ---------------------------------------------------
         SERVICE
      ---------------------------------------------------- */

      createServiceSchema({
        name:
          service.title,

        description:
          service.description ||
          service.shortDescription,

        url:
          `/services/${service.slug}`,

        image:
          service.heroImage?.url,

        serviceType:
          service.category,

        providerName:
          settings.businessName,
      }),

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
          service.seoTitle ||
          service.title,

        description:
          service.seoDescription ||
          service.shortDescription,

        url:
          `/services/${service.slug}`,
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
          settings={settings}
        />

        {/* =================================================
            BREADCRUMB
        ================================================== */}

        <ServiceBreadcrumb
          serviceTitle={
            service.title
          }
        />

        {/* =================================================
            SERVICE HERO
        ================================================== */}

        <ServiceDetailHero
          title={
            service.title
          }

          category={
            service.category
          }

          shortDescription={
            service.shortDescription
          }

          description={
            service.description
          }

          heroImage={
            service.heroImage
          }

          pestTypes={
            service.pestTypes
          }
        />

        {/* =================================================
            PROBLEMS + BENEFITS
        ================================================== */}

        <ServiceDetailBenefits
          pestTypes={
            service.pestTypes
          }

          benefits={
            service.benefits
          }
        />

        {/* =================================================
            PROCESS
        ================================================== */}

        <ServiceDetailProcess
          process={
            service.process
          }
        />

        {/* =================================================
            FAQ
        ================================================== */}

        <ServiceDetailFAQ
          faqs={
            service.faqs
          }
        />

        {/* =================================================
            FINAL CTA
        ================================================== */}

        <ServiceDetailFinalCTA
          serviceTitle={
            service.title
          }
        />

        {/* =================================================
            FOOTER
        ================================================== */}

        <Footer
          settings={settings}
        />
      </main>
    </>
  );
}