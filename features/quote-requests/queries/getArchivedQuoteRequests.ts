import QuoteRequest from "@/models/QuoteRequest";

export async function getArchivedQuoteRequests() {
  return QuoteRequest.find({
    archived: true,
  })
    .select({
      _id: 1,
      requestNumber: 1,
      referenceNumber: 1,
      customer: 1,
      service: 1,
      createdAt: 1,
      updatedAt: 1,
      archived: 1,
    })
    .sort({
      updatedAt: -1,
    })
    .lean()
    .exec();
}