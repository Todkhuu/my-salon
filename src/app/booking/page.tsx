"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";

// This would come from your database in a real app
const barbers = {
  john: {
    id: "john",
    name: "John Smith",
    title: "Master Barber",
    image: "/placeholder.svg?height=100&width=100",
  },
  sarah: {
    id: "sarah",
    name: "Sarah Johnson",
    title: "Senior Stylist",
    image: "/placeholder.svg?height=100&width=100",
  },
  mike: {
    id: "mike",
    name: "Mike Williams",
    title: "Barber & Colorist",
    image: "/placeholder.svg?height=100&width=100",
  },
  lisa: {
    id: "lisa",
    name: "Lisa Chen",
    title: "Nail Technician",
    image: "/placeholder.svg?height=100&width=100",
  },
};

const services = {
  "regular-cut": {
    id: "regular-cut",
    name: "Regular Haircut",
    duration: 30,
    price: 25,
  },
  fade: {
    id: "fade",
    name: "Fade Haircut",
    duration: 45,
    price: 35,
  },
  premium: {
    id: "premium",
    name: "Premium Cut & Style",
    duration: 60,
    price: 45,
  },
  "beard-trim": {
    id: "beard-trim",
    name: "Beard Trim",
    duration: 15,
    price: 15,
  },
  "beard-style": {
    id: "beard-style",
    name: "Beard Styling",
    duration: 30,
    price: 25,
  },
  "single-color": {
    id: "single-color",
    name: "Single Color",
    duration: 90,
    price: 65,
  },
  highlights: {
    id: "highlights",
    name: "Highlights",
    duration: 120,
    price: 85,
  },
  manicure: {
    id: "manicure",
    name: "Basic Manicure",
    duration: 30,
    price: 25,
  },
  pedicure: {
    id: "pedicure",
    name: "Basic Pedicure",
    duration: 45,
    price: 35,
  },
};

// Generate time slots from 9 AM to 5 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 17; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? "AM" : "PM";

    slots.push(`${hourFormatted}:00 ${period}`);
    slots.push(`${hourFormatted}:30 ${period}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export default function BookingPage({
  searchParams,
}: {
  searchParams: { barber?: string; service?: string };
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const barberId = searchParams.barber || "john";
  const serviceId = searchParams.service || "regular-cut";

  const barber = barbers[barberId as keyof typeof barbers];
  const service = services[serviceId as keyof typeof services];

  if (!barber || !service) {
    return (
      <div className="container p-8">Invalid barber or service selection</div>
    );
  }

  return (
    <div className="max-w-[1400px] m-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href="/services"
          className="text-sm text-gray-500 hover:underline"
        >
          Services
        </Link>{" "}
        /{" "}
        <Link href="/barbers" className="text-sm text-gray-500 hover:underline">
          Barbers
        </Link>{" "}
        / <span className="text-sm font-medium">Booking</span>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Book Your Appointment</h1>
        <p className="text-gray-500">Select a date and time for your service</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-bold">Select Date & Time</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-medium">Date</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>
              <div>
                <h3 className="mb-2 font-medium">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`h-auto py-2 ${
                        selectedTime === time ? "bg-black text-white" : ""
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-bold">Appointment Summary</h2>

              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={barber.image || "/placeholder.svg"}
                    alt={barber.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{barber.name}</h3>
                  <p className="text-sm text-gray-500">{barber.title}</p>
                </div>
              </div>

              <div className="mb-4 space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <span className="font-medium">{service.name}</span>
                  <span>${service.price}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} min</span>
                </div>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span>
                    {date
                      ? format(date, "EEEE, MMMM d, yyyy")
                      : "Select a date"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{selectedTime || "Select a time"}</span>
                </div>
              </div>

              <div className="mb-4 flex justify-between border-t border-b py-2">
                <span className="font-bold">Total</span>
                <span className="font-bold">${service.price}</span>
              </div>

              <Link
                href={`/checkout?barber=${barberId}&service=${serviceId}${
                  date ? `&date=${date.toISOString()}` : ""
                }${
                  selectedTime
                    ? `&time=${encodeURIComponent(selectedTime)}`
                    : ""
                }`}
              >
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={!date || !selectedTime}
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
