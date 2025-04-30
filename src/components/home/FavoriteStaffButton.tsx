"use client";
import { useUser } from "@/app/_context/UserContext";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

export function FavoriteButton({ staffId }: { staffId: string }) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    if (!user || !setUser) return;

    const isAlreadyFavorite = user.favoriteStaff?.some(
      (staff) => staff._id === staffId
    );

    // 1. UI-г түрүүлж өөрчил
    setUser((prev) => {
      if (!prev) return prev;

      const updatedFavorites = isAlreadyFavorite
        ? prev.favoriteStaff?.filter((staff) => staff._id !== staffId)
        : [...(prev.favoriteStaff || []), { _id: staffId } as any];

      return { ...prev, favoriteStaff: updatedFavorites };
    });

    try {
      setLoading(true);
      await axios.post("/api/favorite-staff", { staffId });
      toast.success("Амжилттай шинэчлэгдлээ");
    } catch (err: any) {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = user?.favoriteStaff?.some(
    (staff) => staff._id === staffId
  );

  return (
    <Button
      onClick={toggleFavorite}
      variant="ghost"
      size="icon"
      className={`absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
      disabled={loading}
    >
      <Heart />
    </Button>
  );
}
