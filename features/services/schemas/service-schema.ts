import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
  alt: z.string().trim().min(1).max(160),
});

const processStepSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(500),
  sortOrder: z.number().int().min(0),
});

const faqSchema = z.object({
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(1000),
  sortOrder: z.number().int().min(0),
});

export const createServiceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Service title is required.")
    .max(120, "Title cannot exceed 120 characters."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .max(140)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  category: z
    .string()
    .trim()
    .min(1, "Please select a category.")
    .max(80),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description is required.")
    .max(300),

  description: z
    .string()
    .trim()
    .min(20, "Description is required.")
    .max(10000),

    price: z
  .number()
  .min(0, "Price cannot be negative."),

  heroImage: imageSchema.optional(),

  icon: z.string().trim().max(80).optional(),

 pestTypes: z.array(
  z.string().trim().min(1).max(100),
),

benefits: z.array(
  z.string().trim().min(1).max(300),
),


seoTitle: z
  .string()
  .trim()
  .max(70),

seoDescription: z
  .string()
  .trim()
  .max(160),

process: z.array(processStepSchema),

faqs: z.array(faqSchema),

featured: z.boolean(),

active: z.boolean(),

sortOrder: z
  .number()
  .int()
  .min(0),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

export const updateServiceSchema =
  createServiceSchema.extend({
    id: z
      .string()
      .trim()
      .min(1, "Service ID is required.")
      .refine(
        (value) =>
          /^[a-f\d]{24}$/i.test(value),
        "Invalid service ID.",
      ),
  });

export type UpdateServiceInput =
  z.infer<typeof updateServiceSchema>;