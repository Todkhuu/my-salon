"use client";
import React from "react";
import { Button } from "../ui/button";
import { ServiceType } from "@/app/utils/types";
import { FavoriteButton } from "./FavoriteStaffButton";
import { useUser } from "@/app/_context/UserContext";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Clock, Heart, Scissors, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FavoriteServiceButton } from "./FavoriteServiceButton";

function FavoriteServices() {
  const { user } = useUser();

  return (
    <section className=" py-12 ">
      <div className="px-4 md:px-6 max-w-[1400px] m-auto md:py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Favorite Service</h2>
          <Link
            href={"/dashboard/favorites"}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-black"
          >
            <p>View All </p>
            <ChevronRight />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {user?.favoriteServices?.map((service: ServiceType) => (
            <Card key={service._id} className="overflow-hidden">
              <div className="relative">
                <FavoriteServiceButton serviceId={service._id} />
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
                <Link href={`staffs?service=${service._id}`} className="w-full">
                  <Button className="w-full">Book Service</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Scissors className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mb-2 font-bold">Discover More Barbers</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Find the perfect stylist for your needs
            </p>
            <Link href="/services">
              <Button variant="outline">Browse All Barbers</Button>
            </Link>
          </Card>{" "}
        </div>
      </div>
    </section>
  );
}

export default FavoriteServices;
