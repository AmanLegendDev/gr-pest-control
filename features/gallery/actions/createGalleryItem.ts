"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import GalleryItem from "@/models/GalleryItem";

import {
  gallerySchema,
  type GalleryFormValues,
} from "@/features/gallery/schemas/gallery-schema";

interface CreateGallerySuccess {
  success: true;
  galleryId: string;
}

interface CreateGalleryFailure {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export type CreateGalleryResult =
  | CreateGallerySuccess
  | CreateGalleryFailure;

export async function createGalleryItem(
  values: GalleryFormValues,
): Promise<CreateGalleryResult> {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session?.user ||
      session.user.role !== "ADMIN"
    ) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const parsed = gallerySchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please correct the highlighted fields.",
        fieldErrors:
          parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    await connectDB();

    const normalizedSlug = data.slug
      .trim()
      .toLowerCase();

    const existingItem = await GalleryItem.findOne({
      slug: normalizedSlug,
    })
      .select({
        _id: 1,
      })
      .lean();

    if (existingItem) {
      return {
        success: false,
        message:
          "A gallery item with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    const galleryItem = await GalleryItem.create({
      title: data.title.trim(),

      slug: normalizedSlug,

      description: data.description.trim(),

      category: data.category,

      image: {
        url: data.image.url,
        publicId: data.image.publicId,
        alt: data.image.alt.trim(),
      },

      seoTitle: data.seoTitle.trim(),

      seoDescription:
        data.seoDescription.trim(),

      featured: data.featured,

      active: data.active,

      sortOrder: data.sortOrder,
    });

    return {
      success: true,
      galleryId: String(galleryItem._id),
    };
  } catch (error) {
    console.error(
      "CREATE_GALLERY_ITEM_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to create the gallery item right now. Please try again.",
    };
  }
}