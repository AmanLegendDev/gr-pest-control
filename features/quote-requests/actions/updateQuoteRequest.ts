"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import {
  authOptions,
} from "@/lib/auth/auth-options";

import {
  connectDB,
} from "@/lib/db/connect";

import QuoteRequest from "@/models/QuoteRequest";

import {
  adminQuoteRequestSchema,
  type AdminQuoteRequestFormValues,
} from "@/features/quote-requests/schemas/admin-quote-request-schema";

interface UpdateQuoteRequestSuccess {
  success: true;
  message: string;
}

interface UpdateQuoteRequestFailure {
  success: false;
  message: string;
  fieldErrors?: Record<
    string,
    string[]
  >;
}

export type UpdateQuoteRequestResult =
  | UpdateQuoteRequestSuccess
  | UpdateQuoteRequestFailure;

export async function updateQuoteRequest(
  id: string,
  values: AdminQuoteRequestFormValues,
): Promise<UpdateQuoteRequestResult> {
  try {
    /* =====================================================
       ADMIN AUTH
    ===================================================== */

    const session =
      await getServerSession(
        authOptions,
      );

    if (
      !session?.user ||
      session.user.role !== "ADMIN"
    ) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    /* =====================================================
       ID VALIDATION
    ===================================================== */

    if (
      !mongoose.Types.ObjectId.isValid(
        id,
      )
    ) {
      return {
        success: false,
        message:
          "Invalid quote request ID.",
      };
    }

    /* =====================================================
       SERVER VALIDATION
    ===================================================== */

    const parsed =
      adminQuoteRequestSchema.safeParse(
        values,
      );

    if (!parsed.success) {
      return {
        success: false,
        message:
          "Please correct the highlighted fields.",
        fieldErrors:
          parsed.error.flatten()
            .fieldErrors,
      };
    }

    const data = parsed.data;

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    const request =
      await QuoteRequest.findById(id);

    if (!request) {
      return {
        success: false,
        message:
          "Quote request not found.",
      };
    }

    /* =====================================================
       UPDATE CUSTOMER
    ===================================================== */

    request.customer = {
      name:
        data.customer.name.trim(),

      phone:
        data.customer.phone.trim(),

      email:
        data.customer.email
          .trim()
          .toLowerCase(),
    };

    /* =====================================================
       UPDATE PROPERTY
    ===================================================== */

    request.propertyType =
      data.propertyType;

    /* =====================================================
       UPDATE LOCATION
    ===================================================== */

    request.location = {
      suburb:
        data.location.suburb.trim(),

      address:
        data.location.address.trim(),
    };

    /* =====================================================
       UPDATE PROBLEM
    ===================================================== */

    request.pestProblem =
      data.pestProblem.trim();

    /* =====================================================
       UPDATE PREFERRED SLOT
    ===================================================== */

    request.preferredDate =
      data.preferredDate.trim();

    request.preferredTime =
      data.preferredTime.trim();

    /* =====================================================
       UPDATE STATUS
    ===================================================== */

    request.status =
      data.status;

    /* =====================================================
       UPDATE ARCHIVE
    ===================================================== */

    request.archived =
      data.archived;

    await request.save();

    /* =====================================================
       CACHE REVALIDATION
    ===================================================== */

    revalidatePath(
      "/admin/quote-requests",
    );

    revalidatePath(
      `/admin/quote-requests/${id}`,
    );

    return {
      success: true,
      message:
        "Quote request updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_QUOTE_REQUEST_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update the quote request right now. Please try again.",
    };
  }
}