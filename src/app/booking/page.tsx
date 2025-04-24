"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useService } from "../_context/ServiceContext";
import { useStaff } from "../_context/StaffContext";
import Breadcrumbs from "./_components/Breadcrumbs";
import { DateTimeSelector } from "./_components/DateTimeSelector";
import { AppointmentSummary } from "./_components/AppointmentSummary";

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { staffs } = useStaff();
  const { services } = useService();

  const searchParams = useSearchParams();
  const staffId = searchParams.get("staffs") || "john";
  const serviceId = searchParams.get("service") || "regular-cut";

  const staff = staffs?.find((staff) => staff._id === staffId);
  const service = services?.find((service) => service._id === serviceId);

  if (!staff || !service) return <div></div>;

  return (
    <div className="max-w-[1400px] m-auto px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Book Your Appointment</h1>
        <p className="text-gray-500">Select a date and time for your service</p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DateTimeSelector
            date={date}
            setDate={setDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
        <div>
          <AppointmentSummary
            staff={staff}
            service={service}
            date={date}
            selectedTime={selectedTime}
            staffId={staffId}
            serviceId={serviceId}
          />
        </div>
      </div>
    </div>
  );
}
