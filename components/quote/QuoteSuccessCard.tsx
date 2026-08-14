import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface QuoteSuccessCardProps {
  reference: string;
  phone?: string;
}

const NEXT_STEPS = [
  {
    icon: CheckCircle2,
    title: "Request received",
    description:
      "Your quote request is safely with our team.",
  },
  {
    icon: Phone,
    title: "We contact you",
    description:
      "We’ll get in touch using the details you provided.",
  },
  {
    icon: CalendarCheck2,
    title: "We confirm the next step",
    description:
      "Your preferred service timing will be discussed and confirmed.",
  },
];

export default function QuoteSuccessCard({
  reference,
  phone,
}: QuoteSuccessCardProps) {
  const phoneHref = phone
    ? `tel:${phone.replace(/[^\d+]/g, "")}`
    : undefined;

  return (
    <div className="w-full">
      {/* =========================
          MAIN SUCCESS CARD
      ========================== */}

      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200/80
          bg-white
          shadow-[0_25px_80px_rgba(15,23,42,0.08)]
          sm:rounded-[32px]
        "
      >
        <div className="px-6 pb-8 pt-8 text-center sm:px-10 sm:pb-10 sm:pt-10 lg:px-14 lg:pb-12 lg:pt-12">
          {/* Success icon */}

          <div
            className="
              mx-auto
              flex
              h-[68px]
              w-[68px]
              items-center
              justify-center
              rounded-full
              bg-emerald-50
              text-emerald-600
              ring-8
              ring-emerald-50/50
            "
          >
            <CheckCircle2
              size={36}
              strokeWidth={1.8}
            />
          </div>

          {/* Eyebrow */}

          <div className="mt-7 inline-flex items-center rounded-full border border-blue-100 bg-blue-50/70 px-3.5 py-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
              Request received
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              mt-4
              text-3xl
              font-extrabold
              tracking-[-0.045em]
              text-[#062B63]
              sm:text-4xl
              lg:text-[46px]
            "
          >
            Thanks, we’ve got it.
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
              sm:leading-8
            "
          >
            Your quote request has been
            successfully submitted. Our team
            will review your details and contact
            you to confirm the next step.
          </p>

          {/* =========================
              REFERENCE
          ========================== */}

          <div
            className="
              mx-auto
              mt-8
              max-w-md
              rounded-2xl
              border
              border-blue-100
              bg-[#F5F9FF]
              px-5
              py-5
              sm:px-7
              sm:py-6
            "
          >
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0878E8]" />

              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                Your request reference
              </p>

              <span className="h-1.5 w-1.5 rounded-full bg-[#0878E8]" />
            </div>

            <p
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[0.04em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              {reference}
            </p>

            <p className="mx-auto mt-2 max-w-xs text-[11px] leading-5 text-slate-500">
              Keep this reference handy if you
              need to contact us about your
              request.
            </p>
          </div>

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#0878E8]
                px-7
                text-sm
                font-extrabold
                text-white
                shadow-[0_12px_30px_rgba(8,120,232,0.18)]
                transition-all
                duration-200
                hover:bg-[#066BCF]
                hover:shadow-[0_15px_35px_rgba(8,120,232,0.23)]
              "
            >
              Back to homepage

              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              >
                <ArrowRight size={14} />
              </span>
            </Link>

            {phoneHref && (
              <a
                href={phoneHref}
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-7
                  text-sm
                  font-extrabold
                  text-[#062B63]
                  transition
                  hover:border-slate-300
                  hover:bg-slate-50
                "
              >
                <Phone size={16} />

                Call us
              </a>
            )}
          </div>
        </div>

        {/* =========================
            NEXT STEPS
        ========================== */}

        <div className="border-t border-slate-100 bg-[#FAFCFF] px-6 py-7 sm:px-10 sm:py-8 lg:px-14">
          <div className="text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
              What happens next
            </p>

            <h2 className="mt-1.5 text-xl font-extrabold tracking-[-0.025em] text-[#062B63] sm:text-2xl">
              We’ll take it from here.
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {NEXT_STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white
                    p-4
                    sm:p-5
                  "
                >
                  <div className="flex items-start gap-3 sm:block">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-[#0878E8]
                      "
                    >
                      <Icon size={17} />
                    </div>

                    <div>
                      <h3 className="mt-0.5 text-sm font-extrabold text-[#062B63] sm:mt-4">
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

          {/* Privacy */}

          <div className="mt-5 flex items-center justify-center gap-2 text-center">
            <ShieldCheck
              size={14}
              className="shrink-0 text-emerald-600"
            />

            <p className="text-[10px] leading-5 text-slate-400 sm:text-[11px]">
              Your information is only used to
              process and respond to your request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}