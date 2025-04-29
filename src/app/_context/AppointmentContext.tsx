"use client";
import { AppointmentType } from "../utils/types";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";
import { useUser } from "./UserContext";

type AppointmentContextType = {
  appointments: AppointmentType[] | null;
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
  const [appointments, setAppointment] = useState<AppointmentType[] | null>(
    null
  );
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppointments = async () => {
      if (user) {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `/api/appointment?userId=${user?._id}`
          );
          setAppointment(data.data);
        } catch (error: unknown) {
          toast.error(axios.isAxiosError(error).toString());
          console.log("error in context", error);
        } finally {
          setLoading(false);
        }
      }
    };

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
    <AppointmentContext.Provider value={{ appointments, setAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
export const useAppointment = () => useContext(AppointmentContext);
