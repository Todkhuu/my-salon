"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formState.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formState.subject) {
      errors.subject = "Please select a subject";
    }

    if (!formState.message.trim()) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }));

    // Clear error when user selects
    if (formErrors.subject) {
      setFormErrors((prev) => ({ ...prev, subject: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-black py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Contact us"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-[1400px] m-auto relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Get In Touch
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-200">
              Have questions or want to book an appointment? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">Contact Information</h2>

              <div className="mb-8 space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-black" />
                  <div>
                    <h3 className="font-bold">Location</h3>
                    <p className="text-gray-600">
                      123 Main Street, Anytown, USA 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-black" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-black" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">info@stylecut.com</p>
                  </div>
                </div>
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Monday - Friday</span>
                      </div>
                      <span>9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Saturday</span>
                      </div>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Sunday</span>
                      </div>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Map location"
                  width={500}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">Send Us a Message</h2>

              {isSubmitted ? (
                <div className="rounded-lg bg-green-50 p-6">
                  <div className="flex items-center">
                    <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                    <h3 className="text-xl font-bold text-green-800">
                      Message Sent!
                    </h3>
                  </div>
                  <p className="mt-2 text-green-700">
                    Thank you for contacting us. We'll get back to you as soon
                    as possible.
                  </p>
                  <Button
                    className="mt-4 bg-black text-white hover:bg-gray-800"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formState.subject}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger
                        className={formErrors.subject ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="appointment">
                          Appointment Question
                        </SelectItem>
                        <SelectItem value="services">
                          Services Information
                        </SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="careers">
                          Career Opportunities
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.subject && (
                      <p className="text-sm text-red-500">
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className={formErrors.message ? "border-red-500" : ""}
                    />
                    {formErrors.message && (
                      <p className="text-sm text-red-500">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mb-12 text-gray-600">
              Find quick answers to common questions
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-bold">
                  Do I need to make an appointment?
                </h3>
                <p className="text-gray-600">
                  While we do accept walk-ins when available, we highly
                  recommend booking an appointment to ensure you get your
                  preferred time slot and stylist.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-bold">
                  How far in advance should I book?
                </h3>
                <p className="text-gray-600">
                  For weekdays, we recommend booking 2-3 days in advance. For
                  weekends or if you want a specific stylist, 5-7 days in
                  advance is best.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-bold">
                  What is your cancellation policy?
                </h3>
                <p className="text-gray-600">
                  We appreciate at least 24 hours notice for cancellations. This
                  allows us to offer the time slot to other clients.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-bold">
                  Do you offer gift cards?
                </h3>
                <p className="text-gray-600">
                  Yes! Gift cards are available for purchase in-store or online.
                  They make perfect gifts for any occasion.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/services">
              <Button className="bg-black text-white hover:bg-gray-800">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="rounded-lg bg-gradient-to-r from-gray-900 to-black p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Book Your Appointment?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-200">
              Experience the StyleCut difference today. Our team of
              professionals is ready to help you look and feel your best.
            </p>
            <Link href="/booking">
              <Button className="bg-white text-black hover:bg-gray-100">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
