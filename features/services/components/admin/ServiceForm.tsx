"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createService } from "../../actions/create-service";
import {
  createServiceSchema,
  type CreateServiceInput,
} from "../../schemas/service-schema";

import ServiceBasicInformation from "./ServiceBasicInformation";
import ServiceBenefits from "./ServiceBenefits";
import ServiceFAQs from "./ServiceFAQs";
import ServiceImageSection from "./ServiceImageSection";
import ServicePestTypes from "./ServicePestTypes";
import ServiceProcess from "./ServiceProcess";
import ServicePublishing from "./ServicePublishing";

const DEFAULT_VALUES: CreateServiceInput = {
  title: "",
  slug: "",
  category: "",
  shortDescription: "",
  description: "",
  heroImage: undefined,
  icon: "",
  pestTypes: [],
  benefits: [],
  process: [],
  faqs: [],
  seoTitle: "",
  seoDescription: "",
  featured: false,
  active: true,
  sortOrder: 0,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ServiceForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceInput>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const title = watch("title");

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setValue("title", value, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (!slugManuallyEdited) {
      setValue("slug", slugify(value), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const handleSubmitService = async (
    data: CreateServiceInput
  ) => {
    setServerError("");
    setSuccessMessage("");

    const normalizedData: CreateServiceInput = {
      ...data,
      title: data.title.trim(),
      slug: data.slug.trim().toLowerCase(),
      category: data.category.trim(),
      shortDescription: data.shortDescription.trim(),
      description: data.description.trim(),
      icon: data.icon?.trim() ?? "",
      seoTitle: data.seoTitle?.trim() ?? "",
      seoDescription: data.seoDescription?.trim() ?? "",
      pestTypes: data.pestTypes.map((item) => item.trim()),
      benefits: data.benefits.map((item) => item.trim()),
      process: data.process.map((step, index) => ({
        title: step.title.trim(),
        description: step.description.trim(),
        sortOrder: index,
      })),
      faqs: data.faqs.map((faq, index) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
        sortOrder: index,
      })),
    };

    const result = await createService(normalizedData);

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    setSuccessMessage(result.message);

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* BACK */}
        <Link
          href="/admin/services"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#0878E8]"
        >
          <ArrowLeft size={16} />
          Back to Services
        </Link>

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#0878E8]">
            Services
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#062B63]">
            Create Service
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
            Add a complete pest-control service including its content,
            treatment process, FAQs, SEO information and publishing settings.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSubmitService)}
          noValidate
          className="space-y-6"
        >
          {/* BASIC INFORMATION */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <h2 className="font-semibold text-[#0F172A]">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-[#64748B]">
                Add the core information customers will see about this
                service.
              </p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {/* TITLE */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Service Title *
                </label>

                <input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Cockroach Control"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                {errors.title?.message && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* SLUG + CATEGORY */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="slug"
                    className="mb-2 block text-sm font-semibold text-[#0F172A]"
                  >
                    Slug *
                  </label>

                  <input
                    id="slug"
                    {...register("slug", {
                      onChange: () => {
                        setSlugManuallyEdited(true);
                      },
                    })}
                    placeholder="cockroach-control"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1.5 text-xs text-[#64748B]">
                    Used for the public service URL.
                  </p>

                  {errors.slug?.message && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-[#0F172A]"
                  >
                    Category *
                  </label>

                  <select
                    id="category"
                    {...register("category")}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select category</option>
                    <option value="General Pest Control">
                      General Pest Control
                    </option>
                    <option value="Residential Pest Control">
                      Residential Pest Control
                    </option>
                    <option value="Commercial Pest Control">
                      Commercial Pest Control
                    </option>
                    <option value="Specialised Pest Control">
                      Specialised Pest Control
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>

                  {errors.category?.message && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* SHORT DESCRIPTION */}
              <div>
                <label
                  htmlFor="shortDescription"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Short Description *
                </label>

                <textarea
                  id="shortDescription"
                  rows={3}
                  {...register("shortDescription")}
                  placeholder="Short description shown on service cards..."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                {errors.shortDescription?.message && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Full Description *
                </label>

                <textarea
                  id="description"
                  rows={9}
                  {...register("description")}
                  placeholder="Describe the service in detail..."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                {errors.description?.message && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* ICON */}
              <div>
                <label
                  htmlFor="icon"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Icon
                </label>

                <input
                  id="icon"
                  {...register("icon")}
                  placeholder="e.g. Bug, ShieldCheck, Home"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1.5 text-xs text-[#64748B]">
                  Optional Lucide icon name used by the public UI.
                </p>

                {errors.icon?.message && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.icon.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* IMAGE */}
          <ServiceImageSection
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />

          {/* PEST TYPES */}
          <ServicePestTypes
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          {/* BENEFITS */}
          <ServiceBenefits
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          {/* PROCESS */}
          <ServiceProcess
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          {/* FAQ */}
          <ServiceFAQs
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          {/* SEO + PUBLISHING */}
          <ServicePublishing
            register={register}
            watch={watch}
            errors={errors}
          />

          {/* SERVER ERROR */}
          {serverError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              {serverError}
            </div>
          )}

          {/* SUCCESS */}
          {successMessage && (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700"
            >
              {successMessage}
            </div>
          )}

          {/* ACTIONS */}
          <div className="sticky bottom-0 z-20 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/admin/services"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-7 text-sm font-semibold text-white transition hover:bg-[#066BCF] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <Save size={17} />

                {isSubmitting
                  ? "Creating Service..."
                  : "Create Service"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}