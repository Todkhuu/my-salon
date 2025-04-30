import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { AppointmentType } from "@/app/utils/types";
// import { EditAppointmentDialog } from "./EditAppointmentDialog";

export const AppointmentTable = ({
  filteredAppointments,
}: {
  filteredAppointments: AppointmentType[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Barber</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAppointments?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No appointments found.
            </TableCell>
          </TableRow>
        ) : (
          filteredAppointments?.map((appointment) => (
            <TableRow key={appointment._id}>
              <TableCell>
                {appointment.userId ? (
                  <div>
                    <div className="font-medium">
                      {appointment.userId.username}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.userId.email}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium">{appointment.username}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.phone}
                    </div>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div>
                  <div>{appointment.serviceId.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.serviceId.duration} мин
                  </div>
                </div>
              </TableCell>
              <TableCell>{appointment.staffId.name}</TableCell>
              <TableCell>
                <div>
                  <div>{format(appointment.date, "PPP")}</div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.time}
                  </div>
                </div>
              </TableCell>
              <TableCell>{appointment.price}₮</TableCell>
              <TableCell>
                <Badge
                  variant={
                    appointment.status === "CONFIRMED"
                      ? "default"
                      : appointment.status === "PENDING"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* <EditAppointmentDialog appointment={filteredAppointments} /> */}
                    <DropdownMenuItem className="text-red-500">
                      Delete appointment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
