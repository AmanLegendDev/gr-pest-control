import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";

interface BlogCardPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  featured: boolean;
  publishedAt?: string;
}

interface BlogCardProps {
  post: BlogCardPost;
}

export default function BlogCard({
  post,
}: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : null;

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200
        bg-white
        shadow-[0_10px_35px_rgba(15,23,42,0.045)]
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
        href={`/blog/${post.slug}`}
        className="
          relative
          block
          overflow-hidden
          bg-[#EEF6FF]
        "
      >
        <div className="aspect-[16/10] w-full">
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
                group-hover:scale-[1.035]
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
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  text-[#0878E8]
                  shadow-sm
                "
              >
                <span className="text-xl">
                  📖
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Image overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-gradient-to-t
            from-black/35
            to-transparent
            opacity-70
          "
        />

        {/* Category */}
        {post.category && (
          <span
            className="
              absolute
              left-4
              top-4
              rounded-full
              border
              border-white/70
              bg-white/95
              px-3
              py-1.5
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.12em]
              text-[#0878E8]
              shadow-sm
              backdrop-blur-sm
            "
          >
            {post.category}
          </span>
        )}

        {/* Featured badge */}
        {post.featured && (
          <span
            className="
              absolute
              bottom-4
              right-4
              rounded-full
              bg-[#062B63]/90
              px-3
              py-1.5
              text-[9px]
              font-extrabold
              uppercase
              tracking-wide
              text-white
              backdrop-blur-sm
            "
          >
            Featured
          </span>
        )}
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
        {/* Meta */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-4
            gap-y-2
          "
        >
          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >
            <UserRound
              size={13}
              className="text-[#0878E8]"
            />

            <span
              className="
                max-w-[130px]
                truncate
                text-[10px]
                font-bold
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
                gap-1.5
              "
            >
              <CalendarDays
                size={13}
                className="text-slate-400"
              />

              <time
                dateTime={post.publishedAt}
                className="
                  text-[10px]
                  font-semibold
                  text-slate-400
                "
              >
                {formattedDate}
              </time>
            </div>
          )}

          <div
            className="
              ml-auto
              flex
              items-center
              gap-1.5
            "
          >
            <Clock3
              size={13}
              className="text-slate-300"
            />

            <span
              className="
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              Quick read
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4"
        >
          <h3
            className="
              line-clamp-2
              text-lg
              font-extrabold
              leading-[1.25]
              tracking-[-0.025em]
              text-[#062B63]
              transition-colors
              duration-200
              group-hover:text-[#0878E8]
              sm:text-xl
            "
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p
          className="
            mt-3
            line-clamp-3
            text-sm
            leading-6
            text-slate-500
          "
        >
          {post.excerpt}
        </p>

        {/* Bottom CTA */}
        <div
          className="
            mt-auto
            pt-5
          "
        >
          <Link
            href={`/blog/${post.slug}`}
            className="
              group/read
              flex
              items-center
              justify-between
              border-t
              border-slate-100
              pt-4
              text-xs
              font-extrabold
              text-[#062B63]
              transition-colors
              hover:text-[#0878E8]
            "
          >
            <span>Read article</span>

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-slate-50
                text-slate-500
                transition-all
                duration-200
                group-hover/read:bg-blue-50
                group-hover/read:text-[#0878E8]
              "
            >
              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover/read:translate-x-0.5
                  group-hover/read:-translate-y-0.5
                "
              />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}