"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryViewer from "@/components/gallery/GalleryViewer";

interface GalleryPreviewItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: {
    url: string;
    alt: string;
  };
  featured: boolean;
}

interface GalleryPreviewProps {
  items: GalleryPreviewItem[];
}

export default function GalleryPreview({
  items,
}: GalleryPreviewProps) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  /*
   * Keep a stable list for the viewer.
   * This also prevents accidental mutation
   * of the server-provided array.
   */
  const viewerItems = useMemo(
    () => [...items],
    [items],
  );

  /*
   * =========================
   * OPEN
   * =========================
   */

  const handleOpen = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= viewerItems.length
      ) {
        return;
      }

      setActiveIndex(index);
    },
    [viewerItems.length],
  );

  /*
   * =========================
   * CLOSE
   * =========================
   */

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  /*
   * =========================
   * PREVIOUS
   * =========================
   */

  const handlePrevious =
    useCallback(() => {
      setActiveIndex((current) => {
        if (
          current === null ||
          current <= 0
        ) {
          return current;
        }

        return current - 1;
      });
    }, []);

  /*
   * =========================
   * NEXT
   * =========================
   */

  const handleNext = useCallback(() => {
    setActiveIndex((current) => {
      if (
        current === null ||
        current >=
          viewerItems.length - 1
      ) {
        return current;
      }

      return current + 1;
    });
  }, [viewerItems.length]);

  /*
   * =========================
   * CLOSE ON ROUTE / DATA
   * CHANGE
   * =========================
   */

  useEffect(() => {
    if (
      activeIndex !== null &&
      activeIndex >= viewerItems.length
    ) {
      setActiveIndex(null);
    }
  }, [
    activeIndex,
    viewerItems.length,
  ]);

  /*
   * =========================
   * EMPTY STATE
   * =========================
   */

  if (viewerItems.length === 0) {
    return (
      <div
        className="
          rounded-[28px]
          border
          border-dashed
          border-slate-200
          bg-white
          px-6
          py-20
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[22px]
            bg-blue-50
            text-[#0878E8]
          "
        >
          <span className="text-2xl">
            📷
          </span>
        </div>

        <h3
          className="
            mt-5
            text-lg
            font-extrabold
            text-[#062B63]
          "
        >
          No gallery items found
        </h3>

        <p
          className="
            mx-auto
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          There are no published gallery
          items in this selection yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =========================
          GALLERY GRID
      ========================== */}

      <div
        className="
          columns-1
          gap-5
          sm:columns-2
          lg:columns-3
        "
      >
        {viewerItems.map(
          (item, index) => (
            <div
              key={item.id}
              className="
                mb-5
                break-inside-avoid
              "
            >
              <GalleryCard
                item={item}
                index={index}
                onOpen={handleOpen}
              />
            </div>
          ),
        )}
      </div>

      {/* =========================
          FULLSCREEN VIEWER
      ========================== */}

      <GalleryViewer
        items={viewerItems}
        activeIndex={activeIndex}
        onClose={handleClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}