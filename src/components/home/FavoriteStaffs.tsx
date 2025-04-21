"use client";
import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { StaffType } from "@/server/utils";
import { FavoriteButton } from "./FavoriteButton";

function FavoriteStaffs() {
  const [staffs, setStaffs] = useState<StaffType[] | null>(null);
  console.log("first", staffs);
  const getStaffs = async () => {
    const staffs = await axios.get("/api/staff");
    setStaffs(staffs.data.data);
  };
  useEffect(() => {
    getStaffs();
  }, []);
  return (
    <section className="bg-gray-50 py-12 ">
      <div className="px-4 md:px-6 max-w-[1400px] m-auto md:py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Favorite Barbers</h2>
          <Link
            href={"/dashboard/favorites"}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-black"
          >
            <p>View All </p>
            <ChevronRight />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {staffs?.map((staff: StaffType, index: number) => {
            return (
              <div
                key={index}
                className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
              >
                <div className="aspect-square w-full overflow-hidden relative">
                  <FavoriteButton staffId={staff._id} />
                  <Image
                    alt="Staff"
                    width={100}
                    height={100}
                    src={staff.image}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{staff.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {staff.profession}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="lucide lucide-star h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{staff.rating}</span>
                  </div>
                  <Link
                    href={"barbers?barber=john"}
                    className="mt-3 block w-full"
                  >
                    <Button className="text-sm font-medium text-primary-foreground h-10 w-full">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FavoriteStaffs;
