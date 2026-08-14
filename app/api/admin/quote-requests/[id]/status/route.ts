import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import {
  updateQuoteRequestStatus,
} from "@/features/quote-requests/actions/updateQuoteRequestStatus";

import type {
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

const VALID_STATUSES: QuoteRequestStatus[] = [
  "pending",
  "in-progress",
  "completed",
  "cancelled",
];

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  try {
    /* =========================
       AUTHENTICATION
    ========================== */

    const session =
      await getServerSession(authOptions);

    if (
      !session?.user ||
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    /* =========================
       ROUTE PARAM
    ========================== */

    const { id } = await context.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quote request ID.",
        },
        {
          status: 400,
        },
      );
    }

    /* =========================
       REQUEST BODY
    ========================== */

    const body = await request.json();

    const nextStatus =
      body?.status as QuoteRequestStatus;

    if (
      !VALID_STATUSES.includes(nextStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request status.",
        },
        {
          status: 400,
        },
      );
    }

    /* =========================
       DATABASE
    ========================== */

    await connectDB();

    const result =
      await updateQuoteRequestStatus(
        id,
        nextStatus,
      );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        {
          status: 400,
        },
      );
    }

    /* =========================
       SUCCESS
    ========================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Quote request status updated successfully.",

        data: result.request,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "ADMIN_QUOTE_REQUEST_STATUS_UPDATE_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update quote request status.",
      },
      {
        status: 500,
      },
    );
  }
}