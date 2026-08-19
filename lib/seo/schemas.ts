/* =========================================================
   GR PEST CONTROL — STRUCTURED DATA / JSON-LD
========================================================= */

export const SITE_NAME = "GR Pest Control";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://gr-pest-control.vercel.app"
).replace(/\/+$/, "");

const SCHEMA_CONTEXT = "https://schema.org";

/* =========================================================
   SHARED TYPES
========================================================= */

export interface SchemaImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BusinessHours {
  day: string;
  open?: string;
  close?: string;
  closed?: boolean;
}

/* =========================================================
   SAFE HELPERS
========================================================= */

function cleanText(
  value: string | null | undefined,
): string {
  return value?.trim() ?? "";
}

function absoluteUrl(
  value: string | null | undefined,
  fallback = "/",
): string {
  const cleaned = cleanText(value);

  if (!cleaned) {
    return `${SITE_URL}${
      fallback.startsWith("/")
        ? fallback
        : `/${fallback}`
    }`;
  }

  if (
    cleaned.startsWith("https://") ||
    cleaned.startsWith("http://")
  ) {
    return cleaned;
  }

  const path = cleaned.startsWith("/")
    ? cleaned
    : `/${cleaned}`;

  return `${SITE_URL}${path}`;
}

function normalizeDay(
  day: string,
): string {
  const value = day
    .trim()
    .toLowerCase();

  const map: Record<string, string> = {
    monday: "Monday",
    mon: "Monday",

    tuesday: "Tuesday",
    tue: "Tuesday",
    tues: "Tuesday",

    wednesday: "Wednesday",
    wed: "Wednesday",

    thursday: "Thursday",
    thu: "Thursday",
    thurs: "Thursday",

    friday: "Friday",
    fri: "Friday",

    saturday: "Saturday",
    sat: "Saturday",

    sunday: "Sunday",
    sun: "Sunday",
  };

  return map[value] || day;
}

function normalizeDate(
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
   JSON-LD SCRIPT DATA
========================================================= */

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonLdValue[]
  | {
      [key: string]: JsonLdValue;
    };

export function createJsonLdGraph(
  nodes: JsonLdValue[],
): Record<string, JsonLdValue> {
  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": nodes,
  };
}

/* =========================================================
   ORGANIZATION
========================================================= */

export interface OrganizationSchemaInput {
  name?: string;
  url?: string;
  logo?: string | null;
  email?: string | null;
  phone?: string | null;

  description?: string | null;

  sameAs?: string[];

  address?: {
    streetAddress?: string | null;
    addressLocality?: string | null;
    addressRegion?: string | null;
    postalCode?: string | null;
    addressCountry?: string;
  };
}

export function createOrganizationSchema(
  input: OrganizationSchemaInput = {},
): Record<string, JsonLdValue> {
  const name =
    cleanText(input.name) ||
    SITE_NAME;

  const url =
    absoluteUrl(input.url, "/");

  const organization: Record<
    string,
    JsonLdValue
  > = {
    "@type": "Organization",

    "@id": `${SITE_URL}/#organization`,

    name,

    url,

    description:
      cleanText(input.description) ||
      undefined,
  };

  const logo = cleanText(input.logo);

  if (logo) {
    organization.logo = {
      "@type": "ImageObject",
      url: absoluteUrl(logo),
    };
  }

  const email = cleanText(input.email);

  if (email) {
    organization.email = email;
  }

  const phone = cleanText(input.phone);

  if (phone) {
    organization.telephone = phone;
  }

  const sameAs = (input.sameAs || [])
    .map((item) => item.trim())
    .filter(Boolean);

  if (sameAs.length > 0) {
    organization.sameAs = sameAs;
  }

  if (input.address) {
    const address: Record<
      string,
      JsonLdValue
    > = {
      "@type": "PostalAddress",

      addressCountry:
        input.address.addressCountry ||
        "AU",
    };

    const street =
      cleanText(
        input.address.streetAddress,
      );

    const locality =
      cleanText(
        input.address.addressLocality,
      );

    const region =
      cleanText(
        input.address.addressRegion,
      );

    const postalCode =
      cleanText(
        input.address.postalCode,
      );

    if (street) {
      address.streetAddress = street;
    }

    if (locality) {
      address.addressLocality = locality;
    }

    if (region) {
      address.addressRegion = region;
    }

    if (postalCode) {
      address.postalCode = postalCode;
    }

    organization.address = address;
  }

  return removeUndefinedValues(
    organization,
  );
}

/* =========================================================
   LOCAL BUSINESS
========================================================= */

export interface LocalBusinessSchemaInput
  extends OrganizationSchemaInput {
  businessType?: string;

  priceRange?: string;

  areaServed?: string[];

  openingHours?: BusinessHours[];

  latitude?: number | null;
  longitude?: number | null;
}

