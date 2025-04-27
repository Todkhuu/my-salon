"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, User, Heart } from "lucide-react";

const items = [
  {
    title: "Хянах Самбар",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Цагийн Захиалга",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Профайл",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Дуртай",
    href: "/dashboard/favorites",
    icon: Heart,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 px-2 py-4 text-sm">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href
                ? "bg-black text-white hover:bg-gray-800"
                : "hover:bg-gray-100"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
