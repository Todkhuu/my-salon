"use client";
import React from "react";
import UserHomePageFeature from "./UserHomePageFeature";
import { ServiceCategories } from "../../app/_components/ServiceCategories";
import { useUser } from "@/app/_context/UserContext";
import HowItWorks from "./HowItWorks";
import { motion } from "framer-motion";

function GuestHomePageFeature() {
  const { user } = useUser();

  return (
    <div className="min-w-[100vw] min-h-screen">
      {user ? (
        <UserHomePageFeature />
      ) : (
        <>
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }} // <- Scroll болгонд animation ажиллана
            className="relative bg-gradient-to-r from-purple-100 to-pink-100 py-20 md:py-32"
          >
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: false }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
                >
                  Дараагийн стиль өөрчлөлтөө захиалаарай
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: false }}
                  className="max-w-[700px] text-gray-500 md:text-xl"
                >
                  Мэргэжлийн үс засалт, стиллер, гоо сайхны үйлчилгээг таны гарт
                </motion.p>
              </div>
            </div>
          </motion.section>

          {/* Services Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[1400px] m-auto py-12 md:py-16"
          >
            <div className="px-4 md:px-6">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8 text-center text-3xl font-bold"
              >
                Манай үйлчилгээнүүд
              </motion.h2>
              <ServiceCategories />
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <HowItWorks />
          </motion.div>
        </>
      )}
    </div>
  );
}

export default GuestHomePageFeature;
