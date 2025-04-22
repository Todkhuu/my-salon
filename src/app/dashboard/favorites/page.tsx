"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Heart, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/app/_context/UserContext";
import { ServiceType, StaffType } from "@/app/utils/types";

export default function FavoritesPage() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Favorites</h1>
        <p className="text-muted-foreground">
          Your favorite barbers and services
        </p>
      </div>

      <Tabs defaultValue="staffs">
        <TabsList>
          <TabsTrigger value="staffs">Favorite Barbers</TabsTrigger>
          <TabsTrigger value="services">Favorite Services</TabsTrigger>
        </TabsList>

        <TabsContent value="staffs" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {user?.favoriteStaff?.map((staff: StaffType) => (
              <Card key={staff._id} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={staff.image || "/placeholder.svg"}
                    alt={staff.name}
                    width={200}
                    height={200}
                    className="aspect-square w-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    <span className="sr-only">Remove from favorites</span>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold">{staff.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {staff.profession}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{staff.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      (staff.reviews reviews)
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {staff.services.map(
                      (service: ServiceType, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {service.name}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link
                    href={`/barbers?barber=${staff._id}`}
                    className="w-full"
                  >
                    <Button className="w-full">Book Appointment</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* <TabsContent value="services" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    width={250}
                    height={150}
                    className="aspect-video w-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    <span className="sr-only">Remove from favorites</span>
                  </Button>
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
                  <Link
                    href={`/barbers?service=${service.id}`}
                    className="w-full"
                  >
                    <Button className="w-full">Book Service</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
