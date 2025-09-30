"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 18,
    },
  },
};

const HowItWorks = () => {
  return (
    <motion.section
      className="bg-gray-50 py-12 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-[1400px] m-auto px-4 md:px-6">
        <motion.h2
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          Хэрхэн үйлчлүүлэх вэ?
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Үйлчилгээгээ сонгох",
              desc: "Манай мэргэжлийн үйлчилгээнүүдээс сонголтоо хийгээрэй",
            },
            {
              step: "2",
              title: "Стилист сонгох",
              desc: "Хүссэн Стилист болон цагийн сонголтоо хийгээрэй",
            },
            {
              step: "3",
              title: "Баталгаажуулах & төлбөр төлөх",
              desc: "Цаг захиалгаа хялбар төлбөрийн аргаар баталгаажуулна уу",
            },
          ].map((item) => (
            <motion.div
              key={item.step}
              className="flex flex-col items-center text-center"
              variants={stepVariants}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                <span className="text-xl font-bold">{item.step}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <Link href="/services">
            <Button className="bg-black text-white hover:bg-gray-800">
              Одоо захиалах
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
