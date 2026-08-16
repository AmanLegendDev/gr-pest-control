"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import QuoteRequest from "@/models/QuoteRequest";

export type ArchiveQuoteRequestResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function archiveQuoteRequest(
  id: string,
): Promise<ArchiveQuoteRequestResult> {
  try {
    /* =====================================================
       ADMIN AUTH
    ===================================================== */

    const session =
      await getServerSession(authOptions);

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
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return {
        success: false,
        message:
          "Invalid quote request ID.",
      };
    }

    await connectDB();

    /* =====================================================
       FIND REQUEST
    ===================================================== */

    const request =
      await QuoteRequest.findById(id)
        .select({
          _id: 1,
          referenceNumber: 1,
          archived: 1,
        })
        .exec();

    if (!request) {
      return {
        success: false,
        message:
          "Quote request not found.",
      };
    }

    /* =====================================================
       ALREADY ARCHIVED
    ===================================================== */

    if (request.archived) {
      return {
        success: false,
        message:
          "This quote request is already archived.",
      };
    }

    /* =====================================================
       ARCHIVE
    ===================================================== */

    request.archived = true;

    await request.save();

    /* =====================================================
       REVALIDATE
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
        "Quote request archived successfully.",
    };
  } catch (error) {
    console.error(
      "ARCHIVE_QUOTE_REQUEST_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to archive the quote request right now. Please try again.",
    };
  }
}