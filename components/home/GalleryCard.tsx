"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { GalleryPublicViewModel } from "@/features/gallery/types/gallery";

interface GalleryCardProps {
  item: GalleryPublicViewModel;
  featured?: boolean;
  delay?: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  home: "Home",
  workplace: "Workplace",
  commercial: "Commercial",
  residential: "Residential",
  treatment: "Pest Treatment",
  team: "Our Team",
  other: "Project",
};

export default function GalleryCard({
  item,
  featured = false,
  delay = 0,
}: GalleryCardProps) {
  const category =
    CATEGORY_LABELS[item.category] ?? "Project";

  return (
    <motion.article
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group
        relative
        isolate
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200/80
        bg-slate-100
        shadow-[0_18px_50px_rgba(15,23,42,0.08)]
        ${
          featured
            ? "aspect-[16/9]"
            : "aspect-[16/10]"
        }
      `}
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <Image
        src={item.image.url}
        alt={
          item.image.alt ||
          item.title
        }
        fill
        priority={featured}
        sizes={
          featured
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            : "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 50vw"
        }
        className="
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-[1.045]
        "
      />

      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#031A3A]/90
          via-[#062B63]/20
          to-transparent
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-[#062B63]/0
          transition-colors
          duration-500
          group-hover:bg-[#062B63]/10
        "
      />

      {/* =====================================================
          TOP CONTENT
      ====================================================== */}

      <div
        className="
          absolute
          left-4
          right-4
          top-4
          z-10
          flex
          items-start
          justify-between
          gap-3
          sm:left-5
          sm:right-5
          sm:top-5
        "
      >
        {/* Category */}

        <span
          className="
            max-w-[75%]
            rounded-full
            border
            border-white/30
            bg-white/95
            px-3
            py-1.5
            text-[8px]
            font-extrabold
            uppercase
            tracking-[0.14em]
            text-[#062B63]
            shadow-lg
            backdrop-blur-md
            sm:px-3.5
            sm:py-2
            sm:text-[9px]
          "
        >
          {category}
        </span>

        {/* Hover arrow */}

        <span
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-white/15
            text-white
            opacity-0
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:opacity-100
            sm:h-10
            sm:w-10
          "
        >
          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </span>
      </div>

      {/* =====================================================
          FULL CARD LINK
      ====================================================== */}

      <Link
        href={`/gallery/${item.slug}`}
        aria-label={`View ${item.title}`}
        className="
          absolute
          inset-0
          z-[5]
          rounded-[26px]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-inset
        "
      />

      {/* =====================================================
          BOTTOM CONTENT
      ====================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-10
          ${
            featured
              ? "p-5 sm:p-7 lg:p-8"
              : "p-4 sm:p-5"
          }
        `}
      >
        {/* Title */}

        <h3
          className={`
            max-w-[92%]
            font-extrabold
            leading-[1.08]
            tracking-[-0.03em]
            text-white
            ${
              featured
                ? "text-xl sm:text-2xl lg:text-3xl"
                : "text-[15px] sm:text-lg"
            }
          `}
        >
          {item.title}
        </h3>

        {/* Description ONLY on featured */}

        {featured && (
          <p
            className="
              mt-2
              hidden
              max-w-xl
              line-clamp-2
              text-sm
              leading-6
              text-white/80
              sm:block
            "
          >
            {item.description}
          </p>
        )}

        {/* CTA */}

        <div
          className={`
            mt-3
            inline-flex
            items-center
            gap-2
            text-xs
            font-bold
            text-white
            sm:mt-4
            sm:text-sm
          `}
        >
          <span>
            View project
          </span>

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-white/15
              backdrop-blur-md
              sm:h-8
              sm:w-8
            "
          >
            <ArrowUpRight
              size={13}
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}