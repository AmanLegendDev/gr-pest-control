import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";
import GalleryItem from "@/models/GalleryItem";

export async function getGalleryItemById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectDB();

  const item = await GalleryItem.findById(id)
    .lean()
    .exec();

  if (!item) {
    return null;
  }

  return {
    id: item._id.toString(),

    title: item.title,

    slug: item.slug,

    description: item.description,

    category: item.category,

    image: {
      url: item.image.url,
      publicId: item.image.publicId,
      alt: item.image.alt,
    },

    seoTitle: item.seoTitle ?? "",

    seoDescription:
      item.seoDescription ?? "",

    featured: item.featured,

    active: item.active,

    sortOrder: item.sortOrder,

    createdAt:
      item.createdAt.toISOString(),

    updatedAt:
      item.updatedAt.toISOString(),
  };
}