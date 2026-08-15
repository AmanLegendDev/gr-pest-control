import ServiceArea from "@/models/ServiceArea";

export async function getActiveServiceAreas() {
  const areas = await ServiceArea.find({
    active: true,
  })
    .select({
      _id: 1,
      name: 1,
      slug: 1,
      shortDescription: 1,
      description: 1,
      image: 1,
      highlights: 1,
      nearbyAreas: 1,
      featured: 1,
      sortOrder: 1,
    })
    .sort({
      featured: -1,
      sortOrder: 1,
      createdAt: -1,
    })
    .lean()
    .exec();

  return areas.map((area) => ({
    id: String(area._id),

    name: area.name,

    slug: area.slug,

    shortDescription:
      area.shortDescription,

    description:
      area.description,

    image: area.image
      ? {
          url: area.image.url,
          publicId:
            area.image.publicId,
          alt: area.image.alt,
        }
      : undefined,

    highlights:
      area.highlights ?? [],

    nearbyAreas:
      area.nearbyAreas ?? [],

    featured:
      Boolean(area.featured),

    sortOrder:
      area.sortOrder ?? 0,
  }));
}

export type ActiveServiceArea =
  Awaited<
    ReturnType<
      typeof getActiveServiceAreas
    >
  >[number];