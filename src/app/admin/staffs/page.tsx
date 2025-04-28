"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
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
import {
  BarberSchedule,
  type BarberSchedule as BarberScheduleType,
} from "../staffs/_components/StaffSchedule";
import {
  Calendar,
  Edit,
  MoreHorizontal,
  Search,
  Star,
  Trash,
} from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { AdminHeader } from "../appointments/_components/AdminHeader";
import { StaffForm } from "./_components/StaffForm";
import { toast } from "sonner";

// Default schedule for new barbers
const defaultSchedule: BarberScheduleType = {
  monday: { isWorking: true, startTime: "09:00", endTime: "17:00", breaks: [] },
  tuesday: {
    isWorking: true,
    startTime: "09:00",
    endTime: "17:00",
    breaks: [],
  },
  wednesday: {
    isWorking: true,
    startTime: "09:00",
    endTime: "17:00",
    breaks: [],
  },
  thursday: {
    isWorking: true,
    startTime: "09:00",
    endTime: "17:00",
    breaks: [],
  },
  friday: { isWorking: true, startTime: "09:00", endTime: "17:00", breaks: [] },
  saturday: {
    isWorking: false,
    startTime: "10:00",
    endTime: "16:00",
    breaks: [],
  },
  sunday: {
    isWorking: false,
    startTime: "10:00",
    endTime: "16:00",
    breaks: [],
  },
};

