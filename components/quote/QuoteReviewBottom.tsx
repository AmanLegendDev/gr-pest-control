import {
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

interface QuoteReviewBottomProps {
  businessName?: string;
}

export default function QuoteReviewBottom({
  businessName = "GR Pest Control",
}: QuoteReviewBottomProps) {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.035)] sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={17} />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-extrabold text-[#062B63]">
              Almost there.
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Once you submit your request,
              our team will review your details
              and contact you to confirm the
              next step.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400 sm:text-[11px]">
          <ShieldCheck
            size={14}
            className="text-emerald-600"
          />

          Your information is kept private.
        </div>

        <span
          aria-hidden="true"
          className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"
        />

        <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400 sm:text-[11px]">
          <MessageCircle
            size={14}
            className="text-[#0878E8]"
          />

          We’ll contact you about your request.
        </div>
      </div>
    </div>
  );
}