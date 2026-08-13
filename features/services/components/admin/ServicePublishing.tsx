import { Eye, Settings2 } from "lucide-react";

export default function ServicePublishing() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#062B63]">
            <Settings2 size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">Publishing</h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Control how this service appears on the website.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            defaultChecked
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#0878E8]"
          />

          <span>
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              <Eye size={15} />
              Active
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Active services can appear on the public website.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#0878E8]"
          />

          <span>
            <span className="text-sm font-semibold text-[#0F172A]">
              Featured
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Featured services can be highlighted in selected website
              sections.
            </span>
          </span>
        </label>

        <div>
          <label
            htmlFor="sortOrder"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Sort Order
          </label>

          <input
            id="sortOrder"
            type="number"
            min={0}
            defaultValue={0}
            className="h-11 w-full max-w-xs rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1.5 text-xs text-[#64748B]">
            Lower numbers appear first where manual ordering is used.
          </p>
        </div>
      </div>
    </section>
  );
}