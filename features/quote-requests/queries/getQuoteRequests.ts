import QuoteRequest, {
  type QuoteRequestStatus,
} from "@/models/QuoteRequest";

import type {
  QuoteRequestAdminViewModel,
} from "@/features/quote-requests/types/quoteRequest";

/* =========================================================
   FILTER TYPES
========================================================= */

export interface GetQuoteRequestsOptions {
  status?: QuoteRequestStatus | "all";

  search?: string;

  archived?: boolean;

  limit?: number;
}

/* =========================================================
   ADMIN QUERY
========================================================= */

export async function getQuoteRequests(
  options: GetQuoteRequestsOptions = {},
): Promise<QuoteRequestAdminViewModel[]> {
  const {
    status = "all",
    search = "",
    archived = false,
    limit = 100,
  } = options;

  /* -------------------------------------------------------
     Safe limit
  ------------------------------------------------------- */

  const safeLimit = Math.min(
    Math.max(limit, 1),
    200,
  );

  /* -------------------------------------------------------
     Base filter
  ------------------------------------------------------- */

  const filter: Record<string, unknown> = {
  archived: {
    $ne: true,
  },
};

  /* -------------------------------------------------------
     Status filter
  ------------------------------------------------------- */

  if (status !== "all") {
    filter.status = status;
  }

  /* -------------------------------------------------------
     Search
  ------------------------------------------------------- */

  const normalizedSearch =
    search.trim();

  if (normalizedSearch) {
    const escapedSearch =
      escapeRegExp(normalizedSearch);

    const regex = new RegExp(
      escapedSearch,
      "i",
    );

    filter.$or = [
      {
        referenceNumber: regex,
      },
      {
        "customer.name": regex,
      },
      {
        "customer.phone": regex,
      },
      {
        "customer.email": regex,
      },
      {
        "service.title": regex,
      },
      {
        "location.suburb": regex,
      },
    ];
  }

  /* -------------------------------------------------------
     Database
  ------------------------------------------------------- */

  const requests =
    await QuoteRequest.find(filter)
      .select({
        _id: 1,

        requestNumber: 1,
        referenceNumber: 1,

        customer: 1,

        service: 1,

        propertyType: 1,

        location: 1,

        pestProblem: 1,

        preferredDate: 1,
        preferredTime: 1,

        status: 1,
        archived: 1,

        createdAt: 1,
        updatedAt: 1,
      })
      .sort({
        createdAt: -1,
      })
      .limit(safeLimit)
      .lean()
      .exec();

  /* -------------------------------------------------------
     View Model
  ------------------------------------------------------- */

  return requests.map(
    (request) => ({
      id: String(
        request._id,
      ),

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
          request.customer.email ??
          "",
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
    }),
  );
}

/* =========================================================
   ESCAPE REGEX
========================================================= */

function escapeRegExp(
  value: string,
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}