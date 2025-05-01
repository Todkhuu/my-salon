"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { ServiceType, StaffType } from "@/app/utils/types";

interface AppointmentSummaryProps {
  staff: StaffType | undefined;
  service: ServiceType | undefined;
  date: Date | null;
  time: string | null;
}

export function AppointmentSummary({
  staff,
  service,
  date,
  time,
}: AppointmentSummaryProps) {
  const subtotal = service?.price ?? 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-xl font-bold">Захиалгын дэлгэрэнгүй</h2>

        <div className="mb-4 flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={staff?.image || "/placeholder.svg"}
              alt={"staff?.name"}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{staff?.name}</h3>
            <p className="text-sm text-gray-500">{staff?.profession}</p>
          </div>
        </div>

        <div className="mb-4 space-y-2 border-b pb-4">
          <div className="flex justify-between">
            <span className="font-medium">{service?.name}</span>
            <span>{service?.price}₮</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{service?.duration} мин</span>
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>
              {date
                ? date.toLocaleDateString("mn-MN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Огноо сонгогдоогүй байна"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{time || "Цаг сонгогдоогүй байна"}</span>
          </div>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Дүн</span>
            <span>{service?.price.toFixed(2)}₮</span>
          </div>
          <div className="flex justify-between">
            <span>НӨАТ</span>
            <span>{tax.toFixed(2)}₮</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <span>Нийт дүн</span>
            <span>{total.toFixed(2)}₮</span>
          </div>
        </div>

        <div className="mt-6 rounded-md bg-gray-50 p-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Цуцлах нөхцөл:</span> Захиалгаа 24
            цагийн өмнө цуцлах боломжтой. Хожуу цуцалсан тохиолдолд нэмэлт
            төлбөр тооцогдож магадгүй.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
