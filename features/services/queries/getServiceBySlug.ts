import Service from "@/models/Service";

export async function getServiceBySlug(
  slug: string,
) {
  const service = await Service.findOne({
    slug: slug.toLowerCase().trim(),
    active: true,
  })
    .lean()
    .exec();

  if (!service) {
    return null;
  }

  return {
    id: String(service._id),

    title: service.title,

    slug: service.slug,

    category: service.category,

    shortDescription:
      service.shortDescription,

    description: service.description,

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
            a.sortOrder - b.sortOrder,
        )
        .map((step) => ({
          title: step.title,
          description:
            step.description,
          sortOrder: step.sortOrder,
        })),

    faqs:
      (service.faqs ?? [])
        .slice()
        .sort(
          (a, b) =>
            a.sortOrder - b.sortOrder,
        )
        .map((faq) => ({
          question: faq.question,
          answer: faq.answer,
          sortOrder: faq.sortOrder,
        })),

    seoTitle:
      service.seoTitle || "",

    seoDescription:
      service.seoDescription || "",

    featured: service.featured,

    sortOrder: service.sortOrder,

    createdAt:
      new Date(
        service.createdAt,
      ).toISOString(),

    updatedAt:
      new Date(
        service.updatedAt,
      ).toISOString(),
  };
}

export type ServiceDetail =
  Awaited<
    ReturnType<typeof getServiceBySlug>
  >;