"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

type DeleteServiceResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function deleteService(
  id: string,
): Promise<DeleteServiceResult> {
  const session =
    await getServerSession(authOptions);

  /*
   * =========================
   * ADMIN AUTHORIZATION
   * =========================
   */

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  /*
   * =========================
   * OBJECT ID VALIDATION
   * =========================
   */

  if (
    !mongoose.Types.ObjectId.isValid(id)
  ) {
    return {
      success: false,
      message: "Invalid service ID.",
    };
  }

  try {
    await connectDB();

    /*
     * =========================
     * FIND SERVICE
     * =========================
     */

    const service =
      await Service.findById(id);

    if (!service) {
      return {
        success: false,
        message: "Service not found.",
      };
    }

    const slug = service.slug;

    /*
     * =========================
     * DELETE
     * =========================
     */

    await Service.deleteOne({
      _id: service._id,
    });

    /*
     * =========================
     * CACHE REVALIDATION
     * =========================
     */

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath(
      `/services/${slug}`,
    );
    revalidatePath("/admin");
    revalidatePath(
      "/admin/services",
    );

    return {
      success: true,
      message:
        "Service deleted successfully.",
    };
  } catch (error) {
    console.error(
      "DELETE_SERVICE_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to delete service right now. Please try again.",
    };
  }
}