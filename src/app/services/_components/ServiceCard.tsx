import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FavoriteServiceButton } from "@/components/home/FavoriteServiceButton";
import { ServiceType, UserType } from "@/app/utils/types";

interface ServiceCardProps {
  service: ServiceType;
  user: UserType | null;
}

export const ServiceCard = ({ service, user }: ServiceCardProps) => {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg">
      {user && <FavoriteServiceButton serviceId={service._id} />}
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-bold">{service.name}</h3>
        <p className="mb-4 text-sm text-gray-500 line-clamp-3 min-h-[4.5em]">
          {service.description}
        </p>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{service.duration} мин</span>
          </div>
          <div className="text-lg font-bold">{service.price}₮</div>
        </div>
        <Link href={`/staffs?service=${service._id}`} className="w-full">
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Захиалах
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
