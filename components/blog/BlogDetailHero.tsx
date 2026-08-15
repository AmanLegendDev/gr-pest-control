import {
  CalendarDays,
  Clock3,
  Tag,
  UserRound,
} from "lucide-react";

interface BlogDetailHeroProps {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt?: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
}

export default function BlogDetailHero({
  title,
  excerpt,
  category,
  tags,
  author,
  publishedAt,
  featuredImage,
}: BlogDetailHeroProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(publishedAt))
    : null;

  return (
    <section
      className="
        overflow-hidden
        bg-[#F8FAFC]
        px-4
        pb-12
        pt-10
        sm:px-6
        sm:pb-16
        sm:pt-14
        lg:px-8
        lg:pb-20
        lg:pt-16
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =========================
            ARTICLE HEADER
        ========================== */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Category */}
          {category && (
            <div className="flex justify-center">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-blue-100
                  bg-blue-50
                  px-3.5
                  py-2
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.14em]
                  text-[#0878E8]
                "
              >
                <Tag size={12} />
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className="
              mt-5
              text-3xl
              font-extrabold
              leading-[1.08]
              tracking-[-0.05em]
              text-[#062B63]
              sm:text-4xl
              lg:text-5xl
              xl:text-[3.6rem]
            "
          >
            {title}
          </h1>

          {/* Excerpt */}
          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-base
              leading-7
              text-slate-500
              sm:text-lg
              sm:leading-8
            "
          >
            {excerpt}
          </p>

          {/* =========================
              META
          ========================== */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-3
              text-xs
            "
          >
            {/* Author */}
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#062B63]
                  text-white
                "
              >
                <UserRound size={14} />
              </span>

              <div className="text-left">
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Written by
                </p>

                <p
                  className="
                    mt-0.5
                    font-bold
                    text-[#062B63]
                  "
                >
                  {author}
                </p>
              </div>
            </div>

            {/* Date */}
            {formattedDate && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-slate-500
                "
              >
                <CalendarDays
                  size={15}
                  className="text-[#0878E8]"
                />

                <time
                  dateTime={publishedAt}
                  className="font-semibold"
                >
                  {formattedDate}
                </time>
              </div>
            )}

            {/* Reading indicator */}
            <div
              className="
                flex
                items-center
                gap-2
                text-slate-500
              "
            >
              <Clock3
                size={15}
                className="text-slate-400"
              />

              <span className="font-semibold">
                Practical guide
              </span>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                justify-center
                gap-2
              "
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    text-slate-500
                  "
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* =========================
            FEATURED IMAGE
        ========================== */}

        <div
          className="
            mx-auto
            mt-10
            max-w-6xl
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-white
            shadow-[0_20px_65px_rgba(15,23,42,0.08)]
            sm:mt-12
            sm:rounded-[34px]
          "
        >
          <div
            className="
              aspect-[16/9]
              w-full
              bg-[#EEF6FF]
            "
          >
            {featuredImage?.url ? (
              <img
                src={featuredImage.url}
                alt={
                  featuredImage.alt ||
                  title
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
                  w-full
                  items-center
                  justify-center
                  bg-[linear-gradient(135deg,#E7F2FF,#F8FAFC)]
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
                  <Tag
                    size={32}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}