"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function NavLinks() {
  const links = [
    { href: "/services", label: "Үйлчилгээнүүд" },
    { href: "/staffs", label: "Манай ажилчид" },
    { href: "/about", label: "Бидний тухай" },
    { href: "/contact", label: "Холбоо барих" },
  ];

  return (
    <motion.nav
      className="hidden gap-6 md:flex"
      initial="hidden"
      whileInView="visible" // scroll-д animation
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      {links.map((link) => (
        <motion.div
          key={link.href}
          variants={linkVariants}
          whileHover={{ y: -2, scale: 1.05 }}
          className="text-sm font-medium cursor-pointer"
        >
          <Link href={link.href} className="hover:underline">
            {link.label}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
}
