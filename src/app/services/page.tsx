"use client";

import { useState } from "react";
import { useUser } from "../_context/UserContext";
import { useService } from "../_context/ServiceContext";
import { useCategory } from "../_context/CategoryContext";
import { HeroSection } from "./_components/HeroSection";
import { ServicesTabs } from "./_components/ServicesTabs";
import axios from "axios";
import { toast } from "sonner";
import {
  cyrillicToLatinMap,
  latinToCyrillicMap,
  transliterate,
} from "../lib/transliteration";

export default function ServicesPage() {
  const { services } = useService();
  const { user, setUser } = useUser();
  const { categories } = useCategory();
  const [selectedTab, setSelectedTab] = useState("all");
  const [search, setSearch] = useState("");

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
    } catch (error) {
      toast.error("Алдаа гарлаа");
    }
  };

  const filteredServices = services?.filter((service) => {
    const matchCategory =
      selectedTab === "all" || service.category.name === selectedTab;

    const serviceName = service.name.toLowerCase();
    const searchText = search.toLowerCase();

    const serviceLatin = transliterate(serviceName, cyrillicToLatinMap);
    const serviceCyrillic = transliterate(serviceName, latinToCyrillicMap);

    const searchLatin = transliterate(searchText, cyrillicToLatinMap);
    const searchCyrillic = transliterate(searchText, latinToCyrillicMap);

    const matchSearch =
      serviceName.includes(searchText) ||
      serviceLatin.includes(searchText) ||
      serviceCyrillic.includes(searchText) ||
      serviceName.includes(searchLatin) ||
      serviceName.includes(searchCyrillic);

    return matchCategory && matchSearch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection value={search} onChange={setSearch} />
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <ServicesTabs
            categories={categories}
            filteredServices={filteredServices}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            user={user}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </section>
    </div>
  );
}
