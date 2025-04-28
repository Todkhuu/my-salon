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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, MoreHorizontal, Search } from "lucide-react";
import { AdminHeader } from "./_components/AdminHeader";
import { AppointmentForm } from "./_components/AppointmentForm";
import { toast } from "sonner";

// This would come from your database in a real app
const initialAppointments = [
  {
    id: "1",
    customer: "Alex Johnson",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    service: "fade",
    barber: "john",
    date: new Date("2025-04-15"),
    time: "10:00 AM",
    duration: "45 min",
    price: "$35",
    status: "upcoming",
  },
  {
    id: "2",
    customer: "Emma Wilson",
    email: "emma@example.com",
    phone: "(555) 234-5678",
    service: "single-color",
    barber: "sarah",
    date: new Date("2025-04-15"),
    time: "11:30 AM",
    duration: "90 min",
    price: "$65",
    status: "upcoming",
  },
  {
    id: "3",
    customer: "Michael Brown",
    email: "michael@example.com",
    phone: "(555) 345-6789",
    service: "beard-trim",
    barber: "mike",
    date: new Date("2025-04-15"),
    time: "1:00 PM",
    duration: "15 min",
    price: "$15",
    status: "upcoming",
  },
  {
    id: "4",
    customer: "Sophia Garcia",
    email: "sophia@example.com",
    phone: "(555) 456-7890",
    service: "manicure",
    barber: "lisa",
    date: new Date("2025-04-15"),
    time: "2:30 PM",
    duration: "45 min",
    price: "$35",
    status: "upcoming",
  },
  {
    id: "5",
    customer: "David Lee",
    email: "david@example.com",
    phone: "(555) 567-8901",
    service: "regular-cut",
    barber: "john",
    date: new Date("2025-04-14"),
    time: "3:00 PM",
    duration: "30 min",
    price: "$25",
    status: "completed",
  },
  {
    id: "6",
    customer: "Olivia Martinez",
    email: "olivia@example.com",
    phone: "(555) 678-9012",
    service: "highlights",
    barber: "sarah",
    date: new Date("2025-04-14"),
    time: "1:30 PM",
    duration: "120 min",
    price: "$85",
    status: "completed",
  },
  {
    id: "7",
    customer: "James Taylor",
    email: "james@example.com",
    phone: "(555) 789-0123",
    service: "premium",
    barber: "mike",
    date: new Date("2025-04-14"),
    time: "11:00 AM",
    duration: "60 min",
    price: "$45",
    status: "cancelled",
  },
];

// Map service IDs to names for display
const serviceNames: Record<string, string> = {
  "regular-cut": "Regular Haircut",
  fade: "Fade Haircut",
  premium: "Premium Cut & Style",
  "beard-trim": "Beard Trim",
  "beard-style": "Beard Styling",
  "single-color": "Single Color",
  highlights: "Highlights",
  manicure: "Basic Manicure",
  pedicure: "Basic Pedicure",
};

