"use client";
import { UserType } from "@/server/utils";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type UserContextType = {
  user?: UserType;
  setUser?: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const getCurrentUser = async () => {
    try {
      const user = await axios.get("/api/me");
      if (user.status === 200) {
        setUser(user.data || null);
      }
    } catch (err: any) {
      toast.error(err.response?.data.message);
      setUser(undefined);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
