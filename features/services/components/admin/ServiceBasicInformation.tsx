import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FileText } from "lucide-react";

import type { CreateServiceInput } from "../../schemas/service-schema";

const categories = [
  "General Pest Control",
  "Residential Pest Control",
  "Commercial Pest Control",
  "Specialised Pest Control",
  "Other",
];

type ServiceBasicInformationProps = {
  register: UseFormRegister<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
  setValue: UseFormSetValue<CreateServiceInput>;
  slugManuallyEdited: boolean;
  setSlugManuallyEdited: (value: boolean) => void;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ServiceBasicInformation({
  register,
  errors,
  setValue,
  slugManuallyEdited,
  setSlugManuallyEdited,
}: ServiceBasicInformationProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <FileText size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the main information customers will see about this service.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* SERVICE TITLE */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Service Title *
          </label>

          <input
            id="title"
            type="text"
            placeholder="e.g. General Pest Control"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
            {...register("title", {
              onChange: (event) => {
                if (!slugManuallyEdited) {
                  setValue("slug", slugify(event.target.value), {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }
              },
            })}
          />

          {errors.title && (
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
              type="text"
              placeholder="general-pest-control"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
              {...register("slug", {
                onChange: () => {
                  setSlugManuallyEdited(true);
                },
              })}
            />

            <p className="mt-1.5 text-xs text-[#64748B]">
              Used for the public service URL.
            </p>

            {errors.slug && (
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
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
              {...register("category")}
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
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
            placeholder="A concise description of this service..."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
            {...register("shortDescription")}
          />

          <p className="mt-1.5 text-xs text-[#64748B]">
            Keep this concise. It will be used in service cards and previews.
          </p>

          {errors.shortDescription && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* FULL DESCRIPTION */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Full Description *
          </label>

          <textarea
            id="description"
            rows={8}
            placeholder="Describe the service in detail..."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
            {...register("description")}
          />

          {errors.description && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}