"use client";

import { ArrowUpRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { BlogPublicViewModel } from "@/features/blogs/types/blog";

interface BlogCardProps {
  blog: BlogPublicViewModel;
  delay?: number;
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogCard({
  blog,
  delay = 0,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200/80
        bg-white
        shadow-[0_16px_45px_rgba(15,23,42,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]
      "
    >
      {/* Image */}

      <Link
        href={`/blog/${blog.slug}`}
        aria-label={`Read ${blog.title}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        {blog.featuredImage?.url ? (
          <Image
            src={blog.featuredImage.url}
            alt={
              blog.featuredImage.alt ||
              blog.title
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.045]
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50">
            <span className="text-sm font-bold text-[#0878E8]">
              GR Pest Control
            </span>
          </div>
        )}

        {/* Image overlay */}

        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#062B63]/30
            via-transparent
            to-transparent
            opacity-70
          "
        />

        {/* Category */}

        {blog.category && (
          <span
            className="
              absolute
              left-4
              top-4
              rounded-full
              border
              border-white/30
              bg-white/95
              px-3
              py-1.5
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.14em]
              text-[#062B63]
              shadow-lg
              backdrop-blur-md
            "
          >
            {blog.category}
          </span>
        )}

        {/* Featured badge */}

        {blog.featured && (
          <span
            className="
              absolute
              right-4
              top-4
              rounded-full
              bg-[#0878E8]
              px-3
              py-1.5
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.12em]
              text-white
              shadow-lg
            "
          >
            Featured
          </span>
        )}
      </Link>

      {/* Content */}

      <div className="p-5 sm:p-6">
        {/* Meta */}

        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
          {blog.publishedAt && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} />

              {formatDate(
                blog.publishedAt,
              )}
            </span>
          )}

          {blog.author && (
            <>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-slate-300"
              />

              <span className="truncate">
                {blog.author}
              </span>
            </>
          )}
        </div>

        {/* Title */}

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-3 block"
        >
          <h3
            className="
              line-clamp-2
              text-xl
              font-extrabold
              leading-[1.12]
              tracking-[-0.03em]
              text-[#062B63]
              transition-colors
              duration-300
              group-hover:text-[#0878E8]
            "
          >
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {blog.excerpt}
        </p>

        {/* CTA */}

        <Link
          href={`/blog/${blog.slug}`}
          className="
            group/link
            mt-5
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-[#062B63]
            transition-colors
            duration-300
            hover:text-[#0878E8]
          "
        >
          Read article

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-blue-50
              text-[#0878E8]
              transition-all
              duration-300
              group-hover/link:bg-[#0878E8]
              group-hover/link:text-white
            "
          >
            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover/link:-translate-y-0.5
                group-hover/link:translate-x-0.5
              "
            />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}