"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryType } from "../utils/types";
import { useCategory } from "../_context/CategoryContext";

export function ServiceCategories() {
  const { categories } = useCategory();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories?.map((category: CategoryType) => (
        <Link key={category._id} href={`/services/${category._id}`}>
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
        </Link>
      ))}
    </div>
  );
}
