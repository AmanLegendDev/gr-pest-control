import Testimonial from "@/models/Testimonial";

export async function getActiveTestimonials() {
  const testimonials =
    await Testimonial.find({
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
        sortOrder: 1,
        seoTitle: 1,
        seoDescription: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .sort({
        featured: -1,
        sortOrder: 1,
        createdAt: -1,
      })
      .lean()
      .exec();

  return testimonials.map(
    (testimonial) => ({
      id: String(
        testimonial._id,
      ),

      name:
        testimonial.name,

      role:
        testimonial.role || "",

      company:
        testimonial.company || "",

      content:
        testimonial.content,

      rating:
        testimonial.rating,

      location:
        testimonial.location || "",

      image:
        testimonial.image
          ? {
              url:
                testimonial.image
                  .url,

              alt:
                testimonial.image
                  .alt,
            }
          : null,

      featured:
        Boolean(
          testimonial.featured,
        ),

      sortOrder:
        testimonial.sortOrder ?? 0,

      seoTitle:
        testimonial.seoTitle || "",

      seoDescription:
        testimonial.seoDescription ||
        "",

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

export type ActiveTestimonial =
  Awaited<
    ReturnType<
      typeof getActiveTestimonials
    >
  >[number];