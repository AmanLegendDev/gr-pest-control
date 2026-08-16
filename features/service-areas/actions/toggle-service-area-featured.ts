"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/require-admin";

import ServiceArea from "@/models/ServiceArea";

export async function toggleServiceAreaFeatured(
  serviceAreaId: string,
) {
  try {
    await requireAdmin();

    if (
      !mongoose.Types.ObjectId.isValid(
        serviceAreaId,
      )
    ) {
      return {
        success: false,
        message:
          "Invalid service area ID.",
      };
    }

    await connectDB();

    const serviceArea =
      await ServiceArea.findById(
        serviceAreaId,
      );

    if (!serviceArea) {
      return {
        success: false,
        message:
          "Service area not found.",
      };
    }

    serviceArea.featured =
      !serviceArea.featured;

    await serviceArea.save();

    revalidatePath(
      "/service-areas",
    );

    revalidatePath(
      "/admin/service-areas",
    );

    return {
      success: true,
      featured:
        serviceArea.featured,
      message: serviceArea.featured
        ? "Service area marked as featured."
        : "Service area removed from featured.",
    };
  } catch (error) {
    console.error(
      "TOGGLE_SERVICE_AREA_FEATURED_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update featured status.",
    };
  }
}