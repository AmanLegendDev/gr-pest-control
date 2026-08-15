import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface AboutStoryProps {
  businessName: string;
  shortDescription: string;
  city: string;
  state: string;
}

export default function AboutStory({
  businessName,
  shortDescription,
  city,
  state,
}: AboutStoryProps) {
  const location = [city, state]
    .filter(Boolean)
    .join(", ");

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
          items-start
          gap-12
          lg:grid-cols-[0.8fr_1.2fr]
          lg:gap-20
        "
      >
        {/* =========================
            LEFT INTRO
        ========================== */}

        <div className="lg:sticky lg:top-24">
          <div
            className="
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.16em]
              text-[#0878E8]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#0878E8]
              "
            />

            Who we are
          </div>

          <h2
            className="
              mt-3
              max-w-md
              text-3xl
              font-extrabold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#062B63]
              sm:text-4xl
            "
          >
            Pest control should feel
            simple, not stressful.
          </h2>

          <p
            className="
              mt-5
              max-w-md
              text-sm
              leading-7
              text-slate-500
            "
          >
            At {businessName}, the goal is
            straightforward: understand the
            problem, recommend the right
            approach and make the process easy
            for the property owner.
          </p>

          {location && (
            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-100
                bg-[#F8FAFC]
                px-3.5
                py-2.5
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  text-slate-500
                "
              >
                Serving {location}
              </span>
            </div>
          )}
        </div>

        {/* =========================
            STORY
        ========================== */}

        <div>
          <div
            className="
              rounded-[30px]
              border
              border-slate-100
              bg-[#F8FAFC]
              p-6
              sm:p-8
              lg:p-10
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-5
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <ShieldCheck size={22} />
              </div>

              <span
                className="
                  rounded-full
                  bg-white
                  px-3
                  py-1.5
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                  shadow-sm
                "
              >
                Our philosophy
              </span>
            </div>

            <h3
              className="
                mt-7
                text-2xl
                font-extrabold
                leading-tight
                tracking-[-0.035em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              We focus on the problem
              behind the pest.
            </h3>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-slate-500
                sm:text-base
                sm:leading-8
              "
            >
              {shortDescription ||
                `${businessName} is built around a practical approach to pest control — understanding the property, identifying the issue and choosing an appropriate service rather than treating every situation the same way.`}
            </p>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-slate-500
                sm:text-base
                sm:leading-8
              "
            >
              Whether the requirement is for a
              home, workplace or commercial
              property, the experience should be
              clear from the first conversation
              through the service itself.
            </p>

            {/* =========================
                PRINCIPLES
            ========================== */}

            <div
              className="
                mt-8
                grid
                gap-3
                sm:grid-cols-2
              "
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-white
                  bg-white
                  p-4
                  shadow-[0_8px_25px_rgba(15,23,42,0.035)]
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
                    size={16}
                    className="text-emerald-500"
                  />

                  <span
                    className="
                      text-xs
                      font-extrabold
                      text-[#062B63]
                    "
                  >
                    Clear recommendations
                  </span>
                </div>

                <p
                  className="
                    mt-2
                    text-[11px]
                    leading-5
                    text-slate-400
                  "
                >
                  Understand what needs to be
                  done and why.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white
                  bg-white
                  p-4
                  shadow-[0_8px_25px_rgba(15,23,42,0.035)]
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
                    size={16}
                    className="text-emerald-500"
                  />

                  <span
                    className="
                      text-xs
                      font-extrabold
                      text-[#062B63]
                    "
                  >
                    Property-first thinking
                  </span>
                </div>

                <p
                  className="
                    mt-2
                    text-[11px]
                    leading-5
                    text-slate-400
                  "
                >
                  Services are considered around
                  the property and situation.
                </p>
              </div>
            </div>

            {/* =========================
                CLOSING LINE
            ========================== */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-3
                border-t
                border-slate-200/70
                pt-6
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#062B63]
                  text-white
                "
              >
                <ArrowRight size={15} />
              </span>

              <p
                className="
                  text-xs
                  font-bold
                  leading-5
                  text-slate-500
                "
              >
                Less confusion. Better decisions.
                A more dependable service experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}