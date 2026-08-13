import { ListChecks, Plus } from "lucide-react";

export default function ServiceProcess() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <ListChecks size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Treatment Process
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Explain the steps involved in delivering this service.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-50"
        >
          <Plus size={16} />
          Add Process Step
        </button>

        <p className="mt-3 text-sm text-[#64748B]">
          No treatment steps added yet.
        </p>
      </div>
    </section>
  );
}