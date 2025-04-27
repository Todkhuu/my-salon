"use client";
import { useUser } from "@/app/_context/UserContext";

export const DashboardHeader = () => {
  const { user } = useUser();
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Хянах Самбар</h1>
      <p className="text-muted-foreground">
        Дахин тавтай морил, {user?.username}! Цаг захиалгууд болон өөрийн
        профайлаа удирдаарай.
      </p>
    </div>
  );
};
