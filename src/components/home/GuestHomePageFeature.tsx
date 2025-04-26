"use client";
import React from "react";
import UserHomePageFeature from "./UserHomePageFeature";
import { ServiceCategories } from "../../app/_components/ServiceCategories";
import { useUser } from "@/app/_context/UserContext";
import HowItWorks from "./HowItWorks";

function GuestHomePageFeature() {
  const { user } = useUser();

  return (
    <div className="min-w-[100vw] min-h-screen">
      {user ? (
        <UserHomePageFeature />
      ) : (
        <>
          <section className="relative bg-gradient-to-r from-purple-100 to-pink-100 py-20 md:py-32">
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Дараагийн стиль өөрчлөлтөө захиалаарай
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Мэргэжлийн үс засалт, стиллер, гоо сайхны үйлчилгээг таны гарт
                </p>
              </div>
            </div>
          </section>
          <section className="max-w-[1400px] m-auto py-12 md:py-16">
            <div className="px-4 md:px-6">
              <h2 className="mb-8 text-center text-3xl font-bold">
                Манай үйлчилгээнүүд
              </h2>
              <ServiceCategories />
            </div>
          </section>
          <HowItWorks />
        </>
      )}
    </div>
  );
}

export default GuestHomePageFeature;
