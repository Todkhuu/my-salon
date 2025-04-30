"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/app/login/_components/FormInput";
import { useStaff } from "@/app/_context/StaffContext";
import { useUser } from "@/app/_context/UserContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Зөв email оруулна уу" }),
  password: z.string().min(1, { message: "Нууц үг шаардлагатай" }),
});

export const Login = () => {
  const { loggedStaff, setLoggedStaff } = useStaff();
  const { user } = useUser();
  const { push } = useRouter();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const navigateToPath = useCallback(
    (path: string) => {
      push(path);
    },
    [push]
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/signin", values);
      setLoggedStaff(data.staff);
      toast.success("Амжилттай нэвтэрлээ");
      router.push("/admin");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("first", err.response?.data?.message);
        toast.error(err.response?.data?.message || "Алдаа гарлаа");
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ADMIN_PATHS = ["/admin"];

    if (ADMIN_PATHS.includes(pathname)) return;

    if (!loading) return;

    if (!loggedStaff || !user) navigateToPath("/admin/login");
  }, [pathname, loggedStaff, loading, navigateToPath, user]);

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
