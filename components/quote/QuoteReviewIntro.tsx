import { ClipboardCheck } from "lucide-react";

export default function QuoteReviewIntro() {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0878E8]">
        <ClipboardCheck size={13} />

        Final check
      </div>

      <h1 className="text-3xl font-extrabold tracking-[-0.045em] text-[#062B63] sm:text-4xl lg:text-[44px]">
        Review your request.
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
        Check your details before sending your
        quote request. You can edit anything
        that needs changing.
      </p>
    </div>
  );
}