export interface AdminDashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  archived: number;

  services: number;
  serviceAreas: number;
  blogs: number;
  gallery: number;
  testimonials: number;
  faqs: number;
}