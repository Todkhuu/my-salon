import { useUser } from "@/app/_context/UserContext";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";

export function FavoriteButton({ staffId }: { staffId: string }) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  console.log("user", user);

  const isFavorite = user?.favoriteStaff?.includes(staffId);

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/favorite-staff", { staffId });
      toast.success("Амжилттай шинэчлэгдлээ");
      setUser?.((prev) =>
        prev ? { ...prev, favoriteStaff: res.data.favoriteStaff } : undefined
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
      variant={"destructive"}
      className={`px-4 py-2 rounded-full text-sm absolute z-10 top-2 right-2 ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
      disabled={loading}
    >
      {isFavorite ? "Дуртай" : "Дуртай болгох"}
    </Button>
  );
}
