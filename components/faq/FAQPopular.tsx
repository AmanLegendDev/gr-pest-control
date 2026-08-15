"use client";

import { ArrowDown, Star } from "lucide-react";

interface FAQPopularItem {
  id: string;
  question: string;
  category: string;
  featured: boolean;
}

interface FAQPopularProps {
  items: FAQPopularItem[];
}

export default function FAQPopular({
  items,
}: FAQPopularProps) {
  if (items.length === 0) {
    return null;
  }

  const visibleItems =
    items.slice(0, 4);

  const scrollToFAQ = (
    id: string,
  ) => {
    const element =
      document.getElementById(
        `faq-item-${id}`,
      );

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    const button =
      element.querySelector(
        "button",
      ) as HTMLButtonElement | null;

    button?.focus();
  };

  return (
    <section
      className="
        bg-white
        px-4
        py-12
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-20
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =========================
            HEADER
        ========================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-1.5
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              <Star
                size={12}
                fill="currentColor"
              />

              Popular questions
            </div>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[-0.04em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              Start with the
              questions people ask most.
            </h2>
          </div>

          <p
            className="
              max-w-sm
              text-xs
              leading-6
              text-slate-400
              sm:text-right
            "
          >
            Quick answers to some of the most
            common things customers want to
            know before arranging a service.
          </p>
        </div>

        {/* =========================
            POPULAR GRID
        ========================== */}

        <div
          className="
            mt-8
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {visibleItems.map(
            (item, index) => (
              <button
                key={item.id}
                id={`popular-faq-${item.id}`}
                type="button"
                onClick={() =>
                  scrollToFAQ(
                    item.id,
                  )
                }
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-slate-100
                  bg-[#F8FAFC]
                  p-5
                  text-left
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-100
                  hover:bg-white
                  hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                "
              >
                {/* Number */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-[9px]
                      font-extrabold
                      text-[#0878E8]
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:bg-[#0878E8]
                      group-hover:text-white
                    "
                  >
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <ArrowDown
                    size={14}
                    className="
                      rotate-[-45deg]
                      text-slate-300
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:text-[#0878E8]
                    "
                  />
                </div>

                {/* Question */}

                <h3
                  className="
                    mt-5
                    line-clamp-3
                    text-sm
                    font-extrabold
                    leading-6
                    tracking-[-0.015em]
                    text-[#062B63]
                    transition-colors
                    group-hover:text-[#0878E8]
                  "
                >
                  {item.question}
                </h3>

                {/* Category */}

                {item.category && (
                  <span
                    className="
                      mt-4
                      inline-flex
                      max-w-full
                      truncate
                      rounded-full
                      bg-white
                      px-2.5
                      py-1.5
                      text-[9px]
                      font-bold
                      text-slate-400
                    "
                  >
                    {item.category}
                  </span>
                )}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}