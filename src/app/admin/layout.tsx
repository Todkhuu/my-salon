"use client";
import { usePathname, useRouter } from "next/navigation";
import { useStaff } from "../_context/StaffContext";
import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedStaff } = useStaff();
  const pathName = usePathname();
  const router = useRouter();

  if (!loggedStaff && !pathName.includes("login")) {
    router.push("/");
    return;
  }
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
