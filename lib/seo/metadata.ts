import type { Metadata } from "next";

/* =========================================================
   SITE CONFIG
========================================================= */

export const SITE_NAME = "GR Pest Control";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://gr-pest-control.vercel.app"
).replace(/\/+$/, "");

export const DEFAULT_SITE_TITLE =
  "Pest Control Sydney | GR Pest Control";

export const DEFAULT_SITE_DESCRIPTION =
  "Professional pest control services for homes and businesses across Sydney. Get practical pest management solutions from GR Pest Control.";

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

/* =========================================================
   TYPES
========================================================= */

export interface SeoMetadataInput {
  title?: string | null;
  description?: string | null;

  path?: string;

  image?: string | null;
  imageAlt?: string | null;

  type?: "website" | "article";

  publishedTime?: string | Date | null;
  modifiedTime?: string | Date | null;

  noIndex?: boolean;
}

/* =========================================================
   HELPERS
========================================================= */

function cleanText(
  value: string | null | undefined,
): string {
  return value?.trim() ?? "";
}

function cleanPath(
  value: string | undefined,
): string {
  if (!value) {
    return "/";
  }

  const normalized = value.trim();

  if (!normalized) {
    return "/";
  }

  return normalized.startsWith("/")
    ? normalized
    : `/${normalized}`;
}

function toAbsoluteUrl(
  value: string | null | undefined,
  fallback: string,
): string {
  const cleaned = cleanText(value);

  if (!cleaned) {
    return `${SITE_URL}${fallback.startsWith("/") ? fallback : `/${fallback}`}`;
  }

  if (
    cleaned.startsWith("http://") ||
    cleaned.startsWith("https://")
  ) {
    return cleaned;
  }

  const path = cleaned.startsWith("/")
    ? cleaned
    : `/${cleaned}`;

  return `${SITE_URL}${path}`;
}

function toISODate(
  value: string | Date | null | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

/* =========================================================
   MAIN METADATA BUILDER
========================================================= */

export function createSeoMetadata({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: SeoMetadataInput): Metadata {
  const cleanTitle =
    cleanText(title) || DEFAULT_SITE_TITLE;

  const cleanDescription =
    cleanText(description) ||
    DEFAULT_SITE_DESCRIPTION;

  const canonicalPath = cleanPath(path);

  const canonicalUrl =
    `${SITE_URL}${canonicalPath}`;

  const imageUrl = toAbsoluteUrl(
    image,
    DEFAULT_OG_IMAGE,
  );

  const finalImageAlt =
    cleanText(imageAlt) ||
    `${SITE_NAME} — Professional Pest Control`;

  const published =
    toISODate(publishedTime);

  const modified =
    toISODate(modifiedTime);

  const metadata: Metadata = {
    title: cleanTitle,

    description: cleanDescription,

    alternates: {
      canonical: canonicalPath,
    },

    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      type,

      url: canonicalUrl,

      siteName: SITE_NAME,

      locale: "en_AU",

      title: cleanTitle,

      description: cleanDescription,

      images: [
        {
          url: imageUrl,

          width: 1200,

          height: 630,

          alt: finalImageAlt,
        },
      ],

      ...(type === "article"
        ? {
            publishedTime: published,
            modifiedTime: modified,
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",

      title: cleanTitle,

      description: cleanDescription,

      images: [imageUrl],
    },
  };

  return metadata;
}

/* =========================================================
   STATIC PAGE HELPER
========================================================= */

export function createStaticPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  imageAlt?: string | null;
  noIndex?: boolean;
}): Metadata {
  return createSeoMetadata({
    title,
    description,
    path,
    image,
    imageAlt,
    type: "website",
    noIndex,
  });
}

/* =========================================================
   SERVICE PAGE
========================================================= */

export function createServiceMetadata({
  title,
  description,
  slug,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  imageAlt?: string | null;
}): Metadata {
  return createSeoMetadata({
    title,
    description,
    path: `/services/${slug}`,
    image,
    imageAlt:
      imageAlt ||
      `${title} — ${SITE_NAME}`,
    type: "website",
  });
}

/* =========================================================
   SERVICE AREA PAGE
========================================================= */

export function createServiceAreaMetadata({
  name,
  seoTitle,
  seoDescription,
  shortDescription,
  slug,
  image,
  imageAlt,
}: {
  name: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  shortDescription?: string | null;
  slug: string;
  image?: string | null;
  imageAlt?: string | null;
}): Metadata {
  const finalTitle =
    cleanText(seoTitle) ||
    `Pest Control ${name} NSW | ${SITE_NAME}`;

  const finalDescription =
    cleanText(seoDescription) ||
    cleanText(shortDescription) ||
    `Professional pest control services in ${name}, NSW from ${SITE_NAME}.`;

  return createSeoMetadata({
    title: finalTitle,
    description: finalDescription,
    path: `/service-areas/${slug}`,
    image,
    imageAlt:
      imageAlt ||
      `${name}, NSW — ${SITE_NAME}`,
    type: "website",
  });
}

/* =========================================================
   BLOG PAGE
========================================================= */

export function createBlogMetadata({
  title,
  seoTitle,
  excerpt,
  seoDescription,
  slug,
  featuredImage,
  imageAlt,
  publishedAt,
  updatedAt,
}: {
  title: string;
  seoTitle?: string | null;

  excerpt?: string | null;
  seoDescription?: string | null;

  slug: string;

  featuredImage?: string | null;
  imageAlt?: string | null;

  publishedAt?: string | Date | null;
  updatedAt?: string | Date | null;
}): Metadata {
  const finalTitle =
    cleanText(seoTitle) ||
    cleanText(title);

  const finalDescription =
    cleanText(seoDescription) ||
    cleanText(excerpt) ||
    `Read ${title} from ${SITE_NAME}.`;

  return createSeoMetadata({
    title: finalTitle,
    description: finalDescription,
    path: `/blog/${slug}`,
    image: featuredImage,
    imageAlt:
      imageAlt ||
      `${title} — ${SITE_NAME}`,
    type: "article",
    publishedTime: publishedAt,
    modifiedTime: updatedAt,
  });
}

/* =========================================================
   GALLERY PAGE
========================================================= */

export function createGalleryMetadata({
  title,
  seoTitle,
  description,
  seoDescription,
  slug,
  image,
  imageAlt,
}: {
  title: string;
  seoTitle?: string | null;

  description?: string | null;
  seoDescription?: string | null;

  slug: string;

  image?: string | null;
  imageAlt?: string | null;
}): Metadata {
  const finalTitle =
    cleanText(seoTitle) ||
    cleanText(title);

  const finalDescription =
    cleanText(seoDescription) ||
    cleanText(description) ||
    `${title} — ${SITE_NAME}.`;

  return createSeoMetadata({
    title: finalTitle,
    description: finalDescription,
    path: `/gallery/${slug}`,
    image,
    imageAlt:
      imageAlt ||
      `${title} — ${SITE_NAME}`,
    type: "website",
  });
}