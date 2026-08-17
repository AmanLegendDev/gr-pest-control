import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";
import ServiceArea from "@/models/ServiceArea";

export async function getServiceAreaById(
  id: string,
) {
  if (
    !mongoose.Types.ObjectId.isValid(id)
  ) {
    return null;
  }

  await connectDB();

  const area =
    await ServiceArea.findById(id)
      .lean()
      .exec();

  if (!area) {
    return null;
  }

  return {
    id: area._id.toString(),

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
      area.highlights,

    nearbyAreas:
      area.nearbyAreas,

    faqs: area.faqs.map(
      (faq) => ({
        question:
          faq.question,
        answer:
          faq.answer,
        sortOrder:
          faq.sortOrder,
      }),
    ),

    seoTitle:
      area.seoTitle ?? "",

    seoDescription:
      area.seoDescription ?? "",

    featured:
      area.featured,

    active:
      area.active,

    sortOrder:
      area.sortOrder,

  createdAt: area.createdAt
  ? new Date(area.createdAt).toISOString()
  : new Date().toISOString(),

updatedAt: area.updatedAt
  ? new Date(area.updatedAt).toISOString()
  : new Date().toISOString(),
  };
}