"use client";
import { LoginFooter } from "../admin/login/_components/LoginFooter";
import { LoginHeader } from "../admin/login/_components/LoginHeader";
import { TabDemo } from "./_components/Tabs";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <motion.div
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="w-full max-w-md space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginHeader />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TabDemo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginFooter />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
