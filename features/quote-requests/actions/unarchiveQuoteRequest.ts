"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import QuoteRequest from "@/models/QuoteRequest";

export type UnarchiveQuoteRequestResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function unarchiveQuoteRequest(
  id: string,
): Promise<UnarchiveQuoteRequestResult> {
  try {
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

    const request =
      await QuoteRequest.findById(id)
        .select({
          _id: 1,
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

    if (!request.archived) {
      return {
        success: false,
        message:
          "This quote request is already active.",
      };
    }

    request.archived = false;

    await request.save();

    revalidatePath(
      "/admin/quote-requests",
    );

    revalidatePath(
      `/admin/quote-requests/${id}`,
    );

    return {
      success: true,
      message:
        "Quote request restored successfully.",
    };
  } catch (error) {
    console.error(
      "UNARCHIVE_QUOTE_REQUEST_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to restore the quote request right now. Please try again.",
    };
  }
}