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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

import {
  adminQuoteRequestSchema,
  type AdminQuoteRequestFormValues,
} from "@/features/quote-requests/schemas/admin-quote-request-schema";

import { updateQuoteRequest } from "@/features/quote-requests/actions/updateQuoteRequest";

interface AdminQuoteRequest {
  id: string;

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

  propertyType:
    | "residential"
    | "commercial";

  location: {
    suburb: string;
    address: string;
  };

  pestProblem: string;

  preferredDate: string;
  preferredTime: string;

  status: QuoteRequestStatus;

  archived?: boolean;

  createdAt: string;
  updatedAt: string;
}

interface QuoteRequestModalProps {
  request: AdminQuoteRequest | null;

  onClose: () => void;

  onStatusChange: (
    id: string,
    status: QuoteRequestStatus,
  ) => void;

  initialEditMode?: boolean;

  onUpdated?: () => void;

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

function formatCreatedAt(value: string) {
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

const inputClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-[#062B63] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100";

const textareaClassName =
  "mt-1.5 min-h-[120px] w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium leading-6 text-[#062B63] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100";

const errorClassName =
  "mt-1.5 text-xs font-semibold text-red-600";

export default function QuoteRequestModal({
  request,
  onClose,
  onStatusChange,
  initialEditMode = false,
  onUpdated,
  updating = false,
}: QuoteRequestModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<AdminQuoteRequestFormValues>({
      resolver: zodResolver(
        adminQuoteRequestSchema,
      ),

      defaultValues: {
        customer: {
          name: "",
          phone: "",
          email: "",
        },

        propertyType: "residential",

        location: {
          suburb: "",
          address: "",
        },

        pestProblem: "",

        preferredDate: "",

        preferredTime: "",

        status: "pending",

        archived: false,
      },
    });

  useEffect(() => {
    if (!request) {
      return;
    }

    reset({
      customer: {
        name: request.customer.name,
        phone: request.customer.phone,
        email: request.customer.email ?? "",
      },

      propertyType:
        request.propertyType,

      location: {
        suburb: request.location.suburb,
        address: request.location.address,
      },

      pestProblem:
        request.pestProblem,

      preferredDate:
        request.preferredDate,

      preferredTime:
        request.preferredTime,

      status: request.status,

      archived:
        request.archived ?? false,
    });
  }, [request, reset]);



  useEffect(() => {
  if (!request) {
    return;
  }

  const scrollY = window.scrollY;
  const body = document.body;

  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.overflow = "hidden";

  return () => {
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.overflow = "";

    window.scrollTo(0, scrollY);
  };
}, [request]);

if (!request) {
  return null;
}

const editMode = initialEditMode;
const requestId = request.id;

  async function onSubmit(
    values: AdminQuoteRequestFormValues,
  ) {
    try {
 const result =
  await updateQuoteRequest(
    requestId,
    values,
  );
      if (!result.success) {
        if (
          result.fieldErrors
        ) {
          console.error(
            "QUOTE_REQUEST_VALIDATION_ERRORS",
            result.fieldErrors,
          );
        }

        window.alert(
          result.message,
        );

        return;
      }

      window.alert(
        "Quote request updated successfully.",
      );

      onUpdated?.();
    } catch (error) {
      console.error(
        "QUOTE_REQUEST_UPDATE_ERROR",
        error,
      );

      window.alert(
        "Unable to update the quote request right now.",
      );
    }
  }

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
          sm:max-w-3xl
          sm:rounded-[28px]
        "
      >
        {/* HEADER */}
        <div
          className="
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
                    py-1.5
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
                    ${getStatusClasses(
                      request.status,
                    )}
                  `}
                >
                  {getStatusLabel(
                    request.status,
                  )}
                </span>
              </div>

              <h2
                id="quote-request-modal-title"
                className="
                  mt-2
                  text-lg
                  font-extrabold
                  tracking-[-0.02em]
                  text-[#062B63]
                  sm:text-xl
                "
              >
                {editMode
                  ? "Edit Quote Request"
                  : "Quote Request Details"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={
                isSubmitting ||
                updating
              }
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div
            className="
              space-y-7
              px-5
              py-5
              sm:px-6
              sm:py-6
            "
          >
            {/* CUSTOMER */}
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
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
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
                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Full name
                  </label>

               <input
  {...register("customer.name")}
  readOnly={!editMode}
  className={`${inputClassName} ${
    !editMode
      ? "cursor-default bg-slate-100 text-slate-500"
      : ""
  }`}
/>

                  {errors.customer
                    ?.name && (
                    <p
                      className={
                        errorClassName
                      }
                    >
                      {
                        errors.customer
                          .name
                          .message
                      }
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Phone number
                  </label>

                  <div className="relative">
                    <Phone
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                 <input
  {...register("customer.phone")}
  readOnly={!editMode}
  className={`${inputClassName} pl-10 ${
    !editMode
      ? "cursor-default bg-slate-100 text-slate-500"
      : ""
  }`}
/>
                  </div>

                  {errors.customer
                    ?.phone && (
                    <p
                      className={
                        errorClassName
                      }
                    >
                      {
                        errors.customer
                          .phone
                          .message
                      }
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                  <input
  type="email"
  {...register("customer.email")}
  readOnly={!editMode}
  className={`${inputClassName} pl-10 ${
    !editMode
      ? "cursor-default bg-slate-100 text-slate-500"
      : ""
  }`}
/>
                  </div>

                  {errors.customer
                    ?.email && (
                    <p
                      className={
                        errorClassName
                      }
                    >
                      {
                        errors.customer
                          .email
                          .message
                      }
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* SERVICE */}
            <section>
              <div className="mb-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
                  Service
                </p>

                <h3 className="mt-1 text-sm font-extrabold text-[#062B63]">
                  Selected service
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
                <div className="flex items-center gap-3">
                  <MapPin
                    size={17}
                    className="text-[#0878E8]"
                  />

                  <div>
                    <p className="text-sm font-extrabold text-[#062B63]">
                      {request.service.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Service cannot be changed from this edit form.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PROPERTY */}
            <section>
              <div className="mb-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
                  Property
                </p>

                <h3 className="mt-1 text-sm font-extrabold text-[#062B63]">
                  Property type
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
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      p-3.5
                    "
                  >
                    <input
                      type="radio"
                      value="residential"
                      {...register(
                        "propertyType",
                      )}
                    />

                    <span className="text-sm font-bold text-[#062B63]">
                      Residential
                    </span>
                  </label>

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      p-3.5
                    "
                  >
                   <input
  type="radio"
  value="residential"
  {...register("propertyType")}
  disabled={!editMode}
/>

                    <span className="text-sm font-bold text-[#062B63]">
                      Commercial
                    </span>
                  </label>
                </div>
              </div>
            </section>

            {/* LOCATION */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <MapPin
                  size={18}
                  className="text-[#0878E8]"
                />

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
                    Location
                  </p>

                  <h3 className="text-sm font-extrabold text-[#062B63]">
                    Service location
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
                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Suburb
                  </label>

               <input
  {...register("location.suburb")}
  readOnly={!editMode}
  className={`${inputClassName} ${
    !editMode
      ? "cursor-default bg-slate-100 text-slate-500"
      : ""
  }`}
/>

                  {errors.location
                    ?.suburb && (
                    <p
                      className={
                        errorClassName
                      }
                    >
                      {
                        errors.location
                          .suburb
                          .message
                      }
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Address
                  </label>

                  <input
                    {...register(
                      "location.address",
                    )}
                    className={
                      inputClassName
                    }
                  />

                  {errors.location
                    ?.address && (
                    <p
                      className={
                        errorClassName
                      }
                    >
                      {
                        errors.location
                          .address
                          .message
                      }
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* PEST PROBLEM */}
            <section>
              <div className="mb-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
                  Pest problem
                </p>

                <h3 className="mt-1 text-sm font-extrabold text-[#062B63]">
                  Customer description
                </h3>
              </div>

         <textarea
  {...register("pestProblem")}
  readOnly={!editMode}
  className={`${textareaClassName} ${
    !editMode
      ? "cursor-default bg-slate-100 text-slate-500"
      : ""
  }`}
/>

              {errors.pestProblem && (
                <p
                  className={
                    errorClassName
                  }
                >
                  {
                    errors.pestProblem
                      .message
                  }
                </p>
              )}
            </section>

            {/* SCHEDULE */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <CalendarDays
                  size={18}
                  className="text-[#0878E8]"
                />

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
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
                  gap-5
                  rounded-2xl
                  border
                  border-blue-100
                  bg-blue-50/50
                  p-4
                  sm:grid-cols-2
                  sm:p-5
                "
              >
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <CalendarDays
                      size={14}
                      className="text-[#0878E8]"
                    />
                    Preferred date
                  </label>

            <input
  type="date"
  {...register("preferredDate")}
  readOnly={!editMode}
  className={`${inputClassName} ${
    !editMode
      ? "cursor-default bg-slate-100 text-slate-500"
      : ""
  }`}
/>

                  {errors.preferredDate && (
                    <p
                      className={
                        errorClassName
                      }
                    >
                      {
                        errors
                          .preferredDate
                          .message
                      }
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Clock3
                      size={14}
                      className="text-[#0878E8]"
                    />
                    Preferred time
                  </label>

                <input
  type="text"
  {...register("preferredTime")}
  readOnly={!editMode}
  className={`${inputClassName} ${
    !editMode
      ? "cursor-default bg-slate-100 text-slate-500"
      : ""
  }`}
/>

                  {errors.preferredTime && (
                    <p
                      className={
                        errorClassName
                      }
                    >
                      {
                        errors
                          .preferredTime
                          .message
                      }
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* STATUS */}
            <section>
              <div className="mb-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
                  Workflow
                </p>

                <h3 className="mt-1 text-sm font-extrabold text-[#062B63]">
                  Request status
                </h3>
              </div>

            <select
  {...register("status")}
  disabled={!editMode}
  className={`${inputClassName} ${
    !editMode
      ? "cursor-default bg-slate-100 text-slate-500"
      : ""
  }`}
>
                <option value="pending">
                  Pending
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>
              </select>

              {errors.status && (
                <p
                  className={
                    errorClassName
                  }
                >
                  {errors.status.message}
                </p>
              )}
            </section>

            {/* METADATA */}
            <section
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
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                    Reference number
                  </p>

                  <p className="mt-1.5 text-sm font-bold text-[#062B63]">
                    {request.referenceNumber}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                    Request number
                  </p>

                  <p className="mt-1.5 text-sm font-bold text-[#062B63]">
                    #{request.requestNumber}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                    Received
                  </p>

                  <p className="mt-1.5 text-sm font-semibold text-[#062B63]">
                    {formatCreatedAt(
                      request.createdAt,
                    )}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* FOOTER */}
          <div
            className="
              sticky
              bottom-0
              flex
              shrink-0
              flex-col
              gap-3
              border-t
              border-slate-100
              bg-white
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-6
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={
                isSubmitting ||
                updating
              }
              className="
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
              "
            >
              Cancel
            </button>

            {editMode && (
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  updating
                }
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#0878E8]
                  px-6
                  text-sm
                  font-extrabold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#066BCF]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}