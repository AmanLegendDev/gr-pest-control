"use client";

import {
  ArchiveRestore,
  CalendarDays,
  Phone,
  User,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import {
  unarchiveQuoteRequest,
} from "@/features/quote-requests/actions/unarchiveQuoteRequest";

interface ArchivedQuoteRequest {
  _id: string;

  requestNumber: number;
  referenceNumber: string;

  customer: {
    name: string;
    phone: string;
    email: string;
  };

  service: {
    id: string;
    title: string;
    slug: string;
  };

  createdAt: string;
  updatedAt: string;

  archived: boolean;
}

interface Props {
  requests: ArchivedQuoteRequest[];
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    "en-AU",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(date);
}

export default function ArchivedQuoteRequestsPageClient({
  requests: initialRequests,
}: Props) {
  const [requests, setRequests] =
    useState(initialRequests);

  const [restoringId, setRestoringId] =
    useState<string | null>(null);

  async function handleUnarchive(
    request: ArchivedQuoteRequest,
  ) {
    if (restoringId) {
      return;
    }

    const confirmed =
      window.confirm(
        `Restore ${request.referenceNumber}?\n\nThis quote request will be moved back to the active quote requests.`,
      );

    if (!confirmed) {
      return;
    }

    setRestoringId(request._id);

    try {
      const result =
        await unarchiveQuoteRequest(
          request._id,
        );

      if (!result.success) {
        throw new Error(
          result.message,
        );
      }

      setRequests((current) =>
        current.filter(
          (item) =>
            item._id !== request._id,
        ),
      );
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to restore quote request.",
      );
    } finally {
      setRestoringId(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200 text-[#062B63]">
              <ArchiveRestore size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#062B63]">
                Archived Quote Requests
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Archived requests are kept here until restored.
              </p>
            </div>
          </div>

          <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
            {requests.length} archived{" "}
            {requests.length === 1
              ? "request"
              : "requests"}
          </div>
        </div>

        {/* Empty */}
        {requests.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <ArchiveRestore size={24} />
            </div>

            <h2 className="mt-5 text-lg font-extrabold text-[#062B63]">
              No archived requests
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Archived quote requests will appear
              here.
            </p>
          </section>
        ) : (
          <section className="space-y-4">
            {requests.map((request) => {
              const restoring =
                restoringId ===
                request._id;

              return (
                <article
                  key={request._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* Info */}
                    <div className="min-w-0 flex-1">

                      {/* Reference */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-extrabold text-[#0878E8]">
                          {request.referenceNumber}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">
                          Archived
                        </span>
                      </div>

                      {/* Customer */}
                      <div className="mt-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#062B63]">
                          <User size={18} />
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate text-base font-extrabold text-[#062B63]">
                            {request.customer.name}
                          </h2>

                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                            <Phone size={13} />

                            {request.customer.phone}
                          </div>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="mt-5 flex flex-wrap gap-3">

                        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
                          <Wrench
                            size={14}
                            className="text-[#0878E8]"
                          />

                          {request.service.title}
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                          <CalendarDays size={14} />

                          {formatDate(
                            request.updatedAt,
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleUnarchive(
                            request,
                          )
                        }
                        disabled={restoring}
                        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#0878E8] px-5 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#066BCF] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        {restoring ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          <ArchiveRestore
                            size={15}
                          />
                        )}

                        {restoring
                          ? "Restoring..."
                          : "Unarchive"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}