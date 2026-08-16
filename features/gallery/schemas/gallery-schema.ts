import { z } from "zod";

export const galleryCategorySchema = z.enum([
  "home",
  "workplace",
  "commercial",
  "residential",
  "treatment",
  "team",
  "other",
]);

export const galleryImageSchema = z.object({
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

export const gallerySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Gallery title must be at least 3 characters.")
    .max(
      160,
      "Gallery title must be 160 characters or less.",
    ),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(180, "Slug must be 180 characters or less.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers and hyphens.",
    ),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(
      500,
      "Description must be 500 characters or less.",
    ),

  category: galleryCategorySchema,

  // IMPORTANT: use the Zod schema here
  image: galleryImageSchema,

  seoTitle: z
    .string()
    .trim()
    .max(70, "SEO title must be 70 characters or less."),

  seoDescription: z
    .string()
    .trim()
    .max(
      160,
      "SEO description must be 160 characters or less.",
    ),

  featured: z.boolean(),

  active: z.boolean(),

  sortOrder: z
    .number()
    .int()
    .min(0, "Sort order cannot be negative."),
});

export type GalleryFormValues = z.infer<
  typeof gallerySchema
>;

export const updateGallerySchema =
  gallerySchema.extend({
    id: z
      .string()
      .trim()
      .regex(
        /^[a-f\d]{24}$/i,
        "Invalid gallery item ID.",
      ),
  });

export type UpdateGalleryInput =
  z.infer<typeof updateGallerySchema>;