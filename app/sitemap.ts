import type { MetadataRoute } from "next";

import { connectDB } from "@/lib/db/connect";

import Service from "@/models/Service";
import ServiceArea from "@/models/ServiceArea";
import Blog from "@/models/BlogPost";
import Gallery from "@/models/GalleryItem";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://gr-pest-control.vercel.app"
).replace(/\/+$/, "");

export const revalidate = 3600;

type SitemapItem = MetadataRoute.Sitemap[number];

/* =========================================================
   STATIC INDEXABLE PAGES
========================================================= */

const STATIC_PAGES: SitemapItem[] = [
  {
    url: `${SITE_URL}/`,
    changeFrequency: "weekly",
    priority: 1,
  },

  {
    url: `${SITE_URL}/services`,
    changeFrequency: "weekly",
    priority: 0.9,
  },

  {
    url: `${SITE_URL}/service-areas`,
    changeFrequency: "weekly",
    priority: 0.9,
  },

  {
    url: `${SITE_URL}/about`,
    changeFrequency: "monthly",
    priority: 0.7,
  },

  {
    url: `${SITE_URL}/contact`,
    changeFrequency: "monthly",
    priority: 0.8,
  },

  {
    url: `${SITE_URL}/blog`,
    changeFrequency: "weekly",
    priority: 0.8,
  },

  {
    url: `${SITE_URL}/gallery`,
    changeFrequency: "weekly",
    priority: 0.7,
  },

  {
    url: `${SITE_URL}/faq`,
    changeFrequency: "monthly",
    priority: 0.6,
  },

  {
    url: `${SITE_URL}/testimonials`,
    changeFrequency: "monthly",
    priority: 0.6,
  },

  {
    url: `${SITE_URL}/quote`,
    changeFrequency: "monthly",
    priority: 0.8,
  },

  {
    url: `${SITE_URL}/privacy`,
    changeFrequency: "yearly",
    priority: 0.3,
  },

  {
    url: `${SITE_URL}/terms`,
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

/* =========================================================
   SITEMAP
========================================================= */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB();

    const [
      services,
      serviceAreas,
      blogs,
      galleryItems,
    ] = await Promise.all([
      /* ---------------------------------------------------
         ACTIVE SERVICES
      ---------------------------------------------------- */

      Service.find({
        active: true,
      })
        .select({
          slug: 1,
          updatedAt: 1,
        })
        .lean()
        .exec(),

      /* ---------------------------------------------------
         ACTIVE SERVICE AREAS
      ---------------------------------------------------- */

      ServiceArea.find({
        active: true,
      })
        .select({
          slug: 1,
          updatedAt: 1,
        })
        .lean()
        .exec(),

      /* ---------------------------------------------------
         PUBLISHED BLOG POSTS
      ---------------------------------------------------- */

      Blog.find({
        published: true,
      })
        .select({
          slug: 1,
          publishedAt: 1,
          updatedAt: 1,
        })
        .lean()
        .exec(),

      /* ---------------------------------------------------
         ACTIVE GALLERY ITEMS
      ---------------------------------------------------- */

      Gallery.find({
        active: true,
      })
        .select({
          slug: 1,
          updatedAt: 1,
        })
        .lean()
        .exec(),
    ]);

    /* =====================================================
       SERVICE PAGES
    ====================================================== */

    const servicePages: SitemapItem[] =
      services.map(
        (service) => ({
          url:
            `${SITE_URL}/services/${service.slug}`,

          lastModified:
            service.updatedAt
              ? new Date(
                  service.updatedAt,
                )
              : undefined,

          changeFrequency:
            "monthly",

          priority:
            0.8,
        }),
      );

    /* =====================================================
       SERVICE AREA PAGES
    ====================================================== */

    const serviceAreaPages:
      SitemapItem[] =
      serviceAreas.map(
        (area) => ({
          url:
            `${SITE_URL}/service-areas/${area.slug}`,

          lastModified:
            area.updatedAt
              ? new Date(
                  area.updatedAt,
                )
              : undefined,

          changeFrequency:
            "monthly",

          priority:
            0.8,
        }),
      );

    /* =====================================================
       BLOG PAGES
    ====================================================== */

    const blogPages: SitemapItem[] =
      blogs.map(
        (blog) => ({
          url:
            `${SITE_URL}/blog/${blog.slug}`,

          lastModified:
            blog.updatedAt
              ? new Date(
                  blog.updatedAt,
                )
              : blog.publishedAt
                ? new Date(
                    blog.publishedAt,
                  )
                : undefined,

          changeFrequency:
            "monthly",

          priority:
            0.7,
        }),
      );

    /* =====================================================
       GALLERY PAGES
    ====================================================== */

    const galleryPages:
      SitemapItem[] =
      galleryItems.map(
        (item) => ({
          url:
            `${SITE_URL}/gallery/${item.slug}`,

          lastModified:
            item.updatedAt
              ? new Date(
                  item.updatedAt,
                )
              : undefined,

          changeFrequency:
            "monthly",

          priority:
            0.6,
        }),
      );

    /* =====================================================
       FINAL SITEMAP
    ====================================================== */

    return [
      ...STATIC_PAGES,

      ...servicePages,

      ...serviceAreaPages,

      ...blogPages,

      ...galleryPages,
    ];
  } catch (error) {
    console.error(
      "SITEMAP_GENERATION_ERROR",
      error,
    );

    /*
     * Keep sitemap valid even if
     * MongoDB is temporarily unavailable.
     */
    return STATIC_PAGES;
  }
}