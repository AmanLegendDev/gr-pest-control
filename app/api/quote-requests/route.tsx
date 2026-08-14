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
    /* =====================================================
       VALIDATE REQUEST BODY
    ====================================================== */

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

    /* =====================================================
       DATABASE
    ====================================================== */

    await connectDB();

    /* =====================================================
       VALIDATE SERVICE ID
    ====================================================== */

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

    /* =====================================================
       VERIFY ACTIVE SERVICE
    ====================================================== */

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

    /* =====================================================
       GENERATE REQUEST NUMBER
       
       Testing behaviour:
       
       Empty QuoteRequest collection
         → GR-1

       Existing highest request = GR-4
         → GR-5
       
       Sequence is updated atomically.
    ====================================================== */

    const latestQuote =
      await QuoteRequest.findOne({})
        .sort({
          requestNumber: -1,
        })
        .select({
          requestNumber: 1,
        })
        .lean()
        .exec();

    const currentHighest =
      latestQuote?.requestNumber ?? 0;

    const sequence =
      await Sequence.findOneAndUpdate(
        {
          name: "quote-request",
        },
        {
          $max: {
            value: currentHighest,
          },
        },
        {
          new: false,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      ).exec();

    const sequenceValue =
      sequence?.value ?? 0;

    const nextRequestNumber =
      Math.max(
        currentHighest,
        sequenceValue,
      ) + 1;

    const updatedSequence =
      await Sequence.findOneAndUpdate(
        {
          name: "quote-request",
        },
        {
          $set: {
            value: nextRequestNumber,
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

    if (!updatedSequence) {
      throw new Error(
        "Unable to generate quote request number.",
      );
    }

    const requestNumber =
      updatedSequence.value;

    const referenceNumber =
      `GR-${requestNumber}`;

    /* =====================================================
       CREATE QUOTE REQUEST
       
       Every new request ALWAYS starts as:
       
       pending
    ====================================================== */

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
         * Snapshot service information.
         * This keeps historical requests
         * accurate if the service changes later.
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

        status: "pending",
      });

    /* =====================================================
       SUCCESS RESPONSE
    ====================================================== */

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