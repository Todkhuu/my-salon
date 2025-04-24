"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { useStaff } from "@/app/_context/StaffContext";
import { use } from "react";
import { ServiceType } from "@/app/utils/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BarberProfilePage(props: PageProps) {
  const { id } = use(props.params);
  const { staffs } = useStaff();
  const staff = staffs?.find((staff) => staff._id === id);

  if (!staff) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center px-4 py-8 md:px-6 md:py-12">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Barber Not Found</h1>
          <p className="mb-6 text-gray-500">
            The barber you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/barbers">
            <Button className="bg-black text-white hover:bg-gray-800">
              View All Barbers
            </Button>
          </Link>
        </div>
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
        <Link href="/staffs" className="text-sm text-gray-500 hover:underline">
          Our Barbers
        </Link>{" "}
        / <span className="text-sm font-medium">{staff?.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Barber Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={staff?.image || "/placeholder.svg"}
                alt={staff.name}
                width={400}
                height={500}
                className="w-full object-cover"
              />
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h2 className="text-xl font-bold">{staff?.name}</h2>
              <p className="text-gray-500">{staff?.profession}</p>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{staff?.rating}</span>
                <span className="text-gray-500">
                  {/* ({staff.reviews} reviews) */}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-gray-500" />
                  {/* <span className="text-sm">{staff.availability}</span> */}
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                  <span className="text-sm">{staff?.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-gray-500" />
                  {/* <span className="text-sm">{staff?.phone}</span> */}
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-gray-500" />
                  <span className="text-sm">{staff.email}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  href={`https://instagram.com/${staff.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href={`https://${staff.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold">About {staff.name}</h2>
                <p className="text-gray-600">{staff.about}</p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold">Experience</h3>
                <p className="text-gray-600">{staff.experience}</p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold">Specialties</h3>
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

              {/* <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 text-lg font-semibold">Availability</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>{barber.availability}</span>
                </div>
              </div> */}
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <h2 className="mb-4 text-2xl font-bold">Services</h2>
              <div className="space-y-4">
                {staff.services.map((service, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {service.price}
                        </div>
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
                  <span className="text-gray-500">
                    ({barber.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {barber.clientReviews.map((review, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">{review.name}</h3>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
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
        </div>
      </div>
    </div>
  );
}
