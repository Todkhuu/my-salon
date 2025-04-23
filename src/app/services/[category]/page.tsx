"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { use, useEffect, useState } from "react";
import { ServiceType } from "@/app/utils/types";
import axios from "axios";
import { Loader } from "@/components/ui/Loader";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const [services, setServices] = useState<ServiceType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/service/`);
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, [category]);

  const filteredServices = services?.filter(
    (service: ServiceType) => service.category._id === category
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] m-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href="/services"
          className="text-sm text-gray-500 hover:underline"
        >
          Services
        </Link>{" "}
        /{" "}
        <span className="text-sm font-medium">
          {filteredServices?.[0]?.category?.name}
        </span>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">
          {filteredServices?.[0]?.category?.name}
        </h1>
        <p className="text-gray-500">
          {filteredServices?.[0]?.category?.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredServices?.map((service: ServiceType) => (
          <Card key={service._id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="mb-1 text-xl font-bold">{service.name}</h3>
              <p className="mb-4 text-sm text-gray-500 line-clamp-3 min-h-[4.5em]">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} min</span>
                </div>
                <div className="text-lg font-bold">${service.price}</div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/staffs?service=${service._id}`} className="w-full">
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Select Service
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
