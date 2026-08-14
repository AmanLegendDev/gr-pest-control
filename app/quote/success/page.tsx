import {
  CheckCircle2,
  Phone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{
    reference?: string;
  }>;
}

export const metadata = {
  title: "Quote Request Received",
  description:
    "Your GR Pest Control quote request has been received.",
};

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;

  const reference =
    params.reference || "Pending";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="flex min-h-screen items-center justify-center px-4 py-28 sm:px-6">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-7 text-center shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
            {/* Success icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2
                size={34}
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
              Request received
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[#062B63] sm:text-4xl">
              Thanks, we’ve got it.
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
              Your quote request has been
              successfully submitted. Our team
              will review your details and contact
              you to confirm the next step.
            </p>

            {/* Reference */}
            <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                Reference number
              </p>

              <p className="mt-2 text-xl font-extrabold tracking-[0.04em] text-[#062B63]">
                {reference}
              </p>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Keep this reference handy if you
                need to contact us about your
                request.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0878E8] px-6 text-sm font-bold text-white shadow-[0_10px_25px_rgba(8,120,232,0.18)] transition hover:bg-[#066BCF]"
              >
                Back to homepage

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href="tel:+61000000000"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-[#062B63] transition hover:bg-slate-50"
              >
                <Phone size={16} />

                Contact us
              </a>
            </div>

            <p className="mt-6 text-[10px] text-slate-400">
              Please replace the phone number above
              with the real business number before
              launch.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}