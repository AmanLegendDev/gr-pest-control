import { Search } from "lucide-react";

export default function ServiceSEO() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#062B63]">
            <Search size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">SEO</h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Optional metadata for search engines and social sharing.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <label
            htmlFor="seoTitle"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            SEO Title
          </label>

          <input
            id="seoTitle"
            type="text"
            placeholder="Professional Pest Control | GR Pest Control"
            className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1.5 text-xs text-[#64748B]">
            Recommended maximum: around 60–70 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="seoDescription"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            SEO Description
          </label>

          <textarea
            id="seoDescription"
            rows={4}
            placeholder="A concise description for search results..."
            className="w-full resize-y rounded-lg border border-slate-300 px-3 py-3 text-sm leading-6 outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1.5 text-xs text-[#64748B]">
            Recommended maximum: around 160 characters.
          </p>
        </div>
      </div>
    </section>
  );
}