"use client";
import { ChevronRight, Scissors, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { StaffType } from "@/app/utils/types";
import { FavoriteButton } from "./FavoriteStaffButton";
import { useUser } from "@/app/_context/UserContext";
import { Card } from "../ui/card";

function FavoriteStaffs() {
  const { user } = useUser();

  return (
    <section className="bg-gray-50 py-12 ">
      <div className="px-4 md:px-6 max-w-[1400px] m-auto md:py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Таны дуртай Стилистүүд</h2>
          <Link
            href={"/dashboard/favorites"}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-black"
          >
            <p>Бүгдийг харах</p>
            <ChevronRight />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {user?.favoriteStaff?.map((staff: StaffType, index: number) => {
            return (
              <div
                key={index}
                className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
              >
                <div className="aspect-square w-full overflow-hidden relative">
                  <FavoriteButton staffId={staff._id} />
                  <Image
                    src={`${staff?.image || "/placeholder.jpg"}`}
                    alt="Staff"
                    width={200}
                    height={200}
                    quality={100}
                    priority
                    className="h-full w-full object-cover object-center "
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
                    href={`staffs/${staff._id}`}
                    className="mt-3 block w-full"
                  >
                    <Button className="text-sm font-medium text-primary-foreground h-10 w-full">
                      Дэлгэрэнгүйг харах
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Scissors className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mb-2 font-bold">Өөр Стилистүүдийг хайж үзээрэй</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Таны хэрэгцээнд тохирсон Стилист-ээ олно уу
            </p>
            <Link href="/staffs">
              <Button variant="outline">Бүх Стилистүүдийг харах</Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default FavoriteStaffs;
