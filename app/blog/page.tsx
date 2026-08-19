import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import BlogHero from "@/components/blog/BlogHero";
import FeaturedBlog from "@/components/blog/FeaturedBlog";
import BlogCategoryNav from "@/components/blog/BlogCategoryNav";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogHelpCTA from "@/components/blog/BlogHelpCTA";

import {
  getPublishedBlogs,
} from "@/features/blog/queries/getPublishedBlogs";

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

export const dynamic = "force-dynamic";

const POSTS_PER_PAGE = 9;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata =
  createStaticPageMetadata({
    title:
      "Pest Control Blog Sydney | GR Pest Control",

    description:
      "Practical pest control guides, prevention tips and expert advice for protecting homes and businesses across Sydney.",

    path: "/blog",

    image:
      "/og-image.jpg",

    imageAlt:
      "GR Pest Control — Pest Control Guides and Advice",
  });

/* =========================================================
   TYPES
========================================================= */

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const params =
    await searchParams;

  const requestedCategory =
    params.category?.trim() ?? "";

  const requestedPage =
    Number(params.page) || 1;

  await connectDB();

  /* =======================================================
     DATABASE
  ======================================================= */

  const [
    posts,
    settingsDoc,
  ] = await Promise.all([
    getPublishedBlogs(),

    SiteSettings.findOne({
      active: true,
    })
      .lean()
      .exec(),
  ]);

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories =
    Array.from(
      new Set(
        posts
          .map((post) =>
            post.category?.trim(),
          )
          .filter(Boolean),
      ),
    );

  const activeCategory =
    categories.find(
      (category) =>
        category.toLowerCase() ===
        requestedCategory.toLowerCase(),
    ) ?? "";

  /* =======================================================
     FILTERED POSTS
  ======================================================= */

  const filteredPosts =
    activeCategory === ""
      ? posts
      : posts.filter(
          (post) =>
            post.category
              .trim()
              .toLowerCase() ===
            activeCategory.toLowerCase(),
        );

  /* =======================================================
     FEATURED ARTICLE
  ======================================================= */

  const featuredPost =
    activeCategory === ""
      ? filteredPosts.find(
          (post) =>
            post.featured,
        ) ?? null
      : null;

  /* =======================================================
     GRID POSTS
  ======================================================= */

  const gridPosts =
    featuredPost
      ? filteredPosts.filter(
          (post) =>
            post.slug !==
            featuredPost.slug,
        )
      : filteredPosts;

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        gridPosts.length /
          POSTS_PER_PAGE,
      ),
    );

  const currentPage =
    Math.min(
      Math.max(
        requestedPage,
        1,
      ),
      totalPages,
    );

  const startIndex =
    (currentPage - 1) *
    POSTS_PER_PAGE;

  const paginatedPosts =
    gridPosts.slice(
      startIndex,
      startIndex +
        POSTS_PER_PAGE,
    );

  /* =======================================================
     SETTINGS
  ======================================================= */

  if (!settingsDoc) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

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
     BREADCRUMBS
  ======================================================= */

  const breadcrumbItems = [
    {
      name: "Home",
      url: "/",
    },

    {
      name: "Blog",
      url: "/blog",
    },
  ];

  /* =======================================================
     JSON-LD
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
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
          "Pest Control Blog Sydney | GR Pest Control",

        description:
          "Practical pest control guides, prevention tips and expert advice for protecting homes and businesses across Sydney.",

        url:
          "/blog",
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
            settings
          }
        />

        {/* =================================================
            HERO
        ================================================== */}

        <BlogHero
          postCount={
            filteredPosts.length
          }
          categories={
            categories
          }
        />

        {/* =================================================
            FEATURED
        ================================================== */}

        {featuredPost && (
          <FeaturedBlog
            post={
              featuredPost
            }
          />
        )}

        {/* =================================================
            CATEGORY NAV
        ================================================== */}

        <BlogCategoryNav
          categories={
            categories
          }
          activeCategory={
            activeCategory
          }
        />

        {/* =================================================
            BLOG GRID
        ================================================== */}

        <BlogGrid
          posts={
            paginatedPosts
          }
        />

        {/* =================================================
            PAGINATION
        ================================================== */}

        <div
          className="
            bg-[#F8FAFC]
            px-4
            pb-14
            sm:px-6
            sm:pb-20
            lg:px-8
            lg:pb-24
          "
        >
          <div className="mx-auto max-w-7xl">
            <BlogPagination
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
              category={
                activeCategory
              }
            />
          </div>
        </div>

        {/* =================================================
            HELP CTA
        ================================================== */}

        <BlogHelpCTA />

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