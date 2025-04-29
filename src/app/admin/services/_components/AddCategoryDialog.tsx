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
import { Textarea } from "@/components/ui/textarea";
import CloudinaryUpload from "./CloudinaryUpload";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(1, "Ангиллын нэр оруулах шаардлагатай"),
  description: z.string().min(1, "Тайлбар оруулах шаардлагатай"),
  image: z.string(),
});

export function AddCategoryDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File>();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      setIsSubmitting(true);

      const imageUrl = await handleUpload();
      if (!imageUrl) {
        toast("Зураг оруулахад алдаа гарлаа");
        return;
      }

      await axios.post("/api/category", {
        ...values,
        image: imageUrl,
      });

      toast("Ангилал амжилттай үүслээ");
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast("Ангилал үүсгэхэд алдаа гарлаа");
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
      toast("Зураг сонгоно уу");
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
      toast("Файл ачааллахад алдаа гарлаа");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2 sm:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          Ангилал нэмэх
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Шинэ ангилал нэмэх</DialogTitle>
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
                        placeholder="Ангиллын тайлбарыг оруулна уу"
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
                    <CloudinaryUpload handleFile={handleFile} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Хадгалж байна..." : "Ангилал үүсгэх"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
