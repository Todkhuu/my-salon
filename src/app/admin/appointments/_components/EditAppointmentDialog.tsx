// "use client";

// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import axios from "axios";
// import { toast } from "sonner";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { AppointmentType, ServiceType, StaffType } from "@/app/utils/types";
// import { useService } from "@/app/_context/ServiceContext";
// import { useStaff } from "@/app/_context/StaffContext";

// const appointmentSchema = z.object({
//   userId: z.string().min(1, "user"),
//   serviceId: z.string().min(1, "Үйлчилгээ сонгоно уу"),
//   staffId: z.string().min(1, "Ажилтан сонгоно уу"),
//   date: z.string().min(1, "Огноо сонгоно уу"),
//   time: z.string().min(1, "Цаг сонгоно уу"),
//   username: z.string().optional(),
//   email: z.string().email().optional(),
//   phone: z
//     .string()
//     .regex(/^[0-9]{8}$/)
//     .optional(),
//   message: z.string().optional(),
// });

// export function EditAppointmentDialog({
//   appointment,
// }: {
//   appointment: AppointmentType[] | null;
// }) {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { services } = useService();
//   const { staffs } = useStaff();

//   const form = useForm<z.infer<typeof appointmentSchema>>({
//     resolver: zodResolver(appointmentSchema),
//     defaultValues: {
//       userId: appointment?.userId || "",
//       username: appointment?.username || "",
//       email: appointment?.email || "",
//       phone: appointment?.phone || "",
//       serviceId: appointment?.serviceId,
//       staffId: appointment?.staffId,
//       date: appointment?.date,
//       time: appointment?.time,
//       message: appointment?.message || "",
//     },
//   });

//   const handleFormSubmit = async (
//     values: z.infer<typeof appointmentSchema>
//   ) => {
//     try {
//       setIsSubmitting(true);
//       await axios.put(`/api/appointment/${appointment?._id}`, values);
//       toast("Цаг амжилттай засагдлаа!");
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error(error);
//       toast("Засахад алдаа гарлаа.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Засах</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Цаг засах</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleFormSubmit)}
//             className="space-y-8"
//           >
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               {/* Үйлчилгээ сонголт */}
//               <FormField
//                 control={form.control}
//                 name="serviceId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Үйлчилгээ</FormLabel>
//                     <Select
//                       value={field.value || ""}
//                       onValueChange={field.onChange}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Сонгох" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {services?.map((service) => (
//                           <SelectItem key={service._id} value={service._id}>
//                             {service.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Ажилтан сонголт */}
//               <FormField
//                 control={form.control}
//                 name="staffId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Ажилтан</FormLabel>
//                     <Select
//                       value={field.value || ""}
//                       onValueChange={field.onChange}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Сонгох" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {staffs?.map((staff) => (
//                           <SelectItem key={staff._id} value={staff._id}>
//                             {staff.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Огноо */}
//               <FormField
//                 control={form.control}
//                 name="date"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Огноо</FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant="outline"
//                             className={cn(
//                               "w-full justify-start text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             {field.value
//                               ? format(new Date(field.value), "yyyy-MM-dd")
//                               : "Огноо сонгох"}
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={
//                             field.value ? new Date(field.value) : undefined
//                           }
//                           onSelect={(date) => {
//                             field.onChange(date?.toISOString());
//                           }}
//                           disabled={(date) =>
//                             date < new Date(new Date().setHours(0, 0, 0, 0))
//                           }
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Цаг */}
//               <FormField
//                 control={form.control}
//                 name="time"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Цаг</FormLabel>
//                     <FormControl>
//                       <Input type="time" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Хувийн мэдээлэл */}
//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Нэр</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Имэйл</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Утас</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="message"
//                 render={({ field }) => (
//                   <FormItem className="col-span-2">
//                     <FormLabel>Тайлбар</FormLabel>
//                     <FormControl>
//                       <Textarea {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Хадгалж байна..." : "Засах"}
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
