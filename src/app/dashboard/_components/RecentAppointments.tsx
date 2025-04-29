"use client";
import { useAppointment } from "@/app/_context/AppointmentContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, User, Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const RecentAppointments = () => {
  const { appointments } = useAppointment();

  const now = new Date();

  const recentAppointments = appointments?.filter((app) => {
    const appointmentDate = new Date(app.date);
    const appointmentDateInMongolia = new Date(
      appointmentDate.getTime() + 8 * 60 * 60 * 1000
    );
    return appointmentDateInMongolia <= now && app.status !== "CANCELED";
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Сүүлд хийсэн захиалгууд</CardTitle>
        <CardDescription>Таны өнгөрсөн үйлчилгээ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAppointments?.map((appointment) => (
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
                  <h3 className="font-medium">{appointment.serviceId.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{appointment.staffId.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{appointment.date.toString().split("T")[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 text-center">
            <Link href="/dashboard/appointments">
              <Button variant="outline" className="gap-1">
                Бүх захиалгуудыг харах
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
