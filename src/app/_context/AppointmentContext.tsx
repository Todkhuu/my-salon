"use client";
import { AppointmentType } from "../utils/types";
import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
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
  getAppointments: () => void;
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

  const getAppointments = useCallback(async () => {
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
      }
    }
  }, [user?._id]); // зөвхөн user._id өөрчлөгдвөл дахин үүснэ

  const getAllAppointment = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get("/api/appointment");
      setAllAppointment(data.data);
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error).toString());
      console.log("error in context", error);
    } finally {
    }
  };

  useEffect(() => {
    getAppointments();
    getAllAppointment();
  }, [user, getAppointments]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointment,
        setAllAppointment,
        allAppointment,
        getAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
export const useAppointment = () => useContext(AppointmentContext);
