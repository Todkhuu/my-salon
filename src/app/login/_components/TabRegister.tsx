"use client";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { FormInput } from "./FormInput";

type TabType = "login" | "register";

interface RegisterFormProps {
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const formSchema = z
  .object({
    username: z.string().min(1, { message: "Username заавал бөглөнө." }),
    email: z
      .string()
      .min(1, { message: "Email хоосон байна." })
      .email({ message: "Буруу email формат." }),
    password: z.string().min(1, { message: "Нууц үг хоосон байна." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Баталгаажуулах нууц үг хоосон байна." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна.",
    path: ["confirmPassword"],
  });

export const TabRegister = ({ setTab }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      toast.success("Бүртгэл амжилттай үүслээ!");
      setTab("login");
    } catch (error) {
      console.error("Signup error:", error);
      toast("Системд алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <TabsContent value="register">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <FormInput control={form.control} name="username" label="Username" />
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="m@example.com"
          />
          <FormInput
            control={form.control}
            name="password"
            label="Нууц үг"
            type="password"
          />
          <FormInput
            control={form.control}
            name="confirmPassword"
            label="Нууц үг баталгаажуулах"
            type="password"
          />
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Create Account
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
};
