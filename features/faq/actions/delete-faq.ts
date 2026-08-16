"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import FAQ from "@/models/FAQ";

export async function deleteFAQ(
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

    await FAQ.deleteOne({
      _id: faqId,
    });

    revalidatePath("/faq");
    revalidatePath("/admin/faq");

    return {
      success: true,
      message:
        "FAQ deleted successfully.",
    };
  } catch (error) {
    console.error(
      "DELETE_FAQ_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to delete the FAQ right now. Please try again.",
    };
  }
}