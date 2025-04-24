import { ServiceType, UserType } from "@/app/utils/types";
import { ServiceCard } from "./ServiceCard";

interface Props {
  services: ServiceType[];
  user: UserType | null;
  toggleFavorite: (id: string) => void;
}

export const ServiceList = ({ services, user, toggleFavorite }: Props) => {
  if (!services.length) {
    return (
      <p className="text-center text-gray-500">Тохирсон үйлчилгээ олдсонгүй.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          user={user}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};
