import ServiceArea from "@/models/ServiceArea";

export async function getServiceAreaBySlug(
  slug: string,
) {
  const area = await ServiceArea.findOne({
    slug: slug.toLowerCase().trim(),
    active: true,
  })
    .lean()
    .exec();

  if (!area) {
    return null;
  }

  return {
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

    faqs:
      (area.faqs ?? [])
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
      area.seoTitle || "",

    seoDescription:
      area.seoDescription || "",

    featured:
      Boolean(area.featured),

    sortOrder:
      area.sortOrder ?? 0,

    createdAt:
      new Date(
        area.createdAt,
      ).toISOString(),

    updatedAt:
      new Date(
        area.updatedAt,
      ).toISOString(),
  };
}

export type ServiceAreaDetail =
  Awaited<
    ReturnType<
      typeof getServiceAreaBySlug
    >
  >;