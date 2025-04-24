"use client";
import { useUser } from "@/app/_context/UserContext";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

export function FavoriteButton({ staffId }: { staffId: string }) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const isFavorite = user?.favoriteStaff?.some(
    (staff) => staff._id === staffId
  );

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/favorite-staff", { staffId });
      toast.success("Амжилттай шинэчлэгдлээ");
      setUser?.((prev) =>
        prev ? { ...prev, favoriteStaff: res.data.favoriteStaff } : null
      );
      console.log("Updated user", res.data.favoriteStaff);
      console.log("Is favorite:", isFavorite);
    } catch (err: any) {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={toggleFavorite}
      variant="ghost"
      size="icon"
      className={`absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 ${
        !isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
      disabled={loading}
    >
      <Heart />
    </Button>
  );
}
