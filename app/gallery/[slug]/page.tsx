import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";

import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import GalleryBreadcrumb from "@/components/gallery/GalleryBreadcrumb";
import GalleryDetailHero from "@/components/gallery/GalleryDetailHero";
import GalleryDetailContent from "@/components/gallery/GalleryDetailContent";
import RelatedGallery from "@/components/gallery/RelatedGallery";
import GalleryFinalCTA from "@/components/gallery/GalleryFinalCTA";

import {
  getGalleryItemBySlug,
} from "@/features/gallery/queries/getGalleryItemBySlug";

import {
  getActiveGalleryItems,
} from "@/features/gallery/queries/getActiveGalleryItems";

interface GalleryDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const item =
    await getGalleryItemBySlug(slug);

  if (!item) {
    return {
      title:
        "Gallery Item Not Found | GR Pest Control",

      description:
        "The requested gallery item could not be found.",
    };
  }

  const title =
    item.seoTitle ||
    `${item.title} | GR Pest Control`;

  const description =
    item.seoDescription ||
    item.description;

  return {
    title,

    description,

    alternates: {
      canonical: `/gallery/${item.slug}`,
    },

    openGraph: {
      title,

      description,

      type: "website",

      images: [
        {
          url: item.image.url,

          alt:
            item.image.alt ||
            item.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [
        item.image.url,
      ],
    },
  };
}

export default async function GalleryDetailPage({
  params,
}: GalleryDetailPageProps) {
  const { slug } = await params;

  await connectDB();

  const [
    item,
    allItems,
    settingsDoc,
  ] = await Promise.all([
    getGalleryItemBySlug(slug),

    getActiveGalleryItems(),

    SiteSettings.findOne({
      active: true,
    })
      .lean()
      .exec(),
  ]);

  if (!item) {
    notFound();
  }

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
      "INR",

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
     RELATED GALLERY
  ========================== */

  const sameCategory =
    allItems.filter(
      (galleryItem) =>
        galleryItem.slug !==
          item.slug &&
        galleryItem.category ===
          item.category,
    );

  const fallbackRelated =
    allItems.filter(
      (galleryItem) =>
        galleryItem.slug !==
        item.slug,
    );

  const relatedItems =
    sameCategory.length > 0
      ? sameCategory.slice(0, 3)
      : fallbackRelated.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================
          NAVBAR
      ========================== */}

      <Navbar settings={settings} />

      {/* =========================
          BREADCRUMB
          BELOW NAVBAR
      ========================== */}

      <GalleryBreadcrumb
        title={item.title}
        category={item.category}
      />

      {/* =========================
          DETAIL HERO
      ========================== */}

      <GalleryDetailHero
        title={item.title}
        description={item.description}
        category={item.category}
        image={item.image}
      />

      {/* =========================
          DETAIL CONTENT
      ========================== */}

      <GalleryDetailContent
        title={item.title}
        description={item.description}
        category={item.category}
      />

      {/* =========================
          RELATED
      ========================== */}

      <RelatedGallery
        items={relatedItems}
      />

      {/* =========================
          FINAL CTA
      ========================== */}

      <GalleryFinalCTA />

      {/* =========================
          FOOTER
      ========================== */}

      <Footer settings={settings} />
    </main>
  );
}