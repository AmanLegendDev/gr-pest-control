"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/require-admin";

import ServiceArea from "@/models/ServiceArea";

export async function deleteServiceArea(
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

    await ServiceArea.deleteOne({
      _id: serviceAreaId,
    });

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
      message:
        "Service area deleted successfully.",
    };
  } catch (error) {
    console.error(
      "DELETE_SERVICE_AREA_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to delete service area.",
    };
  }
}