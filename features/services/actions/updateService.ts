"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/require-admin";

import Service from "@/models/Service";

import {
  updateServiceSchema,
  type UpdateServiceInput,
} from "@/features/services/schemas/service-schema";

export async function updateService(
  input: UpdateServiceInput,
) {
  try {
    await requireAdmin();

    const parsed =
      updateServiceSchema.safeParse(
        input,
      );

    if (!parsed.success) {
      return {
        success: false,
        message:
          parsed.error.issues[0]
            ?.message ??
          "Invalid service data.",
      };
    }

    await connectDB();

    if (
      !mongoose.Types.ObjectId.isValid(
        parsed.data.id,
      )
    ) {
      return {
        success: false,
        message:
          "Invalid service ID.",
      };
    }

    const existing =
      await Service.findById(
        parsed.data.id,
      );

    if (!existing) {
      return {
        success: false,
        message:
          "Service not found.",
      };
    }

    const duplicate =
      await Service.findOne({
        _id: {
          $ne: parsed.data.id,
        },
        $or: [
          {
            slug:
              parsed.data.slug,
          },
          {
            title:
              parsed.data.title,
          },
        ],
      }).lean();

    if (duplicate) {
      return {
        success: false,
        message:
          duplicate.slug ===
          parsed.data.slug
            ? "Another service already uses this slug."
            : "Another service already uses this title.",
      };
    }

    const oldSlug =
      existing.slug;

    Object.assign(
      existing,
      parsed.data,
    );

    await existing.save();

    revalidatePath(
      "/admin/services",
    );

    revalidatePath(
      "/services",
    );

    revalidatePath(
      `/services/${oldSlug}`,
    );

    revalidatePath(
      `/services/${existing.slug}`,
    );

    return {
      success: true,
      message:
        "Service updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_SERVICE_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update service.",
    };
  }
}