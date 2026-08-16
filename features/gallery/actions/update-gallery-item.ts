"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import GalleryItem from "@/models/GalleryItem";

import {
  updateGallerySchema,
  type UpdateGalleryInput,
} from "@/features/gallery/schemas/gallery-schema";

export async function updateGalleryItem(
  input: UpdateGalleryInput,
) {
  try {
    await requireAdmin();

    const parsed =
      updateGallerySchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message:
          parsed.error.issues[0]?.message ??
          "Invalid gallery data.",
      };
    }

    const data = parsed.data;

    if (
      !mongoose.Types.ObjectId.isValid(
        data.id,
      )
    ) {
      return {
        success: false,
        message: "Invalid gallery item ID.",
      };
    }

    await connectDB();

    const existing =
      await GalleryItem.findById(data.id);

    if (!existing) {
      return {
        success: false,
        message:
          "Gallery item not found.",
      };
    }

    const normalizedSlug =
      data.slug
        .trim()
        .toLowerCase();

    const duplicate =
      await GalleryItem.findOne({
        _id: {
          $ne: data.id,
        },

        $or: [
          {
            slug: normalizedSlug,
          },

          {
            title: data.title.trim(),
          },
        ],
      })
        .select("_id slug title")
        .lean();

    if (duplicate) {
      if (
        duplicate.slug ===
        normalizedSlug
      ) {
        return {
          success: false,
          message:
            "Another gallery item already uses this slug.",
          fieldErrors: {
            slug: [
              "This slug is already in use.",
            ],
          },
        };
      }

      return {
        success: false,
        message:
          "Another gallery item already uses this title.",
        fieldErrors: {
          title: [
            "This title is already in use.",
          ],
        },
      };
    }

    const oldSlug =
      existing.slug;

    existing.title =
      data.title.trim();

    existing.slug =
      normalizedSlug;

    existing.description =
      data.description.trim();

    existing.category =
      data.category;

    existing.image = {
      url: data.image.url,
      publicId:
        data.image.publicId,
      alt: data.image.alt.trim(),
    };

    existing.seoTitle =
      data.seoTitle.trim();

    existing.seoDescription =
      data.seoDescription.trim();

    existing.featured =
      data.featured;

    existing.active =
      data.active;

    existing.sortOrder =
      data.sortOrder;

    await existing.save();

    revalidatePath("/gallery");
    revalidatePath(
      `/gallery/${oldSlug}`,
    );
    revalidatePath(
      `/gallery/${existing.slug}`,
    );

    revalidatePath(
      "/admin/gallery",
    );

    return {
      success: true,
      message:
        "Gallery item updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_GALLERY_ITEM_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update the gallery item right now. Please try again.",
    };
  }
}