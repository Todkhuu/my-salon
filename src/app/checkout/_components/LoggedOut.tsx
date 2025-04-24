"use client";
import { IsCompleted } from "./(logged-out)/IsComplete";
import type React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useService } from "@/app/_context/ServiceContext";
import { useStaff } from "@/app/_context/StaffContext";
import { Breadcrumbs } from "./(logged-out)/Breadcrumbs";
import CheckoutTitle from "./(logged-out)/CheckoutTitle";
import CheckoutForm from "./(logged-out)/CheckoutForm";
import { BookingSummary } from "./(logged-out)/Booking Summary";

export default function CheckoutPage() {
  const [isComplete, setIsComplete] = useState(false);
  const { staffs } = useStaff();
  const { services } = useService();
  const searchParams = useSearchParams();
  const staffId = searchParams.get("staffs");
  const serviceId = searchParams.get("service");
  const dateString = searchParams.get("date");
  const timeString = searchParams.get("time");

  const staff = staffs?.find((staff) => staff._id === staffId);
  const service = services?.find((service) => service._id === serviceId);
  const date = dateString ? new Date(dateString) : null;
  const time = timeString || null;

  if (isComplete) {
    return (
      <IsCompleted staff={staff} service={service} date={date} time={time} />
    );
  }

  return (
    <div className="max-w-[1400px] m-auto  px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs staff={staff} service={service} />
      <CheckoutTitle />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm
            onComplete={() => setIsComplete(true)}
            staff={staff}
            service={service}
            date={date}
            time={time}
          />
        </div>

        <BookingSummary
          staff={staff}
          service={service}
          date={date}
          time={time}
        />
      </div>
    </div>
  );
}

// useEffect(() => {
//   if (showQR && !isComplete) {
//     const interval = setInterval(() => {
//       // fetch(`/api/check-payment?sessionId=...`)
//     }, 5000);

//     return () => clearInterval(interval);
//   }
// }, [showQR, isComplete]);

// const [qrUrl, setQrUrl] = useState<string | null>(null);

// useEffect(() => {
//   if (showQR) {
//     axios
//       .post("/api/qpay/create-payment", { price: service?.price })
//       .then((res) => setQrUrl(res.data.qrImage))
//       .catch(console.error);
//   }
// }, [showQR]);
