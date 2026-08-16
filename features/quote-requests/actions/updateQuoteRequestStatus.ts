"use server";

import mongoose from "mongoose";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import QuoteRequest, {
  type QuoteRequestStatus,
} from "@/models/QuoteRequest";

export type QuoteRequestStatusUpdateResult =
  | {
      success: true;
      request: {
        id: string;
        referenceNumber: string;
        status: QuoteRequestStatus;
      };
    }
  | {
      success: false;
      message: string;
    };

/**
 * Allowed status flow:
 *
 * pending
 *   ├── in-progress
 *   └── cancelled
 *
 * in-progress
 *   ├── completed
 *   └── cancelled
 *
 * completed → locked
 * cancelled → locked
 */
const ALLOWED_TRANSITIONS: Record<
  QuoteRequestStatus,
  readonly QuoteRequestStatus[]
> = {
  pending: ["in-progress", "cancelled"],

  "in-progress": ["completed", "cancelled"],

  completed: [],

  cancelled: [],
};

const VALID_STATUSES: readonly QuoteRequestStatus[] = [
  "pending",
  "in-progress",
  "completed",
  "cancelled",
];

export async function updateQuoteRequestStatus(
  id: string,
  nextStatus: QuoteRequestStatus,
): Promise<QuoteRequestStatusUpdateResult> {
  try {
    /* =========================
       ADMIN AUTH
    ========================== */

    await requireAdmin();

    /* =========================
       ID VALIDATION
    ========================== */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid quote request ID.",
      };
    }

    /* =========================
       STATUS VALIDATION
    ========================== */

    if (!VALID_STATUSES.includes(nextStatus)) {
      return {
        success: false,
        message: "Invalid request status.",
      };
    }

    /* =========================
       DATABASE
    ========================== */

    await connectDB();

    const request = await QuoteRequest.findById(id)
      .select({
        _id: 1,
        referenceNumber: 1,
        status: 1,
      })
      .exec();

    if (!request) {
      return {
        success: false,
        message: "Quote request not found.",
      };
    }

    /* =========================
       CURRENT STATUS
    ========================== */

    const currentStatus = request.status;

    const allowedNextStatuses =
      ALLOWED_TRANSITIONS[currentStatus];

    /* =========================
       TRANSITION VALIDATION
    ========================== */

    if (!allowedNextStatuses.includes(nextStatus)) {
      return {
        success: false,
        message: `Request cannot move from "${currentStatus}" to "${nextStatus}".`,
      };
    }

    /* =========================
       UPDATE
    ========================== */

    request.status = nextStatus;

    await request.save();

    /* =========================
       RESULT
    ========================== */

    return {
      success: true,

      request: {
        id: String(request._id),
        referenceNumber: request.referenceNumber,
        status: request.status,
      },
    };
  } catch (error) {
    console.error(
      "UPDATE_QUOTE_REQUEST_STATUS_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update quote request status right now.",
    };
  }
}