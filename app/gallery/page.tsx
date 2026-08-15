import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";

import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryCategoryNav from "@/components/gallery/GalleryCategoryNav";
import FeaturedGalleryPreview from "@/components/gallery/FeaturedGalleryPreview";
import GalleryPreview from "@/components/gallery/GalleryPreview";
import GalleryHelpCTA from "@/components/gallery/GalleryHelpCTA";

import {
  getActiveGalleryItems,
} from "@/features/gallery/queries/getActiveGalleryItems";

export const metadata: Metadata = {
  title: "Gallery | GR Pest Control",
  description:
    "Explore GR Pest Control's work across homes, workplaces, commercial properties and professional pest treatments.",
  alternates: {
    canonical: "/gallery",
  },
};

export const dynamic = "force-dynamic";

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const VALID_CATEGORIES = [
  "home",
  "workplace",
  "commercial",
  "residential",
  "treatment",
  "team",
  "other",
] as const;

export default async function GalleryPage({
  searchParams,
}: GalleryPageProps) {
  const params = await searchParams;

  const requestedCategory =
    params.category?.trim().toLowerCase() ?? "";

  const activeCategory =
    VALID_CATEGORIES.includes(
      requestedCategory as (typeof VALID_CATEGORIES)[number],
    )
      ? requestedCategory
      : "";

  await connectDB();

  const [items, settingsDoc] =
    await Promise.all([
      getActiveGalleryItems(),

      SiteSettings.findOne({
        active: true,
      })
        .lean()
        .exec(),
    ]);

  if (!settingsDoc) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

  /* =========================
     SETTINGS
  ========================== */

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

    email: settingsDoc.email,

    phone: settingsDoc.phone,

    whatsapp: settingsDoc.whatsapp,

    address: settingsDoc.address,

    city: settingsDoc.city,

    state: settingsDoc.state,

    pincode: settingsDoc.pincode,

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

  /* =========================
     CATEGORY FILTER
  ========================== */

  const filteredItems =
    activeCategory
      ? items.filter(
          (item) =>
            item.category ===
            activeCategory,
        )
      : items;

  /* =========================
     FEATURED
  ========================== */

  const featuredItems =
    activeCategory === ""
      ? items
          .filter(
            (item) => item.featured,
          )
          .slice(0, 3)
      : [];

  /* =========================
     CATEGORY COUNT
  ========================== */

  const categoryCount =
    new Set(
      items.map(
        (item) => item.category,
      ),
    ).size;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* NAVBAR */}

      <Navbar settings={settings} />

      {/* HERO */}

      <GalleryHero
        itemCount={
          filteredItems.length
        }
        categoryCount={
          categoryCount
        }
      />

      {/* CATEGORY NAV */}

      <GalleryCategoryNav
        activeCategory={
          activeCategory
        }
      />

      {/* FEATURED */}

     {featuredItems.length > 0 && (
  <FeaturedGalleryPreview
    items={featuredItems}
  />
)}

      {/* MAIN GALLERY */}

      <section
        className="
          bg-[#F8FAFC]
          px-4
          pb-14
          pt-2
          sm:px-6
          sm:pb-20
          lg:px-8
          lg:pb-24
        "
      >
        <div className="mx-auto max-w-7xl">
          <GalleryPreview
            items={filteredItems}
          />
        </div>
      </section>

      {/* HELP CTA */}

      <GalleryHelpCTA />

      {/* FOOTER */}

      <Footer settings={settings} />
    </main>
  );
}