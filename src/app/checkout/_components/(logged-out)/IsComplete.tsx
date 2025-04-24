import { ServiceType, StaffType } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  staff: StaffType | undefined;
  service: ServiceType | undefined;
  date: Date | null;
  time: string | null;
};

export const IsCompleted = ({ staff, service, date, time }: Props) => {
  return (
    <div className="max-w-[1400px] m-auto flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="mb-2 text-3xl font-bold">Захиалга амжилттай!</h1>
      <p className="mb-8 max-w-md text-gray-500">
        Таны захиалга амжилттай бүртгэгдлээ. Баталгаажуулсан мэдээлэл таны
        и-мэйл рүү илгээгдсэн.
      </p>
      <div className="mb-8 w-full max-w-md rounded-lg border p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={staff?.image || "/placeholder.svg"}
              alt={"barber.name"}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-left">
            <h3 className="font-medium">{staff?.name}</h3>
            <p className="text-sm text-gray-500">{staff?.profession}</p>
          </div>
        </div>

        <div className="mb-4 space-y-2 border-b pb-4 text-left">
          <div className="flex justify-between">
            <span className="font-medium">{service?.name}</span>
            <span>{service?.price}₮</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{service?.duration} минут</span>
          </div>
        </div>

        <div className="space-y-2 text-left">
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
                : "Огноо тодорхойгүй"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{time || "Цаг тодорхойгүй"}</span>
          </div>
        </div>
      </div>
      <Link href="/">
        <Button className="bg-black text-white hover:bg-gray-800">
          Нүүр хуудас руу буцах
        </Button>
      </Link>
    </div>
  );
};
