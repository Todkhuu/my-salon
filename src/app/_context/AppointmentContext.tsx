"use client";
import { AppointmentType } from "../utils/types";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";
import { useUser } from "./UserContext";

type AppointmentContextType = {
  appointment: AppointmentType[] | null;
  setAppointment: React.Dispatch<
    React.SetStateAction<AppointmentType[] | null>
  >;
};

export const AppointmentContext = createContext<AppointmentContextType>(
  {} as AppointmentContextType
);

export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appointment, setAppointment] = useState<AppointmentType[] | null>(
    null
  );
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    if (user) {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/appointment?userId=${user?._id}`
        );
        setAppointment(data.data);
      } catch (error: any) {
        toast.error(error.response?.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAppointments();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <AppointmentContext.Provider value={{ appointment, setAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
export const useAppointment = () => useContext(AppointmentContext);
