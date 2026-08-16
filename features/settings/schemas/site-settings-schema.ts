import { z } from "zod";

/* =========================================================
   IMAGE
========================================================= */

export const siteLogoSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Please provide a valid image URL."),

  publicId: z
    .string()
    .trim()
    .min(1, "Image public ID is required."),

  alt: z
    .string()
    .trim()
    .min(1, "Image alt text is required.")
    .max(
      160,
      "Image alt text must be 160 characters or less.",
    ),
});

/* =========================================================
   SOCIAL LINKS
========================================================= */

export const socialLinksSchema = z.object({
  facebook: z
    .string()
    .trim()
    .url("Please provide a valid Facebook URL.")
    .or(z.literal("")),

  instagram: z
    .string()
    .trim()
    .url("Please provide a valid Instagram URL.")
    .or(z.literal("")),

  youtube: z
    .string()
    .trim()
    .url("Please provide a valid YouTube URL.")
    .or(z.literal("")),

  googleBusiness: z
    .string()
    .trim()
    .url("Please provide a valid Google Business URL.")
    .or(z.literal("")),
});

/* =========================================================
   BUSINESS HOURS
========================================================= */

export const businessHoursSchema = z.object({
  day: z
    .string()
    .trim()
    .min(1, "Day is required.")
    .max(
      30,
      "Day must be 30 characters or less.",
    ),

  open: z
    .string()
    .trim()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Opening time must be in HH:MM format.",
    ),

  close: z
    .string()
    .trim()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Closing time must be in HH:MM format.",
    ),

  closed: z.boolean(),
});

/* =========================================================
   SITE SETTINGS
========================================================= */

export const siteSettingsSchema = z.object({
  /* ---------------------------------------------
     BUSINESS
  --------------------------------------------- */

  businessName: z
    .string()
    .trim()
    .min(
      2,
      "Business name must be at least 2 characters.",
    )
    .max(
      160,
      "Business name must be 160 characters or less.",
    ),

  shortDescription: z
    .string()
    .trim()
    .max(
      500,
      "Short description must be 500 characters or less.",
    ),

  /* ---------------------------------------------
     LOGO
  --------------------------------------------- */

  logo: siteLogoSchema.optional(),

  /* ---------------------------------------------
     CONTACT
  --------------------------------------------- */

  email: z
    .string()
    .trim()
    .email(
      "Please provide a valid email address.",
    )
    .max(
      160,
      "Email must be 160 characters or less.",
    ),

  phone: z
    .string()
    .trim()
    .min(
      7,
      "Phone number is required.",
    )
    .max(
      30,
      "Phone number must be 30 characters or less.",
    ),

  whatsapp: z
    .string()
    .trim()
    .max(
      30,
      "WhatsApp number must be 30 characters or less.",
    ),

  address: z
    .string()
    .trim()
    .max(
      300,
      "Address must be 300 characters or less.",
    ),

  city: z
    .string()
    .trim()
    .max(
      100,
      "City must be 100 characters or less.",
    ),

  state: z
    .string()
    .trim()
    .max(
      100,
      "State must be 100 characters or less.",
    ),

  pincode: z
    .string()
    .trim()
    .max(
      20,
      "Pincode must be 20 characters or less.",
    ),

  /* ---------------------------------------------
     SOCIAL
  --------------------------------------------- */

  socialLinks: socialLinksSchema,

  /* ---------------------------------------------
     CTA / CURRENCY
  --------------------------------------------- */

  primaryCTA: z
    .string()
    .trim()
    .min(
      1,
      "Primary CTA is required.",
    )
    .max(
      100,
      "Primary CTA must be 100 characters or less.",
    ),

  currency: z
    .string()
    .trim()
    .min(
      1,
      "Currency is required.",
    )
    .max(
      10,
      "Currency must be 10 characters or less.",
    ),

  /* ---------------------------------------------
     BUSINESS HOURS
  --------------------------------------------- */

  businessHours: z
    .array(businessHoursSchema)
    .max(
      7,
      "Business hours cannot contain more than 7 days.",
    ),

  /* ---------------------------------------------
     SEO
  --------------------------------------------- */

  siteTitle: z
    .string()
    .trim()
    .max(
      70,
      "Site title must be 70 characters or less.",
    ),

  siteDescription: z
    .string()
    .trim()
    .max(
      160,
      "Site description must be 160 characters or less.",
    ),

  /* ---------------------------------------------
     FAVICON
  --------------------------------------------- */

  favicon: siteLogoSchema.optional(),

  /* ---------------------------------------------
     STATUS
  --------------------------------------------- */

  active: z.boolean(),
});

export type SiteSettingsFormValues =
  z.infer<typeof siteSettingsSchema>;