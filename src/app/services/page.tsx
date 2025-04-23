"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Clock,
  Scissors,
  BeakerIcon as Beard,
  Palette,
  Sparkles,
} from "lucide-react";
import { useUser } from "../_context/UserContext";
import { useEffect, useState } from "react";
import { CategoryType, ServiceType } from "../utils/types";
import axios from "axios";
import { FavoriteServiceButton } from "@/components/home/FavoriteServiceButton";
import { Loader } from "@/components/ui/Loader";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceType[] | null>(null);
  const { user } = useUser();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const categories = await axios.get("/api/category");
      setCategories(categories.data.data);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const getServices = async () => {
    const services = await axios.get("/api/service");
    setServices(services.data.data);
  };
  useEffect(() => {
    getServices();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-16">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Services
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              Discover our range of professional services tailored to your style
              needs
            </p>
            <div className="mt-6 w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="w-full pl-10 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">Бүгд</TabsTrigger>
                <TabsTrigger value="Үс">Үс</TabsTrigger>
                <TabsTrigger value="Маникюр">Маникюр</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-12">
              {categories?.map((category) => {
                const filteredService = services?.filter(
                  (service: ServiceType) =>
                    service.category._id === category._id
                );
                return (
                  <div key={category._id} className="space-y-6">
                    <div className="flex items-center gap-2">
                      {category.name == "Үс" ? (
                        <Scissors className="h-6 w-6" />
                      ) : (
                        <Sparkles className="h-6 w-6" />
                      )}
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredService?.map((service) => (
                        <Card
                          key={service._id}
                          className="overflow-hidden transition-all hover:shadow-lg relative"
                        >
                          {user ? (
                            <FavoriteServiceButton serviceId={service._id} />
                          ) : null}
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
                                <span>{service.duration} min</span>
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
                                Book Now
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Link href={`/services`}>
                        <Button variant="outline">
                          View All {category.name}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            {categories?.map((category: CategoryType) => {
              const filteredService = services?.filter(
                (service: ServiceType) => service.category._id === category._id
              );
              return (
                <TabsContent
                  key={category._id}
                  value={category.name}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2">
                    {/* <category.icon className="h-6 w-6" /> */}
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>
                  <p className="max-w-3xl text-gray-500">
                    {category.description}
                  </p>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredService?.map((service: ServiceType) => (
                      <Card
                        key={service._id}
                        className="overflow-hidden transition-all hover:shadow-lg relative"
                      >
                        {user ? (
                          <FavoriteServiceButton serviceId={service._id} />
                        ) : null}
                        <CardContent className="p-6">
                          <h3 className="mb-2 text-xl font-bold">
                            {service.name}
                          </h3>
                          <p className="mb-4 text-sm text-gray-500 min-h-[4.5em] line-clamp-3">
                            {service.description}
                          </p>
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span>{service.duration} min</span>
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
                              Book Now
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
