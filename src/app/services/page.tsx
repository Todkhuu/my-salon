"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Scissors, BeakerIcon as Beard, Sparkles } from "lucide-react";
import { useUser } from "../_context/UserContext";
import { useState } from "react";
import { CategoryType, ServiceType } from "../utils/types";
import { FavoriteServiceButton } from "@/components/home/FavoriteServiceButton";
import { useService } from "../_context/ServiceContext";
import { useCategory } from "../_context/CategoryContext";
import axios from "axios";
import { toast } from "sonner";
import { HeroSection } from "./_components/HeroSection";
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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const toggleFavorite = async (serviceId: string) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/favorite-service", { serviceId });
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
          : [
              ...(user.favoriteServices || []),
              services?.find((service) => service._id === foundService._id) ||
                foundService,
            ];

        setUser({ ...user, favoriteServices: updatedFavorites });
      }
    } catch (error) {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
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

      {/* Services Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <div className="mb-8 flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">Бүгд</TabsTrigger>
                {categories?.map((category) => (
                  <TabsTrigger key={category._id} value={category.name}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {selectedTab === "all" ? (
              <TabsContent value="all" className="space-y-12">
                {categories?.map((category) => {
                  const filteredByCategory = filteredServices?.filter(
                    (service) => service.category._id === category._id
                  );
                  if (!filteredByCategory?.length) return null;

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
                        {filteredByCategory.slice(0, 3).map((service) => (
                          <Card
                            key={service._id}
                            className="relative overflow-hidden transition-all hover:shadow-lg"
                          >
                            {user && (
                              <FavoriteServiceButton
                                serviceId={service._id}
                                toggleFavorite={toggleFavorite}
                              />
                            )}
                            <CardContent className="p-6">
                              <h3 className="mb-2 text-xl font-bold">
                                {service.name}
                              </h3>
                              <p className="mb-4 text-sm text-gray-500 line-clamp-3 min-h-[4.5em]">
                                {service.description}
                              </p>
                              <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className="h-4 w-4" />
                                  <span>{service.duration} мин</span>
                                </div>
                                <div className="text-lg font-bold">
                                  ${service.price}
                                </div>
                              </div>
                              <Link
                                href={`/staffs?service=${service._id}`}
                                className="w-full"
                              >
                                <Button className="w-full bg-black text-white hover:bg-gray-800">
                                  Захиалах
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            ) : (
              categories?.map((category) => {
                if (selectedTab !== category.name) return null;

                const filteredByCategory = filteredServices?.filter(
                  (service) => service.category._id === category._id
                );

                return (
                  <TabsContent
                    key={category._id}
                    value={category.name}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                    </div>
                    <p className="text-gray-500 max-w-3xl">
                      {category.description}
                    </p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredByCategory?.map((service) => (
                        <Card
                          key={service._id}
                          className="relative overflow-hidden transition-all hover:shadow-lg"
                        >
                          {user && (
                            <FavoriteServiceButton
                              serviceId={service._id}
                              toggleFavorite={toggleFavorite}
                            />
                          )}
                          <CardContent className="p-6">
                            <h3 className="mb-2 text-xl font-bold">
                              {service.name}
                            </h3>
                            <p className="mb-4 text-sm text-gray-500 line-clamp-3 min-h-[4.5em]">
                              {service.description}
                            </p>
                            <div className="mb-4 flex items-center justify-between">
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{service.duration} мин</span>
                              </div>
                              <div className="text-lg font-bold">
                                ${service.price}
                              </div>
                            </div>
                            <Link
                              href={`/staffs?service=${service._id}`}
                              className="w-full"
                            >
                              <Button className="w-full bg-black text-white hover:bg-gray-800">
                                Захиалах
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                );
              })
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
