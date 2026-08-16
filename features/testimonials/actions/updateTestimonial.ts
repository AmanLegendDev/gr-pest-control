"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import Testimonial from "@/models/Testimonial";

import {
  updateTestimonialSchema,
  type UpdateTestimonialInput,
} from "@/features/testimonials/schemas/testimonial-schema";

/* =========================================================
   RESULT TYPES
========================================================= */

interface UpdateTestimonialSuccess {
  success: true;
  message: string;
}

interface UpdateTestimonialFailure {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export type UpdateTestimonialResult =
  | UpdateTestimonialSuccess
  | UpdateTestimonialFailure;

/* =========================================================
   UPDATE TESTIMONIAL
========================================================= */

export async function updateTestimonial(
  input: UpdateTestimonialInput,
): Promise<UpdateTestimonialResult> {
  try {
    /* =====================================================
       ADMIN AUTH
    ===================================================== */

    await requireAdmin();

    /* =====================================================
       SERVER VALIDATION
    ===================================================== */

    const parsed =
      updateTestimonialSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message:
          "Please correct the highlighted fields.",
        fieldErrors:
          parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    /* =====================================================
       ID VALIDATION
    ===================================================== */

    if (
      !mongoose.Types.ObjectId.isValid(data.id)
    ) {
      return {
        success: false,
        message: "Invalid testimonial ID.",
      };
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    const existing =
      await Testimonial.findById(data.id);

    if (!existing) {
      return {
        success: false,
        message: "Testimonial not found.",
      };
    }

    /* =====================================================
       UPDATE FIELDS
    ===================================================== */

    existing.name = data.name.trim();

    existing.role = data.role.trim();

    existing.company =
      data.company.trim();

    existing.content =
      data.content.trim();

    existing.rating = data.rating;

    existing.location =
      data.location.trim();

    existing.image = data.image
      ? {
          url: data.image.url,
          publicId: data.image.publicId,
          alt: data.image.alt.trim(),
        }
      : undefined;

    existing.seoTitle =
      data.seoTitle.trim();

    existing.seoDescription =
      data.seoDescription.trim();

    existing.featured =
      data.featured;

    existing.active =
      data.active;

    existing.sortOrder =
      data.sortOrder;

    /* =====================================================
       SAVE
    ===================================================== */

    await existing.save();

    /* =====================================================
       CACHE REVALIDATION
    ===================================================== */

    revalidatePath("/testimonials");

    revalidatePath(
      "/admin/testimonials",
    );

    /* =====================================================
       SUCCESS
    ===================================================== */

    return {
      success: true,
      message:
        "Testimonial updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_TESTIMONIAL_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update the testimonial right now. Please try again.",
    };
  }
}