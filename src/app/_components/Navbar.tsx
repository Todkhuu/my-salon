"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { UserNav } from "./UserNav";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useUser } from "@/app/_context/UserContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();
  const pathname = usePathname();
  const HIDE_NAVLINKS_PATHS = [
    "/dashboard/favorites",
    "dashboard/appointments",
    "/dashboard/profile",
    "/dashboard/payment",
    "/dashboard/settings",
  ];

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      toast.success("Амжилттай гарлаа");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Гарахад алдаа гарлаа. Дахин оролдож үзээрэй.");
      console.error(error);
    }
  };

  return (
    <header className="border-b bg-white ">
      <div className="max-w-[1400px] m-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={user ? "/home" : "/"} className="flex items-center gap-2">
          <span className="text-xl font-bold">StyleCut</span>
        </Link>
        {!HIDE_NAVLINKS_PATHS.includes(pathname) && <NavLinks />}
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
          <MobileMenu user={user} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}
