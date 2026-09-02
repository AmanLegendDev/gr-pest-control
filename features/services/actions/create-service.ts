"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import {
  createServiceSchema,
  type CreateServiceInput,
} from "../schemas/service-schema";

type CreateServiceResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

export async function createService(
  input: CreateServiceInput
): Promise<CreateServiceResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const parsed = createServiceSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    await connectDB();

    const existingService = await Service.findOne({
      slug: data.slug,
    })
      .select("_id")
      .lean();

    if (existingService) {
      return {
        success: false,
        message: "A service with this slug already exists.",
        fieldErrors: {
          slug: ["This slug is already in use."],
        },
      };
    }

    await Service.create({
      title: data.title,
      slug: data.slug,
      category: data.category,
      shortDescription: data.shortDescription,
      description: data.description,
      price: data.price,
      heroImage: data.heroImage,
      icon: data.icon ?? "",
      pestTypes: data.pestTypes,
      benefits: data.benefits,
      process: data.process,
      faqs: data.faqs,
      seoTitle: data.seoTitle ?? "",
      seoDescription: data.seoDescription ?? "",
      featured: data.featured,
      active: data.active,
      sortOrder: data.sortOrder,
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin");
    revalidatePath("/admin/services");

    return {
      success: true,
      message: "Service created successfully.",
    };
  } catch (error) {
    console.error("CREATE_SERVICE_ERROR", error);

    return {
      success: false,
      message: "Unable to create service right now. Please try again.",
    };
  }
}