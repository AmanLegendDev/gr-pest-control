import { z } from "zod";

export const quoteRequestSchema =
  z.object({
    customer: z.object({
      name: z
        .string()
        .trim()
        .min(2, "Please enter your full name.")
        .max(
          120,
          "Name is too long.",
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
          "Please enter a valid email address.",
        )
        .max(
          160,
          "Email address is too long.",
        )
        .optional()
        .or(z.literal("")),
    }),

    serviceId: z
      .string()
      .trim()
      .min(
        1,
        "Please select a service.",
      ),

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
          "Please enter your suburb.",
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
          "Please enter your address.",
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
        "Please briefly describe the pest problem.",
      )
      .max(
        1000,
        "Description is too long.",
      ),

    preferredDate: z
      .string()
      .trim()
      .min(
        1,
        "Please select a preferred date.",
      ),

    preferredTime: z
      .string()
      .trim()
      .min(
        1,
        "Please select a preferred time.",
      ),
  });

export type QuoteRequestInput =
  z.infer<
    typeof quoteRequestSchema
  >;