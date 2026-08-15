import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import ServiceAreaBreadcrumb from "@/components/service-areas/ServiceAreaBreadcrumb";
import ServiceAreaDetailHero from "@/components/service-areas/ServiceAreaDetailHero";
import ServiceAreaHighlights from "@/components/service-areas/ServiceAreaHighlights";
import ServiceAreaNearby from "@/components/service-areas/ServiceAreaNearby";
import ServiceAreaFAQ from "@/components/service-areas/ServiceAreaFAQ";
import ServiceAreaFinalCTA from "@/components/service-areas/ServiceAreaFinalCTA";

import { getServiceAreaBySlug } from "@/features/service-areas/queries/getServiceAreaBySlug";

interface ServiceAreaDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ServiceAreaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const area = await getServiceAreaBySlug(slug);

  if (!area) {
    return {
      title: "Service Area Not Found",
      description:
        "The requested GR Pest Control service area could not be found.",
    };
  }

  const title =
    area.seoTitle ||
    `Pest Control in ${area.name} | GR Pest Control`;

  const description =
    area.seoDescription ||
    area.shortDescription;

  return {
    title,
    description,

    alternates: {
      canonical: `/service-areas/${area.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "website",

      ...(area.image?.url
        ? {
            images: [
              {
                url: area.image.url,
                alt:
                  area.image.alt ||
                  `Pest control in ${area.name}`,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      ...(area.image?.url
        ? {
            images: [area.image.url],
          }
        : {}),
    },
  };
}

export default async function ServiceAreaDetailPage({
  params,
}: ServiceAreaDetailPageProps) {
  const { slug } = await params;

  await connectDB();

  const [area, settingsDoc] =
    await Promise.all([
      getServiceAreaBySlug(slug),

      SiteSettings.findOne({
        active: true,
      })
        .lean()
        .exec(),
    ]);

  /*
   * Invalid slug OR inactive area.
   */
  if (!area) {
    notFound();
  }

  /*
   * Shared Navbar/Footer require
   * website settings.
   */
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

  /*
   * Keep the same settings ViewModel shape
   * used by the rest of the public website.
   */
  const settings = {
    id: String(settingsDoc._id),

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
      settingsDoc.currency || "INR",

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

    createdAt: new Date(
      settingsDoc.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      settingsDoc.updatedAt,
    ).toISOString(),
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================
          NAVBAR
      ========================== */}

      <Navbar settings={settings} />

      {/* =========================
          BREADCRUMB
      ========================== */}

      <ServiceAreaBreadcrumb
        areaName={area.name}
      />

      {/* =========================
          HERO
      ========================== */}

      <ServiceAreaDetailHero
        name={area.name}
        shortDescription={
          area.shortDescription
        }
        description={
          area.description
        }
        image={area.image}
      />

      {/* =========================
          LOCAL HIGHLIGHTS
      ========================== */}

      <ServiceAreaHighlights
        areaName={area.name}
        highlights={
          area.highlights
        }
      />

      {/* =========================
          NEARBY AREAS
      ========================== */}

      <ServiceAreaNearby
        areaName={area.name}
        nearbyAreas={
          area.nearbyAreas
        }
      />

      {/* =========================
          FAQ
      ========================== */}

      <ServiceAreaFAQ
        areaName={area.name}
        faqs={area.faqs}
      />

      {/* =========================
          FINAL CTA
      ========================== */}

      <ServiceAreaFinalCTA
        areaName={area.name}
      />

      {/* =========================
          FOOTER
      ========================== */}

      <Footer settings={settings} />
    </main>
  );
}