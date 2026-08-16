"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import GalleryItem from "@/models/GalleryItem";

export async function toggleGalleryFeatured(
  id: string,
) {
  try {
    await requireAdmin();

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return {
        success: false,
        message:
          "Invalid gallery item ID.",
      };
    }

    await connectDB();

    const item =
      await GalleryItem.findById(id);

    if (!item) {
      return {
        success: false,
        message:
          "Gallery item not found.",
      };
    }

    item.featured =
      !item.featured;

    await item.save();

    revalidatePath("/gallery");
    revalidatePath(
      `/gallery/${item.slug}`,
    );
    revalidatePath(
      "/admin/gallery",
    );

    return {
      success: true,
      message: item.featured
        ? "Gallery item marked as featured."
        : "Gallery item removed from featured.",
      featured:
        item.featured,
    };
  } catch (error) {
    console.error(
      "TOGGLE_GALLERY_FEATURED_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update featured status.",
    };
  }
}