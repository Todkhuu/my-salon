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
import { Pencil } from "lucide-react";
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
import { toast } from "sonner";
import { ServiceType } from "@/app/utils/types";
import EditUpload from "./EditUpload";

const serviceSchema = z.object({
  name: z.string().min(1, "Үйлчилгээний нэр оруулна уу"),
  description: z.string().min(1, "Тайлбар шаардлагатай"),
  duration: z.coerce.number().min(1, "Хугацаа дор хаяж 1 минут байх ёстой"),
  price: z.coerce.number().min(1, "Үнэ хамгийн багадаа 1₮ байх ёстой"),
  category: z.string().min(1, "Ангилал шаардлагатай"),
  image: z.string().nonempty("Зураг шаардлагатай"),
});

export function EditServiceDialog({ service }: { service: ServiceType }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File>();
  const { categories } = useCategory();

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      category: service.category.name,
      image: service.image,
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof serviceSchema>) => {
    try {
      setIsSubmitting(true);

      let imageUrl = service.image;

      if (file) {
        const uploadedUrl = await handleUpload();
        if (!uploadedUrl) {
          toast("Зураг байршуулахад алдаа гарлаа");
          return;
        }
        imageUrl = uploadedUrl;
      }

      await axios.patch(`/api/service/${service._id}`, {
        ...values,
        image: imageUrl,
      });

      toast("Үйлчилгээг амжилттай шинэчиллээ");
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast("Үйлчилгээг шинэчлэхэд алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    form.setValue("image", service.image); // түр хугацааны validation
  };

  const handleUpload = async () => {
    const PRESET_NAME = "food-delivery-app";
    const CLOUDINARY_NAME = "ds6kxgjh0";

    if (!file) {
      toast("Зураг сонгоно уу");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);

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
      toast("Файл байршуулахад алдаа гарлаа");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Засах
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Үйлчилгээ засах</DialogTitle>
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
                  <FormLabel>Үйлчилгээний нэр</FormLabel>
                  <FormControl>
                    <Input placeholder="Үйлчилгээний нэр" {...field} />
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
                  <FormLabel>Тайлбар</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Үйлчилгээний тайлбар оруулна уу"
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
                    <FormLabel>Хугацаа (минут)</FormLabel>
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
                    <FormLabel>Үнэ (₮)</FormLabel>
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
                    <FormLabel>Ангилал</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          {
                            categories?.find((cat) => cat._id === field.value)
                              ?.name
                          }
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
                    <FormLabel>Зураг</FormLabel>
                    <FormControl>
                      <EditUpload handleFile={handleFile} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
