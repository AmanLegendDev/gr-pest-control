"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";
import ServiceArea from "@/models/ServiceArea";
import { revalidatePath } from "next/cache";

import {
  serviceAreaSchema,
  type ServiceAreaFormValues,
} from "@/features/service-areas/schemas/service-area-schema";

type CreateServiceAreaResult = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createServiceArea(
  values: ServiceAreaFormValues,
): Promise<CreateServiceAreaResult> {
  try {
    // --------------------------------------------------
    // 1. ADMIN AUTHORIZATION
    // --------------------------------------------------

    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        success: false,
        message: "Unauthorized. Admin access is required.",
      };
    }

    // --------------------------------------------------
    // 2. SERVER-SIDE VALIDATION
    // --------------------------------------------------

    const parsed = serviceAreaSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path.join(".");

        if (!field) continue;

        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }

        fieldErrors[field].push(issue.message);
      }

      return {
        success: false,
        message: "Please correct the highlighted fields.",
        fieldErrors,
      };
    }

    const data = parsed.data;

    // --------------------------------------------------
    // 3. DATABASE CONNECTION
    // --------------------------------------------------

    await connectDB();

    // --------------------------------------------------
    // 4. NORMALIZE SLUG
    // --------------------------------------------------

    const normalizedSlug = data.slug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    // --------------------------------------------------
    // 5. CHECK DUPLICATE SLUG
    // --------------------------------------------------

    const existingArea = await ServiceArea.findOne({
      slug: normalizedSlug,
    })
      .select("_id")
      .lean();

    if (existingArea) {
      return {
        success: false,
        message: "A service area with this slug already exists.",
        fieldErrors: {
          slug: ["This slug is already in use."],
        },
      };
    }

    // --------------------------------------------------
    // 6. CLEAN ARRAY DATA
    // --------------------------------------------------

    const highlights = data.highlights
      .map((item) => item.trim())
      .filter(Boolean);

    const nearbyAreas = data.nearbyAreas
      .map((item) => item.trim())
      .filter(Boolean);

    const faqs = data.faqs.map((faq, index) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
      sortOrder:
        typeof faq.sortOrder === "number"
          ? faq.sortOrder
          : index,
    }));

    // --------------------------------------------------
    // 7. CREATE DOCUMENT
    // --------------------------------------------------

    await ServiceArea.create({
      name: data.name.trim(),
      slug: normalizedSlug,

      shortDescription: data.shortDescription.trim(),
      description: data.description.trim(),

      image: data.image,

      highlights,
      nearbyAreas,
      faqs,

      seoTitle: data.seoTitle?.trim() ?? "",
      seoDescription: data.seoDescription?.trim() ?? "",

      featured: Boolean(data.featured),
      active: Boolean(data.active),
      sortOrder: data.sortOrder ?? 0,
    });

    // --------------------------------------------------
    // 8. SUCCESS
    // --------------------------------------------------


    revalidatePath("/service-areas");
revalidatePath("/admin");
revalidatePath("/admin/service-areas");

    return {
      success: true,
      message: "Service area created successfully.",
    };
  } catch (error) {
    // Duplicate-key protection in case two requests
    // attempt to create the same slug simultaneously.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return {
        success: false,
        message: "A service area with this slug already exists.",
        fieldErrors: {
          slug: ["This slug is already in use."],
        },
      };
    }

    console.error("CREATE_SERVICE_AREA_ERROR", error);

    return {
      success: false,
      message:
        "Unable to create the service area right now. Please try again.",
    };
  }
}