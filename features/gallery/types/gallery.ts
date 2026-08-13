import type { IGalleryItem } from "@/models/GalleryItem";

export const GALLERY_CATEGORIES = [
  "home",
  "workplace",
  "commercial",
  "residential",
  "treatment",
  "team",
  "other",
] as const;

export type GalleryCategory =
  (typeof GALLERY_CATEGORIES)[number];

export interface GalleryImageViewModel {
  url: string;
  publicId: string;
  alt: string;
}

export interface GalleryAdminViewModel {
  id: string;
  title: string;
  slug: string;
  description: string;

  category: GalleryCategory;

  image: GalleryImageViewModel;

  seoTitle: string;
  seoDescription: string;

  featured: boolean;
  active: boolean;

  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}

export interface GalleryPublicViewModel {
  id: string;
  title: string;
  slug: string;
  description: string;

  category: GalleryCategory;

  image: {
    url: string;
    alt: string;
  };

  featured: boolean;
}

export type GalleryItemDocument = IGalleryItem;