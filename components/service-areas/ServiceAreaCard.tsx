import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

interface ServiceAreaCardProps {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image?: {
    url: string;
    alt: string;
  };
  highlights: string[];
}

export default function ServiceAreaCard({
  name,
  slug,
  shortDescription,
  image,
  highlights,
}: ServiceAreaCardProps) {
  const visibleHighlights =
    highlights.slice(0, 3);

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-100
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]
      "
    >
      {/* =========================
          IMAGE
      ========================== */}

      <Link
        href={`/service-areas/${slug}`}
        className="
          relative
          block
          aspect-[16/10]
          overflow-hidden
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
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.04]
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
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-[#0878E8]
                shadow-sm
              "
            >
              <MapPin
                size={29}
                strokeWidth={1.6}
              />
            </div>
          </div>
        )}

        {/* Bottom image gradient */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            bottom-0
            h-28
            bg-gradient-to-t
            from-black/45
            to-transparent
          "
        />

        {/* Location badge */}
        <div
          className="
            absolute
            left-4
            top-4
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-white/70
            bg-white/95
            px-3
            py-1.5
            shadow-sm
            backdrop-blur-sm
          "
        >
          <MapPin
            size={12}
            className="text-[#0878E8]"
          />

          <span
            className="
              text-[10px]
              font-extrabold
              uppercase
              tracking-wide
              text-[#062B63]
            "
          >
            Service Area
          </span>
        </div>

        {/* Area name */}
        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
          "
        >
          <h3
            className="
              text-xl
              font-extrabold
              tracking-[-0.025em]
              text-white
              drop-shadow-sm
            "
          >
            {name}
          </h3>
        </div>
      </Link>

      {/* =========================
          CONTENT
      ========================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-5
          sm:p-6
        "
      >
        <p
          className="
            text-sm
            leading-6
            text-slate-500
          "
        >
          {shortDescription}
        </p>

        {/* Highlights */}
        {visibleHighlights.length > 0 && (
          <div
            className="
              mt-5
              space-y-2.5
            "
          >
            {visibleHighlights.map(
              (highlight) => (
                <div
                  key={highlight}
                  className="
                    flex
                    items-start
                    gap-2.5
                  "
                >
                  <span
                    className="
                      mt-0.5
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-50
                      text-emerald-600
                    "
                  >
                    <CheckCircle2
                      size={12}
                      strokeWidth={2.5}
                    />
                  </span>

                  <span
                    className="
                      text-xs
                      font-semibold
                      leading-5
                      text-slate-600
                    "
                  >
                    {highlight}
                  </span>
                </div>
              ),
            )}
          </div>
        )}

        {/* =========================
            FOOTER
        ========================== */}

        <div
          className="
            mt-auto
            pt-6
          "
        >
          <div
            className="
              border-t
              border-slate-100
              pt-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              {/* Trust */}
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[10px]
                  font-bold
                  text-slate-400
                "
              >
                <ShieldCheck
                  size={14}
                  className="text-[#0878E8]"
                />

                Local coverage
              </div>

              {/* CTA */}
              <Link
                href={`/service-areas/${slug}`}
                className="
                  group/link
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-blue-50
                  px-3.5
                  py-2
                  text-xs
                  font-extrabold
                  text-[#0878E8]
                  transition-all
                  duration-200
                  hover:bg-[#0878E8]
                  hover:text-white
                "
              >
                Explore Area

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-200
                    group-hover/link:translate-x-0.5
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}