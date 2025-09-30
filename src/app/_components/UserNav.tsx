"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { User, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";
import { useUser } from "../_context/UserContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

interface UserNavProps {
  handleLogout: () => void;
}

export function UserNav({ handleLogout }: UserNavProps) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -10 },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User avatar"
            />
            <AvatarFallback />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {open && (
          <DropdownMenuContent asChild align="end" forceMount>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-56 rounded-md bg-white shadow-md border border-gray-200 overflow-hidden"
            >
              {/* User Info */}
              <div className="p-3">
                <div className="flex flex-col space-y-1 mb-2">
                  <p className="text-sm font-medium leading-none">
                    {user?.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className="border-t border-gray-100">
                <Link href="/dashboard/profile">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />{" "}
                    <span className="text-[13px]">Миний Профайл</span>
                  </motion.div>
                </Link>
                <Link href="/dashboard/appointments">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                  >
                    <CreditCard className="h-4 w-4" />{" "}
                    <span className="text-[13px]">Миний Захиалгууд</span>
                  </motion.div>
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100">
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />{" "}
                  <span className="text-[13px]">Гарах</span>
                </motion.button>
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