// Map barber IDs to names for display
const barberNames: Record<string, string> = {
  john: "John Smith",
  sarah: "Sarah Johnson",
  mike: "Mike Williams",
  lisa: "Lisa Chen",
};

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [barberFilter, setBarberFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);

  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by search query
    const matchesSearch =
      appointment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      serviceNames[appointment.service]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    // Filter by barber
    const matchesBarber =
      barberFilter === "all" || appointment.barber === barberFilter;

    // Filter by service
    const matchesService =
      serviceFilter === "all" || appointment.service === serviceFilter;

    // Filter by date
    const matchesDate =
      !date ||
      format(appointment.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

    return (
      matchesSearch &&
      matchesStatus &&
      matchesBarber &&
      matchesService &&
      matchesDate
    );
  });

  const handleAddAppointment = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditAppointment = (appointment: any) => {
    setCurrentAppointment(appointment);
    setIsEditDialogOpen(true);
  };

  const handleDeleteAppointment = (appointment: any) => {
    setCurrentAppointment(appointment);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateAppointment = (data: any) => {
    const newAppointment = {
      id: `${appointments.length + 1}`,
      ...data,
      duration: data.service === "fade" ? "45 min" : "30 min", // Example logic
      price: data.service === "fade" ? "$35" : "$25", // Example logic
    };

    setAppointments([newAppointment, ...appointments]);
    setIsAddDialogOpen(false);
    // toast({
    //   title: "Appointment created",
    //   description: `Appointment for ${data.customer} has been created successfully.`,
    // });
    toast("Appointment created");
  };

  const handleUpdateAppointment = (data: any) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === currentAppointment.id
        ? { ...appointment, ...data }
        : appointment
    );

    setAppointments(updatedAppointments);
    setIsEditDialogOpen(false);
    // toast({
    //   title: "Appointment updated",
    //   description: `Appointment for ${data.customer} has been updated successfully.`,
    // });
    toast("Appointment updated");
  };

  const handleConfirmDelete = () => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== currentAppointment.id
    );

    setAppointments(updatedAppointments);
    setIsDeleteDialogOpen(false);
    // toast({
    //   title: "Appointment deleted",
    //   description: `Appointment for ${currentAppointment.customer} has been deleted.`,
    //   variant: "destructive",
    // });
    toast("Appointment deleted");
  };

  const handleSendReminder = (appointment: any) => {
    // toast({
    //   title: "Reminder sent",
    //   description: `Reminder sent to ${
    //     appointment.customer
    //   } for their appointment on ${format(appointment.date, "PPP")} at ${
    //     appointment.time
    //   }.`,
    // });
    toast("Reminder sent");
  };

  const handleCancelAppointment = (appointment: any) => {
    const updatedAppointments = appointments.map((a) =>
      a.id === appointment.id ? { ...a, status: "cancelled" } : a
    );

    setAppointments(updatedAppointments);
    // toast({
    //   title: "Appointment cancelled",
    //   description: `Appointment for ${appointment.customer} has been cancelled.`,
    //   variant: "destructive",
    // });
    toast("Appointment cancelled");
  };

  const handleCompleteAppointment = (appointment: any) => {
    const updatedAppointments = appointments.map((a) =>
      a.id === appointment.id ? { ...a, status: "completed" } : a
    );

    setAppointments(updatedAppointments);
    // toast({
    //   title: "Appointment completed",
    //   description: `Appointment for ${appointment.customer} has been marked as completed.`,
    // });
    toast("Appointment completed");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <AdminHeader
        title="Appointments"
        description="Manage your barbershop appointments"
        action={{ label: "Add Appointment", onClick: handleAddAppointment }}
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
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Filter by Barber</h3>
                  <Select value={barberFilter} onValueChange={setBarberFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select barber" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Barbers</SelectItem>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Williams</SelectItem>
                      <SelectItem value="lisa">Lisa Chen</SelectItem>
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
                      <SelectItem value="regular-cut">
                        Regular Haircut
                      </SelectItem>
                      <SelectItem value="fade">Fade Haircut</SelectItem>
                      <SelectItem value="premium">
                        Premium Cut & Style
                      </SelectItem>
                      <SelectItem value="beard-trim">Beard Trim</SelectItem>
                      <SelectItem value="single-color">
                        Hair Coloring
                      </SelectItem>
                      <SelectItem value="manicure">Manicure</SelectItem>
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

          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-4">
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
                    {filteredAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No appointments found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {appointment.customer}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {appointment.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{serviceNames[appointment.service]}</div>
                              <div className="text-sm text-muted-foreground">
                                {appointment.duration}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {barberNames[appointment.barber]}
                          </TableCell>
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
                                appointment.status === "completed"
                                  ? "default"
                                  : appointment.status === "upcoming"
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
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleEditAppointment(appointment)
                                  }
                                >
                                  Edit appointment
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleSendReminder(appointment)
                                  }
                                >
                                  Send reminder
                                </DropdownMenuItem>
                                {appointment.status === "upcoming" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleCompleteAppointment(appointment)
                                    }
                                  >
                                    Mark as completed
                                  </DropdownMenuItem>
                                )}
                                {appointment.status === "upcoming" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleCancelAppointment(appointment)
                                    }
                                  >
                                    Cancel appointment
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-red-500"
                                  onClick={() =>
                                    handleDeleteAppointment(appointment)
                                  }
                                >
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
            </TabsContent>
            <TabsContent value="calendar" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    Calendar view would be implemented here with a full calendar
                    component showing all appointments.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Appointment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <AppointmentForm
            onSubmit={handleCreateAppointment}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          {currentAppointment && (
            <AppointmentForm
              initialData={currentAppointment}
              onSubmit={handleUpdateAppointment}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the appointment for{" "}
              {currentAppointment?.customer}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
