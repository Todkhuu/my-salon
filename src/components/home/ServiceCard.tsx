import { useUser } from "@/app/_context/UserContext";
import { ServiceType } from "@/app/utils/types";
import React from "react";
import { toast } from "sonner";
import axios from "axios";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FavoriteServiceButton } from "./FavoriteServiceButton";
import { Button } from "../ui/button";

export const ServiceCard = ({ service }: { service: ServiceType }) => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = React.useState(false);

  const toggleFavorite = async (serviceId: string) => {
    try {
      setLoading(true);
      await axios.post("/api/favorite-service", { serviceId });
      toast.success("Амжилттай шинэчлэгдлээ");
      if (user) {
        const isFavorite = user.favoriteServices?.some(
          (s) => s._id === serviceId
        );

        const updatedFavorites = isFavorite
          ? user.favoriteServices?.filter(
              (favoriteService) => favoriteService._id !== serviceId
            )
          : [...(user.favoriteServices || []), service];

        setUser({
          ...user,
          favoriteServices: updatedFavorites,
        });
      }
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative">
        <FavoriteServiceButton
          serviceId={service._id}
          toggleFavorite={toggleFavorite}
          loading={loading}
        />
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.name}
          width={250}
          height={150}
          className="w-full h-[250px] object-cover object-center"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold">{service.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[4.5em]">
          {service.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{service.duration} мин</span>
          </div>
          <div className="text-lg font-bold">{service.price}₮</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`staffs?service=${service._id}`} className="w-full">
          <Button className="w-full">Үйлчилгээ захиалах</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
