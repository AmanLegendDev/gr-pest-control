import FAQ from "@/models/FAQ";

export async function getActiveFAQs() {
  const faqs = await FAQ.find({
    active: true,
  })
    .select({
      _id: 1,
      question: 1,
      answer: 1,
      category: 1,
      sortOrder: 1,
      featured: 1,
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

  return faqs.map((faq) => ({
    id: String(faq._id),

    question: faq.question,

    answer: faq.answer,

    category: faq.category || "General",

    sortOrder: faq.sortOrder ?? 0,

    featured: Boolean(
      faq.featured,
    ),

    seoTitle:
      faq.seoTitle || "",

    seoDescription:
      faq.seoDescription || "",

    createdAt: new Date(
      faq.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      faq.updatedAt,
    ).toISOString(),
  }));
}

export type ActiveFAQ =
  Awaited<
    ReturnType<
      typeof getActiveFAQs
    >
  >[number];