"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/require-admin";

import ServiceArea from "@/models/ServiceArea";

export async function toggleServiceAreaStatus(
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

    serviceArea.active =
      !serviceArea.active;

    await serviceArea.save();

    revalidatePath(
      "/service-areas",
    );

    revalidatePath(
      "/admin/service-areas",
    );

    revalidatePath(
      `/service-areas/${serviceArea.slug}`,
    );

    return {
      success: true,
      active:
        serviceArea.active,
      message: serviceArea.active
        ? "Service area activated."
        : "Service area deactivated.",
    };
  } catch (error) {
    console.error(
      "TOGGLE_SERVICE_AREA_STATUS_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update service area status.",
    };
  }
}