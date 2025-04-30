"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Scissors, LogOut, Menu, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Захиалагууд",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Үйлчилгээнүүд",
    href: "/admin/services",
    icon: Scissors,
  },
  {
    title: "Стилистүүд",
    href: "/admin/staffs",
    icon: Users,
  },
  {
    title: "Хэрэглэгчид",
    href: "/admin/customers",
    icon: User,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="flex h-16 items-center border-b bg-white px-4 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <SheetTitle>
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Цэс Toggle хийх</span>
              </Button>
            </SheetTitle>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center border-b px-4">
              <Link
                href="/admin"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <span className="text-xl font-bold">StyleCut Админ</span>
              </Link>
            </div>
            <nav className="grid gap-1 p-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100",
                    pathname === item.href ? "bg-gray-100" : "transparent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Админаас гарах
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-bold">StyleCut Админ</span>
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden w-64 flex-shrink-0 border-r bg-white md:block">
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-bold">StyleCut Админ</span>
          </Link>
        </div>
        <div className="flex h-[calc(100vh-4rem)] flex-col justify-between p-2">
          <nav className="grid gap-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100",
                  pathname === item.href ? "bg-gray-100" : "transparent"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="p-2">
            <Link href="/">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Админаас гарах
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

//   {
//     title: "Dashboard",
//     href: "/admin",
//     icon: BarChart3,
//   },
