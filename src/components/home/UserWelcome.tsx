"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/app/_context/UserContext";
import { UpcomingAppointment } from "./UpcomingAppointment";
import { motion, Variants } from "framer-motion";

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

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.section
      className="bg-gradient-to-r from-purple-100 to-pink-100 py-20 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="md:flex md:justify-center items-center gap-10 px-4 md:px-6">
        <motion.div
          className="mb-4 md:mb-0 flex flex-col items-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {greeting}, {user?.username}!
          </h1>
          <p className="mt-2 max-w-[700px] text-gray-500 md:text-xl">
            Шинэ хэв маягт бэлэн үү?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          <UpcomingAppointment />
        </motion.div>
      </div>
    </motion.section>
  );
}
