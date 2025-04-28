"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory } from "@/app/_context/CategoryContext";
import { Textarea } from "@/components/ui/textarea";
import CloudinaryUpload from "./CloudinaryUpload";
import { toast } from "sonner";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  price: z.coerce.number().min(1, "Price must be at least $1"),
  category: z.string().min(1, "Category is required"),
  image: z.string(),
});

export function AddServiceDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File>();
  const { categories } = useCategory();

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: 0,
      price: 0,
      category: "",
      image: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof serviceSchema>) => {
    try {
      setIsSubmitting(true);

      const imageUrl = await handleUpload();
      if (!imageUrl) {
        toast("Image upload failed");
        return;
      }

      await axios.post("/api/service", {
        ...values,
        image: imageUrl,
      });

      toast("Service created successfully");
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast("Failed to create service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    form.setValue("image", "selected");
  };

  const handleUpload = async () => {
    const PRESET_NAME = "food-delivery-app";
    const CLOUDINARY_NAME = "ds6kxgjh0";

    if (!file) {
      toast("Please select an image");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("api_key", CLOUDINARY_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data.secure_url as string;
    } catch (err) {
      console.error(err);
      toast("Failed to upload file");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2 sm:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                    <Textarea
                      placeholder="Enter service description"
                      {...field}
                    />
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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <CloudinaryUpload handleFile={handleFile} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Saving..." : "Create Service"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
