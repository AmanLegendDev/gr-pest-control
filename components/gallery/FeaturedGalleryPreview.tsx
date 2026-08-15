"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import FeaturedGallery from "@/components/gallery/FeaturedGallery";
import GalleryViewer from "@/components/gallery/GalleryViewer";

interface FeaturedGalleryItem {
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

interface FeaturedGalleryPreviewProps {
  items: FeaturedGalleryItem[];
}

export default function FeaturedGalleryPreview({
  items,
}: FeaturedGalleryPreviewProps) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const handleOpen = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= items.length
      ) {
        return;
      }

      setActiveIndex(index);
    },
    [items.length],
  );

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

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

  const handleNext = useCallback(() => {
    setActiveIndex((current) => {
      if (
        current === null ||
        current >= items.length - 1
      ) {
        return current;
      }

      return current + 1;
    });
  }, [items.length]);

  /*
   * If the featured collection changes
   * while the viewer is open, prevent
   * an invalid index.
   */
  useEffect(() => {
    if (
      activeIndex !== null &&
      activeIndex >= items.length
    ) {
      setActiveIndex(null);
    }
  }, [activeIndex, items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <FeaturedGallery
        items={items}
        onOpen={handleOpen}
      />

      <GalleryViewer
        items={items}
        activeIndex={activeIndex}
        onClose={handleClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}