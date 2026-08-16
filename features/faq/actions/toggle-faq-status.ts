"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import FAQ from "@/models/FAQ";

export async function toggleFAQStatus(
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

    faq.active = !faq.active;

    await faq.save();

    revalidatePath("/faq");
    revalidatePath("/admin/faq");

    return {
      success: true,
      message: faq.active
        ? "FAQ activated successfully."
        : "FAQ deactivated successfully.",
      active: faq.active,
    };
  } catch (error) {
    console.error(
      "TOGGLE_FAQ_STATUS_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update FAQ status.",
    };
  }
}