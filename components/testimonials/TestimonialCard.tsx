import {
  MapPin,
  Quote,
  Star,
} from "lucide-react";

interface TestimonialCardItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  location: string;
  image?: {
    url: string;
    alt: string;
  } | null;
  featured: boolean;
}

interface TestimonialCardProps {
  item: TestimonialCardItem;
  featured?: boolean;
}

export default function TestimonialCard({
  item,
  featured = false,
}: TestimonialCardProps) {
  const safeRating = Math.min(
    5,
    Math.max(
      0,
      Math.round(
        Number.isFinite(item.rating)
          ? item.rating
          : 0,
      ),
    ),
  );

  const initials =
    item.name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (part) =>
          part.charAt(0).toUpperCase(),
      )
      .join("") || "?";

  return (
    <article
      className={`
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[26px]
        border
        border-slate-100
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-100
        hover:shadow-[0_20px_55px_rgba(15,23,42,0.075)]
        ${
          featured
            ? "shadow-[0_12px_40px_rgba(15,23,42,0.055)]"
            : "shadow-[0_8px_28px_rgba(15,23,42,0.035)]"
        }
      `}
    >
      {/* =========================
          TOP ACCENT
      ========================== */}

      {featured && (
        <div
          aria-hidden="true"
          className="
            h-1
            w-full
            bg-gradient-to-r
            from-[#062B63]
            via-[#0878E8]
            to-[#4DA3FF]
          "
        />
      )}

      <div
        className="
          flex
          flex-1
          flex-col
          p-5
          sm:p-6
        "
      >
        {/* =========================
            HEADER
        ========================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}

            {item.image?.url ? (
              <div
                className="
                  h-11
                  w-11
                  shrink-0
                  overflow-hidden
                  rounded-full
                  border
                  border-slate-100
                  bg-slate-50
                "
              >
                <img
                  src={item.image.url}
                  alt={
                    item.image.alt ||
                    item.name
                  }
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#062B63]
                  text-xs
                  font-extrabold
                  text-white
                "
              >
                {initials}
              </div>
            )}

            {/* Identity */}

            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-sm
                  font-extrabold
                  text-[#062B63]
                "
              >
                {item.name}
              </h3>

              {(item.role ||
                item.company) && (
                <p
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    font-semibold
                    text-slate-400
                  "
                >
                  {[item.role, item.company]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          </div>

          {/* Quote */}

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
              transition-all
              duration-300
              group-hover:bg-[#0878E8]
              group-hover:text-white
            "
          >
            <Quote size={16} />
          </div>
        </div>

        {/* =========================
            RATING
        ========================== */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              items-center
              gap-0.5
            "
            aria-label={`${safeRating} out of 5 stars`}
          >
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <Star
                key={index}
                size={13}
                className={
                  index < safeRating
                    ? "text-amber-400"
                    : "text-slate-200"
                }
                fill={
                  index < safeRating
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <span
            className="
              text-[10px]
              font-extrabold
              text-slate-400
            "
          >
            {safeRating}.0
          </span>
        </div>

        {/* =========================
            REVIEW
        ========================== */}

        <blockquote
          className="
            mt-4
            flex-1
          "
        >
          <p
            className={`
              text-sm
              leading-7
              text-slate-600
              ${
                featured
                  ? "sm:text-[15px]"
                  : ""
              }
            `}
          >
            “{item.content}”
          </p>
        </blockquote>

        {/* =========================
            FOOTER
        ========================== */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t
            border-slate-100
            pt-4
          "
        >
          {item.location ? (
            <div
              className="
                flex
                min-w-0
                items-center
                gap-1.5
                text-[10px]
                font-bold
                text-slate-400
              "
            >
              <MapPin
                size={12}
                className="shrink-0 text-[#0878E8]"
              />

              <span className="truncate">
                {item.location}
              </span>
            </div>
          ) : (
            <span
              className="
                text-[10px]
                font-bold
                text-slate-300
              "
            >
              Customer review
            </span>
          )}

          {featured && (
            <span
              className="
                inline-flex
                shrink-0
                items-center
                rounded-full
                bg-emerald-50
                px-2.5
                py-1.5
                text-[9px]
                font-extrabold
                text-emerald-600
              "
            >
              Featured
            </span>
          )}
        </div>
      </div>
    </article>
  );
}