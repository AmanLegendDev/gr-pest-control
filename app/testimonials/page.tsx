import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import TestimonialBreadcrumb from "@/components/testimonials/TestimonialBreadcrumb";
import TestimonialHero from "@/components/testimonials/TestimonialHero";
import TestimonialStats from "@/components/testimonials/TestimonialStats";
import TestimonialFeatured from "@/components/testimonials/TestimonialFeatured";
import TestimonialGrid from "@/components/testimonials/TestimonialGrid";
import TestimonialCTA from "@/components/testimonials/TestimonialCTA";

import { getSiteSettings } from "@/features/about/queries/getSiteSettings";

import {
  getActiveTestimonials,
} from "@/features/testimonials/queries/getActiveTestimonials";

import {
  getFeaturedTestimonials,
} from "@/features/testimonials/queries/getFeaturedTestimonials";

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

export const dynamic =
  "force-dynamic";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata =
  createStaticPageMetadata({
    title:
      "Customer Reviews & Testimonials | GR Pest Control",

    description:
      "Read customer experiences with GR Pest Control and learn about our professional pest management services for homes and businesses across Sydney.",

    path: "/testimonials",

    image:
      "/og-image.jpg",

    imageAlt:
      "GR Pest Control — Customer Reviews and Testimonials",
  });

/* =========================================================
   PAGE
========================================================= */

export default async function TestimonialsPage() {
  await connectDB();

  /* =======================================================
     DATABASE
  ======================================================= */

  const [
    settings,
    testimonials,
    featuredTestimonials,
  ] = await Promise.all([
    getSiteSettings(),

    getActiveTestimonials(),

    getFeaturedTestimonials(),
  ]);

  if (!settings) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

  /* =======================================================
     RATING STATISTICS
  ======================================================= */

  const testimonialCount =
    testimonials.length;

  const totalRating =
    testimonials.reduce(
      (total, testimonial) =>
        total +
        testimonial.rating,
      0,
    );

  const averageRating =
    testimonialCount > 0
      ? totalRating /
        testimonialCount
      : 0;

  const fiveStarCount =
    testimonials.filter(
      (testimonial) =>
        testimonial.rating ===
        5,
    ).length;

  /* =======================================================
     NAVBAR / FOOTER SETTINGS
  ======================================================= */

  const navbarFooterSettings = {
    id:
      settings.id,

    businessName:
      settings.businessName,

    shortDescription:
      settings.shortDescription,

    logo:
      settings.logo,

    email:
      settings.email,

    phone:
      settings.phone,

    whatsapp:
      settings.whatsapp,

    address:
      settings.address,

    city:
      settings.city,

    state:
      settings.state,

    pincode:
      settings.pincode,

    socialLinks:
      settings.socialLinks,

    primaryCTA:
      settings.primaryCTA,

    currency:
      settings.currency,

    businessHours:
      settings.businessHours,

    siteTitle:
      settings.siteTitle,

    siteDescription:
      settings.siteDescription,

    favicon:
      settings.favicon,

    active:
      settings.active,

    createdAt:
      settings.createdAt,

    updatedAt:
      settings.updatedAt,
  };

  /* =======================================================
     TESTIMONIAL DATA
  ======================================================= */

  const testimonialItems =
    testimonials.map(
      (testimonial) => ({
        id:
          testimonial.id,

        name:
          testimonial.name,

        role:
          testimonial.role,

        company:
          testimonial.company,

        content:
          testimonial.content,

        rating:
          testimonial.rating,

        location:
          testimonial.location,

        image:
          testimonial.image,

        featured:
          testimonial.featured,
      }),
    );

  const featuredItems =
    featuredTestimonials.map(
      (testimonial) => ({
        id:
          testimonial.id,

        name:
          testimonial.name,

        role:
          testimonial.role,

        company:
          testimonial.company,

        content:
          testimonial.content,

        rating:
          testimonial.rating,

        location:
          testimonial.location,

        image:
          testimonial.image,

        featured:
          testimonial.featured,
      }),
    );

  /* =======================================================
     BREADCRUMBS
  ======================================================= */

  const breadcrumbSchema =
    createBreadcrumbSchema([
      {
        name:
          "Home",

        url:
          "/",
      },

      {
        name:
          "Testimonials",

        url:
          "/testimonials",
      },
    ]);

  /* =======================================================
     WEB PAGE
  ======================================================= */

  const webPageSchema =
    createWebPageSchema({
      name:
        "Customer Reviews & Testimonials | GR Pest Control",

      description:
        "Read customer experiences with GR Pest Control and learn about our professional pest management services for homes and businesses across Sydney.",

      url:
        "/testimonials",
    });

  /* =======================================================
     JSON-LD GRAPH
  ======================================================= */

  const jsonLd =
    createJsonLdGraph([
      breadcrumbSchema,
      webPageSchema,
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
            navbarFooterSettings
          }
        />

        {/* =================================================
            BREADCRUMB
        ================================================== */}

        <TestimonialBreadcrumb />

        {/* =================================================
            HERO
        ================================================== */}

        <TestimonialHero
          businessName={
            settings.businessName
          }

          testimonialCount={
            testimonialCount
          }

          featuredCount={
            featuredTestimonials.length
          }

          averageRating={
            averageRating
          }
        />

        {/* =================================================
            TRUST STATISTICS
        ================================================== */}

        <TestimonialStats
          testimonialCount={
            testimonialCount
          }

          averageRating={
            averageRating
          }

          fiveStarCount={
            fiveStarCount
          }
        />

        {/* =================================================
            FEATURED REVIEWS
        ================================================== */}

        <TestimonialFeatured
          items={
            featuredItems
          }
        />

        {/* =================================================
            ALL CUSTOMER STORIES
        ================================================== */}

        <TestimonialGrid
          items={
            testimonialItems
          }
        />

        {/* =================================================
            CTA
        ================================================== */}

        <TestimonialCTA
          businessName={
            settings.businessName
          }

          primaryCTA={
            settings.primaryCTA
          }

          phone={
            settings.phone
          }

          whatsapp={
            settings.whatsapp
          }
        />

        {/* =================================================
            FOOTER
        ================================================== */}

        <Footer
          settings={
            navbarFooterSettings
          }
        />
      </main>
    </>
  );
}