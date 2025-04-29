"use client";
import { CategoryType } from "../utils/types";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";

type CategoryContextType = {
  categories: CategoryType[] | null;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[] | null>>;
};

export const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/category");
      setCategories(response.data.data);
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error).toString());
      console.log("error in context", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);
