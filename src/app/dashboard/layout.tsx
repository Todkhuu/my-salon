"use client";
import type React from "react";
// import { UserNav } from "@/components/dashboard/user-nav"
import { DashboardNav } from "@/components/dashboard/DashboardNav";
// import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 items-start px-4 py-6 md:grid md:grid-cols-[220px_1fr] md:gap-6 md:px-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        {/* Sidebar */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <DashboardNav />
        </aside>
        {/* Main content */}
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