// This would come from your database in a real app
const initialBarbers = [
  {
    id: "john",
    name: "John Smith",
    title: "Master Barber",
    email: "john@stylecut.com",
    phone: "(555) 123-4567",
    experience: "10+ years",
    rating: 4.9,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=200",
    specialties: ["Fades", "Classic Cuts", "Beard Styling"],
    bio: "John is our senior barber with over a decade of experience. He specializes in classic cuts and modern fades, with a particular talent for precision beard styling.",
    availability: "Monday-Friday",
    schedule: {
      monday: {
        isWorking: true,
        startTime: "08:00",
        endTime: "16:00",
        breaks: [],
      },
      tuesday: {
        isWorking: true,
        startTime: "08:00",
        endTime: "16:00",
        breaks: [],
      },
      wednesday: {
        isWorking: true,
        startTime: "08:00",
        endTime: "16:00",
        breaks: [],
      },
      thursday: {
        isWorking: true,
        startTime: "08:00",
        endTime: "16:00",
        breaks: [],
      },
      friday: {
        isWorking: true,
        startTime: "08:00",
        endTime: "16:00",
        breaks: [],
      },
      saturday: {
        isWorking: false,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      sunday: {
        isWorking: false,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
    },
  },
  {
    id: "sarah",
    name: "Sarah Johnson",
    title: "Senior Stylist",
    email: "sarah@stylecut.com",
    phone: "(555) 234-5678",
    experience: "8 years",
    rating: 4.8,
    reviews: 98,
    image: "/placeholder.svg?height=200&width=200",
    specialties: ["Color Specialist", "Modern Styles", "Textured Cuts"],
    bio: "Sarah is our color specialist with 8 years of experience. She has a keen eye for modern styles and is known for her creative approach to hair coloring and textured cuts.",
    availability: "Tuesday-Saturday",
    schedule: {
      monday: {
        isWorking: false,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      tuesday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      wednesday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      thursday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      friday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      saturday: {
        isWorking: true,
        startTime: "10:00",
        endTime: "18:00",
        breaks: [],
      },
      sunday: {
        isWorking: false,
        startTime: "10:00",
        endTime: "16:00",
        breaks: [],
      },
    },
  },
  {
    id: "mike",
    name: "Mike Williams",
    title: "Barber & Colorist",
    email: "mike@stylecut.com",
    phone: "(555) 345-6789",
    experience: "5 years",
    rating: 4.7,
    reviews: 76,
    image: "/placeholder.svg?height=200&width=200",
    specialties: ["Hair Coloring", "Fades", "Beard Grooming"],
    bio: "Mike combines traditional barbering with modern coloring techniques. With 5 years of experience, he's become a favorite for clients looking for a complete style transformation.",
    availability: "Wednesday-Sunday",
    schedule: {
      monday: {
        isWorking: false,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      tuesday: {
        isWorking: false,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      wednesday: {
        isWorking: true,
        startTime: "11:00",
        endTime: "19:00",
        breaks: [],
      },
      thursday: {
        isWorking: true,
        startTime: "11:00",
        endTime: "19:00",
        breaks: [],
      },
      friday: {
        isWorking: true,
        startTime: "11:00",
        endTime: "19:00",
        breaks: [],
      },
      saturday: {
        isWorking: true,
        startTime: "10:00",
        endTime: "18:00",
        breaks: [],
      },
      sunday: {
        isWorking: true,
        startTime: "10:00",
        endTime: "16:00",
        breaks: [],
      },
    },
  },
  {
    id: "lisa",
    name: "Lisa Chen",
    title: "Nail Technician",
    email: "lisa@stylecut.com",
    phone: "(555) 456-7890",
    experience: "7 years",
    rating: 4.9,
    reviews: 112,
    image: "/placeholder.svg?height=200&width=200",
    specialties: ["Manicures", "Pedicures", "Nail Art"],
    bio: "Lisa is our nail specialist with 7 years of experience. She's known for her attention to detail and creative nail art designs that keep clients coming back.",
    availability: "Monday-Saturday",
    schedule: {
      monday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      tuesday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      wednesday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      thursday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      friday: {
        isWorking: true,
        startTime: "09:00",
        endTime: "17:00",
        breaks: [],
      },
      saturday: {
        isWorking: true,
        startTime: "10:00",
        endTime: "16:00",
        breaks: [],
      },
      sunday: {
        isWorking: false,
        startTime: "10:00",
        endTime: "16:00",
        breaks: [],
      },
    },
  },
];

export default function BarbersPage() {
  // const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [barbers, setBarbers] = useState(initialBarbers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBarber, setCurrentBarber] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  const filteredBarbers = barbers.filter(
    (barber) =>
      barber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      barber.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      barber.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleAddBarber = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditBarber = (barber: any) => {
    setCurrentBarber(barber);
    setIsEditDialogOpen(true);
  };

  const handleDeleteBarber = (barber: any) => {
    setCurrentBarber(barber);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateBarber = (data: any) => {
    const newBarber = {
      id: `barber-${Date.now()}`,
      ...data,
      rating: 5.0,
      reviews: 0,
      schedule: defaultSchedule,
    };

    setBarbers([...barbers, newBarber]);
    setIsAddDialogOpen(false);
    // toast({
    //   title: "Barber added",
    //   description: `${data.name} has been added to your team.`,
    // });
    toast("");
  };

  const handleUpdateBarber = (data: any) => {
    const updatedBarbers = barbers.map((barber) =>
      barber.id === currentBarber.id ? { ...barber, ...data } : barber
    );

    setBarbers(updatedBarbers);
    setIsEditDialogOpen(false);
    // toast({
    //   title: "Barber updated",
    //   description: `${data.name}'s information has been updated successfully.`,
    // });
    toast("");
  };

  const handleConfirmDelete = () => {
    const updatedBarbers = barbers.filter(
      (barber) => barber.id !== currentBarber.id
    );

    setBarbers(updatedBarbers);
    setIsDeleteDialogOpen(false);
    // toast({
    //   title: "Barber deleted",
    //   description: `${currentBarber.name} has been removed from your team.`,
    //   variant: "destructive",
    // });
    toast("");
  };

  const handleSaveSchedule = (
    barberId: string,
    schedule: BarberScheduleType
  ) => {
    const updatedBarbers = barbers.map((barber) =>
      barber.id === barberId ? { ...barber, schedule } : barber
    );
    // setBarbers(!updatedBarbers);/////////////////////////////////////////////////////////////////////////
  };

  const handleViewSchedule = (barberId: string) => {
    setSelectedBarber(barberId);
    setActiveTab("schedule");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <AdminHeader
        title="Barbers"
        description="Manage your barbershop staff"
        action={{ label: "Add Barber", onClick: handleAddBarber }}
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="list">Barber List</TabsTrigger>
            <TabsTrigger value="schedule">Schedules</TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search barbers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="list" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBarbers.length === 0 ? (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No barbers found. Try adjusting your search or add a new barber.
              </div>
            ) : (
              filteredBarbers.map((barber) => (
                <Card key={barber.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={barber.image || "/placeholder.svg"}
                      alt={barber.name}
                      width={200}
                      height={200}
                      className="aspect-square w-full object-cover"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewSchedule(barber.id)}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          View schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditBarber(barber)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit barber
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDeleteBarber(barber)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete barber
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-bold">{barber.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{barber.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {barber.title}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {barber.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {barber.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>{" "}
                        {barber.phone}
                      </div>
                      <div>
                        <span className="font-medium">Availability:</span>{" "}
                        {barber.availability}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full"
                      onClick={() => handleViewSchedule(barber.id)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      View Schedule
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          {selectedBarber ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {barbers.find((b) => b.id === selectedBarber)?.name}'s
                  Schedule
                </h2>
                <Button variant="outline" onClick={() => setActiveTab("list")}>
                  Back to List
                </Button>
              </div>
              <BarberSchedule
                barberId={selectedBarber}
                barberName={
                  barbers.find((b) => b.id === selectedBarber)?.name || ""
                }
                initialSchedule={
                  barbers.find((b) => b.id === selectedBarber)?.schedule
                }
                onSave={handleSaveSchedule}
              />
            </>
          ) : (
            <div className="space-y-6">
              {filteredBarbers.map((barber) => (
                <div key={barber.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {barber.name}'s Schedule
                    </h2>
                  </div>
                  <BarberSchedule
                    barberId={barber.id}
                    barberName={barber.name}
                    initialSchedule={barber.schedule}
                    onSave={handleSaveSchedule}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Barber Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Barber</DialogTitle>
          </DialogHeader>
          <StaffForm
            onSubmit={handleCreateBarber}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Barber Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Barber</DialogTitle>
          </DialogHeader>
          {currentBarber && (
            <StaffForm
              initialData={currentBarber}
              onSubmit={handleUpdateBarber}
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
              This will permanently remove {currentBarber?.name} from your team.
              This action cannot be undone.
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
