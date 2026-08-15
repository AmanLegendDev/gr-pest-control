import {
  ArrowDown,
  MessageSquareQuote,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

interface TestimonialHeroProps {
  businessName: string;
  testimonialCount: number;
  featuredCount: number;
  averageRating: number;
}

export default function TestimonialHero({
  businessName,
  testimonialCount,
  featuredCount,
  averageRating,
}: TestimonialHeroProps) {
  const safeRating = Math.min(
    5,
    Math.max(
      0,
      Number.isFinite(
        averageRating,
      )
        ? averageRating
        : 0,
    ),
  );

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
              <MessageSquareQuote
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
                Customer experiences
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
              Real people.
              <br />

              <span className="text-[#0878E8]">
                Real experiences.
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
              See what customers have shared
              about their experience with{" "}
              {businessName} and the service
              they received.
            </p>

            {/* =========================
                TRUST STATS
            ========================== */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >
              {/* Rating */}

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
                    bg-amber-50
                    text-amber-500
                  "
                >
                  <Star
                    size={15}
                    fill="currentColor"
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
                    {safeRating.toFixed(
                      1,
                    )}
                    /5
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
                    Average rating
                  </p>
                </div>
              </div>

              {/* Customers */}

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
                  <Users size={15} />
                </span>

                <div>
                  <p
                    className="
                      text-sm
                      font-extrabold
                      text-[#062B63]
                    "
                  >
                    {testimonialCount}
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
                    Customer stories
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
              {/* Decorative rings */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  -right-16
                  -top-16
                  h-44
                  w-44
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  -bottom-20
                  -left-14
                  h-44
                  w-44
                  rounded-full
                  border
                  border-white/10
                "
              />

              {/* Icon */}

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
                <Star
                  size={22}
                  fill="currentColor"
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
                Trusted experiences
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
                {featuredCount > 0
                  ? `${featuredCount} featured ${
                      featuredCount === 1
                        ? "review"
                        : "reviews"
                    }`
                  : "Customer feedback"}
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
                Honest feedback helps you
                understand what working with{" "}
                {businessName} is really like.
              </p>

              {/* Trust line */}

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
                  <ShieldCheck
                    size={16}
                  />
                </div>

                <span
                  className="
                    text-xs
                    font-bold
                    leading-5
                    text-blue-100/70
                  "
                >
                  Experiences from customers
                  we've served
                </span>
              </div>

              {/* Scroll cue */}

              <div
                className="
                  relative
                  mt-6
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-blue-100/40
                "
              >
                <ArrowDown size={12} />

                Read their stories below
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}