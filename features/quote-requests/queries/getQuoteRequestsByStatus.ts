import QuoteRequest, {
  type QuoteRequestStatus,
} from "@/models/QuoteRequest";

export async function getQuoteRequestsByStatus(
  status: QuoteRequestStatus,
) {
  return QuoteRequest.find({
    status,
    archived: false,
  })
    .sort({
      createdAt: -1,
    })
    .lean()
    .exec();
}