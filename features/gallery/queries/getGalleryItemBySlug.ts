import GalleryItem from "@/models/GalleryItem";

export async function getGalleryItemBySlug(
  slug: string,
) {
  const normalizedSlug = slug
    .trim()
    .toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const item = await GalleryItem.findOne({
    slug: normalizedSlug,
    active: true,
  })
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
    .lean()
    .exec();

  if (!item) {
    return null;
  }

  return {
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

    seoTitle:
      item.seoTitle || "",

    seoDescription:
      item.seoDescription || "",

    featured: Boolean(
      item.featured,
    ),

    active: Boolean(
      item.active,
    ),

    sortOrder:
      item.sortOrder ?? 0,

    createdAt: new Date(
      item.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      item.updatedAt,
    ).toISOString(),
  };
}

export type GalleryDetailItem =
  NonNullable<
    Awaited<
      ReturnType<
        typeof getGalleryItemBySlug
      >
    >
  >;