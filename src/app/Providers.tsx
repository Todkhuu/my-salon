"use client";

import { UserProvider } from "./_context/UserContext";
import { ServiceProvider } from "./_context/ServiceContext";
import { StaffProvider } from "./_context/StaffContext";
import { CategoryProvider } from "./_context/CategoryContext";
import { AppointmentProvider } from "./_context/AppointmentContext";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ServiceProvider>
        <StaffProvider>
          <CategoryProvider>
            <AppointmentProvider>
              {children}
              <Toaster />
            </AppointmentProvider>
          </CategoryProvider>
        </StaffProvider>
      </ServiceProvider>
    </UserProvider>
  );
};
