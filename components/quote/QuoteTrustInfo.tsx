import {
  CheckCircle2,
  Clock3,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const STEPS = [
  {
    icon: CheckCircle2,
    title: "We review your request",
    description:
      "Your details are checked by our team.",
  },
  {
    icon: MessageCircle,
    title: "We contact you",
    description:
      "We’ll get in touch using the details you provide.",
  },
  {
    icon: Clock3,
    title: "We confirm the next step",
    description:
      "We’ll discuss your preferred timing and service.",
  },
];

interface QuoteTrustInfoProps {
  businessName?: string;
}

export default function QuoteTrustInfo({
  businessName = "GR Pest Control",
}: QuoteTrustInfoProps) {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="mb-5 text-center">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
          What happens next
        </p>

        <h2 className="mt-1.5 text-xl font-extrabold tracking-[-0.025em] text-[#062B63] sm:text-2xl">
          Simple from start to finish.
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {STEPS.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-5"
            >
              <div className="flex items-start gap-3 sm:block">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                  <Icon size={17} />
                </div>

                <div>
                  <h3 className="mt-0.5 text-sm font-bold text-[#062B63] sm:mt-4">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-center text-[11px] leading-5 text-slate-500">
        <ShieldCheck
          size={15}
          className="shrink-0 text-emerald-600"
        />

        <span>
          Your details are only used to respond to
          your quote request with {businessName}.
        </span>
      </div>
    </div>
  );
}