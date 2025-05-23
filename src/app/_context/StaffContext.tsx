"use client";
import { StaffType } from "../utils/types";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type StaffContextType = {
  staffs: StaffType[] | null;
  setStaffs: React.Dispatch<React.SetStateAction<StaffType[] | null>>;
  setLoggedStaff: React.Dispatch<React.SetStateAction<StaffType[] | null>>;
  loggedStaff: StaffType[] | null;
  getStaffs: () => void;
};

export const StaffContext = createContext<StaffContextType>(
  {} as StaffContextType
);

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
  const [staffs, setStaffs] = useState<StaffType[] | null>(null);
  const [loggedStaff, setLoggedStaff] = useState<StaffType[] | null>(null);

  const getStaffs = async () => {
    try {
      // setLoading(true);
      const staffs = await axios.get("/api/staff");
      setStaffs(staffs.data.data);
      // setLoading(false);
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error).toString());
      console.log("error in context", error);
      setStaffs(null);
    } finally {
      // setLoading(false);
    }
  };

  // const getLoggedStaff = async () => {
  //   try {
  //     // setLoading(true);
  //     const staffs = await axios.get("/api/admin");
  //     setLoggedStaff(staffs.data.data);
  //     // setLoading(false);
  //   } catch (error: unknown) {
  //     toast.error(axios.isAxiosError(error).toString());
  //     console.log("error in context", error);
  //     setStaffs(null);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  useEffect(() => {
    getStaffs();
    // getLoggedStaff();
  }, []);

  return (
    <StaffContext.Provider
      value={{ staffs, setStaffs, setLoggedStaff, loggedStaff, getStaffs }}
    >
      {children}
    </StaffContext.Provider>
  );
};
export const useStaff = () => useContext(StaffContext);
