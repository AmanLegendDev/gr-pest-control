import Link from "next/link";
import {
  ArrowLeft,
  CircleHelp,
} from "lucide-react";

import FAQForm from "@/features/faq/components/admin/FAQForm";

export default function NewFAQPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-8">
          <Link
            href="/admin/faq"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#0878E8]"
          >
            <ArrowLeft size={16} />
            Back to FAQs
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
              <CircleHelp size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0878E8]">
                FAQ Management
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
                Add FAQ
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Create a helpful customer question
                and answer with category, SEO and
                publishing controls.
              </p>
            </div>
          </div>
        </div>

        <FAQForm />
      </div>
    </main>
  );
}