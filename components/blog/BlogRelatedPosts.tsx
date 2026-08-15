import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  BookOpen,
} from "lucide-react";

interface RelatedBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  publishedAt?: string;
}

interface BlogRelatedPostsProps {
  posts: RelatedBlogPost[];
  excludeSlug?: string;
}

export default function BlogRelatedPosts({
  posts,
  excludeSlug,
}: BlogRelatedPostsProps) {
  const relatedPosts = posts
    .filter(
      (post) =>
        post.slug !== excludeSlug,
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section
      className="
        border-t
        border-slate-100
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
            SECTION HEADER
        ========================== */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-end
            sm:justify-between
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
              Keep Reading
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
              You may also find helpful
            </h2>
          </div>

          <Link
            href="/blog"
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-extrabold
              text-[#0878E8]
              transition
              hover:text-[#062B63]
            "
          >
            View all articles
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* =========================
            RELATED GRID
        ========================== */}

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {relatedPosts.map((post) => {
            const formattedDate =
              post.publishedAt
                ? new Intl.DateTimeFormat(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  ).format(
                    new Date(
                      post.publishedAt,
                    ),
                  )
                : null;

            return (
              <article
                key={post.slug}
                className="
                  group
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-slate-200
                  bg-[#F8FAFC]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-100
                  hover:bg-white
                  hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)]
                "
              >
                {/* Image */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="
                    relative
                    block
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      aspect-[16/9]
                      w-full
                      bg-[#EEF6FF]
                    "
                  >
                    {post.featuredImage
                      ?.url ? (
                      <img
                        src={
                          post.featuredImage
                            .url
                        }
                        alt={
                          post.featuredImage
                            .alt ||
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
                          <BookOpen
                            size={22}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    )}
                  </div>

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
                </Link>

                {/* Content */}
                <div className="p-5">
                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                    "
                  >
                    <CalendarDays
                      size={12}
                      className="text-slate-400"
                    />

                    <span
                      className="
                        text-[10px]
                        font-semibold
                        text-slate-400
                      "
                    >
                      {formattedDate ??
                        "Recently published"}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 block"
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
                        group-hover:text-[#0878E8]
                      "
                    >
                      {post.title}
                    </h3>
                  </Link>

                  <p
                    className="
                      mt-2.5
                      line-clamp-2
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      text-xs
                      font-extrabold
                      text-[#062B63]
                      transition
                      hover:text-[#0878E8]
                    "
                  >
                    Read article

                    <span
                      className="
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-slate-400
                        shadow-sm
                        transition
                        group-hover:text-[#0878E8]
                      "
                    >
                      <ArrowUpRight
                        size={12}
                      />
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}