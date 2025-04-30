"use client";
import { useUser } from "@/app/_context/UserContext";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useService } from "@/app/_context/ServiceContext";

export function FavoriteServiceButton({
  serviceId,
  loading,
}: {
  serviceId: string;
  loading?: boolean;
}) {
  const { user, setUser } = useUser();
  const { services } = useService();

  const toggleFavorite = async (serviceId: string) => {
    try {
      await axios.post("/api/favorite-service", { serviceId });
      toast.success("Амжилттай шинэчлэгдлээ");

      if (user) {
        const isFavorite = user.favoriteServices?.some(
          (favoriteService) => favoriteService._id === serviceId
        );
        const foundService = services?.find(
          (service) => service._id === serviceId
        );
        if (!foundService) return;

        const updatedFavorites = isFavorite
          ? user.favoriteServices?.filter((fav) => fav._id !== serviceId)
          : [...(user.favoriteServices || []), foundService];

        setUser({ ...user, favoriteServices: updatedFavorites });
      }
    } catch {
      toast.error("Алдаа гарлаа");
    }
  };

  const isFavorite = user?.favoriteServices?.some(
    (service) => service._id === serviceId
  );

  return (
    <Button
      onClick={() => toggleFavorite?.(serviceId)}
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
