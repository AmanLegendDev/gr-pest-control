import ServiceArea from "@/models/ServiceArea";

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

    createdAt: toSafeISOString(
      area.createdAt,
    ),

    updatedAt: toSafeISOString(
      area.updatedAt,
    ),
  };
}

export type ServiceAreaDetail =
  Awaited<
    ReturnType<
      typeof getServiceAreaBySlug
    >
  >;