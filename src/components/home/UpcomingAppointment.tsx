import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

interface Appointment {
  id: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  image: string;
}

interface UpcomingAppointmentProps {
  appointment: Appointment | null;
}
// { appointment }: UpcomingAppointmentProps

export function UpcomingAppointment() {
  //   if (!appointment) {
  //     return (
  //       <Card>
  //         <CardContent className="p-6">
  //           <h3 className="mb-2 font-bold">No Upcoming Appointments</h3>
  //           <p className="mb-4 text-sm text-gray-500">
  //             Book your next appointment today
  //           </p>
  //           <Link href="/services">
  //             <Button className="w-full">Book Now</Button>
  //           </Link>
  //         </CardContent>
  //       </Card>
  //     );
  //   }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 font-bold">Your Next Appointment</h3>
        <div className="flex items-center gap-8">
          {/* <Image
              src={"/placeholder.svg"}
              alt={"Barber"}
              width={50}
              height={50}
              className="h-full w-full object-cover"
            /> */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Service</p>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>Barber</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Date</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Time</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-6 pt-0">
        {/* <Link
          href={`/dashboard/appointments/${appointment.id}`}
          className="flex-1"
        > */}
        <Button variant="outline">Details</Button>
        {/* </Link> */}
        <Link href="/dashboard/appointments" className="flex-1">
          <Button>All Appointments</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
// src={appointment.image || "/placeholder.svg"}
// alt={appointment.barber}
// appointment.service
// {appointment.barber}
// {appointment.date}
// {appointment.time}
