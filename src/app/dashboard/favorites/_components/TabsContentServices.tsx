import { ServiceType, UserType } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Clock, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const TabsContentServices = ({ user }: { user: UserType | null }) => {
  return (
    <TabsContent value="services" className="mt-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-">
        {user?.favoriteServices?.map((service: ServiceType) => (
          <Card key={service._id} className="overflow-hidden p-0">
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
                <span className="sr-only">Дуртайгаас хасах</span>
              </Button>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold">{service.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 h-[4.5em]">
                {service.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} мин</span>
                </div>
                <div className="text-lg font-bold">${service.price}</div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/staffs?service=${service._id}`} className="w-full">
                <Button className="w-full">Үйлчилгээ захиалах</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
};
