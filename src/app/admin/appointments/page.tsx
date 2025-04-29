"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MoreHorizontal, Search } from "lucide-react";
import { AdminHeader } from "./_components/AdminHeader";
import { useAppointment } from "@/app/_context/AppointmentContext";
import { useCategory } from "@/app/_context/CategoryContext";

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const { appointments } = useAppointment();
  const { categories } = useCategory();

  const uniqueStaffNames = [
    ...new Set(appointments?.map((a) => a.staffId.name)),
  ];

  let filtered = appointments || [];

  if (searchQuery) {
    filtered = filtered.filter(
      (appointment) =>
        appointment.staffId.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        appointment.userId.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        appointment.serviceId.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }

  if (statusFilter !== "all") {
    filtered = filtered.filter(
      (appointment) => appointment.status === statusFilter
    );
  }

  if (staffFilter !== "all") {
    filtered = filtered.filter(
      (appointment) => appointment.staffId.name === staffFilter
    );
  }

  if (serviceFilter !== "all") {
    filtered = filtered.filter(
      (appointment) => appointment.serviceId.name === serviceFilter
    );
  }

  if (date) {
    filtered = filtered.filter(
      (appointment) =>
        format(appointment.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  }

  const filteredAppointments = filtered;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <AdminHeader
        title="Appointments"
        description="Manage your barbershop appointments"
      />

      <div className="grid gap-4 md:grid-cols-[250px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Filter by Status</h3>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                      <SelectItem value="CANCELED">CANCELED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Filter by Barber</h3>
                  <Select value={staffFilter} onValueChange={setStaffFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select barber" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Barbers</SelectItem>
                      {uniqueStaffNames?.map((name) => {
                        return (
                          <SelectItem key={name} value={`${name}`}>
                            {name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Filter by Service</h3>
                  <Select
                    value={serviceFilter}
                    onValueChange={setServiceFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      {categories?.map((category) => {
                        return (
                          <SelectItem value={`${category.name}`}>
                            {category.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </div>

          <div className="rounded-md border">
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
                        <div>
                          <div className="font-medium">
                            {appointment.userId.username}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.userId.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{[appointment.serviceId.name]}</div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.serviceId.duration}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{[appointment.staffId.name]}</TableCell>
                      <TableCell>
                        <div>
                          <div>{format(appointment.date, "PPP")}</div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.price}</TableCell>
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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Edit appointment
                            </DropdownMenuItem>
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
          </div>
        </div>
      </div>
    </div>
  );
}
