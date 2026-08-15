"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/require-admin";

import Service from "@/models/Service";

export async function toggleServiceStatus(
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

    service.active =
      !service.active;

    await service.save();

    revalidatePath(
      "/admin/services",
    );

    revalidatePath(
      "/services",
    );

    revalidatePath(
      `/services/${service.slug}`,
    );

    return {
      success: true,
      active:
        service.active,
      message: service.active
        ? "Service activated."
        : "Service deactivated.",
    };
  } catch (error) {
    console.error(
      "TOGGLE_SERVICE_STATUS_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update service status.",
    };
  }
}