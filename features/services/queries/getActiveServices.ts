import Service from "@/models/Service";

export async function getActiveServices() {
  const services = await Service.find({
    active: true,
  })
    .select({
      _id: 1,
      title: 1,
      slug: 1,
      category: 1,
      shortDescription: 1,
      description: 1,
      price: 1,
      heroImage: 1,
      icon: 1,
      pestTypes: 1,
      benefits: 1,
      process: 1,
      faqs: 1,
      featured: 1,
      sortOrder: 1,
      seoTitle: 1,
      seoDescription: 1,
    })
    .sort({
      featured: -1,
      sortOrder: 1,
      createdAt: -1,
    })
    .lean()
    .exec();

  return services.map((service) => ({
    id: String(service._id),

    title: service.title,

    slug: service.slug,

    category: service.category,

    shortDescription:
      service.shortDescription,

    description:
      service.description,

    price:
      service.price ?? 0,

    heroImage: service.heroImage
      ? {
          url: service.heroImage.url,
          publicId:
            service.heroImage.publicId,
          alt: service.heroImage.alt,
        }
      : undefined,

    icon: service.icon || "",

    pestTypes:
      service.pestTypes ?? [],

    benefits:
      service.benefits ?? [],

    process:
      (service.process ?? [])
        .slice()
        .sort(
          (a, b) =>
            a.sortOrder -
            b.sortOrder,
        ),

    faqs:
      (service.faqs ?? [])
        .slice()
        .sort(
          (a, b) =>
            a.sortOrder -
            b.sortOrder,
        ),

    featured:
      service.featured,

    sortOrder:
      service.sortOrder,

    seoTitle:
      service.seoTitle || "",

    seoDescription:
      service.seoDescription || "",
  }));
}