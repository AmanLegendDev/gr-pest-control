import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

export interface FeaturedService {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  heroImage?: {
    url: string;
    alt: string;
  };
}

export async function getFeaturedServices(
  limit = 3,
): Promise<FeaturedService[]> {
  try {
    await connectDB();

    const services = await Service.find({
      active: true,
    })
      .select({
        _id: 1,
        title: 1,
        slug: 1,
        category: 1,
        shortDescription: 1,
        heroImage: 1,
        featured: 1,
        sortOrder: 1,
      })
      .sort({
        featured: -1,
        sortOrder: 1,
        createdAt: -1,
      })
      .limit(limit)
      .lean()
      .exec();

    return services.map((service) => ({
      id: String(service._id),
      title: service.title,
      slug: service.slug,
      category: service.category,
      shortDescription: service.shortDescription,
      heroImage: service.heroImage
        ? {
            url: service.heroImage.url,
            alt: service.heroImage.alt,
          }
        : undefined,
    }));
  } catch (error) {
    console.error(
      "GET_FEATURED_SERVICES_ERROR",
      error,
    );

    return [];
  }
}