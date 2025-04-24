"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UserType } from "../utils/types";

interface MobileMenuProps {
  user: UserType | null;
  onLogout: () => void;
}

export default function MobileMenu({ user, onLogout }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Цэс нээх</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader></SheetHeader>
        <nav className="flex flex-col gap-4 pt-10">
          <Link
            href="/services"
            className="text-sm font-medium hover:underline"
          >
            Үйлчилгээнүүд
          </Link>
          <Link href="/staffs" className="text-sm font-medium hover:underline">
            Манай ажилчид
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            Бидний тухай
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline">
            Холбоо барих
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard/appointments"
                className="text-sm font-medium hover:underline"
              >
                Миний Захиалгууд
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-sm font-medium hover:underline"
              >
                Миний Профайл
              </Link>
              <button
                onClick={onLogout}
                className="text-left text-sm font-medium hover:underline"
              >
                Гарах
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:underline">
              Нэвтрэх / Бүртгүүлэх
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
