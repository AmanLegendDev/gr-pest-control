"use client";

import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";

import type {
  IQuoteRequest,
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

import QuoteRequestActions from "./QuoteRequestActions";

interface QuoteRequestModalProps {
  request: IQuoteRequest | null;
  onClose: () => void;

  onStatusChange: (
    id: string,
    status: QuoteRequestStatus,
  ) => void;

  updating?: boolean;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatCreatedAt(
  value: Date | string,
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getStatusLabel(
  status: QuoteRequestStatus,
) {
  switch (status) {
    case "pending":
      return "Pending";

    case "in-progress":
      return "In Progress";

    case "completed":
      return "Completed";

    case "cancelled":
      return "Cancelled";

    default:
      return status;
  }
}

function getStatusClasses(
  status: QuoteRequestStatus,
) {
  switch (status) {
    case "pending":
      return "border-amber-100 bg-amber-50 text-amber-700";

    case "in-progress":
      return "border-blue-100 bg-blue-50 text-[#0878E8]";

    case "completed":
      return "border-emerald-100 bg-emerald-50 text-emerald-700";

    case "cancelled":
      return "border-red-100 bg-red-50 text-red-600";

    default:
      return "border-slate-200 bg-slate-50 text-slate-500";
  }
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="
          text-[10px]
          font-extrabold
          uppercase
          tracking-[0.12em]
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          break-words
          text-sm
          font-semibold
          leading-6
          text-[#062B63]
        "
      >
        {value || "Not provided"}
      </p>
    </div>
  );
}

export default function QuoteRequestModal({
  request,
  onClose,
  onStatusChange,
  updating = false,
}: QuoteRequestModalProps) {
  if (!request) {
    return null;
  }

  const statusLabel =
    getStatusLabel(request.status);

  const statusClasses =
    getStatusClasses(request.status);

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-end
        justify-center
        bg-slate-950/45
        p-0
        backdrop-blur-[3px]
        sm:items-center
        sm:p-5
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-request-modal-title"
    >
      <div
        className="
          flex
          max-h-[94vh]
          w-full
          flex-col
          overflow-hidden
          rounded-t-[28px]
          border
          border-slate-200
          bg-white
          shadow-[0_30px_100px_rgba(15,23,42,0.22)]
          sm:max-h-[90vh]
          sm:max-w-2xl
          sm:rounded-[28px]
        "
      >
        {/* =========================
            HEADER
        ========================== */}
        <div
          className="
            sticky
            top-0
            z-10
            shrink-0
            border-b
            border-slate-100
            bg-white/95
            px-5
            py-4
            backdrop-blur-xl
            sm:px-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1
                    text-[11px]
                    font-extrabold
                    tracking-[0.04em]
                    text-[#0878E8]
                  "
                >
                  {request.referenceNumber}
                </span>

                <span
                  className={`
                    inline-flex
                    items-center
                    rounded-full
                    border
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    ${statusClasses}
                  `}
                >
                  {statusLabel}
                </span>
              </div>

              <h2
                id="quote-request-modal-title"
                className="
                  mt-2
                  truncate
                  text-lg
                  font-extrabold
                  tracking-[-0.02em]
                  text-[#062B63]
                  sm:text-xl
                "
              >
                Quote request details
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close request details"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                text-slate-500
                transition
                hover:border-slate-300
                hover:bg-slate-50
                hover:text-[#062B63]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-200
              "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* =========================
            SCROLLABLE CONTENT
        ========================== */}
        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain
            px-5
            py-5
            sm:px-6
            sm:py-6
          "
        >
          {/* Customer */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <User size={17} />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.13em]
                    text-slate-400
                  "
                >
                  Customer
                </p>

                <h3 className="text-sm font-extrabold text-[#062B63]">
                  Contact details
                </h3>
              </div>
            </div>

            <div
              className="
                grid
                gap-5
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/60
                p-4
                sm:grid-cols-2
                sm:p-5
              "
            >
              <DetailRow
                label="Full name"
                value={request.customer.name}
              />

              <div className="flex items-start gap-2.5">
                <Phone
                  size={15}
                  className="mt-1 shrink-0 text-slate-400"
                />

                <DetailRow
                  label="Phone number"
                  value={request.customer.phone}
                />
              </div>

              <div className="flex items-start gap-2.5 sm:col-span-2">
                <Mail
                  size={15}
                  className="mt-1 shrink-0 text-slate-400"
                />

                <DetailRow
                  label="Email address"
                  value={request.customer.email}
                />
              </div>
            </div>
          </section>

          {/* Service */}
          <section className="mt-7">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <MapPin size={17} />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.13em]
                    text-slate-400
                  "
                >
                  Service
                </p>

                <h3 className="text-sm font-extrabold text-[#062B63]">
                  Service & property
                </h3>
              </div>
            </div>

            <div
              className="
                grid
                gap-5
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/60
                p-4
                sm:grid-cols-2
                sm:p-5
              "
            >
              <DetailRow
                label="Selected service"
                value={request.service.title}
              />

              <DetailRow
                label="Property type"
                value={
                  request.propertyType ===
                  "residential"
                    ? "Residential"
                    : "Commercial"
                }
              />
            </div>
          </section>

          {/* Location */}
          <section className="mt-7">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <MapPin size={17} />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.13em]
                    text-slate-400
                  "
                >
                  Location
                </p>

                <h3 className="text-sm font-extrabold text-[#062B63]">
                  Service location
                </h3>
              </div>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/60
                p-4
                sm:p-5
              "
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailRow
                  label="Suburb"
                  value={
                    request.location.suburb
                  }
                />

                <DetailRow
                  label="Address"
                  value={
                    request.location.address
                  }
                />
              </div>
            </div>
          </section>

          {/* Pest problem */}
          <section className="mt-7">
            <div className="mb-4">
              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.13em]
                  text-slate-400
                "
              >
                Pest problem
              </p>

              <h3 className="mt-1 text-sm font-extrabold text-[#062B63]">
                Customer description
              </h3>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/60
                p-4
                sm:p-5
              "
            >
              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-6
                  text-slate-600
                "
              >
                {request.pestProblem ||
                  "No description provided."}
              </p>
            </div>
          </section>

          {/* Schedule */}
          <section className="mt-7">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <CalendarDays size={17} />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.13em]
                    text-slate-400
                  "
                >
                  Schedule
                </p>

                <h3 className="text-sm font-extrabold text-[#062B63]">
                  Preferred appointment
                </h3>
              </div>
            </div>

            <div
              className="
                grid
                gap-4
                rounded-2xl
                border
                border-blue-100
                bg-blue-50/50
                p-4
                sm:grid-cols-2
                sm:p-5
              "
            >
              <div className="flex items-start gap-3">
                <CalendarDays
                  size={16}
                  className="mt-1 shrink-0 text-[#0878E8]"
                />

                <DetailRow
                  label="Preferred date"
                  value={formatDate(
                    request.preferredDate,
                  )}
                />
              </div>

              <div className="flex items-start gap-3">
                <Clock3
                  size={16}
                  className="mt-1 shrink-0 text-[#0878E8]"
                />

                <DetailRow
                  label="Preferred time"
                  value={request.preferredTime}
                />
              </div>
            </div>
          </section>

          {/* Request metadata */}
          <section className="mt-7">
            <div
              className="
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-4
                sm:p-5
              "
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailRow
                  label="Reference number"
                  value={
                    request.referenceNumber
                  }
                />

                <DetailRow
                  label="Received"
                  value={formatCreatedAt(
                    request.createdAt,
                  )}
                />

                <DetailRow
                  label="Current status"
                  value={statusLabel}
                />
              </div>
            </div>
          </section>
        </div>

        {/* =========================
            FOOTER ACTIONS
        ========================== */}
        <div
          className="
            shrink-0
            border-t
            border-slate-100
            bg-white
            px-5
            py-4
            sm:px-6
          "
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onClose}
              disabled={updating}
              className="
                order-2
                min-h-11
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                text-sm
                font-bold
                text-[#062B63]
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:order-1
              "
            >
              Close
            </button>

            <div className="order-1 sm:order-2">
              <QuoteRequestActions
                status={request.status}
                onView={() => {}}
                onStatusChange={(status) =>
                  onStatusChange(
                    String(request._id),
                    status,
                  )
                }
                updating={updating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}