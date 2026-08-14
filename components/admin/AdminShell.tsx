"use client";

import { useState } from "react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({
  children,
}: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* =====================================================
          MAIN ADMIN AREA
      ====================================================== */}
      <div className="min-h-screen lg:pl-[270px]">
        {/* ===================================================
            TOP NAVBAR
        ==================================================== */}
        <AdminNavbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}
        <main className="min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-76px)]">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}