"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  ChevronLeft,
  Shield,
} from "lucide-react";
// import { SavedPaymentMethods } from "@/components/checkout/saved-payment-methods";
// import { AppointmentSummary } from "@/components/checkout/appointment-summary";
// import { UserContactInfo } from "@/components/checkout/user-contact-info";

export default function LoggedInCheckoutPage({
  searchParams,
}: {
  searchParams: {
    barber?: string;
    service?: string;
    date?: string;
    time?: string;
  };
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("saved");
  const [saveNewCard, setSaveNewCard] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Mock user data - in a real app, this would come from an API or auth context
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
  };

  // Mock saved payment methods - in a real app, this would come from an API
  const savedPaymentMethods = [
    {
      id: "card1",
      type: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: "card2",
      type: "mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2024,
      isDefault: false,
    },
  ];

  const barberId = searchParams.barber || "john";
  const serviceId = searchParams.service || "regular-cut";
  const dateString = searchParams.date;
  const timeString = searchParams.time;

  // Mock data - in a real app, this would come from your database
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

  const barber = barbers[barberId as keyof typeof barbers];
  const service = services[serviceId as keyof typeof services];
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
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
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
                src={barber.image || "/placeholder.svg"}
                alt={barber.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="font-medium">{barber.name}</h3>
              <p className="text-sm text-gray-500">{barber.title}</p>
            </div>
          </div>

          <div className="mb-4 space-y-2 border-b pb-4 text-left">
            <div className="flex justify-between">
              <span className="font-medium">{service.name}</span>
              <span>${service.price}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{service.duration} min</span>
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
    <div className="container px-4 py-8 md:px-6 md:py-12">
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
              {/* <UserContactInfo userData={userData} /> */}
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

            <div className="mb-6 rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-bold">Payment Method</h2>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
              >
                <div className="mb-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="saved" id="saved" />
                    <Label htmlFor="saved" className="font-medium">
                      Use Saved Payment Method
                    </Label>
                  </div>
                  {selectedPaymentMethod === "saved" && (
                    <div className="ml-6">
                      {/* <SavedPaymentMethods
                        paymentMethods={savedPaymentMethods}
                      /> */}
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="font-medium">
                      Use New Payment Method
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {selectedPaymentMethod === "new" && (
                <Tabs defaultValue="card" className="mt-4">
                  <TabsList className="mb-4 grid w-full grid-cols-2">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input
                          id="name-on-card"
                          defaultValue={`${userData.firstName} ${userData.lastName}`}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="save-card"
                          checked={saveNewCard}
                          onCheckedChange={(checked) =>
                            setSaveNewCard(!!checked)
                          }
                        />
                        <Label htmlFor="save-card">
                          Save this card for future bookings
                        </Label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal">
                    <div className="flex flex-col items-center justify-center space-y-4 p-6">
                      <p className="text-center text-gray-500">
                        You will be redirected to PayPal to complete your
                        payment.
                      </p>
                      <Image
                        src="/placeholder.svg?height=60&width=120"
                        alt="PayPal"
                        width={120}
                        height={60}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              <div className="mt-6 flex items-center rounded-md bg-blue-50 p-3 text-blue-800">
                <Shield className="mr-2 h-5 w-5" />
                <p className="text-sm">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>

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
          {/* <AppointmentSummary
            barber={barber}
            service={service}
            date={date}
            time={time}
          /> */}
        </div>
      </div>
    </div>
  );
}
