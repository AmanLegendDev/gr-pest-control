import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/auth-options";

import {
  getQuoteRequests,
} from "@/features/quote-requests/queries/getQuoteRequests";

import QuoteRequestsPageClient from "@/components/admin/quote-requests/QuoteRequestPageClient";

import type {
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

interface QuoteRequestsPageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
  }>;
}

const VALID_STATUSES: QuoteRequestStatus[] = [
  "pending",
  "in-progress",
  "completed",
  "cancelled",
];

function isValidStatus(
  value: string | undefined,
): value is QuoteRequestStatus {
  return Boolean(
    value &&
      VALID_STATUSES.includes(
        value as QuoteRequestStatus,
      ),
  );
}

export default async function QuoteRequestsPage({
  searchParams,
}: QuoteRequestsPageProps) {
  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    redirect("/admin/login");
  }

  const params = await searchParams;

  const requestedStatus =
    params.status;

  const status =
    requestedStatus === "all"
      ? "all"
      : isValidStatus(requestedStatus)
        ? requestedStatus
        : "pending";

  const search =
    params.search?.trim() ?? "";

  const requests =
    await getQuoteRequests({
      status,
      search,
      archived: false,
      limit: 200,
    });

  return (
    <QuoteRequestsPageClient
      requests={JSON.parse(
        JSON.stringify(requests),
      )}
      status={status}
    />
  );
}