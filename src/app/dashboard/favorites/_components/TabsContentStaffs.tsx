import { ServiceType, StaffType, UserType } from "@/app/utils/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const TabsContentStaffs = ({ user }: { user: UserType | null }) => {
  return (
    <TabsContent value="staffs" className="mt-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {user?.favoriteStaff?.map((staff: StaffType) => (
          <Card key={staff._id} className="overflow-hidden p-0">
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
                <span className="sr-only">Дуртайгаас хасах</span>
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
                  (staff.reviews сэтгэгдэл)
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {staff.services.map((service: ServiceType, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/staffs?id=${staff._id}`} className="w-full">
                <Button className="w-full">Дэлгэрэнгүй харах</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
};
