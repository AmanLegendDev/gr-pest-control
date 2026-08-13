"use client";

import {
  Mail,
  MapPin,
  Phone,
  Smartphone,
} from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { SiteSettingsFormValues } from "@/features/settings/schemas/site-settings-schema";

interface SettingsContactSectionProps {
  register: UseFormRegister<SiteSettingsFormValues>;
  errors: FieldErrors<SiteSettingsFormValues>;
}

export default function SettingsContactSection({
  register,
  errors,
}: SettingsContactSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <MapPin
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Contact & Location
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Manage the contact details and business location shown to customers.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        {/* Contact Details */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Phone
              size={17}
              className="text-[#0878E8]"
              aria-hidden="true"
            />

            <h3 className="text-sm font-semibold text-[#0F172A]">
              Contact Details
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Email */}
            <div>
              <label
                htmlFor="settings-email"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                Email
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />

                <input
                  id="settings-email"
                  type="email"
                  maxLength={160}
                  placeholder="contact@example.com"
                  {...register("email")}
                  aria-invalid={Boolean(
                    errors.email,
                  )}
                  className={`h-11 w-full rounded-lg border py-2 pl-10 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                  }`}
                />
              </div>

              {errors.email && (
                <p
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="settings-phone"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                Phone
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />

                <input
                  id="settings-phone"
                  type="tel"
                  maxLength={30}
                  placeholder="+91 98765 43210"
                  {...register("phone")}
                  aria-invalid={Boolean(
                    errors.phone,
                  )}
                  className={`h-11 w-full rounded-lg border py-2 pl-10 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                  }`}
                />
              </div>

              {errors.phone && (
                <p
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* WhatsApp */}
            <div className="sm:col-span-2">
              <label
                htmlFor="settings-whatsapp"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                WhatsApp Number
              </label>

              <div className="relative">
                <Smartphone
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />

                <input
                  id="settings-whatsapp"
                  type="tel"
                  maxLength={30}
                  placeholder="+91 98765 43210"
                  {...register("whatsapp")}
                  aria-invalid={Boolean(
                    errors.whatsapp,
                  )}
                  className={`h-11 w-full rounded-lg border py-2 pl-10 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.whatsapp
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                  }`}
                />
              </div>

              {errors.whatsapp && (
                <p
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.whatsapp.message}
                </p>
              )}

              <p className="mt-1.5 text-xs text-[#64748B]">
                Leave empty if the business does not use a separate WhatsApp number.
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="border-t border-slate-200 pt-6">
          <div className="mb-4 flex items-center gap-2">
            <MapPin
              size={17}
              className="text-[#0878E8]"
              aria-hidden="true"
            />

            <h3 className="text-sm font-semibold text-[#0F172A]">
              Business Location
            </h3>
          </div>

          <div className="space-y-5">
            {/* Address */}
            <div>
              <label
                htmlFor="settings-address"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                Address
              </label>

              <textarea
                id="settings-address"
                rows={3}
                maxLength={300}
                placeholder="Enter the complete business address..."
                {...register("address")}
                aria-invalid={Boolean(
                  errors.address,
                )}
                className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                  errors.address
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                }`}
              />

              {errors.address && (
                <p
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City / State / Pincode */}
            <div className="grid gap-5 sm:grid-cols-3">
              {/* City */}
              <div>
                <label
                  htmlFor="settings-city"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  City
                </label>

                <input
                  id="settings-city"
                  type="text"
                  maxLength={100}
                  placeholder="Shimla"
                  {...register("city")}
                  aria-invalid={Boolean(
                    errors.city,
                  )}
                  className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.city
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                  }`}
                />

                {errors.city && (
                  <p
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-red-600"
                  >
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="settings-state"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  State
                </label>

                <input
                  id="settings-state"
                  type="text"
                  maxLength={100}
                  placeholder="Himachal Pradesh"
                  {...register("state")}
                  aria-invalid={Boolean(
                    errors.state,
                  )}
                  className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.state
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                  }`}
                />

                {errors.state && (
                  <p
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-red-600"
                  >
                    {errors.state.message}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label
                  htmlFor="settings-pincode"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Pincode
                </label>

                <input
                  id="settings-pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={20}
                  placeholder="171001"
                  {...register("pincode")}
                  aria-invalid={Boolean(
                    errors.pincode,
                  )}
                  className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                    errors.pincode
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                  }`}
                />

                {errors.pincode && (
                  <p
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-red-600"
                  >
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}