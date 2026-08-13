"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import Testimonial from "@/models/Testimonial";

import {
  testimonialSchema,
  type TestimonialFormValues,
} from "@/features/testimonials/schemas/testimonial-schema";

interface CreateTestimonialSuccess {
  success: true;
  testimonialId: string;
}

interface CreateTestimonialFailure {
  success: false;
  message: string;
  fieldErrors?: Record<
    string,
    string[]
  >;
}

export type CreateTestimonialResult =
  | CreateTestimonialSuccess
  | CreateTestimonialFailure;

export async function createTestimonial(
  values: TestimonialFormValues,
): Promise<CreateTestimonialResult> {
  try {
    /* --------------------------------
       Admin Authentication
    -------------------------------- */

    const session =
      await getServerSession(
        authOptions,
      );

    if (
      !session?.user ||
      session.user.role !== "ADMIN"
    ) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    /* --------------------------------
       Server-side Validation
    -------------------------------- */

    const parsed =
      testimonialSchema.safeParse(
        values,
      );

    if (!parsed.success) {
      return {
        success: false,
        message:
          "Please correct the highlighted fields.",
        fieldErrors:
          parsed.error.flatten()
            .fieldErrors,
      };
    }

    const data = parsed.data;

    /* --------------------------------
       Database
    -------------------------------- */

    await connectDB();

    /* --------------------------------
       Create Testimonial
    -------------------------------- */

    const testimonial =
      await Testimonial.create({
        name: data.name.trim(),

        role: data.role.trim(),

        company:
          data.company.trim(),

        content:
          data.content.trim(),

        rating: data.rating,

        location:
          data.location.trim(),

        image: data.image
          ? {
              url: data.image.url,
              publicId:
                data.image.publicId,
              alt:
                data.image.alt.trim(),
            }
          : undefined,

        seoTitle:
          data.seoTitle.trim(),

        seoDescription:
          data.seoDescription.trim(),

        featured: data.featured,

        active: data.active,

        sortOrder:
          data.sortOrder,
      });

    return {
      success: true,
      testimonialId: String(
        testimonial._id,
      ),
    };
  } catch (error) {
    console.error(
      "CREATE_TESTIMONIAL_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to create the testimonial right now. Please try again.",
    };
  }
}