import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { authOptions } from "@/lib/auth/auth-options";

import FAQForm from "@/features/faq/components/admin/FAQForm";

export const metadata = {
  title: "Add FAQ | GR Pest Control Admin",
  description: "Create a new frequently asked question.",
};

export default async function NewFAQPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6">
          <Link
            href="/admin/faqs"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#0878E8] focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />

            Back to FAQs
          </Link>

          <div>
            <p className="text-sm font-semibold text-[#0878E8]">
              Content Management
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
              Add FAQ
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
              Create a clear and useful question-answer pair for
              customers visiting GR Pest Control.
            </p>
          </div>
        </div>

        <FAQForm />
      </div>
    </main>
  );
}