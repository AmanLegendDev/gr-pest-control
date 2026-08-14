"use client";

import {
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import BlogCard from "./BlogCard";

import type { BlogPublicViewModel } from "@/features/blogs/types/blog";

interface BlogPreviewProps {
  blogs: BlogPublicViewModel[];
}

export default function BlogPreview({
  blogs,
}: BlogPreviewProps) {
  const items = blogs
    .filter(
      (blog) =>
        blog.title &&
        blog.slug &&
        blog.excerpt,
    )
    .slice(0, 3);

  if (!items.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-24 lg:py-28">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-64
          top-10
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-50/70
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-64
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-teal-50/50
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            flex-col
            gap-7
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}

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
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0878E8]
                shadow-sm
                sm:text-[11px]
              "
            >
              <BookOpen size={14} />

              Pest Control Insights
            </div>

            {/* Heading */}

            <h2
              className="
                mt-5
                max-w-3xl
                text-4xl
                font-extrabold
                leading-[1.02]
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-5xl
                lg:text-[58px]
              "
            >
              Practical advice for
              <span className="text-[#0878E8]">
                {" "}
                Sydney properties.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-slate-600
                sm:text-lg
                sm:leading-8
              "
            >
              Useful pest control guides,
              prevention tips and practical
              advice to help homeowners and
              businesses protect their
              properties.
            </p>
          </div>

          {/* Desktop CTA */}

          <Link
            href="/blog"
            className="
              group
              hidden
              shrink-0
              items-center
              gap-3
              text-sm
              font-bold
              text-[#062B63]
              transition-colors
              duration-300
              hover:text-[#0878E8]
              sm:inline-flex
            "
          >
            View all insights

            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                group-hover:border-blue-200
                group-hover:bg-blue-50
              "
            >
              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </Link>
        </motion.div>

        {/* =====================================================
            BLOG GRID
        ====================================================== */}

        <div
          className="
            mt-12
            grid
            gap-5
            sm:mt-14
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {items.map(
            (blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                delay={index * 0.08}
              />
            ),
          )}
        </div>

        {/* =====================================================
            MOBILE CTA
        ====================================================== */}

        <Link
          href="/blog"
          className="
            group
            mt-7
            inline-flex
            min-h-[48px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[#062B63]
            px-5
            text-sm
            font-bold
            text-white
            transition-all
            duration-300
            hover:bg-[#0878E8]
            sm:hidden
          "
        >
          Explore all insights

          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </section>
  );
}