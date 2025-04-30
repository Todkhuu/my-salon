"use client";

import { useMemo, useState } from "react";
import { AdminHeader } from "./_components/AdminHeader";
import { useAppointment } from "@/app/_context/AppointmentContext";
import { format, parseISO, isValid } from "date-fns";
import { AddAppointmentDialog } from "./_components/AddAppointmentDialog";
import { AppointmentTable } from "./_components/AppointmentTable";
import { AppointmentFilters } from "./_components/AppointmentFilters";
import { Searchs } from "./_components/Search";

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const { allAppointment } = useAppointment();

  const filteredAppointments = useMemo(() => {
    if (!allAppointment) return [];

    let filtered = [...allAppointment];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.staffId.name.toLowerCase().includes(q) ||
          a.userId.email.toLowerCase().includes(q) ||
          a.serviceId.name.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    if (staffFilter !== "all") {
      filtered = filtered.filter((a) => a.staffId.name === staffFilter);
    }

    if (serviceFilter !== "all") {
      filtered = filtered.filter((a) => a.serviceId.name === serviceFilter);
    }

    if (date) {
      filtered = filtered.filter((a) => {
        const apptDate = typeof a.date === "string" ? parseISO(a.date) : a.date;
        return (
          isValid(apptDate) &&
          format(apptDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
        );
      });
    }

    return filtered;
  }, [
    allAppointment,
    searchQuery,
    statusFilter,
    staffFilter,
    serviceFilter,
    date,
  ]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <AdminHeader
          title="Appointments"
          description="Manage your barbershop appointments"
        />
        <AddAppointmentDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-[280px_1fr]">
        <AppointmentFilters
          allAppointment={allAppointment}
          setDate={setDate}
          date={date}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          staffFilter={staffFilter}
          setStaffFilter={setStaffFilter}
          serviceFilter={serviceFilter}
          setServiceFilter={setServiceFilter}
        />
        <div className="space-y-4">
          <Searchs
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            date={date}
          />

          <div className="rounded-md border">
            <AppointmentTable filteredAppointments={filteredAppointments} />
          </div>
        </div>
      </div>
    </div>
  );
}
