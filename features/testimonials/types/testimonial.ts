import type { ITestimonial } from "@/models/Testimonial";

export interface TestimonialImageViewModel {
  url: string;
  publicId: string;
  alt: string;
}

export interface TestimonialAdminViewModel {
  id: string;

  name: string;
  role: string;
  company: string;

  content: string;

  rating: number;

  location: string;

  image?: TestimonialImageViewModel;

  seoTitle: string;
  seoDescription: string;

  featured: boolean;
  active: boolean;

  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}

export interface TestimonialPublicViewModel {
  id: string;

  name: string;
  role: string;
  company: string;

  content: string;

  rating: number;

  location: string;

  image?: {
    url: string;
    alt: string;
  };

  featured: boolean;
}

export type TestimonialDocument = ITestimonial;