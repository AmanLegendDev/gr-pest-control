"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/require-admin";

import Service from "@/models/Service";

export async function toggleServiceFeatured(
  id: string,
) {
  try {
    await requireAdmin();

    if (
      !mongoose.Types.ObjectId.isValid(
        id,
      )
    ) {
      return {
        success: false,
        message:
          "Invalid service ID.",
      };
    }

    await connectDB();

    const service =
      await Service.findById(id);

    if (!service) {
      return {
        success: false,
        message:
          "Service not found.",
      };
    }

    service.featured =
      !service.featured;

    await service.save();

    revalidatePath(
      "/admin/services",
    );

    revalidatePath(
      "/services",
    );

    return {
      success: true,
      featured:
        service.featured,
      message:
        service.featured
          ? "Service marked as featured."
          : "Service removed from featured.",
    };
  } catch (error) {
    console.error(
      "TOGGLE_SERVICE_FEATURED_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update featured status.",
    };
  }
}