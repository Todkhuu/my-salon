import { ServiceType, UserType } from "@/app/utils/types";
import { FavoriteServiceButton } from "@/components/home/FavoriteServiceButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Link from "next/link";

interface Props {
  service: ServiceType;
  user: UserType | null;
  toggleFavorite: (id: string) => void;
}

export const ServiceCard = ({ service, user, toggleFavorite }: Props) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg relative">
      {user && (
        <FavoriteServiceButton
          serviceId={service._id}
          toggleFavorite={toggleFavorite}
        />
      )}
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-bold">{service.name}</h3>
        <p className="mb-4 text-sm text-gray-500 min-h-[4.5em] line-clamp-3">
          {service.description}
        </p>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{service.duration} min</span>
          </div>
          <div className="text-lg font-bold">${service.price}</div>
        </div>
        <Link href={`/staffs?service=${service._id}`}>
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Book Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
