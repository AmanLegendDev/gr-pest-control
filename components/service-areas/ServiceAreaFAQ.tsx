import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

interface ServiceAreaFAQItem {
  question: string;
  answer: string;
  sortOrder: number;
}

interface ServiceAreaFAQProps {
  areaName: string;
  faqs: ServiceAreaFAQItem[];
}

export default function ServiceAreaFAQ({
  areaName,
  faqs,
}: ServiceAreaFAQProps) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section
      className="
        bg-white
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-10
          lg:grid-cols-[0.72fr_1.28fr]
          lg:gap-16
        "
      >
        {/* =========================
            LEFT INTRO
        ========================== */}

        <div className="max-w-md">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-blue-50/60
              px-3
              py-1.5
            "
          >
            <HelpCircle
              size={13}
              className="text-[#0878E8]"
            />

            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              Area FAQs
            </span>
          </div>

          <h2
            className="
              mt-4
              text-2xl
              font-extrabold
              tracking-[-0.04em]
              text-[#062B63]
              sm:text-3xl
            "
          >
            Common questions about
            {` ${areaName}`}
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              sm:leading-7
            "
          >
            Find answers to common questions
            about pest control services and
            availability in this area.
          </p>
        </div>

        {/* =========================
            FAQ LIST
        ========================== */}

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={`${faq.question}-${index}`}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-[#F8FAFC]
                transition-colors
                open:border-blue-100
                open:bg-white
                open:shadow-sm
              "
            >
              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  gap-5
                  px-5
                  py-5
                  outline-none
                  sm:px-6
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      mt-0.5
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                      text-[10px]
                      font-extrabold
                      text-[#0878E8]
                      transition
                      group-open:bg-[#0878E8]
                      group-open:text-white
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span
                    className="
                      text-sm
                      font-bold
                      leading-6
                      text-[#062B63]
                      sm:text-[15px]
                    "
                  >
                    {faq.question}
                  </span>
                </div>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    text-slate-400
                    transition-all
                    duration-200
                    group-open:border-blue-100
                    group-open:bg-blue-50
                    group-open:text-[#0878E8]
                  "
                >
                  <ChevronDown
                    size={16}
                    className="
                      transition-transform
                      duration-200
                      group-open:rotate-180
                    "
                  />
                </span>
              </summary>

              <div
                className="
                  border-t
                  border-slate-100
                  px-5
                  pb-5
                  pt-4
                  sm:px-6
                  sm:pb-6
                "
              >
                <p
                  className="
                    pl-9
                    text-sm
                    leading-6
                    text-slate-500
                    sm:leading-7
                  "
                >
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}