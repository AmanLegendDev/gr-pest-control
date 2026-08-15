import Testimonial from "@/models/Testimonial";

export async function getFeaturedTestimonials() {
  const testimonials =
    await Testimonial.find({
      active: true,
      featured: true,
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
      })
      .sort({
        sortOrder: 1,
        rating: -1,
        createdAt: -1,
      })
      .limit(6)
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
    }),
  );
}

export type FeaturedTestimonial =
  Awaited<
    ReturnType<
      typeof getFeaturedTestimonials
    >
  >[number];