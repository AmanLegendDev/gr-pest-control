import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface GalleryDetailContentProps {
  title: string;
  description: string;
  category: string;
}

const CATEGORY_LABELS: Record<
  string,
  string
> = {
  home: "Home",
  workplace: "Workplace",
  commercial: "Commercial",
  residential: "Residential",
  treatment: "Treatment",
  team: "Our Team",
  other: "Other",
};

export default function GalleryDetailContent({
  title,
  description,
  category,
}: GalleryDetailContentProps) {
  const categoryLabel =
    CATEGORY_LABELS[
      category.toLowerCase()
    ] ?? category;

  return (
    <section
      className="
        bg-white
        px-4
        py-14
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
          max-w-6xl
          items-start
          gap-10
          lg:grid-cols-[minmax(0,1fr)_320px]
          lg:gap-16
        "
      >
        {/* =========================
            MAIN CONTENT
        ========================== */}

        <div className="max-w-3xl">
          <div
            className="
              flex
              items-center
              gap-2
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

            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              {categoryLabel}
            </span>
          </div>

          <h2
            className="
              mt-3
              text-2xl
              font-extrabold
              leading-tight
              tracking-[-0.04em]
              text-[#062B63]
              sm:text-3xl
            "
          >
            Behind the work
          </h2>

          <div
            className="
              mt-6
              h-px
              w-full
              bg-slate-100
            "
          />

          <div className="mt-7">
            <p
              className="
                whitespace-pre-line
                text-base
                leading-8
                text-slate-600
                sm:text-[17px]
                sm:leading-8
              "
            >
              {description}
            </p>
          </div>

          {/* =========================
              VALUE POINTS
          ========================== */}

          <div
            className="
              mt-9
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            <div
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-slate-100
                bg-[#F8FAFC]
                p-4
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <CheckCircle2 size={15} />
              </span>

              <div>
                <p
                  className="
                    text-xs
                    font-extrabold
                    text-[#062B63]
                  "
                >
                  Professional approach
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    leading-5
                    text-slate-400
                  "
                >
                  Planned around the property
                  and the pest problem.
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-slate-100
                bg-[#F8FAFC]
                p-4
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <ShieldCheck size={15} />
              </span>

              <div>
                <p
                  className="
                    text-xs
                    font-extrabold
                    text-[#062B63]
                  "
                >
                  Service focused
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    leading-5
                    text-slate-400
                  "
                >
                  Focused on practical pest
                  control for your property.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            ACTION SIDEBAR
        ========================== */}

        <aside
          className="
            lg:sticky
            lg:top-24
          "
        >
          <div
            className="
              overflow-hidden
              rounded-[26px]
              border
              border-slate-100
              bg-[#F8FAFC]
              shadow-[0_15px_45px_rgba(15,23,42,0.05)]
            "
          >
            <div className="p-6">
              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-[#0878E8]
                "
              >
                Need similar help?
              </p>

              <h3
                className="
                  mt-2
                  text-xl
                  font-extrabold
                  leading-tight
                  tracking-[-0.03em]
                  text-[#062B63]
                "
              >
                Let us take a look at your property.
              </h3>

              <p
                className="
                  mt-3
                  text-xs
                  leading-6
                  text-slate-500
                "
              >
                Tell us about the pest issue and
                your preferred time. We'll help you
                figure out the next step.
              </p>

              <Link
                href="/quote"
                className="
                  group
                  mt-6
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#0878E8]
                  px-5
                  text-sm
                  font-extrabold
                  text-white
                  shadow-[0_12px_28px_rgba(8,120,232,0.18)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#066BCF]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                "
              >
                Request a Free Quote

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <Link
                href="/services"
                className="
                  mt-3
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                  py-2
                  text-xs
                  font-bold
                  text-slate-400
                  transition-colors
                  hover:text-[#0878E8]
                "
              >
                View all services
                <ExternalLink size={12} />
              </Link>
            </div>

            {/* Bottom trust strip */}
            <div
              className="
                border-t
                border-slate-100
                bg-white
                px-6
                py-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    text-slate-400
                  "
                >
                  Professional pest control service
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}