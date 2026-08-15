import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface ServiceDetailHeroProps {
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  heroImage?: {
    url: string;
    alt: string;
  };
  pestTypes: string[];
}

function formatCategory(
  category: string,
) {
  return category
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

export default function ServiceDetailHero({
  title,
  category,
  shortDescription,
  description,
  heroImage,
  pestTypes,
}: ServiceDetailHeroProps) {
  const visiblePests =
    pestTypes.slice(0, 4);

  return (
    <section
      className="
        overflow-hidden
        bg-[#F8FAFC]
        px-4
        py-10
        sm:px-6
        sm:py-14
        lg:px-8
        lg:py-20
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-10
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-14
        "
      >
        {/* =========================
            CONTENT
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
              px-3
              py-1.5
              shadow-sm
            "
          >
            <ShieldCheck
              size={13}
              className="text-[#0878E8]"
            />

            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.14em]
                text-[#0878E8]
              "
            >
              {formatCategory(
                category,
              )}
            </span>
          </div>

          <h1
            className="
              mt-5
              text-3xl
              font-extrabold
              tracking-[-0.045em]
              text-[#062B63]
              sm:text-4xl
              lg:text-5xl
              lg:leading-[1.08]
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-4
              text-base
              font-semibold
              leading-7
              text-slate-600
              sm:text-lg
            "
          >
            {shortDescription}
          </p>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            {description}
          </p>

          {/* Pest types */}
          {visiblePests.length > 0 && (
            <div className="mt-6">
              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                "
              >
                Commonly treated
              </p>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {visiblePests.map(
                  (pest) => (
                    <span
                      key={pest}
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-slate-600
                      "
                    >
                      <CheckCircle2
                        size={13}
                        className="text-emerald-500"
                      />

                      {pest}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div
            className="
              mt-7
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/quote"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2.5
                rounded-full
                bg-[#0878E8]
                px-6
                text-sm
                font-extrabold
                text-white
                shadow-[0_12px_30px_rgba(8,120,232,0.18)]
                transition
                hover:bg-[#066BCF]
                hover:shadow-[0_16px_35px_rgba(8,120,232,0.22)]
              "
            >
              Get a Free Quote

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </Link>

            <Link
              href="/services"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                px-6
                text-sm
                font-bold
                text-[#062B63]
                transition
                hover:bg-slate-50
              "
            >
              View all services
            </Link>
          </div>
        </div>

        {/* =========================
            IMAGE
        ========================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-slate-200
            bg-white
            p-2
            shadow-[0_20px_60px_rgba(15,23,42,0.09)]
          "
        >
          <div
            className="
              relative
              aspect-[4/3]
              overflow-hidden
              rounded-[24px]
              bg-[#EEF6FF]
            "
          >
            {heroImage?.url ? (
              <img
                src={heroImage.url}
                alt={
                  heroImage.alt || title
                }
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  bg-[linear-gradient(135deg,#EEF6FF,#F8FAFC)]
                "
              >
                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-3xl
                    bg-white
                    text-[#0878E8]
                    shadow-sm
                  "
                >
                  <ShieldCheck
                    size={38}
                    strokeWidth={1.6}
                  />
                </div>
              </div>
            )}

            <div
              className="
                absolute
                bottom-4
                left-4
                right-4
                rounded-2xl
                border
                border-white/60
                bg-white/95
                p-4
                shadow-lg
                backdrop-blur-sm
              "
            >
              <div className="flex items-center gap-3">
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
                  <ShieldCheck
                    size={18}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-extrabold
                      text-[#062B63]
                    "
                  >
                    Professional pest
                    control
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      text-slate-500
                    "
                  >
                    Tell us about your
                    property and we'll
                    guide you from there.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}