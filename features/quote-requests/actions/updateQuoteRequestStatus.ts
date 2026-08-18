"use server";

import mongoose from "mongoose";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import QuoteRequest, {
  type QuoteRequestStatus,
} from "@/models/QuoteRequest";

import {
  sendQuoteCancelledEmail,
  sendQuoteCompletedEmail,
} from "@/lib/email/quote-request-emails";

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

/* =========================================================
   ALLOWED STATUS FLOW
========================================================= */

const ALLOWED_TRANSITIONS: Record<
  QuoteRequestStatus,
  readonly QuoteRequestStatus[]
> = {
  pending: [
    "in-progress",
    "cancelled",
  ],

  "in-progress": [
    "completed",
    "cancelled",
  ],

  completed: [],

  cancelled: [],
};

const VALID_STATUSES: readonly QuoteRequestStatus[] =
  [
    "pending",
    "in-progress",
    "completed",
    "cancelled",
  ];

/* =========================================================
   UPDATE STATUS
========================================================= */

export async function updateQuoteRequestStatus(
  id: string,
  nextStatus: QuoteRequestStatus,
): Promise<QuoteRequestStatusUpdateResult> {
  try {
    /* =====================================================
       ADMIN AUTH
    ====================================================== */

    await requireAdmin();

    /* =====================================================
       ID VALIDATION
    ====================================================== */

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return {
        success: false,
        message:
          "Invalid quote request ID.",
      };
    }

    /* =====================================================
       STATUS VALIDATION
    ====================================================== */

    if (
      !VALID_STATUSES.includes(
        nextStatus,
      )
    ) {
      return {
        success: false,
        message:
          "Invalid request status.",
      };
    }

    /* =====================================================
       DATABASE
    ====================================================== */

    await connectDB();

    const request =
      await QuoteRequest.findById(id)
        .select({
          _id: 1,
          referenceNumber: 1,
          status: 1,

          customer: 1,

          service: 1,

          propertyType: 1,

          location: 1,

          pestProblem: 1,

          preferredDate: 1,

          preferredTime: 1,

          createdAt: 1,
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
       CURRENT STATUS
    ====================================================== */

    const currentStatus =
      request.status;

    const allowedNextStatuses =
      ALLOWED_TRANSITIONS[
        currentStatus
      ];

    /* =====================================================
       TRANSITION VALIDATION
    ====================================================== */

    if (
      !allowedNextStatuses.includes(
        nextStatus,
      )
    ) {
      return {
        success: false,
        message: `Request cannot move from "${currentStatus}" to "${nextStatus}".`,
      };
    }

    /* =====================================================
       UPDATE DATABASE
    ====================================================== */

    request.status = nextStatus;

    await request.save();

    /* =====================================================
       EMAIL NOTIFICATIONS
       
       IMPORTANT:
       DB update has already succeeded.

       Email failure must NOT undo the status update.
    ====================================================== */

    try {
      const emailData = {
        id: String(request._id),

        referenceNumber:
          request.referenceNumber,

        customer: {
          name:
            request.customer.name,

          phone:
            request.customer.phone,

          email:
            request.customer.email ??
            "",
        },

        service: {
          title:
            request.service.title,
        },

        propertyType:
          request.propertyType,

        location: {
          suburb:
            request.location.suburb,

          address:
            request.location.address,
        },

        pestProblem:
          request.pestProblem,

        preferredDate:
          request.preferredDate,

        preferredTime:
          request.preferredTime,

        createdAt:
          request.createdAt,
      };

      /* -----------------------------------------------
         CANCELLED
      ----------------------------------------------- */

      if (
        nextStatus ===
        "cancelled"
      ) {
        await sendQuoteCancelledEmail(
          emailData,
        );
      }

      /* -----------------------------------------------
         COMPLETED
      ----------------------------------------------- */

      if (
        nextStatus ===
        "completed"
      ) {
        await sendQuoteCompletedEmail(
          emailData,
        );
      }
    } catch (emailError) {
      /*
       * Do NOT fail the admin status update
       * just because email delivery failed.
       */

      console.error(
        "QUOTE_STATUS_EMAIL_ERROR",
        {
          id,
          referenceNumber:
            request.referenceNumber,
          nextStatus,
          error: emailError,
        },
      );
    }

    /* =====================================================
       RESULT
    ====================================================== */

    return {
      success: true,

      request: {
        id: String(
          request._id,
        ),

        referenceNumber:
          request.referenceNumber,

        status:
          request.status,
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