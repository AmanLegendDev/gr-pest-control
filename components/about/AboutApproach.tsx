import {
  ArrowRight,
  ClipboardCheck,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Assess",
    description:
      "Understand the property, the visible signs and the nature of the pest concern before recommending a service.",
  },
  {
    number: "02",
    icon: Search,
    title: "Identify",
    description:
      "Look beyond the surface and understand what type of pest issue is affecting the property.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Treat",
    description:
      "Choose an appropriate treatment approach based on the property, problem and service requirement.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Protect",
    description:
      "Help reduce the chances of the problem returning through practical advice and appropriate follow-up.",
  },
];

export default function AboutApproach() {
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
      <div className="mx-auto max-w-7xl">
        {/* =========================
            HEADER
        ========================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-1.5
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

              How we work
            </div>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                leading-[1.08]
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-4xl
              "
            >
              A simple process.
              A more considered service.
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-slate-500
            "
          >
            Good pest control is not just about
            applying a treatment. It starts with
            understanding what is happening and
            ends with helping protect the property.
          </p>
        </div>

        {/* =========================
            PROCESS
        ========================== */}

        <div
          className="
            relative
            mt-10
            grid
            gap-4
            md:grid-cols-2
            lg:grid-cols-4
            lg:gap-0
          "
        >
          {/* Desktop connecting line */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-[12.5%]
              right-[12.5%]
              top-[30px]
              hidden
              h-px
              bg-slate-200
              lg:block
            "
          />

          {STEPS.map(
            ({
              number,
              icon: Icon,
              title,
              description,
            },
            index) => (
              <div
                key={number}
                className="
                  group
                  relative
                  px-0
                  lg:px-5
                "
              >
                {/* =========================
                    NUMBER / ICON
                ========================== */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-between
                    lg:block
                  "
                >
                  <div
                    className="
                      flex
                      h-[60px]
                      w-[60px]
                      items-center
                      justify-center
                      rounded-[20px]
                      border
                      border-slate-100
                      bg-white
                      text-[#0878E8]
                      shadow-[0_8px_25px_rgba(15,23,42,0.06)]
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:border-blue-100
                      group-hover:bg-blue-50
                      group-hover:shadow-[0_14px_35px_rgba(8,120,232,0.10)]
                    "
                  >
                    <Icon size={22} />
                  </div>

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      tracking-[0.14em]
                      text-slate-300
                      lg:absolute
                      lg:right-5
                      lg:top-2
                    "
                  >
                    {number}
                  </span>
                </div>

                {/* =========================
                    CONTENT
                ========================== */}

                <div className="mt-5">
                  <h3
                    className="
                      text-lg
                      font-extrabold
                      tracking-[-0.025em]
                      text-[#062B63]
                    "
                  >
                    {title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-6
                      text-slate-400
                    "
                  >
                    {description}
                  </p>
                </div>

                {/* Mobile divider */}

                {index <
                  STEPS.length - 1 && (
                  <div
                    className="
                      mt-6
                      h-px
                      bg-slate-100
                      lg:hidden
                    "
                  />
                )}
              </div>
            ),
          )}
        </div>

        {/* =========================
            BOTTOM NOTE
        ========================== */}

        <div
          className="
            mt-10
            flex
            flex-col
            gap-4
            rounded-[24px]
            border
            border-slate-100
            bg-[#F8FAFC]
            px-5
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white
                text-[#0878E8]
                shadow-sm
              "
            >
              <ShieldCheck size={17} />
            </div>

            <p
              className="
                text-xs
                font-bold
                leading-5
                text-slate-500
              "
            >
              Every property and pest situation
              is different. The right approach
              starts with the right understanding.
            </p>
          </div>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.12em]
              text-[#0878E8]
            "
          >
            Our approach

            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </section>
  );
}