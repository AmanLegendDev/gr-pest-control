import QuoteRequest from "@/models/QuoteRequest";

export async function getQuoteRequestCounts() {
  const counts =
    await QuoteRequest.aggregate([
      {
        $match: {
          archived: false,
        },
      },

      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

  const result = {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  };

  for (const item of counts) {
    const count =
      Number(item.count) || 0;

    result.total += count;

    switch (item._id) {
      case "pending":
        result.pending = count;
        break;

      case "in-progress":
        result.inProgress = count;
        break;

      case "completed":
        result.completed = count;
        break;

      case "cancelled":
        result.cancelled = count;
        break;
    }
  }

  return result;
}