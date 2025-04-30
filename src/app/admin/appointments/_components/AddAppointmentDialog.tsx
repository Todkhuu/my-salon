//logic-iin huvid zorchiltei baigaa tul tur orhiv

"use client";
import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useService } from "@/app/_context/ServiceContext";
import { useStaff } from "@/app/_context/StaffContext";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ServiceType, StaffType } from "@/app/utils/types";

const appointmentSchema = z.object({
  serviceId: z.string().min(1, "Үйлчилгээ сонгоно уу"),
  staffId: z.string().min(1, "Ажилтан сонгоно уу"),
  date: z.string().min(1, "Цаг сонгоно уу"),
  time: z.string().min(1, "Цагийн сонголт хийж уу"),
  username: z.string().min(2, "Нэр оруулна уу").optional(),
  email: z.string().email("Буруу имэйл хаяг").optional(),
  phone: z
    .string()
    .regex(/^[0-9]{8}$/, "Утасны дугаар зөв оруулна уу")
    .optional(),
  message: z.string().optional(),
});

export function AddAppointmentDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  const [filteredStaffs, setFilteredStaffs] = useState<StaffType[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceType[]>([]);

  const { services } = useService();
  const { staffs } = useStaff();

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      serviceId: "",
      staffId: "",
      date: "",
      time: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!selectedServiceId) return;

    const selectedService = services?.find((s) => s._id === selectedServiceId);
    const category = selectedService?.category._id;

    if (category) {
      const relatedStaffs = staffs?.filter((staff) => {
        return String(staff.category) === String(category);
      });
      setFilteredStaffs(relatedStaffs || []);
    }
  }, [selectedServiceId, services, staffs]);

  useEffect(() => {
    if (!selectedStaffId) return;

    const selectedStaff = staffs?.find(
      (staff) => staff._id === selectedStaffId
    );
    const category = selectedStaff?.category._id;

    if (category) {
      const relatedServices = services?.filter(
        (service) => String(service.category._id) === String(category)
      );
      setFilteredServices(relatedServices || []);
    }
  }, [selectedStaffId, staffs, services]);

  const handleFormSubmit = async (
    values: z.infer<typeof appointmentSchema>
  ) => {
    try {
      setIsSubmitting(true);

      await axios.post("/api/appointment", values);

      toast("Цаг захиалга амжилттай илгээлээ!");
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast("Цаг захиалахад алдаа гарлаа.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2 sm:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          Цаг захиалах
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Цаг захиалах</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="serviceId"
                render={() => (
                  <FormItem>
                    <FormLabel>Үйлчилгээ</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        setSelectedServiceId(value);
                        form.setValue("serviceId", value);
                      }}
                      value={form.watch("serviceId")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Үйлчилгээ сонгох" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(filteredServices && filteredServices.length > 0
                          ? filteredServices
                          : services || []
                        ).map((service) => (
                          <SelectItem key={service._id} value={service._id}>
                            {service.name}
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
                name="staffId"
                render={() => (
                  <FormItem>
                    <FormLabel>Ажилтан</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        setSelectedStaffId(value);
                        form.setValue("staffId", value);
                      }}
                      value={form.watch("staffId")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ажилтан сонгох" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(filteredStaffs && filteredStaffs.length > 0
                          ? filteredStaffs
                          : staffs || []
                        ).map((staff) => (
                          <SelectItem key={staff._id} value={staff._id}>
                            {staff.name}
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цаг</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(new Date(field.value), "yyyy-MM-dd")
                              : "Огноо сонгох"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                          }}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цагийн сонголт</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нэр</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Имэйл</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Утас</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тайлбар</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Тайлбар оруулна уу" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Захиалга хийж байна..." : "Цаг захиалах"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
