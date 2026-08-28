import { connectDB } from "@/lib/db/connect";
import QuoteRequest from "@/models/QuoteRequest";

export async function getAllQuoteRequests() {
  await connectDB();

  return QuoteRequest.find({
    archived: false,
  })
    .sort({
      createdAt: -1,
    })
    .lean()
    .exec();
}