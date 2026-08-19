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

import {
  createGalleryMetadata,
} from "@/lib/seo/metadata";

import {
  createJsonLdGraph,
  createImageObjectSchema,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo/schemas";

import JsonLd from "@/components/seo/JsonLd";

/* =========================================================
   TYPES
========================================================= */

interface GalleryDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   RENDERING
========================================================= */

export const dynamic = "force-dynamic";

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const item =
    await getGalleryItemBySlug(slug);

  /*
   * Invalid / inactive gallery item.
   */
  if (!item) {
    return {
      title: "Gallery Item Not Found",

      description:
        "The requested GR Pest Control gallery item could not be found.",

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

  return createGalleryMetadata({
    title:
      item.title,

    seoTitle:
      item.seoTitle,

    description:
      item.description,

    seoDescription:
      item.seoDescription,

    slug:
      item.slug,

    image:
      item.image.url,

    imageAlt:
      item.image.alt ||
      item.title,
  });
}

/* =========================================================
   PAGE
========================================================= */

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

  /* =======================================================
     INVALID ITEM
  ======================================================= */

  if (!item) {
    notFound();
  }

  /* =======================================================
     SITE SETTINGS
  ======================================================= */

  if (!settingsDoc) {
    throw new Error(
      "Site settings are not configured.",
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
          url:
            settingsDoc.logo.url,

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
     RELATED GALLERY
  ======================================================= */

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

  /* =======================================================
     BREADCRUMBS
  ======================================================= */

  const breadcrumbItems = [
    {
      name: "Home",
      url: "/",
    },

    {
      name: "Gallery",
      url: "/gallery",
    },

    {
      name: item.title,
      url:
        `/gallery/${item.slug}`,
    },
  ];

  /* =======================================================
     JSON-LD
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
      /* ---------------------------------------------------
         IMAGE
      ---------------------------------------------------- */

      createImageObjectSchema({
        url:
          item.image.url,

        name:
          item.title,

        description:
          item.image.alt ||
          item.description,
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
          item.seoTitle ||
          item.title,

        description:
          item.seoDescription ||
          item.description,

        url:
          `/gallery/${item.slug}`,
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
            NAVBAR
        ================================================== */}

        <Navbar
          settings={
            settings
          }
        />

        {/* =================================================
            BREADCRUMB
        ================================================== */}

        <GalleryBreadcrumb
          title={
            item.title
          }

          category={
            item.category
          }
        />

        {/* =================================================
            DETAIL HERO
        ================================================== */}

        <GalleryDetailHero
          title={
            item.title
          }

          description={
            item.description
          }

          category={
            item.category
          }

          image={
            item.image
          }
        />

        {/* =================================================
            DETAIL CONTENT
        ================================================== */}

        <GalleryDetailContent
          title={
            item.title
          }

          description={
            item.description
          }

          category={
            item.category
          }
        />

        {/* =================================================
            RELATED
        ================================================== */}

        <RelatedGallery
          items={
            relatedItems
          }
        />

        {/* =================================================
            FINAL CTA
        ================================================== */}

        <GalleryFinalCTA />

        {/* =================================================
            FOOTER
        ================================================== */}

        <Footer
          settings={
            settings
          }
        />
      </main>
    </>
  );
}