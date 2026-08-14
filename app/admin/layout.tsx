import type { Metadata } from "next";

import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel",
    template: "%s | GR Pest Control Admin",
  },

  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}