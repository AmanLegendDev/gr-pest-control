"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import Testimonial from "@/models/Testimonial";

export async function deleteTestimonial(
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

    const deleted =
      await Testimonial.findByIdAndDelete(
        testimonialId,
      );

    if (!deleted) {
      return {
        success: false,
        message: "Testimonial not found.",
      };
    }

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return {
      success: true,
      message:
        "Testimonial deleted successfully.",
    };
  } catch (error) {
    console.error(
      "DELETE_TESTIMONIAL_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to delete the testimonial right now. Please try again.",
    };
  }
}