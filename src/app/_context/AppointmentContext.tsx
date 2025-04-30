"use client";
import { AppointmentType } from "../utils/types";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "./UserContext";

type AppointmentContextType = {
  appointments: AppointmentType[] | null;
  setAppointment: React.Dispatch<
    React.SetStateAction<AppointmentType[] | null>
  >;
  setAllAppointment: React.Dispatch<
    React.SetStateAction<AppointmentType[] | null>
  >;
  allAppointment: AppointmentType[] | null;
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
  const [allAppointment, setAllAppointment] = useState<
    AppointmentType[] | null
  >(null);

  const { user } = useUser();

  useEffect(() => {
    const getAppointments = async () => {
      if (user?._id) {
        try {
          // setLoading(true);
          const { data } = await axios.get(
            `/api/appointment/userId?userId=${user?._id}`
          );
          setAppointment(data.data);
        } catch (error: unknown) {
          toast.error(axios.isAxiosError(error).toString());
          console.log("error in context", error);
        } finally {
          // setLoading(false);
        }
      }
    };

    getAppointments();
  }, [user]);

  const getAllAppointment = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get("/api/appointment");
      setAllAppointment(data.data);
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error).toString());
      console.log("error in context", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getAllAppointment();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointment,
        setAllAppointment,
        allAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
export const useAppointment = () => useContext(AppointmentContext);
