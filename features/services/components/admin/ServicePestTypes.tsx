import { Bug } from "lucide-react";

export default function ServicePestTypes() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-[#39A935]">
            <Bug size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">Pest Types</h2>

            <p className="mt-1 text-sm text-[#64748B]">
              List the pest problems this service covers.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Cockroaches"
            className="h-11 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="button"
            className="h-11 rounded-lg border border-[#0878E8] px-4 text-sm font-semibold text-[#0878E8] transition hover:bg-blue-50"
          >
            Add
          </button>
        </div>

        <p className="mt-3 text-sm text-[#64748B]">
          No pest types added yet.
        </p>
      </div>
    </section>
  );
}