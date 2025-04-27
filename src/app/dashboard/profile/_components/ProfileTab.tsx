"use client";
import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Scissors, Star } from "lucide-react";
import { TabsContentPersonal } from "./TabsContentPersonal";

export const ProfileTab = () => {
  const favoriteServices = [
    {
      id: "fade",
      name: "Fade Haircut",
      count: 6,
    },
    {
      id: "beard-trim",
      name: "Beard Trim",
      count: 4,
    },
    {
      id: "regular-cut",
      name: "Regular Haircut",
      count: 2,
    },
  ];

  const favoriteBarbers = [
    {
      id: "john",
      name: "John Smith",
      count: 8,
      rating: 5,
    },
    {
      id: "sarah",
      name: "Sarah Johnson",
      count: 4,
      rating: 4,
    },
  ];
  return (
    <Tabs defaultValue="personal">
      <TabsList>
        <TabsTrigger value="personal">Personal Information</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContentPersonal />

      <TabsContent value="preferences" className="mt-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Services</CardTitle>
              <CardDescription>
                Services you book most frequently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-muted-foreground" />
                      <span>{service.name}</span>
                    </div>
                    <Badge variant="outline">{service.count} times</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full">
                View All Services
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Favorite Barbers</CardTitle>
              <CardDescription>Barbers you prefer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteBarbers.map((barber) => (
                  <div
                    key={barber.id}
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
                    <Badge variant="outline">{barber.count} visits</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full">
                View All Barbers
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Style Preferences</CardTitle>
            <CardDescription>
              Help us understand your style preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="hairStyle">Preferred Hair Style</Label>
                <Input
                  id="hairStyle"
                  placeholder="e.g., Classic fade, Modern pompadour"
                />
              </div>
              <div>
                <Label htmlFor="products">Preferred Products</Label>
                <Input
                  id="products"
                  placeholder="e.g., Matte pomade, Sea salt spray"
                />
              </div>
              <div>
                <Label htmlFor="notes">Special Instructions</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or preferences for your barber"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
