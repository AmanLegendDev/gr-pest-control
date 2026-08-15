"use client";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  Image as ImageIcon,
  Plus,
  Save,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  FormEvent,
  useState,
} from "react";

import { updateService } from "@/features/services/actions/updateService";

interface ServiceImage {
  url: string;
  publicId: string;
  alt: string;
}

interface ProcessStep {
  title: string;
  description: string;
  sortOrder: number;
}

interface FAQItem {
  question: string;
  answer: string;
  sortOrder: number;
}

interface ServiceFormData {
  id?: string;

  title: string;
  slug: string;
  category: string;

  shortDescription: string;
  description: string;

  heroImage?: ServiceImage;

  icon: string;

  pestTypes: string[];
  benefits: string[];

  process: ProcessStep[];
  faqs: FAQItem[];

  seoTitle: string;
  seoDescription: string;

  featured: boolean;
  active: boolean;

  sortOrder: number;
}

interface ServiceFormProps {
  mode: "create" | "edit";
  initialData?: ServiceFormData;
}

const EMPTY_DATA: ServiceFormData = {
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

export default function ServiceForm({
  mode,
  initialData,
}: ServiceFormProps) {
  const [form, setForm] =
    useState<ServiceFormData>(
      initialData ?? EMPTY_DATA,
    );

  const [pestInput, setPestInput] =
    useState("");

  const [benefitInput, setBenefitInput] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [imagePreview, setImagePreview] =
    useState(
      initialData?.heroImage?.url ?? "",
    );

  /* =========================
     FIELD HELPERS
  ========================== */

  function updateField<
    K extends keyof ServiceFormData,
  >(
    field: K,
    value: ServiceFormData[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* =========================
     SLUG GENERATOR
  ========================== */

  function generateSlug(
    value: string,
  ) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      title: value,

      /*
       * Automatically generate slug
       * only when creating.
       *
       * During edit, the existing slug
       * is preserved.
       */
      slug:
        mode === "create"
          ? generateSlug(value)
          : current.slug,
    }));
  }

  /* =========================
     PEST TYPES
  ========================== */

  function addPestType() {
    const value =
      pestInput.trim();

    if (!value) return;

    if (
      form.pestTypes.includes(value)
    ) {
      setPestInput("");
      return;
    }

    setForm((current) => ({
      ...current,
      pestTypes: [
        ...current.pestTypes,
        value,
      ],
    }));

    setPestInput("");
  }

  function removePestType(
    index: number,
  ) {
    setForm((current) => ({
      ...current,
      pestTypes:
        current.pestTypes.filter(
          (_, itemIndex) =>
            itemIndex !== index,
        ),
    }));
  }

  /* =========================
     BENEFITS
  ========================== */

  function addBenefit() {
    const value =
      benefitInput.trim();

    if (!value) return;

    setForm((current) => ({
      ...current,
      benefits: [
        ...current.benefits,
        value,
      ],
    }));

    setBenefitInput("");
  }

  function removeBenefit(
    index: number,
  ) {
    setForm((current) => ({
      ...current,
      benefits:
        current.benefits.filter(
          (_, itemIndex) =>
            itemIndex !== index,
        ),
    }));
  }

  /* =========================
     PROCESS
  ========================== */

  function addProcessStep() {
    setForm((current) => ({
      ...current,
      process: [
        ...current.process,
        {
          title: "",
          description: "",
          sortOrder:
            current.process.length,
        },
      ],
    }));
  }

  function updateProcessStep(
    index: number,
    field: keyof ProcessStep,
    value: string | number,
  ) {
    setForm((current) => ({
      ...current,
      process:
        current.process.map(
          (step, stepIndex) =>
            stepIndex === index
              ? {
                  ...step,
                  [field]: value,
                }
              : step,
        ),
    }));
  }

  function removeProcessStep(
    index: number,
  ) {
    setForm((current) => ({
      ...current,
      process:
        current.process
          .filter(
            (_, itemIndex) =>
              itemIndex !== index,
          )
          .map((step, itemIndex) => ({
            ...step,
            sortOrder: itemIndex,
          })),
    }));
  }

  /* =========================
     FAQS
  ========================== */

  function addFAQ() {
    setForm((current) => ({
      ...current,
      faqs: [
        ...current.faqs,
        {
          question: "",
          answer: "",
          sortOrder:
            current.faqs.length,
        },
      ],
    }));
  }

  function updateFAQ(
    index: number,
    field: keyof FAQItem,
    value: string | number,
  ) {
    setForm((current) => ({
      ...current,
      faqs: current.faqs.map(
        (faq, faqIndex) =>
          faqIndex === index
            ? {
                ...faq,
                [field]: value,
              }
            : faq,
      ),
    }));
  }

  function removeFAQ(
    index: number,
  ) {
    setForm((current) => ({
      ...current,
      faqs: current.faqs
        .filter(
          (_, itemIndex) =>
            itemIndex !== index,
        )
        .map((faq, itemIndex) => ({
          ...faq,
          sortOrder: itemIndex,
        })),
    }));
  }

  /* =========================
     SUBMIT
  ========================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,

      pestTypes:
        form.pestTypes.map((item) =>
          item.trim(),
        ),

      benefits:
        form.benefits.map((item) =>
          item.trim(),
        ),

      process:
        form.process.map(
          (step, index) => ({
            ...step,
            title:
              step.title.trim(),
            description:
              step.description.trim(),
            sortOrder: index,
          }),
        ),

      faqs:
        form.faqs.map(
          (faq, index) => ({
            ...faq,
            question:
              faq.question.trim(),
            answer:
              faq.answer.trim(),
            sortOrder: index,
          }),
        ),

      seoTitle:
        form.seoTitle.trim(),

      seoDescription:
        form.seoDescription.trim(),
    };

    try {
      if (mode === "edit") {
        if (!form.id) {
          setError(
            "Service ID is missing.",
          );
          return;
        }

      const result =
  await updateService({
    ...payload,
    id: form.id,
  });

        if (!result.success) {
          setError(
            result.message ||
              "Unable to update service.",
          );

          return;
        }

        setSuccess(
          "Service updated successfully.",
        );
      } else {
        /*
         * Create action will be wired
         * when the Add Service page
         * is created.
         */
        setError(
          "Create mode is not connected yet.",
        );

        return;
      }
    } catch (error) {
      console.error(
        "SERVICE_FORM_SUBMIT_ERROR",
        error,
      );

      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
      "
    >
      {/* =========================
          BASIC INFORMATION
      ========================== */}

      <FormSection
        eyebrow="01"
        title="Basic information"
        description="Core information that identifies this service."
      >
        <div
          className="
            grid
            gap-5
            lg:grid-cols-2
          "
        >
          <Field
            label="Service title"
            required
          >
            <input
              value={form.title}
              onChange={(event) =>
                handleTitleChange(
                  event.target.value,
                )
              }
              placeholder="Termite Control"
              className={inputClass}
            />
          </Field>

          <Field
            label="Category"
            required
          >
            <input
              value={form.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value,
                )
              }
              placeholder="Residential Pest Control"
              className={inputClass}
            />
          </Field>
        </div>

        <Field
          label="Slug"
          required
          hint="Lowercase letters, numbers and hyphens only."
        >
          <input
            value={form.slug}
            onChange={(event) =>
              updateField(
                "slug",
                generateSlug(
                  event.target.value,
                ),
              )
            }
            placeholder="termite-control"
            className={inputClass}
          />
        </Field>

        <Field
          label="Short description"
          required
        >
          <textarea
            value={
              form.shortDescription
            }
            onChange={(event) =>
              updateField(
                "shortDescription",
                event.target.value,
              )
            }
            rows={3}
            maxLength={300}
            placeholder="Short service description..."
            className={textareaClass}
          />

          <CharacterCount
            value={
              form.shortDescription
            }
            max={300}
          />
        </Field>

        <Field
          label="Full description"
          required
        >
          <textarea
            value={form.description}
            onChange={(event) =>
              updateField(
                "description",
                event.target.value,
              )
            }
            rows={8}
            maxLength={10000}
            placeholder="Detailed service description..."
            className={textareaClass}
          />

          <CharacterCount
            value={form.description}
            max={10000}
          />
        </Field>
      </FormSection>

      {/* =========================
          HERO IMAGE
      ========================== */}

      <FormSection
        eyebrow="02"
        title="Hero image"
        description="The primary image displayed on the service."
      >
        <div
          className="
            grid
            gap-6
            lg:grid-cols-[260px_1fr]
          "
        >
          <div
            className="
              aspect-[4/3]
              overflow-hidden
              rounded-2xl
              border
              border-slate-100
              bg-slate-50
            "
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt={
                  form.heroImage?.alt ||
                  form.title ||
                  "Service preview"
                }
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  text-slate-300
                "
              >
                <ImageIcon size={28} />

                <span className="text-[10px] font-bold">
                  No image
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Field
              label="Image URL"
              hint="Cloudinary secure URL."
            >
              <input
                value={
                  form.heroImage?.url ??
                  ""
                }
                onChange={(event) => {
                  const url =
                    event.target.value;

                  setForm(
                    (current) => ({
                      ...current,
                      heroImage: {
                        url,
                        publicId:
                          current
                            .heroImage
                            ?.publicId ??
                          "",
                        alt:
                          current
                            .heroImage
                            ?.alt ??
                          "",
                      },
                    }),
                  );

                  setImagePreview(url);
                }}
                placeholder="https://res.cloudinary.com/..."
                className={inputClass}
              />
            </Field>

            <Field label="Cloudinary public ID">
              <input
                value={
                  form.heroImage
                    ?.publicId ?? ""
                }
                onChange={(event) => {
                  const publicId =
                    event.target.value;

                  setForm(
                    (current) => ({
                      ...current,
                      heroImage: {
                        url:
                          current
                            .heroImage
                            ?.url ?? "",
                        publicId,
                        alt:
                          current
                            .heroImage
                            ?.alt ?? "",
                      },
                    }),
                  );
                }}
                placeholder="gr-pest/services/termite-control"
                className={inputClass}
              />
            </Field>

            <Field
              label="Image alt text"
              hint="Useful for accessibility and SEO."
            >
              <input
                value={
                  form.heroImage?.alt ??
                  ""
                }
                onChange={(event) => {
                  const alt =
                    event.target.value;

                  setForm(
                    (current) => ({
                      ...current,
                      heroImage: {
                        url:
                          current
                            .heroImage
                            ?.url ?? "",
                        publicId:
                          current
                            .heroImage
                            ?.publicId ??
                          "",
                        alt,
                      },
                    }),
                  );
                }}
                placeholder="Professional termite treatment"
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </FormSection>

      {/* =========================
          PEST TYPES
      ========================== */}

      <FormSection
        eyebrow="03"
        title="Pest types"
        description="Add the pests covered by this service."
      >
        <TagEditor
          items={form.pestTypes}
          value={pestInput}
          setValue={setPestInput}
          onAdd={addPestType}
          onRemove={removePestType}
          placeholder="e.g. Termites"
        />
      </FormSection>

      {/* =========================
          BENEFITS
      ========================== */}

      <FormSection
        eyebrow="04"
        title="Benefits"
        description="Key reasons customers should choose this treatment."
      >
        <TagEditor
          items={form.benefits}
          value={benefitInput}
          setValue={setBenefitInput}
          onAdd={addBenefit}
          onRemove={removeBenefit}
          placeholder="e.g. Long-lasting protection"
        />
      </FormSection>

      {/* =========================
          PROCESS
      ========================== */}

      <FormSection
        eyebrow="05"
        title="Treatment process"
        description="Build the treatment journey step by step."
      >
        <div className="space-y-4">
          {form.process.map(
            (step, index) => (
              <div
                key={index}
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50/70
                  p-4
                "
              >
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#062B63]
                      text-[9px]
                      font-extrabold
                      text-white
                    "
                  >
                    {String(
                      index + 1,
                    ).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeProcessStep(
                        index,
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-[10px]
                      font-extrabold
                      text-red-400
                      hover:text-red-600
                    "
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    value={step.title}
                    onChange={(event) =>
                      updateProcessStep(
                        index,
                        "title",
                        event.target.value,
                      )
                    }
                    placeholder="Step title"
                    className={inputClass}
                  />

                  <textarea
                    value={
                      step.description
                    }
                    onChange={(event) =>
                      updateProcessStep(
                        index,
                        "description",
                        event.target.value,
                      )
                    }
                    rows={3}
                    placeholder="Explain this treatment step..."
                    className={textareaClass}
                  />
                </div>
              </div>
            ),
          )}

          <AddButton
            onClick={addProcessStep}
            label="Add process step"
          />
        </div>
      </FormSection>

      {/* =========================
          FAQ
      ========================== */}

      <FormSection
        eyebrow="06"
        title="Service FAQs"
        description="Questions and answers specific to this service."
      >
        <div className="space-y-4">
          {form.faqs.map(
            (faq, index) => (
              <div
                key={index}
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50/70
                  p-4
                "
              >
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-[#0878E8]
                    "
                  >
                    FAQ{" "}
                    {String(
                      index + 1,
                    ).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeFAQ(
                        index,
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-[10px]
                      font-extrabold
                      text-red-400
                      hover:text-red-600
                    "
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    value={
                      faq.question
                    }
                    onChange={(event) =>
                      updateFAQ(
                        index,
                        "question",
                        event.target.value,
                      )
                    }
                    placeholder="Frequently asked question"
                    className={inputClass}
                  />

                  <textarea
                    value={
                      faq.answer
                    }
                    onChange={(event) =>
                      updateFAQ(
                        index,
                        "answer",
                        event.target.value,
                      )
                    }
                    rows={4}
                    placeholder="Answer..."
                    className={textareaClass}
                  />
                </div>
              </div>
            ),
          )}

          <AddButton
            onClick={addFAQ}
            label="Add FAQ"
          />
        </div>
      </FormSection>

      {/* =========================
          SEO
      ========================== */}

      <FormSection
        eyebrow="07"
        title="SEO"
        description="Search engine title and description for this service."
      >
        <Field
          label="SEO title"
          hint="Maximum 70 characters."
        >
          <input
            value={form.seoTitle}
            onChange={(event) =>
              updateField(
                "seoTitle",
                event.target.value,
              )
            }
            maxLength={70}
            placeholder={`${form.title} | GR Pest Control`}
            className={inputClass}
          />

          <CharacterCount
            value={form.seoTitle}
            max={70}
          />
        </Field>

        <Field
          label="SEO description"
          hint="Maximum 160 characters."
        >
          <textarea
            value={
              form.seoDescription
            }
            onChange={(event) =>
              updateField(
                "seoDescription",
                event.target.value,
              )
            }
            rows={3}
            maxLength={160}
            placeholder="Professional pest control treatment..."
            className={textareaClass}
          />

          <CharacterCount
            value={
              form.seoDescription
            }
            max={160}
          />
        </Field>
      </FormSection>

      {/* =========================
          PUBLISH SETTINGS
      ========================== */}

      <FormSection
        eyebrow="08"
        title="Publishing"
        description="Control visibility and ordering."
      >
        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          <Toggle
            icon={<Check size={15} />}
            title="Active service"
            description="Show this service publicly."
            checked={form.active}
            onChange={(value) =>
              updateField(
                "active",
                value,
              )
            }
          />

          <Toggle
            icon={
              <Star
                size={15}
                fill="currentColor"
              />
            }
            title="Featured service"
            description="Highlight this service."
            checked={
              form.featured
            }
            onChange={(value) =>
              updateField(
                "featured",
                value,
              )
            }
          />
        </div>

        <Field
          label="Sort order"
          hint="Lower numbers appear first."
        >
          <input
            type="number"
            min={0}
            value={form.sortOrder}
            onChange={(event) =>
              updateField(
                "sortOrder",
                Number(
                  event.target.value,
                ),
              )
            }
            className={inputClass}
          />
        </Field>
      </FormSection>

      {/* =========================
          RESULT MESSAGES
      ========================== */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-5
            py-4
            text-xs
            font-semibold
            leading-6
            text-red-600
          "
          role="alert"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="
            rounded-2xl
            border
            border-emerald-100
            bg-emerald-50
            px-5
            py-4
            text-xs
            font-semibold
            leading-6
            text-emerald-600
          "
          role="status"
        >
          {success}
        </div>
      )}

      {/* =========================
          STICKY ACTION BAR
      ========================== */}

      <div
        className="
          sticky
          bottom-4
          z-20
          flex
          flex-col
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white/95
          p-3
          shadow-[0_15px_45px_rgba(15,23,42,0.10)]
          backdrop-blur-xl
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <Link
          href={
            mode === "edit" &&
            form.id
              ? `/admin/services/${form.id}`
              : "/admin/services"
          }
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            px-4
            text-xs
            font-extrabold
            text-slate-500
            transition-colors
            hover:bg-slate-50
            hover:text-[#062B63]
          "
        >
          <ArrowLeft size={14} />

          Cancel
        </Link>

        <button
          type="submit"
          disabled={saving}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#062B63]
            px-6
            text-xs
            font-extrabold
            text-white
            shadow-sm
            transition-all
            hover:bg-[#0878E8]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {saving ? (
            <>
              <span
                className="
                  h-3.5
                  w-3.5
                  animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                "
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={14} />

              {mode === "edit"
                ? "Save Changes"
                : "Create Service"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   UI HELPERS
========================================================= */

const inputClass = `
  h-11
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  text-xs
  font-semibold
  text-[#062B63]
  outline-none
  transition-all
  placeholder:text-slate-400
  focus:border-[#0878E8]
  focus:ring-2
  focus:ring-blue-100
`;

const textareaClass = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  py-3
  text-xs
  font-semibold
  leading-6
  text-[#062B63]
  outline-none
  transition-all
  placeholder:text-slate-400
  focus:border-[#0878E8]
  focus:ring-2
  focus:ring-blue-100
`;

function FormSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        rounded-[28px]
        border
        border-slate-100
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(15,23,42,0.035)]
        sm:p-7
      "
    >
      <div
        className="
          mb-6
          flex
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-blue-50
            text-[9px]
            font-extrabold
            text-[#0878E8]
          "
        >
          {eyebrow}
        </span>

        <div>
          <h2
            className="
              text-base
              font-extrabold
              tracking-[-0.02em]
              text-[#062B63]
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              text-[11px]
              leading-5
              text-slate-400
            "
          >
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="
          mb-2
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <label
          className="
            text-[10px]
            font-extrabold
            uppercase
            tracking-[0.08em]
            text-[#062B63]
          "
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>

        {hint && (
          <span
            className="
              hidden
              text-[9px]
              font-medium
              text-slate-400
              sm:block
            "
          >
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

function CharacterCount({
  value,
  max,
}: {
  value: string;
  max: number;
}) {
  return (
    <div className="mt-1.5 text-right">
      <span
        className="
          text-[9px]
          font-semibold
          text-slate-400
        "
      >
        {value.length}/{max}
      </span>
    </div>
  );
}

function TagEditor({
  items,
  value,
  setValue,
  onAdd,
  onRemove,
  placeholder,
}: {
  items: string[];
  value: string;
  setValue: (value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  placeholder: string;
}) {
  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) =>
            setValue(
              event.target.value,
            )
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter"
            ) {
              event.preventDefault();
              onAdd();
            }
          }}
          placeholder={placeholder}
          className={inputClass}
        />

        <button
          type="button"
          onClick={onAdd}
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#062B63]
            text-white
            transition-colors
            hover:bg-[#0878E8]
          "
          aria-label="Add item"
        >
          <Plus size={16} />
        </button>
      </div>

      {items.length > 0 && (
        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-2
          "
        >
          {items.map(
            (item, index) => (
              <span
                key={`${item}-${index}`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-50
                  px-3
                  py-2
                  text-[10px]
                  font-bold
                  text-[#0878E8]
                "
              >
                {item}

                <button
                  type="button"
                  onClick={() =>
                    onRemove(index)
                  }
                  className="
                    text-blue-300
                    transition-colors
                    hover:text-red-500
                  "
                  aria-label={`Remove ${item}`}
                >
                  <X size={12} />
                </button>
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        h-11
        items-center
        gap-2
        rounded-xl
        border
        border-dashed
        border-blue-200
        bg-blue-50/40
        px-4
        text-[10px]
        font-extrabold
        text-[#0878E8]
        transition-colors
        hover:bg-blue-50
      "
    >
      <Plus size={14} />

      {label}
    </button>
  );
}

function Toggle({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!checked)
      }
      className={`
        flex
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        p-4
        text-left
        transition-all
        ${
          checked
            ? "border-blue-100 bg-blue-50/50"
            : "border-slate-100 bg-slate-50"
        }
      `}
    >
      <span className="flex items-start gap-3">
        <span
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${
              checked
                ? "bg-[#0878E8] text-white"
                : "bg-white text-slate-400"
            }
          `}
        >
          {icon}
        </span>

        <span>
          <span
            className="
              block
              text-xs
              font-extrabold
              text-[#062B63]
            "
          >
            {title}
          </span>

          <span
            className="
              mt-1
              block
              text-[10px]
              leading-5
              text-slate-400
            "
          >
            {description}
          </span>
        </span>
      </span>

      <span
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition-colors
          ${
            checked
              ? "bg-[#0878E8]"
              : "bg-slate-200"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            ${
              checked
                ? "translate-x-6"
                : "translate-x-1"
            }
          `}
        />
      </span>
    </button>
  );
}