import { connectDB } from "@/lib/db/connect";
import FAQ from "@/models/FAQ";

import type {
  FAQAdminViewModel,
  FAQPublicViewModel,
} from "@/features/faq/types/faq";

export async function getActiveFAQs(
  limit?: number,
): Promise<FAQPublicViewModel[]> {
  await connectDB();

  const query = FAQ.find({ active: true })
    .select({
      _id: 1,
      question: 1,
      answer: 1,
      category: 1,
      sortOrder: 1,
      featured: 1,
    })
    .sort({
      featured: -1,
      sortOrder: 1,
      createdAt: -1,
    })
    .lean();

  if (typeof limit === "number" && limit > 0) {
    query.limit(Math.min(limit, 100));
  }

  const faqs = await query;

  return faqs.map((faq) => ({
    id: String(faq._id),
    question: faq.question,
    answer: faq.answer,
    category: faq.category ?? "",
    sortOrder: faq.sortOrder,
    featured: faq.featured,
  }));
}

export async function getAdminFAQs(
  limit = 50,
): Promise<FAQAdminViewModel[]> {
  await connectDB();

  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const faqs = await FAQ.find({})
    .select({
      _id: 1,
      question: 1,
      answer: 1,
      category: 1,
      sortOrder: 1,
      featured: 1,
      active: 1,
      seoTitle: 1,
      seoDescription: 1,
      createdAt: 1,
      updatedAt: 1,
    })
    .sort({
      sortOrder: 1,
      createdAt: -1,
    })
    .limit(safeLimit)
    .lean();

  return faqs.map((faq) => ({
    id: String(faq._id),
    question: faq.question,
    answer: faq.answer,
    category: faq.category ?? "",
    sortOrder: faq.sortOrder,
    featured: faq.featured,
    active: faq.active,
    seoTitle: faq.seoTitle ?? "",
    seoDescription: faq.seoDescription ?? "",
    createdAt: new Date(faq.createdAt).toISOString(),
    updatedAt: new Date(faq.updatedAt).toISOString(),
  }));
}