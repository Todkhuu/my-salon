"use client";
import { motion } from "framer-motion";

export const LoginHeader = () => {
  return (
    <motion.div
      className="space-y-2 text-center"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold">Тавтай Морилно уу</h1>
      <p className="text-gray-500">StyleCut акаунтаараа нэвтэрнэ үү</p>
    </motion.div>
  );
};
