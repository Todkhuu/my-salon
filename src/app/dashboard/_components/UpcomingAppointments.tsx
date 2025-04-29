"use client";
import { useAppointment } from "@/app/_context/AppointmentContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const UpcomingAppointments = () => {
  const { appointments } = useAppointment();

  const now = new Date();

  const upcomingAppointments = appointments?.filter((app) => {
    const appointmentDate = new Date(app.date);
    const appointmentDateInMongolia = new Date(
      appointmentDate.getTime() + 8 * 60 * 60 * 1000
    );
    return (
      (app.status === "CONFIRMED" || app.status === "PENDING") &&
      appointmentDateInMongolia >= now
    );
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ирээдүйн захиалгууд</CardTitle>
        <CardDescription>Таны товлосон үйлчилгээ</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingAppointments && upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={appointment.staffId.image || "/placeholder.svg"}
                      alt={"appointment.barber"}
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {appointment.serviceId.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{appointment.staffId.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{appointment.date.toString().split("T")[0]}</span>
                      <Clock className="h-3 w-3 ml-1" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Link href={`/dashboard/appointments/`}>
                    <Button variant="outline" size="sm">
                      Дэлгэрэнгүй
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            <div className="mt-4 text-center">
              <Link href="/services">
                <Button variant="outline">Шинэ захиалга хийх</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium">
              Ирээдүйн захиалгууд байхгүй
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Дараагийн захиалгаа өгөхийг хүсвэл товлоорой
            </p>
            <Link href="/services">
              <Button>Захиалга өгөх</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
