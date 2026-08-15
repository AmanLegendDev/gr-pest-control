import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

interface ServiceAreaDetailHeroProps {
  name: string;
  shortDescription: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
}

export default function ServiceAreaDetailHero({
  name,
  shortDescription,
  description,
  image,
}: ServiceAreaDetailHeroProps) {
  return (
    <section
      className="
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
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-10
          lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-16
        "
      >
        {/* =========================
            CONTENT
        ========================== */}

        <div className="max-w-2xl">
          {/* Location badge */}
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
              shadow-sm
            "
          >
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-blue-50
                text-[#0878E8]
              "
            >
              <MapPin size={12} />
            </span>

            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              Pest Control in {name}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-5
              text-3xl
              font-extrabold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#062B63]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Professional pest control
            <span className="text-[#0878E8]">
              {" "}in {name}
            </span>
          </h1>

          {/* Short description */}
          <p
            className="
              mt-5
              max-w-xl
              text-base
              font-medium
              leading-7
              text-slate-600
              sm:text-lg
            "
          >
            {shortDescription}
          </p>

          {/* Full description */}
          <p
            className="
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              sm:leading-7
            "
          >
            {description}
          </p>

          {/* Trust points */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-x-6
              gap-y-3
            "
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-emerald-500"
              />

              <span
                className="
                  text-xs
                  font-bold
                  text-slate-600
                "
              >
                Local service coverage
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck
                size={16}
                className="text-[#0878E8]"
              />

              <span
                className="
                  text-xs
                  font-bold
                  text-slate-600
                "
              >
                Professional pest control
              </span>
            </div>
          </div>

          {/* CTA */}
          <div
            className="
              mt-8
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
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#066BCF]
                hover:shadow-[0_16px_35px_rgba(8,120,232,0.22)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0878E8]
                focus-visible:ring-offset-2
              "
            >
              Get a Free Quote

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />
            </Link>

            <Link
              href="/service-areas"
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
              View All Areas
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
            shadow-[0_20px_60px_rgba(15,23,42,0.09)]
          "
        >
          <div
            className="
              aspect-[4/3]
              w-full
              bg-[#EEF6FF]
            "
          >
            {image?.url ? (
              <img
                src={image.url}
                alt={image.alt || name}
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
                  w-full
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
                    rounded-[24px]
                    bg-white
                    text-[#0878E8]
                    shadow-sm
                  "
                >
                  <MapPin
                    size={36}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Image overlay */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-36
              bg-gradient-to-t
              from-black/50
              to-transparent
            "
          />

          {/* Area label */}
          <div
            className="
              absolute
              bottom-5
              left-5
              right-5
              flex
              items-end
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.14em]
                  text-white/75
                "
              >
                Service Area
              </p>

              <h2
                className="
                  mt-1
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-white
                "
              >
                {name}
              </h2>
            </div>

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-white/15
                text-white
                backdrop-blur-sm
              "
            >
              <MapPin size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}