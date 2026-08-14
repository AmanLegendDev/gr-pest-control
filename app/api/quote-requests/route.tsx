import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";
import QuoteRequest from "@/models/QuoteRequest";
import Sequence from "@/models/Sequence";
import Service from "@/models/Service";

import {
  quoteRequestSchema,
} from "@/features/quote-requests/validation/quoteRequestSchema";

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();

    const parsed =
      quoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please check the submitted details.",
          errors:
            parsed.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const data = parsed.data;

    await connectDB();

    /*
     * Make sure the selected service
     * actually exists and is active.
     */
    if (
      !mongoose.Types.ObjectId.isValid(
        data.serviceId,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid service selected.",
        },
        {
          status: 400,
        },
      );
    }

    const service =
      await Service.findOne({
        _id: data.serviceId,
        active: true,
      })
        .select({
          _id: 1,
          title: 1,
          slug: 1,
        })
        .lean()
        .exec();

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The selected service is no longer available.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Atomically generate:
     *
     * GR-1
     * GR-2
     * GR-3
     * ...
     *
     * $inc makes this safe even when
     * multiple requests arrive together.
     */
    const sequence =
      await Sequence.findOneAndUpdate(
        {
          name: "quote-request",
        },
        {
          $inc: {
            value: 1,
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      )
        .lean()
        .exec();

    if (!sequence) {
      throw new Error(
        "Unable to generate quote request number.",
      );
    }

    const requestNumber =
      sequence.value;

    const referenceNumber =
      `GR-${requestNumber}`;

    /*
     * Create the actual request.
     */
    const quote =
      await QuoteRequest.create({
        requestNumber,

        referenceNumber,

        customer: {
          name: data.customer.name,
          phone: data.customer.phone,
          email:
            data.customer.email ?? "",
        },

        /*
         * Snapshot the service information.
         * Old requests remain accurate even if
         * the service is later renamed.
         */
        service: {
          id: String(service._id),
          title: service.title,
          slug: service.slug,
        },

        propertyType:
          data.propertyType,

        location: {
          suburb:
            data.location.suburb,
          address:
            data.location.address,
        },

        pestProblem:
          data.pestProblem,

        preferredDate:
          data.preferredDate,

        preferredTime:
          data.preferredTime,

        status: "new",
      });

    return NextResponse.json(
      {
        success: true,

        message:
          "Quote request submitted successfully.",

        data: {
          id: String(quote._id),

          referenceNumber:
            quote.referenceNumber,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "QUOTE_REQUEST_CREATE_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your request.",
      },
      {
        status: 500,
      },
    );
  }
}