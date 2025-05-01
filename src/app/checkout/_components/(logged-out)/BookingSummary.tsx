import { ServiceType, StaffType } from "@/app/utils/types";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";

type Props = {
  staff: StaffType | undefined;
  service: ServiceType | undefined;
  date: Date | null;
  time: string | null;
};

export const BookingSummary = ({ staff, service, date, time }: Props) => {
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
                : "Өдөр сонгогдоогүй"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{time || "Цаг сонгогдоогүй"}</span>
          </div>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Дүн</span>
            <span>{service?.price}₮</span>
          </div>
          {typeof service?.price === "number" ? (
            <>
              <div className="flex justify-between">
                <span>Татвар</span>
                <span>{(service.price * 0.1).toFixed(2)}₮</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-lg font-bold">
                <span>Нийт</span>
                <span>{(service.price * 1.1).toFixed(2)}₮</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-red-500">Үнийн мэдээлэл байхгүй байна</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
