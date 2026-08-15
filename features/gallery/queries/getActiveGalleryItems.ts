import GalleryItem from "@/models/GalleryItem";

export async function getActiveGalleryItems() {
  const items = await GalleryItem.find({
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
      sortOrder: 1,
      createdAt: 1,
    })
    .sort({
      featured: -1,
      sortOrder: 1,
      createdAt: -1,
    })
    .lean()
    .exec();

  return items.map((item) => ({
    id: String(item._id),

    title: item.title,

    slug: item.slug,

    description: item.description,

    category: item.category,

    image: {
      url: item.image.url,
      publicId: item.image.publicId,
      alt: item.image.alt,
    },

    featured: Boolean(item.featured),

    sortOrder: item.sortOrder ?? 0,

    createdAt: new Date(
      item.createdAt,
    ).toISOString(),
  }));
}

export type ActiveGalleryItem =
  Awaited<
    ReturnType<
      typeof getActiveGalleryItems
    >
  >[number];