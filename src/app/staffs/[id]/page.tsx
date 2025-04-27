"use client";
import { useStaff } from "@/app/_context/StaffContext";
import { use } from "react";
import { ProfileSidebar } from "./_components/ProfileSidebar";
import { StaffHeader } from "./_components/StaffHeader";
import { MainContent } from "./_components/MainContent";
import { StaffNotFound } from "./_components/StaffNotFound";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BarberProfilePage(props: PageProps) {
  const { id } = use(props.params);
  const { staffs } = useStaff();
  const staff = staffs?.find((staff) => staff._id === id);

  if (!staff) {
    return <StaffNotFound />;
  }

  return (
    <div className="max-w-[1400px] m-auto px-4 py-8 md:px-6 md:py-12">
      <StaffHeader staff={staff} />
      <div className="grid gap-8 md:grid-cols-3">
        <ProfileSidebar staff={staff} />
        <div className="md:col-span-2">
          <MainContent staff={staff} />
        </div>
      </div>
    </div>
  );
}
