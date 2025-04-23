"use client";
import { StaffType } from "../utils/types";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";

type StaffContextType = {
  staffs: StaffType[] | null;
  setStaffs: React.Dispatch<React.SetStateAction<StaffType[] | null>>;
};

export const StaffContext = createContext<StaffContextType>(
  {} as StaffContextType
);

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
  const [staffs, setStaffs] = useState<StaffType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getStaffs = async () => {
    try {
      setLoading(true);
      const staffs = await axios.get("/api/staff");
      setStaffs(staffs.data.data);
      setLoading(false);
    } catch (err: any) {
      toast.error(err.response?.data.message);
      setStaffs(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffs();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <StaffContext.Provider value={{ staffs, setStaffs }}>
      {children}
    </StaffContext.Provider>
  );
};
export const useStaff = () => useContext(StaffContext);
