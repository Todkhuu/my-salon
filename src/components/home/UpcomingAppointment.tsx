import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useAppointment } from "@/app/_context/AppointmentContext";
import { format } from "date-fns";

export function UpcomingAppointment() {
  const { appointments } = useAppointment();

  function getAppointmentDateTime(app: { date: string | Date; time: string }) {
    const dateString =
      typeof app.date === "string"
        ? app.date.split("T")[0]
        : app.date instanceof Date
        ? app.date.toISOString().split("T")[0]
        : "";

    return new Date(`${dateString}T${app.time}:00`);
  }

  const nextAppointment = appointments
    ?.filter(
      (app) =>
        getAppointmentDateTime(app).getTime() > Date.now() &&
        app.status !== "CANCELED"
    )
    .sort(
      (a, b) =>
        getAppointmentDateTime(a).getTime() -
        getAppointmentDateTime(b).getTime()
    )[0];

  if (!nextAppointment) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-bold">Ойрын захиалга байхгүй</h3>
          <p className="mb-4 text-sm text-gray-500">
            Өнөөдөр дараагийнхаа цагийг захиалаарай
          </p>
          <Link href="/services">
            <Button className="w-full">Цаг захиалах</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 font-bold">Таны дараагийн захиалга</h3>
        <div className="flex items-center gap-8">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{nextAppointment?.serviceId.name}</p>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{nextAppointment?.staffId.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {format(new Date(nextAppointment?.date ?? 0), "yyyy-MM-dd")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{nextAppointment?.time}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/dashboard/appointments">
          <Button className="w-full">Бүх захиалга</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
