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

interface MobileMenuProps {
  user: {
    id: string;
    username?: string;
    email: string;
  } | null;
  onLogout: () => void;
}

export default function MobileMenu({ user, onLogout }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader></SheetHeader>
        <nav className="flex flex-col gap-4 pt-10">
          <Link
            href="/services"
            className="text-sm font-medium hover:underline"
          >
            Services
          </Link>
          <Link href="/barbers" className="text-sm font-medium hover:underline">
            Our Barbers
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:underline"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/appointments"
                className="text-sm font-medium hover:underline"
              >
                My Appointments
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-sm font-medium hover:underline"
              >
                My Profile
              </Link>
              <button
                onClick={onLogout}
                className="text-left text-sm font-medium hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login / Register
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
