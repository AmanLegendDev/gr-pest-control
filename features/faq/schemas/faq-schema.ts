import { z } from "zod";

const optionalSeoTitle = z
  .string()
  .trim()
  .max(70, "SEO title must be 70 characters or less.");

const optionalSeoDescription = z
  .string()
  .trim()
  .max(160, "SEO description must be 160 characters or less.");

export const faqSchema = z.object({
  question: z
    .string()
    .trim()
    .min(5, "Question must be at least 5 characters.")
    .max(300, "Question must be 300 characters or less."),

  answer: z
    .string()
    .trim()
    .min(5, "Answer must be at least 5 characters.")
    .max(2000, "Answer must be 2000 characters or less."),

category: z
  .string()
  .trim()
  .max(100, "Category must be 100 characters or less."),

sortOrder: z
  .number()
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative."),

featured: z.boolean(),

active: z.boolean(),

seoTitle: optionalSeoTitle,

seoDescription: optionalSeoDescription,
});

export type FAQFormValues = z.infer<typeof faqSchema>;

export const updateFAQSchema =
  faqSchema.extend({
    id: z
      .string()
      .trim()
      .regex(
        /^[a-f\d]{24}$/i,
        "Invalid FAQ ID.",
      ),
  });

export type UpdateFAQInput =
  z.infer<typeof updateFAQSchema>;