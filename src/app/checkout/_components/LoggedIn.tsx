"use client";
import type React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/app/_context/UserContext";
import { UserContactInfo } from "@/app/checkout/_components/(logged-in)/UserContactInfo";
import { AppointmentSummary } from "@/app/checkout/_components/(logged-in)/AppointmentSummary";
import { useService } from "@/app/_context/ServiceContext";
import { useStaff } from "@/app/_context/StaffContext";
import axios from "axios";
import { IsCompleted } from "./(logged-out)/IsComplete";
import { CheckoutHeader } from "./(logged-in)/CheckoutHeader";
import { Qr } from "./(logged-in)/Qr";

export default function LoggedInCheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
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

  console.log("datee", date);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!user?.phoneNumber || !/^\d{8}$/.test(user.phoneNumber)) {
      setIsProcessing(false);
      return;
    }

    try {
      const res = await axios.post("/api/appointment", {
        userId: user?._id || null,
        staffId,
        serviceId: serviceId,
        date,
        time,
        price: service?.price,
        paymentMethod: "Qpay",
      });
      console.log("dateeee", date);

      if (res.status === 201 && res.data.success) {
        setIsComplete(true);
      } else {
        throw new Error("Failed to book appointment");
      }
    } catch (error: any) {
      console.error(error);
      alert("Booking failed: " + error?.response?.data?.error || error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <IsCompleted staff={staff} service={service} date={date} time={time} />
    );
  }

  return (
    <div className="max-w-[1400px] m-auto px-4 py-8 md:px-6 md:py-12">
      <CheckoutHeader staff={staff} service={service} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-bold">Хэрэглэгчийн мэдээлэл</h2>
              <UserContactInfo user={user} />
            </div>

            <Qr isProcessing={isProcessing} />
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
