import { z } from "zod";

const optionalSeoTitle = z
  .string()
  .trim()
  .max(70, "SEO title must be 70 characters or less.")
  .default("");

const optionalSeoDescription = z
  .string()
  .trim()
  .max(160, "SEO description must be 160 characters or less.")
  .default("");

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
    .max(100, "Category must be 100 characters or less.")
    .default(""),

  sortOrder: z
    .number()
    .int("Sort order must be a whole number.")
    .min(0, "Sort order cannot be negative.")
    .default(0),

  featured: z.boolean().default(false),

  active: z.boolean().default(true),

  seoTitle: optionalSeoTitle,

  seoDescription: optionalSeoDescription,
});

export type FAQFormValues = z.infer<typeof faqSchema>;