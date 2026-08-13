"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
} from "lucide-react";
import {
  useFieldArray,
  useForm,
} from "react-hook-form";

import {
  createServiceSchema,
  type CreateServiceInput,
} from "../../schemas/service-schema";
import { createService } from "../../actions/create-service";

const CATEGORIES = [
  "General Pest Control",
  "Residential Pest Control",
  "Commercial Pest Control",
  "Specialised Pest Control",
  "Other",
];

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
    control,
    handleSubmit,
    setValue,
      watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceInput>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      shortDescription: "",
      description: "",
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
    },
  });


  const pestTypes = watch("pestTypes");
const benefits = watch("benefits");


  const processFields = useFieldArray({
    control,
    name: "process",
  });

  const faqFields = useFieldArray({
    control,
    name: "faqs",
  });

  const onSubmit = async (data: CreateServiceInput) => {
    setServerError("");
    setSuccessMessage("");

    const result = await createService(data);

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    setSuccessMessage(result.message);

    setTimeout(() => {
      router.push("/admin");
      router.refresh();
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <Link
          href="/admin"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0878E8]"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <p className="text-sm font-semibold text-[#0878E8]">
            Services
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#062B63]">
            Create Service
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Add a complete pest-control service to the website.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* BASIC INFORMATION */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Basic Information
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold"
                >
                  Service Title *
                </label>

                <input
                  id="title"
                  {...register("title", {
                    onChange: (event) => {
                      if (!slugManuallyEdited) {
                        setValue(
                          "slug",
                          slugify(event.target.value),
                          {
                            shouldValidate: true,
                          }
                        );
                      }
                    },
                  })}
                  placeholder="e.g. Cockroach Control"
                  className="form-input"
                />

                {errors.title && (
                  <p className="field-error">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="slug"
                    className="mb-2 block text-sm font-semibold"
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
                    className="form-input"
                  />

                  {errors.slug && (
                    <p className="field-error">
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Category *
                  </label>

                  <select
                    id="category"
                    {...register("category")}
                    className="form-input"
                  >
                    <option value="">Select category</option>

                    {CATEGORIES.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <p className="field-error">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="shortDescription"
                  className="mb-2 block text-sm font-semibold"
                >
                  Short Description *
                </label>

                <textarea
                  id="shortDescription"
                  rows={3}
                  {...register("shortDescription")}
                  className="form-input resize-y"
                  placeholder="Short description shown on service cards..."
                />

                {errors.shortDescription && (
                  <p className="field-error">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Description *
                </label>

                <textarea
                  id="description"
                  rows={8}
                  {...register("description")}
                  className="form-input resize-y"
                  placeholder="Describe this service in detail..."
                />

                {errors.description && (
                  <p className="field-error">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* PEST TYPES */}
     <ArrayInputSection
  title="Pest Types"
  description="Add pests covered by this service."
  fieldName="pestTypes"
  values={pestTypes}
  setValue={setValue}
/>

<ArrayInputSection
  title="Benefits"
  description="Add genuine benefits or service highlights."
  fieldName="benefits"
  values={benefits}
  setValue={setValue}
/>

          {/* PROCESS */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              title="Treatment Process"
              description="Explain the service process step by step."
            />

            <div className="mt-5 space-y-4">
              {processFields.fields.map(
                (field, index) => (
                  <div
                    key={field.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-[#062B63]">
                        Step {index + 1}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          processFields.remove(index)
                        }
                        className="text-red-500 hover:text-red-600"
                        aria-label="Remove process step"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <input
                        {...register(
                          `process.${index}.title`
                        )}
                        placeholder="Step title"
                        className="form-input"
                      />

                      <textarea
                        {...register(
                          `process.${index}.description`
                        )}
                        rows={3}
                        placeholder="Describe this step..."
                        className="form-input resize-y"
                      />

                      <input
                        type="hidden"
                        {...register(
                          `process.${index}.sortOrder`,
                          {
                            valueAsNumber: true,
                          }
                        )}
                      />
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  processFields.append({
                    title: "",
                    description: "",
                    sortOrder:
                      processFields.fields.length,
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
              >
                <Plus size={16} />
                Add Process Step
              </button>
            </div>
          </section>

          {/* FAQ */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              title="Service FAQs"
              description="Add questions specific to this service."
            />

            <div className="mt-5 space-y-4">
              {faqFields.fields.map(
                (field, index) => (
                  <div
                    key={field.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-[#062B63]">
                        FAQ {index + 1}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          faqFields.remove(index)
                        }
                        className="text-red-500 hover:text-red-600"
                        aria-label="Remove FAQ"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <input
                        {...register(
                          `faqs.${index}.question`
                        )}
                        placeholder="Question"
                        className="form-input"
                      />

                      <textarea
                        {...register(
                          `faqs.${index}.answer`
                        )}
                        rows={4}
                        placeholder="Answer"
                        className="form-input resize-y"
                      />

                      <input
                        type="hidden"
                        {...register(
                          `faqs.${index}.sortOrder`,
                          {
                            valueAsNumber: true,
                          }
                        )}
                      />
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  faqFields.append({
                    question: "",
                    answer: "",
                    sortOrder:
                      faqFields.fields.length,
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
              >
                <Plus size={16} />
                Add FAQ
              </button>
            </div>
          </section>

          {/* SEO */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              title="SEO"
              description="Optional search engine metadata."
            />

            <div className="mt-5 space-y-5">
              <div>
                <label
                  htmlFor="seoTitle"
                  className="mb-2 block text-sm font-semibold"
                >
                  SEO Title
                </label>

                <input
                  id="seoTitle"
                  {...register("seoTitle")}
                  placeholder="Cockroach Control | GR Pest Control"
                  className="form-input"
                />
              </div>

              <div>
                <label
                  htmlFor="seoDescription"
                  className="mb-2 block text-sm font-semibold"
                >
                  SEO Description
                </label>

                <textarea
                  id="seoDescription"
                  rows={4}
                  {...register("seoDescription")}
                  className="form-input resize-y"
                  placeholder="Description for search results..."
                />
              </div>
            </div>
          </section>

          {/* PUBLISHING */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              title="Publishing"
              description="Control visibility and ordering."
            />

            <div className="mt-5 space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("active")}
                  className="h-4 w-4 accent-[#0878E8]"
                />

                <span className="text-sm font-medium">
                  Active
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("featured")}
                  className="h-4 w-4 accent-[#0878E8]"
                />

                <span className="text-sm font-medium">
                  Featured
                </span>
              </label>

              <div>
                <label
                  htmlFor="sortOrder"
                  className="mb-2 block text-sm font-semibold"
                >
                  Sort Order
                </label>

                <input
                  id="sortOrder"
                  type="number"
                  min={0}
                  {...register("sortOrder", {
                    valueAsNumber: true,
                  })}
                  className="form-input max-w-xs"
                />
              </div>
            </div>
          </section>

          {/* ERRORS */}
          {serverError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {serverError}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
              {successMessage}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0878E8] px-7 text-sm font-semibold text-white transition hover:bg-[#066BCF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Creating..."
                : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0F172A]">
        {title}
      </h2>

      <p className="mt-1 text-sm text-[#64748B]">
        {description}
      </p>
    </>
  );
}

function ArrayInputSection({
  title,
  description,
  fieldName,
  register,
  setValue,
  control,
}: {
  title: string;
  description: string;
  fieldName: "pestTypes" | "benefits";
  register: ReturnType<
    typeof useForm<CreateServiceInput>
  >["register"];
  setValue: ReturnType<
    typeof useForm<CreateServiceInput>
  >["setValue"];
  control: ReturnType<
    typeof useForm<CreateServiceInput>
  >["control"];
}) {
  const values = control._formValues[fieldName] ?? [];

  const [value, setLocalValue] = useState("");

  const addItem = () => {
    const trimmed = value.trim();

    if (!trimmed) return;

    setValue(fieldName, [...values, trimmed], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setLocalValue("");
  };

  const removeItem = (index: number) => {
    setValue(
      fieldName,
      values.filter(
        (_: string, itemIndex: number) =>
          itemIndex !== index
      ),
      {
        shouldDirty: true,
      }
    );
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionTitle
        title={title}
        description={description}
      />

      <div className="mt-5 flex gap-2">
        <input
          value={value}
          onChange={(event) =>
            setLocalValue(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addItem();
            }
          }}
          placeholder={
            fieldName === "pestTypes"
              ? "e.g. Cockroaches"
              : "e.g. Professional assessment"
          }
          className="form-input flex-1"
        />

        <button
          type="button"
          onClick={addItem}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white hover:bg-[#066BCF]"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {values.map(
          (item: string, index: number) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5"
            >
              <span className="text-sm text-[#0F172A]">
                {item}
              </span>

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-600"
                aria-label={`Remove ${item}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}