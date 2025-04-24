"use client";
import { useUser } from "@/app/_context/UserContext";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

export function FavoriteServiceButton({
  serviceId,
  toggleFavorite,
  loading,
}: {
  serviceId: string;
  toggleFavorite: (serviceId: string) => void;
  loading?: boolean;
}) {
  const { user } = useUser();

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
