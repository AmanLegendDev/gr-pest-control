import { connectDB } from "@/lib/db/connect";
import ServiceArea from "@/models/ServiceArea";

export interface ServiceAreaPublicViewModel {
  id: string;

  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  image?: {
    url: string;
    alt: string;
  };

  highlights: string[];
  nearbyAreas: string[];

  featured: boolean;
}

export async function getFeaturedServiceAreas(
  limit = 3,
): Promise<ServiceAreaPublicViewModel[]> {
  await connectDB();

  const safeLimit = Math.min(
    Math.max(limit, 1),
    10,
  );

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
    })
    .sort({
      featured: -1,
      sortOrder: 1,
      createdAt: -1,
    })
    .limit(safeLimit)
    .lean()
    .exec();

  return areas.map((area) => ({
    id: String(area._id),

    name: area.name,
    slug: area.slug,

    shortDescription: area.shortDescription,
    description: area.description,

    image: area.image
      ? {
          url: area.image.url,
          alt: area.image.alt,
        }
      : undefined,

    highlights: Array.isArray(area.highlights)
      ? area.highlights
      : [],

    nearbyAreas: Array.isArray(area.nearbyAreas)
      ? area.nearbyAreas
      : [],

    featured: Boolean(area.featured),
  }));
}