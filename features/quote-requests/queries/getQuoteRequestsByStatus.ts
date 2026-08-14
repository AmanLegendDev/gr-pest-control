import QuoteRequest, {
  type QuoteRequestStatus,
} from "@/models/QuoteRequest";

export async function getQuoteRequestsByStatus(
  status: QuoteRequestStatus,
) {
  return QuoteRequest.find({
    status,
  })
    .sort({
      createdAt: -1,
    })
    .lean()
    .exec();
}