"use client";
import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { StaffType } from "@/app/utils/types";
import axios from "axios";
import { useUser } from "@/app/_context/UserContext";
import { UserContactInfo } from "@/components/checkout/UserContactInfo";
import { AppointmentSummary } from "@/components/checkout/AppointmentSummary";
import { useService } from "@/app/_context/ServiceContext";
import { useStaff } from "@/app/_context/StaffContext";

export default function LoggedInCheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { staffs } = useStaff();
  const { services } = useService();

  const { user } = useUser();

  const searchParams = useSearchParams();
  const staffId = searchParams.get("staffs");
  const serviceId = searchParams.get("service");
  const dateString = searchParams.get("date");
  const timeString = searchParams.get("time");

  const staff = staffs?.find((staff) => staff._id === staffId);
  const service = services?.find((service) => service._id === serviceId);
  const date = dateString ? new Date(dateString) : null;
  const time = timeString || null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="max-w-[1400px] m-auto flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Booking Confirmed!</h1>
        <p className="mb-8 max-w-md text-gray-500">
          Your appointment has been successfully booked. We've sent a
          confirmation to your email.
        </p>
        <div className="mb-8 w-full max-w-md rounded-lg border p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={staff?.image || "/placeholder.svg"}
                alt={"staff?.name"}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="font-medium">{staff?.name}</h3>
              <p className="text-sm text-gray-500">{staff?.profession}</p>
            </div>
          </div>

          <div className="mb-4 space-y-2 border-b pb-4 text-left">
            <div className="flex justify-between">
              <span className="font-medium">{service?.name}</span>
              <span>${service?.price}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{service?.duration} min</span>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>
                {date
                  ? date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date not specified"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{time || "Time not specified"}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/appointments">
            <Button variant="outline">View My Appointments</Button>
          </Link>
          <Link href="/home">
            <Button className="bg-black text-white hover:bg-gray-800">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] m-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link
          href="/booking"
          className="mb-4 flex items-center text-sm text-gray-500 hover:underline"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Booking
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Complete Your Booking</h1>
        <p className="text-gray-500">
          Review your appointment details and complete payment
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-bold">Contact Information</h2>
              <UserContactInfo user={user} />
            </div>

            <div className="mb-6 rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-bold">
                Special Instructions (Optional)
              </h2>
              <div className="space-y-2">
                <Label htmlFor="special-instructions">
                  Notes for your barber
                </Label>
                <textarea
                  id="special-instructions"
                  className="w-full rounded-md border p-2"
                  rows={3}
                  placeholder="Any special requests or preferences for your appointment"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>QPAY</div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Complete Booking
                </span>
              )}
            </Button>
          </form>
        </div>

        <div>
          <AppointmentSummary
            staff={staff}
            service={service}
            date={date}
            time={time}
          />
        </div>
      </div>
    </div>
  );
}