export function createLocalBusinessSchema(
  input: LocalBusinessSchemaInput = {},
): Record<string, JsonLdValue> {
  const name =
    cleanText(input.name) ||
    SITE_NAME;

  const localBusiness: Record<
    string,
    JsonLdValue
  > = {
    "@type": [
      "LocalBusiness",
      input.businessType || "ProfessionalService",
    ],

    "@id": `${SITE_URL}/#local-business`,

    name,

    url: absoluteUrl(
      input.url,
      "/",
    ),

    description:
      cleanText(input.description) ||
      undefined,
  };

  const logo =
    cleanText(input.logo);

  if (logo) {
    localBusiness.logo = {
      "@type": "ImageObject",
      url: absoluteUrl(logo),
    };
  }

  const email =
    cleanText(input.email);

  if (email) {
    localBusiness.email = email;
  }

  const phone =
    cleanText(input.phone);

  if (phone) {
    localBusiness.telephone = phone;
  }

  if (input.priceRange) {
    localBusiness.priceRange =
      input.priceRange;
  }

  const sameAs = (input.sameAs || [])
    .map((item) => item.trim())
    .filter(Boolean);

  if (sameAs.length > 0) {
    localBusiness.sameAs = sameAs;
  }

  if (input.address) {
    const address: Record<
      string,
      JsonLdValue
    > = {
      "@type": "PostalAddress",

      addressCountry:
        input.address.addressCountry ||
        "AU",
    };

    const fields = {
      streetAddress:
        input.address.streetAddress,
      addressLocality:
        input.address.addressLocality,
      addressRegion:
        input.address.addressRegion,
      postalCode:
        input.address.postalCode,
    } as const;

    for (const [key, value] of Object.entries(
      fields,
    )) {
      const cleaned =
        cleanText(
          value,
        );

      if (cleaned) {
        address[key] = cleaned;
      }
    }

    localBusiness.address =
      address;
  }

  const areaServed = (
    input.areaServed || []
  )
    .map((area) =>
      cleanText(area),
    )
    .filter(Boolean);

  if (areaServed.length > 0) {
    localBusiness.areaServed =
      areaServed.map((area) => ({
        "@type": "City",
        name: area,
      }));
  }

  const openingHours = (
    input.openingHours || []
  )
    .filter(
      (item) =>
        item.closed !== true &&
        Boolean(item.open) &&
        Boolean(item.close),
    )
    .map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: normalizeDay(
        item.day,
      ),
      opens: item.open,
      closes: item.close,
    }));

  if (openingHours.length > 0) {
    localBusiness.openingHoursSpecification =
      openingHours;
  }

  if (
    typeof input.latitude ===
      "number" &&
    typeof input.longitude ===
      "number"
  ) {
    localBusiness.geo = {
      "@type": "GeoCoordinates",
      latitude:
        input.latitude,
      longitude:
        input.longitude,
    };
  }

  return removeUndefinedValues(
    localBusiness,
  );
}

/* =========================================================
   WEBSITE
========================================================= */

export function createWebSiteSchema(
  input: {
    name?: string;
    url?: string;
  } = {},
): Record<string, JsonLdValue> {
  return {
    "@type": "WebSite",

    "@id": `${SITE_URL}/#website`,

    name:
      cleanText(input.name) ||
      SITE_NAME,

    url: absoluteUrl(
      input.url,
      "/",
    ),

    publisher: {
      "@id":
        `${SITE_URL}/#organization`,
    },
  };
}

/* =========================================================
   BREADCRUMBS
========================================================= */

export function createBreadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, JsonLdValue> {
  const validItems = items
    .filter(
      (item) =>
        cleanText(item.name) &&
        cleanText(item.url),
    )
    .map(
      (item, index) => ({
        "@type":
          "ListItem",

        position:
          index + 1,

        name:
          cleanText(item.name),

        item:
          absoluteUrl(
            item.url,
          ),
      }),
    );

  return {
    "@type":
      "BreadcrumbList",

    "@id":
      `${SITE_URL}/#breadcrumb`,

    itemListElement:
      validItems,
  };
}

/* =========================================================
   SERVICE
========================================================= */

export interface ServiceSchemaInput {
  name: string;

  description?: string | null;

  url: string;

  image?: string | null;

  serviceType?: string | null;

  areaServed?: string[];

  providerName?: string;
}

