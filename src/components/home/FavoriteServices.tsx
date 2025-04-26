"use client";
import React from "react";
import { Button } from "../ui/button";
import { ServiceType } from "@/app/utils/types";
import { useUser } from "@/app/_context/UserContext";
import { Card } from "../ui/card";
import { Scissors } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ServiceCard } from "./ServiceCard";

function FavoriteServices() {
  const { user } = useUser();

  return (
    <section className=" py-12 ">
      <div className="px-4 md:px-6 max-w-[1400px] m-auto md:py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Таны дуртай үйлчилгээ</h2>
          <Link
            href={"/dashboard/favorites"}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-black"
          >
            <p>Бүгдийг харах</p>
            <ChevronRight />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {user?.favoriteServices?.map((service: ServiceType) => (
            <ServiceCard service={service} key={service._id} />
          ))}
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Scissors className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mb-2 font-bold">Илүү их үйлчилгээг хайж үзээрэй</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Таны хэрэгцээнд тохирсон үйлчилгээтэй Стилистүүдийг олоорой
            </p>
            <Link href="/services">
              <Button variant="outline">Бүх үйлчилгээг харах</Button>
            </Link>
          </Card>{" "}
        </div>
      </div>
    </section>
  );
}

export default FavoriteServices;
