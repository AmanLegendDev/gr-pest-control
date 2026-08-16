import { z } from "zod";

/* =========================================================
   ADMIN QUOTE REQUEST UPDATE SCHEMA
========================================================= */

export const adminQuoteRequestSchema =
  z.object({
    customer: z.object({
      name: z
        .string()
        .trim()
        .min(
          2,
          "Customer name must be at least 2 characters.",
        )
        .max(
          120,
          "Customer name is too long.",
        ),

      phone: z
        .string()
        .trim()
        .min(
          8,
          "Please enter a valid phone number.",
        )
        .max(
          30,
          "Phone number is too long.",
        ),

      email: z
        .string()
        .trim()
        .email(
          "Please provide a valid email address.",
        )
        .max(
          160,
          "Email address is too long.",
        )
        .or(z.literal("")),
    }),

    propertyType: z.enum([
      "residential",
      "commercial",
    ]),

    location: z.object({
      suburb: z
        .string()
        .trim()
        .min(
          2,
          "Suburb must be at least 2 characters.",
        )
        .max(
          120,
          "Suburb is too long.",
        ),

      address: z
        .string()
        .trim()
        .min(
          5,
          "Address must be at least 5 characters.",
        )
        .max(
          300,
          "Address is too long.",
        ),
    }),

    pestProblem: z
      .string()
      .trim()
      .min(
        5,
        "Please describe the pest problem.",
      )
      .max(
        1000,
        "Pest problem description is too long.",
      ),

    preferredDate: z
      .string()
      .trim()
      .min(
        1,
        "Preferred date is required.",
      )
      .max(
        20,
        "Preferred date is too long.",
      ),

    preferredTime: z
      .string()
      .trim()
      .min(
        1,
        "Preferred time is required.",
      )
      .max(
        100,
        "Preferred time is too long.",
      ),

    status: z.enum([
      "pending",
      "in-progress",
      "completed",
      "cancelled",
    ]),

    archived: z.boolean(),
  });

export type AdminQuoteRequestFormValues =
  z.infer<
    typeof adminQuoteRequestSchema
  >;    