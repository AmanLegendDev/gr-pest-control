"use server";

import { connectDB } from "@/lib/db/connect";
import { authOptions } from "@/lib/auth/auth-options";
import FAQ from "@/models/FAQ";

import { getServerSession } from "next-auth";

import {
  faqSchema,
  type FAQFormValues,
} from "@/features/faq/schemas/faq-schema";

interface CreateFAQSuccess {
  success: true;
  faqId: string;
}

interface CreateFAQFailure {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export type CreateFAQResult = CreateFAQSuccess | CreateFAQFailure;

export async function createFAQ(
  values: FAQFormValues,
): Promise<CreateFAQResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const parsed = faqSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please correct the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    await connectDB();

    const normalizedQuestion = data.question.trim();

    const existingFAQ = await FAQ.findOne({
      question: {
        $regex: `^${escapeRegExp(normalizedQuestion)}$`,
        $options: "i",
      },
    })
      .select({ _id: 1 })
      .lean();

    if (existingFAQ) {
      return {
        success: false,
        message: "An FAQ with this question already exists.",
        fieldErrors: {
          question: ["An FAQ with this question already exists."],
        },
      };
    }

    const faq = await FAQ.create({
      question: normalizedQuestion,
      answer: data.answer.trim(),
      category: data.category.trim(),
      sortOrder: data.sortOrder,
      featured: data.featured,
      active: data.active,
      seoTitle: data.seoTitle.trim(),
      seoDescription: data.seoDescription.trim(),
    });

    return {
      success: true,
      faqId: String(faq._id),
    };
  } catch (error) {
    console.error("CREATE_FAQ_ERROR", error);

    return {
      success: false,
      message: "Unable to create the FAQ right now. Please try again.",
    };
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}