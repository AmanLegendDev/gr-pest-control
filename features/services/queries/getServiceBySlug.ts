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


  function toSafeISOString(
  value: Date | string | undefined | null,
): string {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}

  return {
    id: String(service._id),

    title: service.title,

    slug: service.slug,

    category: service.category,

    shortDescription:
      service.shortDescription,

    description: service.description,

    price: service.price ?? 0,

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

createdAt: toSafeISOString(
  service.createdAt,
),

updatedAt: toSafeISOString(
  service.updatedAt,
),
  };
}

export type ServiceDetail =
  Awaited<
    ReturnType<typeof getServiceBySlug>
  >;