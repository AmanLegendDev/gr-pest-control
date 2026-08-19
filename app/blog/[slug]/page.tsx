import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import BlogDetailHero from "@/components/blog/BlogDetailHero";
import BlogDetailContent from "@/components/blog/BlogDetailContent";
import BlogDetailSidebar from "@/components/blog/BlogDetailSidebar";
import BlogRelatedPosts from "@/components/blog/BlogRelatedPosts";
import BlogFinalCTA from "@/components/blog/BlogFinalCTA";

import {
  getBlogBySlug,
} from "@/features/blog/queries/getBlogBySlug";

import {
  getPublishedBlogs,
} from "@/features/blog/queries/getPublishedBlogs";

import {
  createBlogMetadata,
} from "@/lib/seo/metadata";

import {
  createJsonLdGraph,
  createArticleSchema,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo/schemas";

import JsonLd from "@/components/seo/JsonLd";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const post =
    await getBlogBySlug(slug);

  /*
   * Invalid / unpublished / unavailable article.
   */
  if (!post) {
    return {
      title: "Article Not Found",

      description:
        "The requested GR Pest Control article could not be found.",

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

  return createBlogMetadata({
    title:
      post.title,

    seoTitle:
      post.seoTitle,

    excerpt:
      post.excerpt,

    seoDescription:
      post.seoDescription,

    slug:
      post.slug,

    featuredImage:
      post.featuredImage?.url,

    imageAlt:
      post.featuredImage?.alt ||
      post.title,

    publishedAt:
      post.publishedAt,

    updatedAt:
      post.updatedAt,
  });
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;

  await connectDB();

  const [
    post,
    publishedPosts,
    settingsDoc,
  ] = await Promise.all([
    getBlogBySlug(slug),

    getPublishedBlogs(),

    SiteSettings.findOne({
      active: true,
    })
      .lean()
      .exec(),
  ]);

  /*
   * Invalid / unpublished / future article.
   */
  if (!post) {
    notFound();
  }

  if (!settingsDoc) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

  /* =======================================================
     RELATED ARTICLES
  ======================================================= */

  const relatedPosts =
    publishedPosts
      .filter(
        (item) =>
          item.slug !== post.slug &&
          item.category
            .trim()
            .toLowerCase() ===
            post.category
              .trim()
              .toLowerCase(),
      )
      .slice(0, 3);

  const finalRelatedPosts =
    relatedPosts.length > 0
      ? relatedPosts
      : publishedPosts
          .filter(
            (item) =>
              item.slug !== post.slug,
          )
          .slice(0, 3);

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

    ...(post.category?.trim()
      ? [
          {
            name:
              post.category,

            /*
             * We don't invent a category URL
             * because your current route structure
             * doesn't confirm one.
             */
            url: "/blog",
          },
        ]
      : []),

    {
      name:
        post.title,

      url:
        `/blog/${post.slug}`,
    },
  ];

  /* =======================================================
     JSON-LD
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
      /* ---------------------------------------------------
         ARTICLE
      ---------------------------------------------------- */

      createArticleSchema({
        title:
          post.title,

        description:
          post.seoDescription ||
          post.excerpt,

        url:
          `/blog/${post.slug}`,

        image:
          post.featuredImage?.url,

        authorName:
          post.author,

        publishedAt:
          post.publishedAt,

        updatedAt:
          post.updatedAt,

        section:
          post.category,

        tags:
          post.tags,
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
          post.seoTitle ||
          post.title,

        description:
          post.seoDescription ||
          post.excerpt,

        url:
          `/blog/${post.slug}`,
      }),
    ]);

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

        <BlogBreadcrumb
          title={
            post.title
          }
          category={
            post.category
          }
        />

        {/* =================================================
            ARTICLE HERO
        ================================================== */}

        <BlogDetailHero
          title={
            post.title
          }

          excerpt={
            post.excerpt
          }

          category={
            post.category
          }

          tags={
            post.tags
          }

          author={
            post.author
          }

          publishedAt={
            post.publishedAt
          }

          featuredImage={
            post.featuredImage
          }
        />

        {/* =================================================
            ARTICLE BODY
        ================================================== */}

        <section
          className="
            bg-white
            px-4
            py-14
            sm:px-6
            sm:py-20
            lg:px-8
            lg:py-24
          "
        >
          <div
            className="
              mx-auto
              grid
              max-w-6xl
              items-start
              gap-10
              lg:grid-cols-[minmax(0,1fr)_320px]
              lg:gap-14
              xl:grid-cols-[minmax(0,1fr)_340px]
              xl:gap-16
            "
          >
            <BlogDetailContent
              content={
                post.content
              }
            />

            <BlogDetailSidebar
              category={
                post.category
              }

              author={
                post.author
              }

              publishedAt={
                post.publishedAt
              }

              tags={
                post.tags
              }
            />
          </div>
        </section>

        {/* =================================================
            RELATED ARTICLES
        ================================================== */}

        <BlogRelatedPosts
          posts={
            finalRelatedPosts
          }
          excludeSlug={
            post.slug
          }
        />

        {/* =================================================
            FINAL CTA
        ================================================== */}

        <BlogFinalCTA />

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