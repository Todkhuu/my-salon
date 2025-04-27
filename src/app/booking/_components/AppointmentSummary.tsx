import Image from "next/image";
import { format } from "date-fns";
import { mn } from "date-fns/locale";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceType, StaffType } from "@/app/utils/types";

type AppointmentSummaryProps = {
  staff: StaffType;
  service: ServiceType;
  date: Date | undefined;
  selectedTime: string | null;
  staffId: string;
  serviceId: string;
};

export function AppointmentSummary({
  staff,
  service,
  date,
  selectedTime,
  staffId,
  serviceId,
}: AppointmentSummaryProps) {
  console.log("first", selectedTime);
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-xl font-bold">Захиалгын дэлгэрэнгүй</h2>

        <div className="mb-4 flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={staff.image || "/placeholder.svg"}
              alt={staff.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{staff.name}</h3>
          </div>
        </div>

        <div className="mb-4 space-y-2 border-b pb-4">
          <div className="flex justify-between">
            <span className="font-medium">{service.name}</span>
            <span>{service.price}₮</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{service.duration} мин</span>
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <span>
              {date
                ? format(date, "yyyy 'оны' MMMM d, EEEE", { locale: mn })
                : "Огноо сонгоно уу"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{selectedTime || "Цаг сонгоно уу"}</span>
          </div>
        </div>

        <div className="mb-4 flex justify-between border-t border-b py-2">
          <span className="font-bold">Нийт дүн</span>
          <span className="font-bold">{service.price}₮</span>
        </div>

        <Link
          href={`/checkout?staffs=${staffId}&service=${serviceId}${
            date ? `&date=${date.toString()}` : ""
          }${selectedTime ? `&time=${encodeURIComponent(selectedTime)}` : ""}`}
        >
          <Button
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={!date || !selectedTime}
          >
            Төлбөр төлөх хуудас <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