export function createServiceSchema(
  input: ServiceSchemaInput,
): Record<string, JsonLdValue> {
  const schema: Record<
    string,
    JsonLdValue
  > = {
    "@type": "Service",

    "@id":
      `${absoluteUrl(input.url)}#service`,

    name:
      cleanText(input.name),

    description:
      cleanText(
        input.description,
      ) || undefined,

    url:
      absoluteUrl(input.url),

    provider: {
      "@type":
        "LocalBusiness",

      "@id":
        `${SITE_URL}/#local-business`,

      name:
        input.providerName ||
        SITE_NAME,
    },
  };

  const image =
    cleanText(input.image);

  if (image) {
    schema.image =
      absoluteUrl(image);
  }

  const serviceType =
    cleanText(
      input.serviceType,
    );

  if (serviceType) {
    schema.serviceType =
      serviceType;
  }

  const areaServed = (
    input.areaServed || []
  )
    .map((area) =>
      cleanText(area),
    )
    .filter(Boolean);

  if (areaServed.length > 0) {
    schema.areaServed =
      areaServed.map((area) => ({
        "@type": "Place",
        name: area,
      }));
  }

  return removeUndefinedValues(
    schema,
  );
}

/* =========================================================
   ARTICLE / BLOG
========================================================= */

export interface ArticleSchemaInput {
  title: string;

  description?: string | null;

  url: string;

  image?: string | null;

  authorName: string;

  publishedAt?: string | Date | null;

  updatedAt?: string | Date | null;

  section?: string | null;

  tags?: string[];
}

export function createArticleSchema(
  input: ArticleSchemaInput,
): Record<string, JsonLdValue> {
  const article: Record<
    string,
    JsonLdValue
  > = {
    "@type": "Article",

    "@id":
      `${absoluteUrl(input.url)}#article`,

    headline:
      cleanText(input.title),

    description:
      cleanText(
        input.description,
      ) || undefined,

    url:
      absoluteUrl(input.url),

    author: {
      "@type": "Person",
      name:
        cleanText(
          input.authorName,
        ),
    },

    publisher: {
      "@id":
        `${SITE_URL}/#organization`,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        absoluteUrl(
          input.url,
        ),
    },
  };

  const image =
    cleanText(input.image);

  if (image) {
    article.image = [
      absoluteUrl(image),
    ];
  }

  const published =
    normalizeDate(
      input.publishedAt,
    );

  if (published) {
    article.datePublished =
      published;
  }

  const modified =
    normalizeDate(
      input.updatedAt,
    );

  if (modified) {
    article.dateModified =
      modified;
  }

  const section =
    cleanText(input.section);

  if (section) {
    article.articleSection =
      section;
  }

  const keywords = (
    input.tags || []
  )
    .map((tag) =>
      cleanText(tag),
    )
    .filter(Boolean);

  if (keywords.length > 0) {
    article.keywords =
      keywords;
  }

  return removeUndefinedValues(
    article,
  );
}

/* =========================================================
   IMAGE OBJECT
========================================================= */

export interface ImageObjectSchemaInput {
  url: string;

  name?: string | null;

  description?: string | null;

  width?: number;

  height?: number;
}

export function createImageObjectSchema(
  input: ImageObjectSchemaInput,
): Record<string, JsonLdValue> {
  const image: Record<
    string,
    JsonLdValue
  > = {
    "@type": "ImageObject",

    "@id":
      `${absoluteUrl(input.url)}#image`,

    url:
      absoluteUrl(input.url),
  };

  const name =
    cleanText(input.name);

  if (name) {
    image.name = name;
  }

  const description =
    cleanText(
      input.description,
    );

  if (description) {
    image.description =
      description;
  }

  if (
    typeof input.width ===
      "number"
  ) {
    image.width =
      input.width;
  }

  if (
    typeof input.height ===
      "number"
  ) {
    image.height =
      input.height;
  }

  return removeUndefinedValues(
    image,
  );
}

/* =========================================================
   WEB PAGE
========================================================= */

export interface WebPageSchemaInput {
  name: string;

  description?: string | null;

  url: string;

  breadcrumbId?: string;
}

export function createWebPageSchema(
  input: WebPageSchemaInput,
): Record<string, JsonLdValue> {
  return removeUndefinedValues({
    "@type": "WebPage",

    "@id":
      `${absoluteUrl(input.url)}#webpage`,

    name:
      cleanText(input.name),

    description:
      cleanText(
        input.description,
      ) || undefined,

    url:
      absoluteUrl(input.url),

    isPartOf: {
      "@id":
        `${SITE_URL}/#website`,
    },

    breadcrumb: input.breadcrumbId
      ? {
          "@id":
            input.breadcrumbId,
        }
      : undefined,
  });
}

/* =========================================================
   CLEAN UNDEFINED VALUES
========================================================= */

function removeUndefinedValues(
  value: Record<
    string,
    JsonLdValue | undefined
  >,
): Record<string, JsonLdValue> {
  return Object.fromEntries(
    Object.entries(value).filter(
      ([, item]) =>
        item !== undefined,
    ),
  ) as Record<
    string,
    JsonLdValue
  >;
}