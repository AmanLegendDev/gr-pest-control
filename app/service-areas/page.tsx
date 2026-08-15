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

import { getActiveServiceAreas } from "@/features/service-areas/queries/getActiveServiceAreas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pest Control Service Areas",
  description:
    "Explore the areas served by GR Pest Control and find professional pest control services near you.",
  alternates: {
    canonical: "/service-areas",
  },
};

export default async function ServiceAreasPage() {
  await connectDB();

  const [areas, settingsDoc] =
    await Promise.all([
      getActiveServiceAreas(),

      SiteSettings.findOne({
        active: true,
      })
        .lean()
        .exec(),
    ]);

  /*
   * Website settings are required by
   * the shared Navbar and Footer.
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
   * Separate featured areas from the
   * normal service-area grid so the
   * same area is never displayed twice.
   */
  const featuredAreas = areas.filter(
    (area) => area.featured,
  );

  const regularAreas = areas.filter(
    (area) => !area.featured,
  );

  /*
   * Keep the same settings ViewModel
   * shape used across the public website.
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
    <><Navbar settings={settings} />
    <main className="min-h-screen bg-[#F8FAFC] mt-16">
      {/* =========================
          NAVIGATION
      ========================== */}

      

      {/* =========================
          HERO
      ========================== */}

      <ServiceAreasHero
        areaCount={areas.length}
      />

      {/* =========================
          FEATURED AREAS
      ========================== */}

      <FeaturedServiceAreas
        areas={featuredAreas}
      />

      {/* =========================
          ALL AREAS
      ========================== */}

      <ServiceAreasGrid
        areas={regularAreas}
      />

      {/* =========================
          COVERAGE HELP
      ========================== */}

      <ServiceAreasHelpCTA />

      {/* =========================
          FINAL CTA
      ========================== */}

      <ServiceAreasFinalCTA
        areaCount={areas.length}
      />

      {/* =========================
          FOOTER
      ========================== */}

      <Footer settings={settings} />
    </main>
    </>
  );
}