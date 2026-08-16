"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import GalleryItem from "@/models/GalleryItem";

export async function deleteGalleryItem(
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

    /*
     * Delete database record.
     *
     * Cloudinary asset deletion can be
     * connected separately through the
     * existing Cloudinary server utility.
     */
    await GalleryItem.findByIdAndDelete(id);

    revalidatePath("/gallery");
    revalidatePath(
      `/gallery/${item.slug}`,
    );
    revalidatePath(
      "/admin/gallery",
    );

    return {
      success: true,
      message:
        "Gallery item deleted successfully.",
    };
  } catch (error) {
    console.error(
      "DELETE_GALLERY_ITEM_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to delete the gallery item right now. Please try again.",
    };
  }
}