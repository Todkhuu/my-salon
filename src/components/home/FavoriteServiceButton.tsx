"use client";
import { useUser } from "@/app/_context/UserContext";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

export function FavoriteServiceButton({ serviceId }: { serviceId: string }) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const isFavorite = user?.favoriteServices?.some(
    (service) => service._id === serviceId
  );

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/favorite-service", { serviceId });
      toast.success("Амжилттай шинэчлэгдлээ");
      setUser?.((prev) =>
        prev ? { ...prev, favoriteServices: res.data.favoriteServices } : null
      );
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
      className={`h-8 w-8 absolute top-2 right-2 rounded-full ${
        isFavorite ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-800"
      }`}
      disabled={loading}
    >
      <Star />
    </Button>
  );
}
