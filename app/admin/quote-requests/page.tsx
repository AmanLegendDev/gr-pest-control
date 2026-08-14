import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import {
  getQuoteRequestsByStatus,
} from "@/features/quote-requests/queries/getQuoteRequestsByStatus";

import QuoteRequestsPageClient from "@/components/admin/quote-requests/QuoteRequestPageClient";
import type {
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

interface QuoteRequestsPageProps {
  searchParams: Promise<{
    status?: string;
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
  /* =========================
     ADMIN AUTH
  ========================== */

  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    redirect("/admin/login");
  }

  /* =========================
     STATUS
  ========================== */

  const params = await searchParams;

  const requestedStatus =
    params.status;

  const status: QuoteRequestStatus =
    isValidStatus(requestedStatus)
      ? requestedStatus
      : "pending";

  /* =========================
     DATABASE
  ========================== */

  await connectDB();

  const requests =
    await getQuoteRequestsByStatus(
      status,
    );

  /* =========================
     CLIENT UI
  ========================== */

  return (
    <QuoteRequestsPageClient
      requests={JSON.parse(
        JSON.stringify(requests),
      )}
      status={status}
    />
  );
}