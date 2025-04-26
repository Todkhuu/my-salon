"use client";
import React from "react";
import { UserWelcome } from "./UserWelcome";
import FavoriteServices from "./FavoriteServices";
import FavoriteStaffs from "./FavoriteStaffs";
import { ServiceCategories } from "../../app/_components/ServiceCategories";
import HowItWorks from "./HowItWorks";

const UserHomePageFeature: React.FC = () => {
  return (
    <>
      <UserWelcome />
      <FavoriteServices />
      <FavoriteStaffs />
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
  );
};

export default UserHomePageFeature;
