"use client";
import { AppointmentType } from "@/app/utils/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsContent } from "@/components/ui/tabs";
import {
  CalendarIcon,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CancelDialog } from "./CancelDialog";

export const TabsContentUpcoming = ({
  upcomingAppointments,
}: {
  upcomingAppointments: AppointmentType[] | undefined;
}) => {
  const searchParams = useSearchParams();

  const [cancelDialog, setCancelDialog] = useState<{
    open: boolean;
    appointment: AppointmentType | null;
  }>({
    open: false,
    appointment: null,
  });

  console.log("upcomingAppointments", upcomingAppointments);

  const cancelled = searchParams.get("cancelled");
  return (
    <>
      {cancelled && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Амжилттай!</AlertTitle>
          <AlertDescription>
            Таны товлосон уулзалт амжилттай цуцлагдсан.
          </AlertDescription>
        </Alert>
      )}

      <TabsContent value="upcoming" className="mt-6 space-y-4">
        {upcomingAppointments && upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment: AppointmentType) => (
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
                          <span>
                            {appointment.date.toString().split("T")[0]}
                          </span>
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
                    <Badge className="whitespace-nowrap">
                      {appointment.status === "CONFIRMED"
                        ? "Баталгаажсан"
                        : appointment.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Цэсийг нээх</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-red-500">
                          <Button
                            variant="outline"
                            className="flex-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={() =>
                              setCancelDialog({ open: true, appointment })
                            }
                          >
                            Товлолтыг цуцлах
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <CalendarIcon className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium">Захиалга алга</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Өнөөдөр дараагийн товлолтоо захиалаарай
            </p>
            <Link href="/services">
              <Button>Товлолт хийх</Button>
            </Link>
          </div>
        )}
      </TabsContent>
      {cancelDialog.appointment && (
        <CancelDialog
          open={cancelDialog.open}
          onOpenChange={(open) =>
            setCancelDialog({
              open,
              appointment: open ? cancelDialog.appointment : null,
            })
          }
          appointment={cancelDialog.appointment}
        />
      )}
    </>
  );
};
