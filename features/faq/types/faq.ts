import type { IFAQ } from "@/models/FAQ";

export interface FAQPublicViewModel {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  featured: boolean;
}

export interface FAQAdminViewModel {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  featured: boolean;
  active: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export type FAQDocument = IFAQ;