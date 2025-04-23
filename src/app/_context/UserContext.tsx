"use client";
import { UserType } from "../utils/types";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type UserContextType = {
  user: UserType | null;
  loading?: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const user = await axios.get("/api/me");
      if (user.status === 200) {
        setUser(user.data || null);
        setLoading(false);
      }
    } catch (err: any) {
      toast.error(err.response?.data.message);
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
