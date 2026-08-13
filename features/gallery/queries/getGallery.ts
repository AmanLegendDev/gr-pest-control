import { connectDB } from "@/lib/db/connect";
import GalleryItem from "@/models/GalleryItem";

import type {
  GalleryAdminViewModel,
  GalleryCategory,
  GalleryPublicViewModel,
} from "@/features/gallery/types/gallery";

export async function getActiveGallery(
  limit?: number,
): Promise<GalleryPublicViewModel[]> {
  await connectDB();

  const query = GalleryItem.find({
    active: true,
  })
    .select({
      _id: 1,
      title: 1,
      slug: 1,
      description: 1,
      category: 1,
      image: 1,
      featured: 1,
    })
    .sort({
      featured: -1,
      sortOrder: 1,
      createdAt: -1,
    });

  if (typeof limit === "number" && limit > 0) {
    query.limit(Math.min(limit, 100));
  }

  const items = await query.lean();

  return items.map((item) => ({
    id: String(item._id),

    title: item.title,

    slug: item.slug,

    description: item.description,

    category: item.category as GalleryCategory,

    image: {
      url: item.image.url,
      alt: item.image.alt,
    },

    featured: item.featured,
  }));
}

export async function getAdminGallery(
  limit = 50,
): Promise<GalleryAdminViewModel[]> {
  await connectDB();

  const safeLimit = Math.min(
    Math.max(limit, 1),
    100,
  );

  const items = await GalleryItem.find({})
    .select({
      _id: 1,
      title: 1,
      slug: 1,
      description: 1,
      category: 1,
      image: 1,
      seoTitle: 1,
      seoDescription: 1,
      featured: 1,
      active: 1,
      sortOrder: 1,
      createdAt: 1,
      updatedAt: 1,
    })
    .sort({
      createdAt: -1,
    })
    .limit(safeLimit)
    .lean();

  return items.map((item) => ({
    id: String(item._id),

    title: item.title,

    slug: item.slug,

    description: item.description,

    category: item.category as GalleryCategory,

    image: {
      url: item.image.url,
      publicId: item.image.publicId,
      alt: item.image.alt,
    },

    seoTitle: item.seoTitle ?? "",

    seoDescription: item.seoDescription ?? "",

    featured: item.featured,

    active: item.active,

    sortOrder: item.sortOrder,

    createdAt: new Date(
      item.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      item.updatedAt,
    ).toISOString(),
  }));
}

export async function getGalleryItemBySlug(
  slug: string,
): Promise<GalleryPublicViewModel | null> {
  await connectDB();

  const item = await GalleryItem.findOne({
    slug: slug.trim().toLowerCase(),
    active: true,
  })
    .select({
      _id: 1,
      title: 1,
      slug: 1,
      description: 1,
      category: 1,
      image: 1,
      featured: 1,
    })
    .lean();

  if (!item) {
    return null;
  }

  return {
    id: String(item._id),

    title: item.title,

    slug: item.slug,

    description: item.description,

    category: item.category as GalleryCategory,

    image: {
      url: item.image.url,
      alt: item.image.alt,
    },

    featured: item.featured,
  };
}