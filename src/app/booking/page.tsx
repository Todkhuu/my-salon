"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { addDays, format, isAfter, isBefore } from "date-fns";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ServiceType, StaffType } from "../utils/types";
import axios from "axios";

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

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [staffs, setStaffs] = useState<StaffType[] | null>(null);
  const [services, setServices] = useState<ServiceType[] | null>(null);
  // console.log("date", date);

  const searchParams = useSearchParams();
  const staffId = searchParams.get("staffs") || "john";
  const serviceId = searchParams.get("service") || "regular-cut";

  const staff = staffs?.find((staff) => staff._id === staffId);
  const service = services?.find((service) => service._id === serviceId);

  const getStaffs = async () => {
    try {
      const staffs = await axios.get("/api/staff");
      setStaffs(staffs.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async () => {
    const services = await axios.get("/api/service");
    setServices(services.data.data);
  };

  useEffect(() => {
    getStaffs();
    getServices();
  }, []);

  if (!staff || !service) {
    return (
      <div className="container p-8">Invalid barber or service selection</div>
    );
  }

  const today = new Date();
  const oneWeekLater = addDays(today, 7);

  const isOutsideRange = (date: Date) =>
    isBefore(date, today) || isAfter(date, oneWeekLater);

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
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
                  onSelect={(selected) => {
                    if (selected && !isOutsideRange(selected)) {
                      setDate(selected);
                    }
                  }}
                  className="rounded-md border"
                  disabled={isOutsideRange}
                  modifiers={{
                    outsideRange: isOutsideRange,
                  }}
                  modifiersClassNames={{
                    outsideRange: "text-gray-300", // бүдгэрүүлсэн өнгө
                  }}
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
                    src={staff.image || "/placeholder.svg"}
                    alt={staff.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{staff.name}</h3>
                  {/* <p className="text-sm text-gray-500">{staff.title}</p> */}
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
                href={`/checkout?barber=${staffId}&service=${serviceId}${
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
