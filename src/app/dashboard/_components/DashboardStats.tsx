"use client";
import { useAppointment } from "@/app/_context/AppointmentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

export const DashboardStats = () => {
  const { appointments } = useAppointment();

  const stylistCount = appointments?.reduce((acc, appointment) => {
    const stylistName = appointment.staffId.name;
    acc[stylistName] = (acc[stylistName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topStylist = Object.entries(stylistCount || {}).reduce(
    (prev, curr) => (curr[1] > prev[1] ? curr : prev),
    ["", 0]
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Нийт захиалгууд</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appointments?.length}</div>
          <p className="text-xs text-muted-foreground">Өмнөх сараас +2</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Хамгийн дуртай стилист
          </CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topStylist[0]}</div>
          <p className="text-xs text-muted-foreground">
            {topStylist[1]} Захиалга
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
