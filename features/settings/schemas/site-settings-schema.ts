import { z } from "zod";

const siteLogoSchema = z.object({
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

const socialLinksSchema = z.object({
  facebook: z
    .string()
    .trim()
    .url("Please provide a valid Facebook URL.")
    .or(z.literal(""))
    ,

  instagram: z
    .string()
    .trim()
    .url("Please provide a valid Instagram URL.")
    .or(z.literal(""))
,

  youtube: z
    .string()
    .trim()
    .url("Please provide a valid YouTube URL.")
    .or(z.literal(""))
    ,

  googleBusiness: z
    .string()
    .trim()
    .url("Please provide a valid Google Business URL.")
    .or(z.literal(""))
  ,
});

const businessHoursSchema = z.object({
  day: z
    .string()
    .trim()
    .min(1, "Day is required."),

open: z.string().trim(),

close: z.string().trim(),

closed: z.boolean(),
});

export const siteSettingsSchema = z.object({
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
    )
    ,

  logo: siteLogoSchema.optional(),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
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
    )
    ,

  address: z
    .string()
    .trim()
    .max(
      300,
      "Address must be 300 characters or less.",
    )
    ,

  city: z
    .string()
    .trim()
    .max(
      100,
      "City must be 100 characters or less.",
    )
   ,

  state: z
    .string()
    .trim()
    .max(
      100,
      "State must be 100 characters or less.",
    )
   ,

  pincode: z
    .string()
    .trim()
    .max(
      20,
      "Pincode must be 20 characters or less.",
    )
    ,

  socialLinks: socialLinksSchema,

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

businessHours: z.array(businessHoursSchema),

  siteTitle: z
    .string()
    .trim()
    .max(
      70,
      "Site title must be 70 characters or less.",
    )
    ,

  siteDescription: z
    .string()
    .trim()
    .max(
      160,
      "Site description must be 160 characters or less.",
    )
    ,

  favicon: siteLogoSchema.optional(),

  active: z
    .boolean()
    ,
});

export type SiteSettingsFormValues =
  z.infer<typeof siteSettingsSchema>;