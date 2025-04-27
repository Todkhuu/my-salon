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
import { AppointmentType } from "@/app/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: AppointmentType;
}

export function CancelDialog({
  open,
  onOpenChange,
  appointment,
}: CancelDialogProps) {
  const [cancellationReason, setCancellationReason] = useState("");
  const [reasonType, setReasonType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const datePart = appointment.date.toString().split("T")[0];
  const appointmentDate = new Date(`${datePart} ${appointment.time}`);

  const now = new Date();
  const hoursDifference =
    (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const isWithin24Hours = hoursDifference <= 24;

  const handleCancel = async () => {
    setIsSubmitting(true);

    try {
      await axios.post("/api/appointment/cancel", {
        appointmentId: appointment._id,
        cancellationReason,
        reasonType,
        price: appointment.price,
      });

      setIsSubmitting(false);
      onOpenChange(false);
      router.push("/dashboard/appointments?cancelled=true");
    } catch (error) {
      console.error("Уулзалтыг цуцлах үед алдаа гарлаа:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Уулзалтыг цуцлах</DialogTitle>
          <DialogDescription>
            Та уулзалтаа цуцлахыг хүсч байна уу? Энэ үйлдлийг буцааж болохгүй.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Appointment info */}
          <div className="rounded-md border p-3">
            <div className="font-medium">{appointment.serviceId.name}</div>
            <div className="text-sm text-muted-foreground">
              {appointment.staffId.name}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{appointment.date.toString().split("T")[0]}</span>
              <span>•</span>
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{appointment.time}</span>
              <Badge variant="outline" className="ml-auto">
                {appointment.serviceId.duration} мин
              </Badge>
            </div>
          </div>

          {/* Cancellation reason */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Цуцлах шалтгаан</h4>
              <RadioGroup value={reasonType} onValueChange={setReasonType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="schedule_conflict"
                    id="schedule_conflict"
                  />
                  <Label htmlFor="schedule_conflict">Цагийн асуудал</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="change_of_mind" id="change_of_mind" />
                  <Label htmlFor="change_of_mind">Бодол өөрчлөгдсөн</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="service_issue" id="service_issue" />
                  <Label htmlFor="service_issue">
                    Үйлчилгээтэй холбоотой асуудал
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Бусад</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                Нэмэлт тайлбар (заавал биш)
              </h4>
              <Textarea
                placeholder="Нэмэлт мэдээлэл оруулна уу..."
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="min-h-[80px]"
                rows={4}
              />
            </div>
          </div>

          {/* Cancellation policy */}
          <Alert variant={isWithin24Hours ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Цуцлах бодлого</AlertTitle>
            <AlertDescription>
              {isWithin24Hours ? (
                <>
                  Таны уулзалт 24 цагийн дотор байна. 50% цуцлах хураамж (
                  {(appointment.price * 0.5).toFixed(2)}) ногдуулна.
                </>
              ) : (
                <>24 цагийн өмнө цуцлах нь үнэ төлбөргүй.</>
              )}
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Уулзалтыг хадгалах
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isSubmitting || !reasonType}
          >
            {isSubmitting ? "Цуцалж байна..." : "Цуцлалт баталгаажуулах"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
