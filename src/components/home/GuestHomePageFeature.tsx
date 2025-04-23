"use client";
import React from "react";
import UserHomePageFeature from "./UserHomePageFeature";
import { ServiceCategories } from "../../app/_components/ServiceCategories";
import { useUser } from "@/app/_context/UserContext";
import HowItWorks from "./HowItWorks";
import { Loader } from "../ui/Loader";

function GuestHomePageFeature() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }
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
                  Book your next style transformation
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Professional haircuts, styling, and beauty services at your
                  fingertips
                </p>
              </div>
            </div>
          </section>
          <section className="max-w-[1400px] m-auto py-12 md:py-16">
            <div className="px-4 md:px-6">
              <h2 className="mb-8 text-center text-3xl font-bold">
                Our Services
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
