"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { UserNav } from "./UserNav";

interface HeaderProps {
  user: {
    id: string;
    username: string | undefined;
    email: string;
  } | null;
}
export default function Navbar({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      toast.success("Амжилттай гарлаа");
      router.push("/");
      router.refresh(); // хэрэглэгчийг дахин шалгах
    } catch (error) {
      toast.error("Гарахад алдаа гарлаа. Дахин оролдож үзээрэй.");
      console.error(error);
    }
  };
  console.log("user", user);
  return (
    <header className="border-b bg-white max-w-[1400px] m-auto">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={user ? "/home" : "/"} className="flex items-center gap-2">
          <span className="text-xl font-bold">StyleCut</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
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
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <UserNav handleLogout={handleLogout} />
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 pt-10">
                <Link
                  href="/services"
                  className="text-sm font-medium hover:underline"
                >
                  Services
                </Link>
                <Link
                  href="/barbers"
                  className="text-sm font-medium hover:underline"
                >
                  Our Barbers
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:underline"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium hover:underline"
                >
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
                    <Link
                      href="/login"
                      className="text-sm font-medium hover:underline"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:underline"
                  >
                    Login / Register
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
