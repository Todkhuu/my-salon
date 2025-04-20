"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface HeaderProps {
  user: { id: string } | null;
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
      toast.error("Гарахад алдаа гарлаа");
    }
  };
  return (
    <header className="p-4 border-b flex justify-between">
      <div className="text-xl font-bold">My Salon</div>
      {user ? (
        <div className="flex items-center gap-4">
          <span>Нэвтэрсэн</span>
          <Button onClick={handleLogout}>Гарах</Button>
        </div>
      ) : (
        <a href="/login" className="bg-black text-white px-4 py-2 rounded">
          Нэвтрэх
        </a>
      )}
    </header>
  );
}
