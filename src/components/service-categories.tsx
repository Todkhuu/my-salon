import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "haircuts",
    name: "Haircuts",
    description: "Professional haircuts for all styles",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "beard",
    name: "Beard Grooming",
    description: "Beard trims, shaping and styling",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "coloring",
    name: "Hair Coloring",
    description: "Professional hair coloring services",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "nails",
    name: "Nail Services",
    description: "Manicures and pedicures",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export function ServiceCategories() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/services/${category.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="w-full overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={300}
                height={200}
                className="h-full w-full object-cover"
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
