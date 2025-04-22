"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ServiceType } from "@/app/utils/types";
import { useUser } from "@/app/_context/UserContext";
import { FavoriteServiceButton } from "@/components/home/FavoriteServiceButton";

export default function BarbersPage() {
  const [services, setServices] = useState<ServiceType[] | null>(null);
  const { user } = useUser();

  const getServices = async () => {
    const services = await axios.get("/api/service");
    setServices(services.data.data);
  };
  useEffect(() => {
    getServices();
  }, []);
  console.log("first", services);

  return (
    <div className="max-w-[1400px] m-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          Home
        </Link>{" "}
        / <span className="text-sm font-medium">Our Barbers</span>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Choose Your Stylist</h1>
        <p className="text-gray-500">
          Select from our team of experienced professionals for your service
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services?.map((service: ServiceType) => (
          <Card key={service._id} className="overflow-hidden">
            <div className="relative">
              {user ? <FavoriteServiceButton serviceId={service._id} /> : null}
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                width={250}
                height={150}
                className="aspect-video w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold">{service.name}</h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} min</span>
                </div>
                <div className="text-lg font-bold">${service.price}</div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/barbers?service=${service._id}`} className="w-full">
                <Button className="w-full">Book Service</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
