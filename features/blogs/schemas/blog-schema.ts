import { z } from "zod";

const blogImageSchema = z.object({
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
    .max(160, "Image alt text must be 160 characters or less."),
});

export const blogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters.")
    .max(180, "Title must be 180 characters or less."),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(200, "Slug must be 200 characters or less.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers and hyphens.",
    ),

  excerpt: z
    .string()
    .trim()
    .min(20, "Excerpt must be at least 20 characters.")
    .max(500, "Excerpt must be 500 characters or less."),

  content: z
    .string()
    .trim()
    .min(20, "Blog content must be at least 20 characters.")
    .max(100000, "Blog content is too long."),
category: z
  .string()
  .trim()
  .max(100, "Category must be 100 characters or less."),

tags: z
  .array(
    z
      .string()
      .trim()
      .min(1, "Tag cannot be empty.")
      .max(60, "Tag must be 60 characters or less."),
  )
  .max(20, "You can add up to 20 tags."),

  author: z
    .string()
    .trim()
    .min(2, "Author name must be at least 2 characters.")
    .max(120, "Author name must be 120 characters or less."),

  featuredImage: blogImageSchema.optional(),

seoTitle: z
  .string()
  .trim()
  .max(70, "SEO title must be 70 characters or less."),

seoDescription: z
  .string()
  .trim()
  .max(160, "SEO description must be 160 characters or less."),

featured: z.boolean(),

published: z.boolean(),

publishedAt: z.date().optional(),

sortOrder: z
  .number()
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative."),
});


export type BlogFormInput =
  z.input<typeof blogSchema>;

export type BlogFormValues =
  z.output<typeof blogSchema>;

  export const updateBlogSchema = blogSchema.extend({
  id: z
    .string()
    .trim()
    .regex(
      /^[a-f\d]{24}$/i,
      "Invalid blog ID.",
    ),
});

export type UpdateBlogInput =
  z.infer<typeof updateBlogSchema>;