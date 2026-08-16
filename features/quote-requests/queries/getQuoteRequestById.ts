import mongoose from "mongoose";

import QuoteRequest from "@/models/QuoteRequest";

export async function getQuoteRequestById(
  id: string,
) {
  if (
    !mongoose.Types.ObjectId.isValid(id)
  ) {
    return null;
  }

  const request =
    await QuoteRequest.findById(id)
      .lean()
      .exec();

  if (!request) {
    return null;
  }

  return {
    id: String(request._id),

    requestNumber:
      request.requestNumber,

    referenceNumber:
      request.referenceNumber,

    customer: {
      name:
        request.customer.name,

      phone:
        request.customer.phone,

      email:
        request.customer.email ?? "",
    },

    service: {
      id:
        request.service.id,

      title:
        request.service.title,

      slug:
        request.service.slug,
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

    status:
      request.status,

    archived:
      request.archived ?? false,

    createdAt:
      new Date(
        request.createdAt,
      ).toISOString(),

    updatedAt:
      new Date(
        request.updatedAt,
      ).toISOString(),
  };
}