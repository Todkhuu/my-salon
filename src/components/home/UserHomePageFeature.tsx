"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { UserWelcome } from "./UserWelcome";
import FavoriteServices from "./FavoriteServices";
import FavoriteStaffs from "./FavoriteStaffs";
import { ServiceCategories } from "../../app/_components/ServiceCategories";
import HowItWorks from "./HowItWorks";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const UserHomePageFeature: React.FC = () => {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <UserWelcome />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <FavoriteServices />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <FavoriteStaffs />
      </motion.div>

      <motion.section
        className="max-w-[1400px] m-auto py-12 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="px-4 md:px-6">
          <motion.h2
            className="mb-8 text-center text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Манай үйлчилгээнүүд
          </motion.h2>
          <ServiceCategories />
        </div>
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <HowItWorks />
      </motion.div>
    </>
  );
};

export default UserHomePageFeature;
