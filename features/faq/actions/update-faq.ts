"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import FAQ from "@/models/FAQ";

import {
  updateFAQSchema,
  type UpdateFAQInput,
} from "@/features/faq/schemas/faq-schema";

export async function updateFAQ(
  input: UpdateFAQInput,
) {
  try {
    /* =========================
       ADMIN AUTH
    ========================== */

    await requireAdmin();

    /* =========================
       VALIDATION
    ========================== */

    const parsed =
      updateFAQSchema.safeParse(input);

    if (!parsed.success) {
      const fieldErrors: Record<
        string,
        string[]
      > = {};

      for (const issue of parsed.error
        .issues) {
        const field =
          issue.path.join(".");

        if (!field) continue;

        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }

        fieldErrors[field].push(
          issue.message,
        );
      }

      return {
        success: false,
        message:
          "Please correct the highlighted fields.",
        fieldErrors,
      };
    }

    const data = parsed.data;

    /* =========================
       ID VALIDATION
    ========================== */

    if (
      !mongoose.Types.ObjectId.isValid(
        data.id,
      )
    ) {
      return {
        success: false,
        message: "Invalid FAQ ID.",
      };
    }

    /* =========================
       DATABASE
    ========================== */

    await connectDB();

    const existing =
      await FAQ.findById(data.id);

    if (!existing) {
      return {
        success: false,
        message: "FAQ not found.",
      };
    }

    /* =========================
       DUPLICATE QUESTION
    ========================== */

    const normalizedQuestion =
      data.question.trim();

    const duplicate =
      await FAQ.findOne({
        _id: {
          $ne: data.id,
        },

        question: {
          $regex: `^${escapeRegExp(
            normalizedQuestion,
          )}$`,
          $options: "i",
        },
      })
        .select("_id")
        .lean();

    if (duplicate) {
      return {
        success: false,
        message:
          "Another FAQ with this question already exists.",
        fieldErrors: {
          question: [
            "This question is already in use.",
          ],
        },
      };
    }

    /* =========================
       UPDATE
    ========================== */

    existing.question =
      normalizedQuestion;

    existing.answer =
      data.answer.trim();

    existing.category =
      data.category.trim();

    existing.sortOrder =
      data.sortOrder;

    existing.featured =
      data.featured;

    existing.active =
      data.active;

    existing.seoTitle =
      data.seoTitle.trim();

    existing.seoDescription =
      data.seoDescription.trim();

    await existing.save();

    /* =========================
       CACHE INVALIDATION
    ========================== */

    revalidatePath("/faq");

    revalidatePath("/admin/faq");

    return {
      success: true,
      message:
        "FAQ updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_FAQ_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update the FAQ right now. Please try again.",
    };
  }
}

function escapeRegExp(
  value: string,
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}