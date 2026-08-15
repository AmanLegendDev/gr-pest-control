import {
  ArrowDown,
  HelpCircle,
  MessageCircleQuestion,
  ShieldCheck,
} from "lucide-react";

interface FAQHeroProps {
  businessName: string;
  faqCount: number;
  categoryCount: number;
}

export default function FAQHero({
  businessName,
  faqCount,
  categoryCount,
}: FAQHeroProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8FAFC]
        px-4
        pb-14
        pt-10
        sm:px-6
        sm:pb-18
        sm:pt-14
        lg:px-8
        lg:pb-20
        lg:pt-16
      "
    >
      {/* =========================
          BACKGROUND
      ========================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-blue-100/70
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-80
          w-80
          rounded-full
          bg-white
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[1fr_0.72fr]
            lg:gap-20
          "
        >
          {/* =========================
              LEFT
          ========================== */}

          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-white
                px-3.5
                py-2
                shadow-[0_6px_20px_rgba(15,23,42,0.04)]
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
                Help centre
              </span>
            </div>

            <h1
              className="
                mt-6
                text-4xl
                font-extrabold
                leading-[1.02]
                tracking-[-0.055em]
                text-[#062B63]
                sm:text-5xl
                lg:text-[4rem]
              "
            >
              Questions?
              <br />

              <span className="text-[#0878E8]">
                We've got answers.
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
                sm:leading-8
              "
            >
              Find clear answers about pest control
              services, treatments, preparation,
              safety and what to expect from{" "}
              {businessName}.
            </p>

            {/* =========================
                STATS
            ========================== */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-2xl
                  border
                  border-slate-100
                  bg-white
                  px-4
                  py-3
                  shadow-[0_6px_20px_rgba(15,23,42,0.035)]
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
                    bg-blue-50
                    text-[#0878E8]
                  "
                >
                  <MessageCircleQuestion
                    size={15}
                  />
                </span>

                <div>
                  <p
                    className="
                      text-sm
                      font-extrabold
                      text-[#062B63]
                    "
                  >
                    {faqCount}
                  </p>

                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-slate-400
                    "
                  >
                    Questions
                  </p>
                </div>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-2xl
                  border
                  border-slate-100
                  bg-white
                  px-4
                  py-3
                  shadow-[0_6px_20px_rgba(15,23,42,0.035)]
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
                    bg-emerald-50
                    text-emerald-500
                  "
                >
                  <ShieldCheck size={15} />
                </span>

                <div>
                  <p
                    className="
                      text-sm
                      font-extrabold
                      text-[#062B63]
                    "
                  >
                    {categoryCount}
                  </p>

                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-slate-400
                    "
                  >
                    Topics
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT CARD
          ========================== */}

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-md
              lg:ml-auto
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                bg-[#062B63]
                p-7
                shadow-[0_25px_65px_rgba(6,43,99,0.14)]
                sm:p-8
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  -bottom-24
                  -left-16
                  h-48
                  w-48
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                className="
                  relative
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                  text-blue-100
                "
              >
                <MessageCircleQuestion
                  size={22}
                />
              </div>

              <p
                className="
                  relative
                  mt-7
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-blue-200
                "
              >
                Before you book
              </p>

              <h2
                className="
                  relative
                  mt-2
                  text-2xl
                  font-extrabold
                  leading-tight
                  tracking-[-0.035em]
                  text-white
                "
              >
                Know what to expect.
              </h2>

              <p
                className="
                  relative
                  mt-3
                  text-sm
                  leading-6
                  text-blue-100/70
                "
              >
                Browse the common questions below
                before arranging your pest control
                service.
              </p>

              <div
                className="
                  relative
                  mt-7
                  flex
                  items-center
                  gap-3
                  border-t
                  border-white/10
                  pt-5
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-blue-100
                  "
                >
                  <ArrowDown size={16} />
                </div>

                <span
                  className="
                    text-xs
                    font-bold
                    text-blue-100/70
                  "
                >
                  Browse frequently asked questions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}