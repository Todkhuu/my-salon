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
      router.refresh();
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
        <NavLinks />
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
