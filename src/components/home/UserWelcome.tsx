"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/app/_context/UserContext";
import { UpcomingAppointment } from "./UpcomingAppointment";

export function UserWelcome() {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Өглөөний мэнд");
    } else if (hour < 18) {
      setGreeting("Өдрийн мэнд");
    } else {
      setGreeting("Оройн мэнд");
    }
  }, []);

  return (
    <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-20 md:py-32">
      <div className="md:flex md:justify-center items-center gap-10 px-4 md:px-6">
        <div className="mb-4 md:mb-0 flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {greeting}, {user?.username}!
          </h1>
          <p className="mt-2 max-w-[700px] text-gray-500 md:text-xl">
            Шинэ хэв маягт бэлэн үү?
          </p>
        </div>
        <UpcomingAppointment />
      </div>
    </section>
  );
}
