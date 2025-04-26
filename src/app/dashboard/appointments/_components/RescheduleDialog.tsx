"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface RescheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    id: string;
    service: string;
    barber: string;
    date: string;
    time: string;
    duration: string;
  };
}

export function RescheduleDialog({
  open,
  onOpenChange,
  appointment,
}: RescheduleDialogProps) {
  const [date, setDate] = useState<Date | undefined>(
    new Date(appointment.date)
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock available time slots - in a real app, these would be fetched based on the selected date
  const availableTimeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:30 PM",
    "4:30 PM",
  ];

  const handleReschedule = () => {
    if (!date || !selectedTime) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);

      // In a real app, you would redirect or update the UI
      window.location.href = `/dashboard/appointments?rescheduled=true`;
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Change the date and time of your appointment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current appointment info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Current Appointment</h4>
            <div className="rounded-md border p-3">
              <div className="font-medium">{appointment.service}</div>
              <div className="text-sm text-muted-foreground">
                with {appointment.barber}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.date}</span>
                <span>•</span>
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.time}</span>
                <Badge variant="outline" className="ml-auto">
                  {appointment.duration}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* New date selection */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Select New Date</h4>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      // Disable dates in the past and more than 30 days in the future
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const thirtyDaysFromNow = new Date();
                      thirtyDaysFromNow.setDate(today.getDate() + 30);
                      return date < today || date > thirtyDaysFromNow;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Time slot selection */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Select New Time</h4>
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={cn(
                    "h-9",
                    selectedTime === time &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Rescheduling Policy</AlertTitle>
            <AlertDescription>
              You can reschedule your appointment up to 4 hours before the
              scheduled time without any fees.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleReschedule}
            disabled={!date || !selectedTime || isSubmitting}
          >
            {isSubmitting ? "Rescheduling..." : "Confirm Reschedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
