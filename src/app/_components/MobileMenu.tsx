"use client";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Info,
  LogIn,
  LogOut,
  Mail,
  Menu,
  User,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
        <SheetTitle>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Цэс нээх</span>
          </Button>
        </SheetTitle>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="font-semibold">СтайлКат</SheetHeader>
        <nav className="flex flex-col gap-4 pl-4">
          <Link
            href="/services"
            className="text-sm font-medium hover:underline flex gap-2 items-center"
          >
            <Briefcase className="h-5 w-5" />
            <span>Үйлчилгээнүүд</span>
          </Link>
          <Link
            href="/staffs"
            className="text-sm font-medium hover:underline flex gap-2 items-center"
          >
            <Users className="h-5 w-5" />
            <span>Манай ажилчид</span>
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline flex gap-2 items-center"
          >
            <Info className="h-5 w-5" />
            <span>Бидний тухай</span>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:underline flex gap-2 items-center"
          >
            <Mail className="h-5 w-5" />
            <span>Холбоо барих</span>
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard/appointments"
                className="text-sm font-medium hover:underline flex gap-2 items-center"
              >
                <Calendar className="h-5 w-5" />
                <span>Миний Захиалгууд</span>
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-sm font-medium hover:underline flex gap-2 items-center"
              >
                <User className="h-5 w-5" />
                <span>Миний Профайл</span>
              </Link>
              <button
                onClick={onLogout}
                className="text-left text-sm font-medium hover:underline flex gap-2 items-center"
              >
                <LogOut className="h-5 w-5" />
                <span>Гарах</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium hover:underline flex gap-2 items-center"
            >
              <LogIn className="h-5 w-5" />
              <span>Нэвтрэх / Бүртгүүлэх</span>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
