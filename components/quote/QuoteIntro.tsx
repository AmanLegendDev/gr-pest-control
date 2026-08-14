import { ShieldCheck } from "lucide-react";

interface QuoteIntroProps {
  title?: string;
  description?: string;
}

export default function QuoteIntro({
  title = "Get a Free Quote",
  description = "Tell us a few details about what you need and we’ll take care of the rest.",
}: QuoteIntroProps) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0878E8]">
        <ShieldCheck size={13} />

        Free quote request
      </div>

      <h1 className="text-3xl font-extrabold tracking-[-0.045em] text-[#062B63] sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
        {description}
      </p>
    </div>
  );
}