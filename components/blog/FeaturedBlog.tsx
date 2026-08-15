import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  UserRound,
} from "lucide-react";

interface FeaturedBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  publishedAt?: string;
}

interface FeaturedBlogProps {
  post: FeaturedBlogPost | null;
}

export default function FeaturedBlog({
  post,
}: FeaturedBlogProps) {
  if (!post) {
    return null;
  }

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : null;

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
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div
          className="
            mb-7
            flex
            items-end
            justify-between
            gap-5
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-[#0878E8]
              "
            >
              Editor's Pick
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[-0.04em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              Featured guide
            </h2>
          </div>

          <div
            className="
              hidden
              items-center
              gap-2
              text-xs
              font-bold
              text-slate-400
              sm:flex
            "
          >
            <BookOpen size={14} />
            Worth reading
          </div>
        </div>

        {/* Featured card */}
        <article
          className="
            group
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-[#F8FAFC]
            shadow-[0_16px_50px_rgba(15,23,42,0.06)]
            transition-all
            duration-300
            hover:border-blue-100
            hover:shadow-[0_24px_65px_rgba(15,23,42,0.09)]
          "
        >
          <div
            className="
              grid
              lg:grid-cols-[1.08fr_0.92fr]
            "
          >
            {/* =========================
                IMAGE
            ========================== */}

            <Link
              href={`/blog/${post.slug}`}
              className="
                relative
                block
                overflow-hidden
                bg-[#EEF6FF]
              "
            >
              <div
                className="
                  aspect-[16/10]
                  w-full
                  lg:aspect-auto
                  lg:h-full
                  lg:min-h-[430px]
                "
              >
                {post.featuredImage?.url ? (
                  <img
                    src={post.featuredImage.url}
                    alt={
                      post.featuredImage.alt ||
                      post.title
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-[1.025]
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      min-h-[280px]
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
                      <BookOpen
                        size={34}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Featured badge */}
              <div
                className="
                  absolute
                  left-5
                  top-5
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-white/70
                  bg-white/95
                  px-3
                  py-1.5
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-[#0878E8]
                  shadow-sm
                  backdrop-blur-sm
                "
              >
                <BookOpen size={12} />
                Featured
              </div>
            </Link>

            {/* =========================
                CONTENT
            ========================== */}

            <div
              className="
                flex
                flex-col
                justify-center
                p-6
                sm:p-8
                lg:p-10
                xl:p-12
              "
            >
              {/* Category */}
              {post.category && (
                <div className="flex">
                  <span
                    className="
                      rounded-full
                      bg-blue-50
                      px-3
                      py-1.5
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-[#0878E8]
                    "
                  >
                    {post.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 block"
              >
                <h3
                  className="
                    max-w-xl
                    text-2xl
                    font-extrabold
                    leading-[1.15]
                    tracking-[-0.04em]
                    text-[#062B63]
                    transition-colors
                    group-hover:text-[#0878E8]
                    sm:text-3xl
                    lg:text-[2.15rem]
                  "
                >
                  {post.title}
                </h3>
              </Link>

              {/* Excerpt */}
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
                {post.excerpt}
              </p>

              {/* Meta */}
              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-2.5
                  border-t
                  border-slate-200
                  pt-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <UserRound
                    size={14}
                    className="text-[#0878E8]"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-500
                    "
                  >
                    {post.author}
                  </span>
                </div>

                {formattedDate && (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <CalendarDays
                      size={14}
                      className="text-slate-400"
                    />

                    <time
                      dateTime={post.publishedAt}
                      className="
                        text-xs
                        font-semibold
                        text-slate-500
                      "
                    >
                      {formattedDate}
                    </time>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="mt-7">
                <Link
                  href={`/blog/${post.slug}`}
                  className="
                    group/link
                    inline-flex
                    items-center
                    gap-2.5
                    rounded-full
                    bg-[#062B63]
                    px-5
                    py-3
                    text-xs
                    font-extrabold
                    text-white
                    transition-all
                    hover:bg-[#0878E8]
                  "
                >
                  Read the guide

                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                    "
                  >
                    <ArrowUpRight
                      size={13}
                      className="
                        transition-transform
                        group-hover/link:translate-x-0.5
                        group-hover/link:-translate-y-0.5
                      "
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}