"use client";
import { UserType } from "../utils/types";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isAuthenticated: boolean;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    setLoading(true);
    const userId = localStorage.getItem("id");

    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/me", { userId });
      if (res.status === 200) {
        setUser(res.data || null);
        setLoading(false);
      }
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error).toString());
      console.log("error in context", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
