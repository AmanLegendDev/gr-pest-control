import QuoteRequest from "@/models/QuoteRequest";

export async function getAllQuoteRequests() {
  return QuoteRequest.find({
    archived: false,
  })
    .sort({
      createdAt: -1,
    })
    .lean()
    .exec();
}