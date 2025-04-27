"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import { FavoriteButton } from "@/components/home/FavoriteStaffButton";
import { useUser } from "@/app/_context/UserContext";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useStaff } from "../_context/StaffContext";

export default function BarbersPage() {
  const { staffs } = useStaff();
  const { user } = useUser();

  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service");

  const isBookingEnabled = !!selectedService;

  const filteredStaffs = staffs?.filter((staff) =>
    staff.services.some((service) => service._id === selectedService)
  );

  return (
    <div className="max-w-[1400px] m-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          Нүүр
        </Link>{" "}
        / <span className="text-sm font-medium">Манай Стилстүүд</span>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Стилистээ сонгоно уу</h1>
        <p className="text-gray-500">
          Манай туршлагатай мэргэжилтнүүдээс сонголтоо хийгээрэй
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {(selectedService ? filteredStaffs : staffs)?.map((staff) => (
          <Card key={staff._id} className="overflow-hidden">
            <div className="aspect-[3/4] w-full overflow-hidden relative">
              {user ? <FavoriteButton staffId={staff._id} /> : ""}
              <Image
                src={staff.image || "/placeholder.svg"}
                alt={staff.name}
                width={300}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="mb-1 text-xl font-bold">{staff.name}</h3>
              <p className="text-sm text-gray-500">{staff.profession}</p>
              <div className="mt-2 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{staff.rating}</span>
                <span className="text-sm text-gray-500">
                  (staff.reviews reviews)
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500">ЧАДВАРУУД</p>
                <div className="mt-1 flex flex-wrap gap-1 w-[201px]">
                  {staff.services.map((service, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                    >
                      {service.name}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              {isBookingEnabled ? (
                <Link
                  href={`/booking?staffs=${staff._id}${
                    selectedService ? `&service=${selectedService}` : ""
                  }`}
                  className="w-full"
                >
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Цаг Захиалах
                  </Button>
                </Link>
              ) : (
                <Link href={`/staffs/${staff._id}`} className="w-full">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Дэлгэрэнгүй Үзэх
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
