"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/connect";
import { requireAdmin } from "@/lib/auth/require-admin";

import ServiceArea from "@/models/ServiceArea";

import {
  updateServiceAreaSchema,
  type UpdateServiceAreaInput,
} from "../schemas/service-area-schema";

export async function updateServiceArea(
  input: UpdateServiceAreaInput,
) {
  try {
    await requireAdmin();

    const parsed =
      updateServiceAreaSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message:
          parsed.error.issues[0]?.message ??
          "Invalid service area data.",
      };
    }

    await connectDB();

    const {
      id,
      ...data
    } = parsed.data;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return {
        success: false,
        message: "Invalid service area ID.",
      };
    }

    const existing =
      await ServiceArea.findById(id);

    if (!existing) {
      return {
        success: false,
        message:
          "Service area not found.",
      };
    }

    const duplicate =
      await ServiceArea.findOne({
        _id: {
          $ne: id,
        },
        $or: [
          { slug: data.slug },
          { name: data.name },
        ],
      })
        .select("_id slug name")
        .lean();

    if (duplicate) {
      if (
        duplicate.slug === data.slug
      ) {
        return {
          success: false,
          message:
            "Another service area already uses this slug.",
        };
      }

      return {
        success: false,
        message:
          "Another service area already uses this name.",
      };
    }

    const oldSlug =
      existing.slug;

    Object.assign(
      existing,
      data,
    );

    await existing.save();

    revalidatePath(
      "/service-areas",
    );

    revalidatePath(
      "/admin/service-areas",
    );

    revalidatePath(
      `/service-areas/${oldSlug}`,
    );

    revalidatePath(
      `/service-areas/${existing.slug}`,
    );

    return {
      success: true,
      message:
        "Service area updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_SERVICE_AREA_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update service area.",
    };
  }
}