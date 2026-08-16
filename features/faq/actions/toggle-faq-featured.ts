"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import FAQ from "@/models/FAQ";

export async function toggleFAQFeatured(
  faqId: string,
) {
  try {
    await requireAdmin();

    if (
      !mongoose.Types.ObjectId.isValid(
        faqId,
      )
    ) {
      return {
        success: false,
        message: "Invalid FAQ ID.",
      };
    }

    await connectDB();

    const faq =
      await FAQ.findById(faqId);

    if (!faq) {
      return {
        success: false,
        message: "FAQ not found.",
      };
    }

    faq.featured =
      !faq.featured;

    await faq.save();

    revalidatePath("/faq");
    revalidatePath("/admin/faq");

    return {
      success: true,
      message: faq.featured
        ? "FAQ marked as featured."
        : "FAQ removed from featured.",
      featured: faq.featured,
    };
  } catch (error) {
    console.error(
      "TOGGLE_FAQ_FEATURED_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update FAQ featured status.",
    };
  }
}