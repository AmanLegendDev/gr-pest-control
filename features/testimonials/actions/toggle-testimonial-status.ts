"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import Testimonial from "@/models/Testimonial";

export async function toggleTestimonialStatus(
  testimonialId: string,
) {
  try {
    await requireAdmin();

    if (
      !mongoose.Types.ObjectId.isValid(
        testimonialId,
      )
    ) {
      return {
        success: false,
        message: "Invalid testimonial ID.",
      };
    }

    await connectDB();

    const testimonial =
      await Testimonial.findById(
        testimonialId,
      );

    if (!testimonial) {
      return {
        success: false,
        message: "Testimonial not found.",
      };
    }

    testimonial.active =
      !testimonial.active;

    await testimonial.save();

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return {
      success: true,
      active: testimonial.active,
      message: testimonial.active
        ? "Testimonial activated."
        : "Testimonial deactivated.",
    };
  } catch (error) {
    console.error(
      "TOGGLE_TESTIMONIAL_STATUS_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update testimonial status.",
    };
  }
}