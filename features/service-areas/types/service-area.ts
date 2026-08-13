export interface ServiceAreaImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface ServiceAreaFAQ {
  question: string;
  answer: string;
  sortOrder: number;
}

export interface ServiceAreaFormImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface ServiceAreaFormFAQ {
  question: string;
  answer: string;
  sortOrder: number;
}

export interface ServiceAreaFormData {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  image?: ServiceAreaFormImage;

  highlights: string[];
  nearbyAreas: string[];

  faqs: ServiceAreaFormFAQ[];

  seoTitle: string;
  seoDescription: string;

  featured: boolean;
  active: boolean;
  sortOrder: number;
}

export interface ServiceAreaPublicData {
  id: string;

  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  image?: ServiceAreaImage;

  highlights: string[];
  nearbyAreas: string[];

  faqs: ServiceAreaFAQ[];

  seoTitle: string;
  seoDescription: string;

  featured: boolean;
  active: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}

export interface ServiceAreaListItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;

  image?: ServiceAreaImage;

  featured: boolean;
  active: boolean;
  sortOrder: number;
}