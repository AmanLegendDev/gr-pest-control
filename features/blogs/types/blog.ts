import type { IBlogPost } from "@/models/BlogPost";

export interface BlogPublicViewModel {
  id: string;

  title: string;
  slug: string;
  excerpt: string;
  content: string;

  category: string;
  tags: string[];

  author: string;

  featuredImage?: {
    url: string;
    alt: string;
  };

  featured: boolean;

  publishedAt?: string;
}

export interface BlogAdminViewModel {
  id: string;

  title: string;
  slug: string;
  excerpt: string;
  content: string;

  category: string;
  tags: string[];

  author: string;

  featuredImage?: {
    url: string;
    publicId: string;
    alt: string;
  };

  seoTitle: string;
  seoDescription: string;

  featured: boolean;
  published: boolean;

  publishedAt?: string;

  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}

export type BlogPostDocument = IBlogPost;