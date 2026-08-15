import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

interface FAQCTAProps {
  businessName: string;
  primaryCTA?: string;
  phone?: string;
  whatsapp?: string;
}

export default function FAQCTA({
  businessName,
  primaryCTA,
  phone,
  whatsapp,
}: FAQCTAProps) {
  const cleanWhatsapp =
    whatsapp?.replace(
      /[^0-9+]/g,
      "",
    );

  const whatsappHref =
    cleanWhatsapp
      ? `https://wa.me/${cleanWhatsapp.replace(
          /^\+/,
          "",
        )}`
      : "";

  return (
    <section
      className="
        bg-[#F8FAFC]
        px-4
        pb-16
        pt-4
        sm:px-6
        sm:pb-20
        sm:pt-6
        lg:px-8
        lg:pb-24
        lg:pt-8
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-[#062B63]
            px-6
            py-10
            shadow-[0_25px_70px_rgba(6,43,99,0.14)]
            sm:px-10
            sm:py-12
            lg:px-14
            lg:py-14
          "
        >
          {/* Background accents */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-28
              h-72
              w-72
              rounded-full
              bg-[#0878E8]/25
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-20
              h-64
              w-64
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          <div
            className="
              relative
              grid
              items-center
              gap-9
              lg:grid-cols-[1fr_auto]
              lg:gap-14
            "
          >
            {/* Content */}

            <div className="max-w-2xl">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-3.5
                  py-2
                "
              >
                <MessageCircle
                  size={13}
                  className="text-blue-200"
                />

                <span
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.15em]
                    text-blue-100
                  "
                >
                  Still have questions?
                </span>
              </div>

              <h2
                className="
                  mt-5
                  text-3xl
                  font-extrabold
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-white
                  sm:text-4xl
                "
              >
                Can't find the answer
                you're looking for?
              </h2>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-blue-100/70
                  sm:text-base
                "
              >
                No problem. Tell{" "}
                {businessName} what you are
                dealing with and we'll help you
                understand the next step.
              </p>

              {/* Trust points */}

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  gap-x-6
                  gap-y-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <CheckCircle2
                    size={15}
                    className="text-emerald-300"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-blue-100
                    "
                  >
                    Clear communication
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <ShieldCheck
                    size={15}
                    className="text-blue-200"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-blue-100
                    "
                  >
                    Professional service
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}

            <div
              className="
                flex
                w-full
                flex-col
                gap-3
                lg:w-auto
              "
            >
              <Link
                href="/quote"
                className="
                  group
                  inline-flex
                  min-h-13
                  w-full
                  min-w-[220px]
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-white
                  px-7
                  text-sm
                  font-extrabold
                  text-[#062B63]
                  shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-slate-50
                  hover:shadow-[0_16px_35px_rgba(0,0,0,0.16)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#062B63]
                  sm:w-auto
                "
              >
                {primaryCTA ||
                  "Get a Free Quote"}

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0878E8]
                    text-white
                  "
                >
                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                    "
                  />
                </span>
              </Link>

              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    text-xs
                    font-bold
                    text-blue-100
                    transition-all
                    hover:bg-white/10
                    hover:text-white
                    sm:w-auto
                  "
                >
                  <MessageCircle
                    size={14}
                  />

                  Chat on WhatsApp
                </a>
              )}

              {phone && (
                <a
                  href={`tel:${phone.replace(
                    /\s+/g,
                    "",
                  )}`}
                  className="
                    text-center
                    text-[10px]
                    font-bold
                    text-blue-100/50
                    transition-colors
                    hover:text-white
                  "
                >
                  Or call {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}