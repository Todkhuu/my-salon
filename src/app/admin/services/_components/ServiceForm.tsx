"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory } from "@/app/_context/CategoryContext";
import { ServiceType } from "@/app/utils/types";

const formSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  price: z.coerce.number().min(1, "Price must be at least $1"),
  category: z.string().min(1, "Category is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface ServiceFormProps {
  initialData?: ServiceType | null;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

export function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
}: ServiceFormProps) {
  const { categories } = useCategory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          duration: initialData.duration,
          price: initialData.price,
          category: initialData.category.name,
        }
      : {
          name: "",
          description: "",
          duration: 0,
          price: 0,
          category: "",
        },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter service name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter service description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} step={0.01} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Service"
              : "Create Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
