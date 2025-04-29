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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CategoryType } from "@/app/utils/types";
import EditUpload from "./EditUpload";

const categorySchema = z.object({
  name: z.string().min(1, "Ангиллын нэр заавал шаардлагатай"),
  description: z.string().min(1, "Тайлбар заавал шаардлагатай"),
  image: z.string().nonempty("Зураг заавал шаардлагатай"),
});

export function EditCategoryDialog({ category }: { category: CategoryType }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File>();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
      image: category.image,
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      setIsSubmitting(true);

      let imageUrl = category.image;

      if (file) {
        const uploadedUrl = await handleUpload();
        if (!uploadedUrl) {
          toast("Зураг оруулахад алдаа гарлаа");
          return;
        }
        imageUrl = uploadedUrl;
      }

      await axios.patch(`/api/category/${category._id}`, {
        ...values,
        image: imageUrl,
      });

      toast("Ангиллыг амжилттай шинэчиллээ");
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast("Ангиллыг шинэчлэхэд алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    form.setValue("image", category.image); // түр хугацааны validation
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
      toast("Файл оруулахад алдаа гарлаа");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Засах
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ангиллыг засах</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ангиллын нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Ангиллын нэр" {...field} />
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
                        placeholder="Ангиллын тайлбар оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
