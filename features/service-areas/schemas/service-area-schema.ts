import { z } from "zod";

const serviceAreaImageSchema = z.object({
  url: z.string().trim().url("Please provide a valid image URL."),
  publicId: z.string().trim().min(1, "Image public ID is required."),
  alt: z
    .string()
    .trim()
    .min(1, "Image alt text is required.")
    .max(160, "Alt text must be 160 characters or less."),
});

const serviceAreaFAQSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "FAQ question is required.")
    .max(300, "FAQ question must be 300 characters or less."),

  answer: z
    .string()
    .trim()
    .min(1, "FAQ answer is required.")
    .max(1000, "FAQ answer must be 1000 characters or less."),

  sortOrder: z
    .number()
    .int()
    .min(0, "Sort order cannot be negative."),
});

export const serviceAreaSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Area name must contain at least 2 characters.")
    .max(120, "Area name must be 120 characters or less."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must contain at least 2 characters.")
    .max(140, "Slug must be 140 characters or less.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers and hyphens.",
    ),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must contain at least 10 characters.")
    .max(
      300,
      "Short description must be 300 characters or less.",
    ),

  description: z
    .string()
    .trim()
    .min(20, "Description must contain at least 20 characters.")
    .max(
      10000,
      "Description must be 10,000 characters or less.",
    ),

  image: serviceAreaImageSchema.optional(),

  highlights: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Highlight cannot be empty.")
        .max(200, "Highlight must be 200 characters or less."),
    )
    .default([]),

  nearbyAreas: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Nearby area cannot be empty.")
        .max(
          120,
          "Nearby area must be 120 characters or less.",
        ),
    )
    .default([]),

  faqs: z
    .array(serviceAreaFAQSchema)
    .default([]),

  seoTitle: z
    .string()
    .trim()
    .max(70, "SEO title must be 70 characters or less.")
    .default(""),

  seoDescription: z
    .string()
    .trim()
    .max(
      160,
      "SEO description must be 160 characters or less.",
    )
    .default(""),

  featured: z.boolean().default(false),

  active: z.boolean().default(true),

  sortOrder: z
    .number()
    .int()
    .min(0, "Sort order cannot be negative.")
    .default(0),
});

export type ServiceAreaFormValues = z.infer<
  typeof serviceAreaSchema
>;