"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, User, MoreHorizontal } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data - in a real app, this would come from an API
  const upcomingAppointments = [
    {
      id: "1",
      service: "Fade Haircut",
      barber: "John Smith",
      date: "April 20, 2025",
      time: "10:00 AM",
      duration: "45 min",
      price: "$35",
      status: "confirmed",
      image: "/placeholder.svg?height=50&width=50",
    },
  ];

  const pastAppointments = [
    {
      id: "2",
      service: "Regular Haircut",
      barber: "Sarah Johnson",
      date: "April 5, 2025",
      time: "2:30 PM",
      duration: "30 min",
      price: "$25",
      status: "completed",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "3",
      service: "Beard Trim",
      barber: "Mike Williams",
      date: "March 22, 2025",
      time: "11:15 AM",
      duration: "15 min",
      price: "$15",
      status: "completed",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "4",
      service: "Hair Coloring",
      barber: "Sarah Johnson",
      date: "March 10, 2025",
      time: "1:00 PM",
      duration: "90 min",
      price: "$65",
      status: "completed",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "5",
      service: "Premium Cut & Style",
      barber: "John Smith",
      date: "February 28, 2025",
      time: "4:30 PM",
      duration: "60 min",
      price: "$45",
      status: "completed",
      image: "/placeholder.svg?height=50&width=50",
    },
  ];

  const cancelledAppointments = [
    {
      id: "6",
      service: "Manicure",
      barber: "Lisa Chen",
      date: "March 15, 2025",
      time: "3:00 PM",
      duration: "45 min",
      price: "$35",
      status: "cancelled",
      image: "/placeholder.svg?height=50&width=50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground">
          View and manage your appointments
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_250px]">
        <div className="space-y-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6 space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={appointment.image || "/placeholder.svg"}
                              alt={appointment.barber}
                              width={50}
                              height={50}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {appointment.service}
                            </h3>
                            <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:gap-3">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{appointment.barber}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                          <Badge
                            variant="outline"
                            className="whitespace-nowrap"
                          >
                            {appointment.duration}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="whitespace-nowrap"
                          >
                            {appointment.price}
                          </Badge>
                          <Badge className="whitespace-nowrap">
                            {appointment.status === "confirmed"
                              ? "Confirmed"
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
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                Cancel appointment
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
                  <h3 className="mb-1 text-lg font-medium">
                    No upcoming appointments
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Book your next appointment today
                  </p>
                  <Link href="/services">
                    <Button>Book Appointment</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6 space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={appointment.image || "/placeholder.svg"}
                            alt={appointment.barber}
                            width={50}
                            height={50}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.service}</h3>
                          <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:gap-3">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{appointment.barber}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{appointment.date}</span>
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
                          {appointment.duration}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="whitespace-nowrap"
                        >
                          {appointment.price}
                        </Badge>
                        <Badge variant="outline" className="whitespace-nowrap">
                          Completed
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-6 space-y-4">
              {cancelledAppointments.length > 0 ? (
                cancelledAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={appointment.image || "/placeholder.svg"}
                              alt={appointment.barber}
                              width={50}
                              height={50}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {appointment.service}
                            </h3>
                            <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:gap-3">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{appointment.barber}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                          <Badge
                            variant="outline"
                            className="whitespace-nowrap"
                          >
                            {appointment.duration}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="whitespace-nowrap"
                          >
                            {appointment.price}
                          </Badge>
                          <Badge
                            variant="destructive"
                            className="whitespace-nowrap"
                          >
                            Cancelled
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Book Again
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <CalendarIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-1 text-lg font-medium">
                    No cancelled appointments
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You don't have any cancelled appointments
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View your appointments by date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/services">
                <Button className="w-full">Book New Appointment</Button>
              </Link>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
