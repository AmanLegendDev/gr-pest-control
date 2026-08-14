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

export async function updateQuoteRequestStatus(
  id: string,
  nextStatus: QuoteRequestStatus,
): Promise<QuoteRequestStatusUpdateResult> {
  /*
   * Make sure this status transition
   * is actually allowed.
   */
  const allowedStatuses =
    ALLOWED_TRANSITIONS[nextStatus];

  /*
   * The status itself must be valid.
   */
  if (!allowedStatuses) {
    return {
      success: false,
      message: "Invalid request status.",
    };
  }

  const request =
    await QuoteRequest.findById(id)
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

  const currentStatus =
    request.status;

  /*
   * Check whether the requested
   * transition is allowed.
   *
   * Example:
   *
   * pending → in-progress    ✓
   * pending → cancelled      ✓
   * pending → completed      ✗
   *
   * in-progress → completed  ✓
   * in-progress → cancelled  ✓
   */
  const transitions =
    ALLOWED_TRANSITIONS[
      currentStatus
    ];

  if (
    !transitions.includes(nextStatus)
  ) {
    return {
      success: false,
      message: `Request cannot move from "${currentStatus}" to "${nextStatus}".`,
    };
  }

  /*
   * Update only after the transition
   * has passed validation.
   */
  request.status = nextStatus;

  await request.save();

  return {
    success: true,

    request: {
      id: String(request._id),

      referenceNumber:
        request.referenceNumber,

      status: request.status,
    },
  };
}