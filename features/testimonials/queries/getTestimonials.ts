import { connectDB } from "@/lib/db/connect";
import Testimonial from "@/models/Testimonial";

import type {
  TestimonialAdminViewModel,
  TestimonialPublicViewModel,
} from "@/features/testimonials/types/testimonial";

/**
 * Get active testimonials for the public website.
 */
export async function getActiveTestimonials(
  limit?: number,
): Promise<TestimonialPublicViewModel[]> {
  await connectDB();

  const query = Testimonial.find({
    active: true,
  })
    .select({
      _id: 1,
      name: 1,
      role: 1,
      company: 1,
      content: 1,
      rating: 1,
      location: 1,
      image: 1,
      featured: 1,
    })
    .sort({
      featured: -1,
      sortOrder: 1,
      createdAt: -1,
    });

  if (
    typeof limit === "number" &&
    limit > 0
  ) {
    query.limit(
      Math.min(limit, 100),
    );
  }

  const testimonials =
    await query.lean();

  return testimonials.map(
    (testimonial) => ({
      id: String(testimonial._id),

      name: testimonial.name,

      role: testimonial.role ?? "",

      company:
        testimonial.company ?? "",

      content: testimonial.content,

      rating: testimonial.rating,

      location:
        testimonial.location ?? "",

      image: testimonial.image
        ? {
            url: testimonial.image.url,
            alt: testimonial.image.alt,
          }
        : undefined,

      featured: testimonial.featured,
    }),
  );
}

/**
 * Get testimonials for the admin dashboard.
 */
export async function getAdminTestimonials(
  limit = 50,
): Promise<TestimonialAdminViewModel[]> {
  await connectDB();

  const safeLimit = Math.min(
    Math.max(limit, 1),
    100,
  );

  const testimonials =
    await Testimonial.find({})
      .select({
        _id: 1,
        name: 1,
        role: 1,
        company: 1,
        content: 1,
        rating: 1,
        location: 1,
        image: 1,
        seoTitle: 1,
        seoDescription: 1,
        featured: 1,
        active: 1,
        sortOrder: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .sort({
        createdAt: -1,
      })
      .limit(safeLimit)
      .lean();

  return testimonials.map(
    (testimonial) => ({
      id: String(testimonial._id),

      name: testimonial.name,

      role: testimonial.role ?? "",

      company:
        testimonial.company ?? "",

      content: testimonial.content,

      rating: testimonial.rating,

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

      featured: testimonial.featured,

      active: testimonial.active,

      sortOrder:
        testimonial.sortOrder,

      createdAt:
        new Date(
          testimonial.createdAt,
        ).toISOString(),

      updatedAt:
        new Date(
          testimonial.updatedAt,
        ).toISOString(),
    }),
  );
}