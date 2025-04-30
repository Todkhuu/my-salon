"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock } from "lucide-react";
import { ServiceType, StaffType } from "@/app/utils/types";
import Link from "next/link";

export const MainContent = ({ staff }: { staff: StaffType }) => {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-4">
        <TabsTrigger value="about">Танилцуулга</TabsTrigger>
        <TabsTrigger value="services">Үйлчилгээ</TabsTrigger>
        <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
        <TabsTrigger value="reviews">Сэтгэгдэл</TabsTrigger>
      </TabsList>

      {/* About Tab */}
      <TabsContent value="about" className="space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            {staff.name} -ийн Танилцуулга
          </h2>
          <p className="text-gray-600">{staff.about}</p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">Туршлага</h3>
          <p className="text-gray-600">{staff.experience} жил</p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">Мэргэшил</h3>
          <div className="flex flex-wrap gap-2">
            {staff.services.map((service: ServiceType, index: number) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {service.name}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-3 text-lg font-semibold">Цагийн хуваарь</h3>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>{"barber.availability"}</span>
          </div>
        </div>
      </TabsContent>

      {/* Services Tab */}
      <TabsContent value="services" className="space-y-6">
        <h2 className="mb-4 text-2xl font-bold">Үйлчилгээ</h2>
        <div className="space-y-4">
          {staff.services.map((service, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} мин</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{service.price}₮</div>
                  <Link
                    href={`/booking?staffs=${staff._id}&service=${service._id}`}
                  >
                    <Button
                      size="sm"
                      className="mt-1 bg-black text-white hover:bg-gray-800"
                    >
                      Цаг Захиалах
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Portfolio Tab */}
      {/* <TabsContent value="portfolio" className="space-y-6">
        <h2 className="mb-4 text-2xl font-bold">Portfolio</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {staff.portfolio.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${barber.name}'s work sample ${index + 1}`}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </TabsContent> */}

      {/* Reviews Tab */}
      {/* <TabsContent value="reviews" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Client Reviews</h2>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-semibold">{barber.rating}</span>
            <span className="text-gray-500">({barber.reviews} reviews)</span>
          </div>
        </div>

        <div className="space-y-4">
          {barber.clientReviews.map((review, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{review.name}</h3>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="mb-2 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <p className="mb-2">Had an appointment with {barber.name}?</p>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Leave a Review
          </Button>
        </div>
      </TabsContent> */}
    </Tabs>
  );
};
