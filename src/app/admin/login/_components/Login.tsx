"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/_context/UserContext";
import { FormInput } from "@/app/login/_components/FormInput";

const loginSchema = z.object({
  email: z.string().email({ message: "Зөв email оруулна уу" }),
  password: z.string().min(1, { message: "Нууц үг шаардлагатай" }),
});

export const Login = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/signin", values);
      setUser(data.user);
      toast.success("Амжилттай нэвтэрлээ");
      router.push("/admin"); // refresh хийхэд хэрэглэгч хадгалагдана
    } catch (err: any) {
      console.log("first", err.response.data.message);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormInput control={form.control} name="email" label="Имэйл" />
        <FormInput
          control={form.control}
          name="password"
          label="Нууц үг"
          type="password"
        />
        <Button
          type="submit"
          className="w-full bg-black text-white"
          disabled={loading}
        >
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </Button>
      </form>
    </Form>
  );
};
