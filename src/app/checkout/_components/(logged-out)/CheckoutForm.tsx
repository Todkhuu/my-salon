"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ServiceType, StaffType } from "@/app/utils/types";

const formSchema = z.object({
  username: z.string().min(2, "Нэр хамгийн багадаа 2 үсэг байх ёстой"),
  email: z.string().email("И-мэйл буруу байна"),
  phone: z.string().regex(/^(\+976)?[0-9]{8}$/, "Утасны дугаар буруу байна"),
});

type Props = {
  onComplete: () => void;
  staff: StaffType | undefined;
  service: ServiceType | undefined;
  date: Date | null;
  time: string | null;
};

export default function CheckoutForm({
  onComplete,
  staff,
  service,
  date,
  time,
}: Props) {
  const [showQR, setShowQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setShowQR(true);

    const appointmentData = {
      staffId: staff?._id,
      serviceIds: [service?._id],
      date: date?.toISOString(),
      time: time,
      paymentMethod: "Qpay",
      paid: true,
      price: service?.price,
      ...values,
    };

    if (showQR) {
      setIsProcessing(true);
      try {
        await axios.post("/api/appointment", appointmentData);
        onComplete(); // 🤘 parent-д мэдэгдэх
      } catch (err) {
        alert("Алдаа гарлаа. Дахин оролдоно уу.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {["username", "email", "phone"].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as "username" | "email" | "phone"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {field.name === "username"
                    ? "Нэр"
                    : field.name === "email"
                    ? "И-мэйл"
                    : "Утасны дугаар"}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={
                      field.name === "email"
                        ? "email"
                        : field.name === "phone"
                        ? "tel"
                        : "text"
                    }
                    placeholder={
                      field.name === "username"
                        ? "Таны нэр"
                        : field.name === "email"
                        ? "example@mail.com"
                        : "88888888"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {showQR && (
          <div className="text-center my-6">
            <h3 className="text-xl font-semibold mb-2">QPay-р төлбөр төлөх</h3>
            <Image
              src="https://res.cloudinary.com/ds6kxgjh0/image/upload/v1745468279/qr_kyd9cn.png"
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
              Боловсруулж байна...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {showQR ? "Төлбөр шалгах" : "Цаг товлох"}
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
