import { ImageIcon } from "lucide-react";

export default function ServiceImageSection() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <ImageIcon size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">Service Image</h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the primary image for this service.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex min-h-48 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
          <div className="text-center">
            <ImageIcon
              size={32}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold text-[#0F172A]">
              Upload service image
            </p>

            <p className="mt-1 text-xs text-[#64748B]">
              Cloudinary upload will be connected here.
            </p>

            <button
              type="button"
              className="mt-4 rounded-lg bg-[#0878E8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#066BCF]"
            >
              Choose Image
            </button>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="heroImageAlt"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Image Alt Text
          </label>

          <input
            id="heroImageAlt"
            type="text"
            placeholder="Describe the image for accessibility"
            className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </section>
  );
}