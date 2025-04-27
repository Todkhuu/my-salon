import { Scissors, Sparkles } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

interface CategorySectionProps {
  category: any;
  services: any[];
  user: any;
  toggleFavorite: (serviceId: string) => void;
}

export const CategorySection = ({
  category,
  services,
  user,
  toggleFavorite,
}: CategorySectionProps) => {
  if (!services.length) return null;

  return (
    <div key={category._id} className="space-y-6">
      <div className="flex items-center gap-2">
        {category.name === "Үс" ? (
          <Scissors className="h-6 w-6" />
        ) : (
          <Sparkles className="h-6 w-6" />
        )}
        <h2 className="text-2xl font-bold">{category.name}</h2>
      </div>
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
    </div>
  );
};
