"use client";
import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, CreditCard, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { StaffType } from "../../utils/types";
import axios from "axios";
import { useService } from "@/app/_context/ServiceContext";
import { useStaff } from "@/app/_context/StaffContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2, "Нэр хамгийн багадаа 2 үсэг байх ёстой"),
  email: z.string().email("И-мэйл буруу байна"),
  phoneNumber: z
    .string()
    .regex(/^(\+976)?[0-9]{8}$/, "Утасны дугаар буруу байна"),
});

export default function CheckoutPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
    },
  });
  const [showQR, setShowQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setShowQR(true);

    const appointmentData = {
      staffId: staffId,
      serviceIds: [serviceId],
      date: dateString,
      time: timeString,
      paymentMethod: "Qpay",
      paid: true,
      price: service?.price,
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };
    if (showQR) {
      setIsProcessing(true);
      try {
        await axios.post("/api/appointment", appointmentData);
        setIsComplete(true);
      } catch (error) {
        console.error("Error booking appointment:", error);
        alert("Алдаа гарлаа. Дахин оролдоно уу.");
      } finally {
        setIsProcessing(false);
      }
    }
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
                alt={"barber.name"}
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
        <Link href="/">
          <Button className="bg-black text-white hover:bg-gray-800">
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] m-auto  px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/booking" className="text-sm text-gray-500 hover:underline">
          Booking
        </Link>{" "}
        / <span className="text-sm font-medium">Checkout</span>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Checkout</h1>
        <p className="text-gray-500">
          Complete your booking by providing payment details
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Таны нэр" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>И-мэйл</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Утасны дугаар</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="88888888" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showQR && (
                <div className="text-center my-6">
                  <h3 className="text-xl font-semibold mb-2">QPay QR код</h3>
                  <Image
                    src="https://res.cloudinary.com/ds6kxgjh0/image/upload/v1745468279/qr_kyd9cn.png" // 👈 QPay QR demo image or dynamic src
                    alt="Qpay QR"
                    width={200}
                    height={200}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Төлбөр төлсний дараа автоматаар баталгаажна
                  </p>
                </div>
              )}

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
                    {showQR ? "Check payment" : "Complete Booking"}
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-bold">Booking Summary</h2>

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
                <div>
                  <h3 className="font-medium">{staff?.name}</h3>
                  <p className="text-sm text-gray-500">{staff?.profession}</p>
                </div>
              </div>

              <div className="mb-4 space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <span className="font-medium">{service?.name}</span>
                  <span>${service?.price}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{service?.duration} min</span>
                </div>
              </div>

              <div className="mb-6 space-y-2">
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

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${service?.price}</span>
                </div>
                {typeof service?.price === "number" ? (
                  <>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(service.price * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 text-lg font-bold">
                      <span>Total</span>
                      <span>${(service.price * 1.1).toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-red-500">
                    Үнийн мэдээлэл байхгүй байна
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
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
