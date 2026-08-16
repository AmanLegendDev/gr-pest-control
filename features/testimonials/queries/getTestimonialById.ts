import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";
import Testimonial from "@/models/Testimonial";

export async function getTestimonialById(
  id: string,
) {
  if (
    !mongoose.Types.ObjectId.isValid(id)
  ) {
    return null;
  }

  await connectDB();

  const testimonial =
    await Testimonial.findById(id)
      .lean()
      .exec();

  if (!testimonial) {
    return null;
  }

  return {
    id: testimonial._id.toString(),

    name: testimonial.name,

    role:
      testimonial.role ?? "",

    company:
      testimonial.company ?? "",

    content:
      testimonial.content,

    rating:
      testimonial.rating,

    location:
      testimonial.location ?? "",

    image: testimonial.image
      ? {
          url: testimonial.image.url,
          publicId:
            testimonial.image.publicId,
          alt: testimonial.image.alt,
        }
      : undefined,

    seoTitle:
      testimonial.seoTitle ?? "",

    seoDescription:
      testimonial.seoDescription ?? "",

    featured:
      testimonial.featured,

    active:
      testimonial.active,

    sortOrder:
      testimonial.sortOrder,

    createdAt:
      testimonial.createdAt.toISOString(),

    updatedAt:
      testimonial.updatedAt.toISOString(),
  };
}