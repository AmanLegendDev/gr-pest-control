"use client";

import { useMemo, useState } from "react";

import ServicesCategoryNav from "./ServicesCategoryNav";
import FeaturedServices from "./FeaturedServices";
import ServicesGrid from "./ServicesGrid";
import ServicesHelpCTA from "./ServicesHelpCTA";
import ServicesFinalCTA from "./ServicesFinalCTA";

interface ServiceImage {
  url: string;
  publicId: string;
  alt: string;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  heroImage?: ServiceImage;
  icon?: string;
  pestTypes?: string[];
  benefits?: string[];
  process?: {
    title: string;
    description: string;
    sortOrder: number;
  }[];
  faqs?: {
    question: string;
    answer: string;
    sortOrder: number;
  }[];
  featured: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

interface ServicesPageClientProps {
  services: Service[];
}

export default function ServicesPageClient({
  services,
}: ServicesPageClientProps) {
  const [activeCategory, setActiveCategory] =
    useState("all");

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        services
          .map((service) =>
            service.category.trim(),
          )
          .filter(Boolean),
      ),
    );
  }, [services]);

  const orderedServices = useMemo(() => {
  const nonFeatured = services.filter(
    (service) => !service.featured,
  );

  const featured = services.filter(
    (service) => service.featured,
  );

  return [
    ...nonFeatured,
    ...featured,
  ];
}, [services]);

  return (
    <>
      <FeaturedServices
        services={services}
      />

      <ServicesCategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={
          setActiveCategory
        }
      />

      

    <ServicesGrid
  services={orderedServices}
  activeCategory={activeCategory}
/>

      <ServicesHelpCTA />

      <ServicesFinalCTA />
    </>
  );
}