"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

// Mock services data - in a real app, this would come from your database
const availableServices = [
  { id: "haircut", name: "Haircut", category: "Haircuts" },
  { id: "fade", name: "Fade", category: "Haircuts" },
  { id: "buzzcut", name: "Buzz Cut", category: "Haircuts" },
  { id: "classiccut", name: "Classic Cut", category: "Haircuts" },
  { id: "beardtrim", name: "Beard Trim", category: "Beard Grooming" },
  { id: "beardshape", name: "Beard Shaping", category: "Beard Grooming" },
  { id: "beardstyle", name: "Beard Styling", category: "Beard Grooming" },
  { id: "shave", name: "Hot Towel Shave", category: "Beard Grooming" },
  { id: "haircolor", name: "Hair Coloring", category: "Hair Coloring" },
  { id: "highlights", name: "Highlights", category: "Hair Coloring" },
  { id: "balayage", name: "Balayage", category: "Hair Coloring" },
  { id: "manicure", name: "Manicure", category: "Nail Services" },
  { id: "pedicure", name: "Pedicure", category: "Nail Services" },
  { id: "nailart", name: "Nail Art", category: "Nail Services" },
];

// Group services by category for better organization
const servicesByCategory = availableServices.reduce((acc, service) => {
  if (!acc[service.category]) {
    acc[service.category] = [];
  }
  acc[service.category].push(service);
  return acc;
}, {} as Record<string, typeof availableServices>);

const formSchema = z.object({
  name: z.string().min(1, "Barber name is required"),
  title: z.string().min(1, "Job title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  experience: z.string().min(1, "Experience is required"),
  bio: z.string().min(1, "Bio is required"),
  availability: z.string().min(1, "Availability is required"),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
  image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BarberFormProps {
  initialData?: any;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

export function StaffForm({
  initialData,
  onSubmit,
  onCancel,
}: BarberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customSpecialty, setCustomSpecialty] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      title: "",
      email: "",
      phone: "",
      experience: "",
      bio: "",
      availability: "",
      specialties: [],
      image: "/placeholder.svg?height=200&width=200",
    },
  });

  const specialties = form.watch("specialties") || [];

  const handleAddCustomSpecialty = () => {
    if (customSpecialty && !specialties.includes(customSpecialty)) {
      form.setValue("specialties", [...specialties, customSpecialty]);
      setCustomSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialtyToRemove: string) => {
    form.setValue(
      "specialties",
      specialties.filter((s) => s !== specialtyToRemove)
    );
  };

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSpecialty = (specialty: string) => {
    const currentSpecialties = form.getValues("specialties") || [];
    if (currentSpecialties.includes(specialty)) {
      form.setValue(
        "specialties",
        currentSpecialties.filter((s) => s !== specialty)
      );
    } else {
      form.setValue("specialties", [...currentSpecialties, specialty]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter barber name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Master Barber" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="barber@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 5 years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Monday-Friday" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter barber bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialties"
          render={() => (
            <FormItem>
              <FormLabel>Specialties</FormLabel>
              <div className="flex flex-wrap gap-2 mb-4">
                {specialties.map((s) => (
                  <Badge key={s} variant="secondary" className="px-2 py-1">
                    {s}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialty(s)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                {Object.entries(servicesByCategory).map(
                  ([category, services]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium">{category}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={service.id}
                              checked={specialties.includes(service.name)}
                              onCheckedChange={() =>
                                toggleSpecialty(service.name)
                              }
                            />
                            <label
                              htmlFor={service.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {service.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Input
                  value={customSpecialty}
                  onChange={(e) => setCustomSpecialty(e.target.value)}
                  placeholder="Add a custom specialty"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddCustomSpecialty}
                  size="sm"
                >
                  Add
                </Button>
              </div>
              <FormDescription>
                Select from existing services or add custom specialties
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="/placeholder.svg?height=200&width=200"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the URL for the barber's profile image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Barber"
              : "Create Barber"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
