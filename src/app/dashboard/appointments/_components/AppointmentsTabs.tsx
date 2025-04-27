"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppointment } from "@/app/_context/AppointmentContext";
import { TabsContentUpcoming } from "./TabsContentUpcoming";
import { TabsContentPast } from "./TabsContentPast";
import { TabsContentCancell } from "./TabsContentCancell";
import { useState } from "react";

const AppointmentsTabs = () => {
  const { appointments } = useAppointment();
  const [activeTab, setActiveTab] = useState("upcoming");

  const now = new Date();
  const nowInMongolia = new Date(now.getTime() + 8 * 60 * 60 * 1000);

  const upcomingAppointments = appointments?.filter((app) => {
    const appointmentDate = new Date(app.date);
    const appointmentDateInMongolia = new Date(
      appointmentDate.getTime() + 8 * 60 * 60 * 1000
    );
    return (
      (app.status === "CONFIRMED" || app.status === "PENDING") &&
      appointmentDateInMongolia >= nowInMongolia
    );
  });

  const pastAppointments = appointments?.filter((app) => {
    const appointmentDate = new Date(app.date);
    return appointmentDate < nowInMongolia && app.status !== "CANCELED";
  });

  const cancelledAppointments = appointments?.filter(
    (app) => app.status === "CANCELED"
  );

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Удахгүй</TabsTrigger>
          <TabsTrigger value="past">Өнгөрсөн</TabsTrigger>
          <TabsTrigger value="cancelled">Цуцлагдсан</TabsTrigger>
        </TabsList>
        <TabsContentUpcoming upcomingAppointments={upcomingAppointments} />
        <TabsContentPast pastAppointments={pastAppointments} />
        <TabsContentCancell cancelledAppointments={cancelledAppointments} />
      </Tabs>
    </div>
  );
};

export default AppointmentsTabs;
