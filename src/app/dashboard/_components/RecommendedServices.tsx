"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAppointment } from "@/app/_context/AppointmentContext";
import { Check, CheckCheck, CheckCircle } from "lucide-react";

export const RecommendedServices = () => {
  const { appointments } = useAppointment();

  const serviceCount = appointments?.reduce((acc, appointment) => {
    const serviceName = appointment.serviceId.name;
    acc[serviceName] = (acc[serviceName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topService = Object.entries(serviceCount || {}).reduce(
    (prev, curr) => (curr[1] > prev[1] ? curr : prev),
    ["", 0]
  );

  const getInformation = appointments?.filter(
    (appointment) => appointment.serviceId.name == topService[0]
  );

  const oneService = getInformation && getInformation[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Танд санал болгож байна</CardTitle>
        <CardDescription>Таны өмнөх захиалга дээр үндэслэн</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-1">
          <div
            key={oneService?._id}
            className="flex overflow-hidden rounded-lg border"
          >
            <div className="h-auto w-1/3">
              <Image
                src={oneService?.serviceId.image || "/placeholder.svg"}
                alt={"service.name"}
                width={150}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-2/3 flex-col justify-between p-4">
              <div>
                <h3 className="font-medium">{oneService?.serviceId.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {oneService?.serviceId.description}
                </p>
                <p className="text-xs flex items-center gap-1">
                  <CheckCircle className="w-[10px] h-[10px]" />
                  {getInformation?.length} Захиалга
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold">{oneService?.serviceId.price}</span>
                <Link href={`staffs?services=${oneService?.serviceId._id}`}>
                  <Button size="sm">Захиалах</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
