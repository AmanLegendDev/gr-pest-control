import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import {
  getArchivedQuoteRequests,
} from "@/features/quote-requests/queries/getArchivedQuoteRequests";

import ArchivedQuoteRequestsPageClient from "@/components/admin/quote-requests/ArchivedQuoteRequestsPageClient";

export default async function ArchivedQuoteRequestsPage() {
  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    redirect("/admin/login");
  }

  await connectDB();

  const requests =
    await getArchivedQuoteRequests();

  return (
    <ArchivedQuoteRequestsPageClient
      requests={JSON.parse(
        JSON.stringify(requests),
      )}
    />
  );
}