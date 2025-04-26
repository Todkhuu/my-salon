import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, User } from "lucide-react";
import Image from "next/image";
import { AppointmentType } from "@/app/utils/types";
import Link from "next/link";

export const TabsContentCancell = ({
  cancelledAppointments,
}: {
  cancelledAppointments: AppointmentType[] | undefined;
}) => {
  return (
    <TabsContent value="cancelled" className="mt-6 space-y-4">
      {cancelledAppointments && cancelledAppointments.length > 0 ? (
        cancelledAppointments.map((appointment) => (
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
                    <h3 className="font-medium">
                      {appointment.serviceId.name}
                    </h3>
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
                    {appointment.serviceId.duration} мин
                  </Badge>
                  <Badge variant="secondary" className="whitespace-nowrap">
                    {appointment.price}₮
                  </Badge>
                  <Badge variant="destructive" className="whitespace-nowrap">
                    Цуцлагдсан
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
        ))
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <CalendarIcon className="mb-2 h-10 w-10 text-muted-foreground" />
          <h3 className="mb-1 text-lg font-medium">Цуцлагдсан захиалга алга</h3>
          <p className="text-sm text-muted-foreground">
            Танд одоогоор цуцлагдсан захиалга байхгүй байна
          </p>
        </div>
      )}
    </TabsContent>
  );
};
