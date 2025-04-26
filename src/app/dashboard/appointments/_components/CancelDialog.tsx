"use client";

import { useState } from "react";
import { AlertCircle, CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    id: string;
    service: string;
    barber: string;
    date: string;
    time: string;
    duration: string;
    price: string;
  };
}

export function CancelDialog({
  open,
  onOpenChange,
  appointment,
}: CancelDialogProps) {
  const [cancellationReason, setCancellationReason] = useState("");
  const [reasonType, setReasonType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate if the appointment is within 24 hours
  const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
  const now = new Date();
  const hoursDifference =
    (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const isWithin24Hours = hoursDifference <= 24;

  const handleCancel = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);

      // In a real app, you would redirect or update the UI
      window.location.href = `/dashboard/appointments?cancelled=true`;
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your appointment? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Appointment info */}
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

          {/* Cancellation reason */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Reason for cancellation</h4>
              <RadioGroup value={reasonType} onValueChange={setReasonType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="schedule_conflict"
                    id="schedule_conflict"
                  />
                  <Label htmlFor="schedule_conflict">Schedule conflict</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="change_of_mind" id="change_of_mind" />
                  <Label htmlFor="change_of_mind">Change of mind</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="service_issue" id="service_issue" />
                  <Label htmlFor="service_issue">Issue with service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                Additional comments (optional)
              </h4>
              <Textarea
                placeholder="Please provide any additional details..."
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Cancellation policy */}
          <Alert variant={isWithin24Hours ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Cancellation Policy</AlertTitle>
            <AlertDescription>
              {isWithin24Hours ? (
                <>
                  Your appointment is within 24 hours. A cancellation fee of 50%
                  (
                  {(
                    Number.parseFloat(appointment.price.replace("$", "")) * 0.5
                  ).toFixed(2)}
                  ) will be applied.
                </>
              ) : (
                <>
                  Cancellations made more than 24 hours in advance are free of
                  charge.
                </>
              )}
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Keep Appointment
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
