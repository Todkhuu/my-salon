"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { StaffType } from "@/app/utils/types";
import { FavoriteButton } from "@/components/home/FavoriteStaffButton";
import { useUser } from "@/app/_context/UserContext";

export default function BarbersPage() {
  const [staffs, setStaffs] = useState<StaffType[] | null>(null);
  const { user } = useUser();

  const getStaffs = async () => {
    const staffs = await axios.get("/api/staff");
    setStaffs(staffs.data.data);
  };
  useEffect(() => {
    getStaffs();
  }, []);

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {staffs?.map((staff) => (
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
                <p className="text-xs font-medium text-gray-500">SPECIALTIES</p>
                <div className="mt-1 flex flex-wrap gap-1">
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
            <CardFooter className="p-4 pt-0"></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
