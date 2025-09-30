"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryType } from "../utils/types";
import { useCategory } from "../_context/CategoryContext";
import { motion, Variants } from "framer-motion";

export function ServiceCategories() {
  const { categories, loading } = useCategory();

  // Container variants for stagger
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Card animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 18,
      },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-[350px] bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {categories?.map((category: CategoryType) => (
        <Link key={category._id} href={`/services/${category._id}`}>
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
          >
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="w-full h-[350px] overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="w-full h-[250px] object-cover object-center"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="mb-1 text-lg font-bold">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
