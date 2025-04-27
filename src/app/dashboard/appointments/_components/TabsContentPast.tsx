import { AppointmentType } from "@/app/utils/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const TabsContentPast = ({
  pastAppointments,
}: {
  pastAppointments: AppointmentType[] | undefined;
}) => {
  return (
    <TabsContent value="past" className="mt-6 space-y-4">
      {pastAppointments?.map((appointment) => (
        <Card key={appointment._id}>
          <CardContent className="p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
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
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:gap-3">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{appointment.staffId.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{appointment.date.toString().split("T")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                <Badge variant="outline" className="whitespace-nowrap">
                  {appointment.serviceId.duration}мин
                </Badge>
                <Badge variant="secondary" className="whitespace-nowrap">
                  {appointment.price}₮
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap">
                  Дууссан
                </Badge>
                <Link
                  href={`/booking?service=${appointment.serviceId._id}&staffs=${appointment.staffId._id}`}
                >
                  <Button variant="ghost" size="sm">
                    Дахин захиалах
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </TabsContent>
  );
};
