import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Одоогийн нууц үг шаардлагатай." }),
    newPassword: z.string().min(6, {
      message: "Шинэ нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Шинэ нууц үгээ давтан оруулна уу." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна.",
    path: ["confirmPassword"],
  });

export const useChangePassword = (onSuccess: () => void) => {
  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const handlePasswordChange = async (
    values: z.infer<typeof passwordSchema>
  ) => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      toast.error("Хэрэглэгчийн мэдээлэл алга байна.");
      return;
    }

    try {
      setIsSubmittingPassword(true);
      const response = await axios.put("/api/user/password", {
        ...values,
        userId,
      });
      if (response.status === 200) {
        toast.success("Нууц үг амжилттай шинэчлэгдлээ.");
        onSuccess();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("first", err.response?.data?.message);
        toast.error(err.response?.data?.message || "Алдаа гарлаа");
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа");
      }
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  return { passwordForm, isSubmittingPassword, handlePasswordChange };
};
