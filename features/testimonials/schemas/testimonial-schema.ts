import { z } from "zod";

export const testimonialImageSchema = z.object({
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

export const testimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Customer name must be at least 2 characters.",
    )
    .max(
      120,
      "Customer name must be 120 characters or less.",
    ),

  role: z
    .string()
    .trim()
    .max(
      120,
      "Role must be 120 characters or less.",
    )
    .default(""),

  company: z
    .string()
    .trim()
    .max(
      160,
      "Company name must be 160 characters or less.",
    )
    .default(""),

  content: z
    .string()
    .trim()
    .min(
      10,
      "Testimonial must be at least 10 characters.",
    )
    .max(
      2000,
      "Testimonial must be 2000 characters or less.",
    ),

  rating: z
    .number()
    .int("Rating must be a whole number.")
    .min(
      1,
      "Rating must be at least 1.",
    )
    .max(
      5,
      "Rating cannot be greater than 5.",
    ),

  location: z
    .string()
    .trim()
    .max(
      120,
      "Location must be 120 characters or less.",
    )
    .default(""),

  image: testimonialImageSchema
    .optional(),

  seoTitle: z
    .string()
    .trim()
    .max(
      70,
      "SEO title must be 70 characters or less.",
    )
    .default(""),

  seoDescription: z
    .string()
    .trim()
    .max(
      160,
      "SEO description must be 160 characters or less.",
    )
    .default(""),

  featured: z
    .boolean()
    .default(false),

  active: z
    .boolean()
    .default(true),

  sortOrder: z
    .number()
    .int("Sort order must be a whole number.")
    .min(
      0,
      "Sort order cannot be negative.",
    )
    .default(0),
});

export type TestimonialFormValues =
  z.infer<typeof testimonialSchema>;