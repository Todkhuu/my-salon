"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";

export function Footer() {
  const pathname = usePathname();
  const HIDE_HEADER_PATHS = [
    "/admin",
    "/admin/appointments",
    "/admin/staffs",
    "/admin/services",
    "/admin/customers",
    "/dashboard",
    "/dashboard/appointments",
    "/dashboard/profile",
    "/dashboard/favorites",
  ];

  // Footer container animation
  const footerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Footer items animation (texts, links, icons)
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  if (HIDE_HEADER_PATHS.includes(pathname)) return null;

  return (
    <motion.footer
      className="bg-black text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={footerVariants}
    >
      <div className="max-w-[1400px] m-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:flex justify-between">
          {/* Brand & Social */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-xl font-bold text-gray-600">СтайлКат</h3>
            <p className="mb-4 text-gray-400">
              Гоо сайхны мэргэжлийн үйлчилгээ таны гарт.
            </p>
            <div className="flex space-x-4">
              <motion.div variants={itemVariants}>
                <Link href="#" className="rounded-full  p-2 ">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="#" className="rounded-full  p-2 ">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="#" className="rounded-full p-2 ">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-xl font-bold text-gray-600">Холбоосууд</h3>
            <ul className="space-y-2">
              {[
                { href: "/services", label: "Үйлчилгээ" },
                { href: "/staffs", label: "Манай ажилчид" },
                { href: "/about", label: "Бидний тухай" },
                { href: "/contact", label: "Холбоо барих" },
                { href: "/dashboard", label: "Миний бүртгэл" },
              ].map((link) => (
                <motion.li key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-xl font-bold text-gray-600">
              Холбоо барих
            </h3>
            <ul className="space-y-3">
              <motion.li className="flex items-start" variants={itemVariants}>
                <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">123 Үндсэн гудамж, УБ хот</span>
              </motion.li>
              <motion.li className="flex items-start" variants={itemVariants}>
                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">+(976) 9911-2233</span>
              </motion.li>
              <motion.li className="flex items-start" variants={itemVariants}>
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">info@stylecut.mn</span>
              </motion.li>
              <motion.li className="flex items-start" variants={itemVariants}>
                <Clock className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Даваа-Ням: 9:00-21:00</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400"
          variants={itemVariants}
        >
          <p>
            &copy; {new Date().getFullYear()} StyleCut. Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
