"use client";
import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Scissors, Star } from "lucide-react";
import { useUser } from "@/app/_context/UserContext";
import Link from "next/link";

export const TabsContentPreferences = () => {
  const { user } = useUser();
  return (
    <TabsContent value="preferences" className="mt-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Дуртай Үйлчилгээ</CardTitle>
            <CardDescription>
              Та хамгийн их захиалдаг үйлчилгээнүүд
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user?.favoriteServices?.map((service) => (
                <div
                  key={service._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Scissors className="h-4 w-4 text-muted-foreground" />
                    <span>{service.name}</span>
                  </div>
                  <Badge variant="outline"> удаа</Badge>
                </div>
              ))}
            </div>
          </CardContent>{" "}
          <Link href={"/services"}>
            <CardFooter>
              <Button variant="link" className="w-full">
                Бүх Үйлчилгээг Үзэх
              </Button>
            </CardFooter>
          </Link>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Дуртай staffs</CardTitle>
            <CardDescription>Таны илүүд үздэг staffs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user?.favoriteStaff?.map((barber) => (
                <div
                  key={barber._id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{barber.name}</div>
                    <div className="flex items-center">
                      {Array.from({ length: barber.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline"> удаа очсон</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <Link href={"/staffs"}>
            <CardFooter>
              <Button variant="link" className="w-full">
                Бүх Staffs Үзэх
              </Button>
            </CardFooter>
          </Link>
        </Card>
      </div>
    </TabsContent>
  );
};
