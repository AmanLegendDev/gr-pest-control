import QuoteRequest from "@/models/QuoteRequest";
import Service from "@/models/Service";
import ServiceArea from "@/models/ServiceArea";
import Blog from "@/models/BlogPost";
import Gallery from "@/models/GalleryItem";
import Testimonial from "@/models/Testimonial";
import FAQ from "@/models/FAQ";

import type {
  AdminDashboardStats,
} from "../types/dashboard";

export async function getDashboardStats(): Promise<AdminDashboardStats> {
  const [
    total,
    pending,
    inProgress,
    completed,
    cancelled,
     archived,

    services,
    serviceAreas,
    blogs,
    gallery,
    testimonials,
    faqs,
  ] = await Promise.all([
    /* =========================
       QUOTE REQUESTS
       Archived requests excluded
    ========================== */

   QuoteRequest.countDocuments({
  archived: { $ne: true },
}),

QuoteRequest.countDocuments({
  archived: { $ne: true },
  status: "pending",
}),

QuoteRequest.countDocuments({
  archived: { $ne: true },
  status: "in-progress",
}),

QuoteRequest.countDocuments({
  archived: { $ne: true },
  status: "completed",
}),

QuoteRequest.countDocuments({
  archived: { $ne: true },
  status: "cancelled",
}),

QuoteRequest.countDocuments({
  archived: true,
}),

    /* =========================
       CMS COUNTS
       ========================== */

    Service.countDocuments(),

    ServiceArea.countDocuments(),

    Blog.countDocuments(),

    Gallery.countDocuments(),

    Testimonial.countDocuments(),

    FAQ.countDocuments(),
  ]);

  return {
  total,
  pending,
  inProgress,
  completed,
  cancelled,
  archived,
  services,
  serviceAreas,
  blogs,
  gallery,
  testimonials,
  faqs,
};
}