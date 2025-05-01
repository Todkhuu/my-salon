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
  return (
    <>
      {!HIDE_HEADER_PATHS.includes(pathname) && (
        <footer className="bg-black text-white">
          <div className="max-w-[1400px] m-auto px-4 py-12 md:px-6 md:py-16">
            <div className="grid gap-8 md:grid-cols-2 lg:flex justify-between">
              <div>
                <h3 className="mb-4 text-xl font-bold text-gray-600">
                  СтайлКат
                </h3>
                <p className="mb-4 text-gray-400">
                  Гоо сайхны мэргэжлийн үйлчилгээ таны гарт.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-gray-600">
                  Холбоосууд
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-white"
                    >
                      Үйлчилгээ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/staffs"
                      className="text-gray-400 hover:text-white"
                    >
                      Манай ажилчид
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 hover:text-white"
                    >
                      Бидний тухай
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-400 hover:text-white"
                    >
                      Холбоо барих
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-gray-400 hover:text-white"
                    >
                      Миний бүртгэл
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-gray-600">
                  Холбоо барих
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">
                      123 Үндсэн гудамж, УБ хот
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Phone className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">+(976) 9911-2233</span>
                  </li>
                  <li className="flex items-start">
                    <Mail className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">info@stylecut.mn</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">Даваа-Ням: 9:00-21:00</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} StyleCut. Бүх эрх хуулиар
                хамгаалагдсан.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
