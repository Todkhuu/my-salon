import { Button } from "@/components/ui/button";
import Link from "next/link";

export const StaffNotFound = () => {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center px-4 py-8 md:px-6 md:py-12">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Стилист олдсонгүй</h1>
        <p className="mb-6 text-gray-500">
          Таны хайж буй стилист байхгүй эсвэл устгагдсан байна.
        </p>
        <Link href="/staffs">
          <Button className="bg-black text-white hover:bg-gray-800">
            Бүх стилистийг үзэх
          </Button>
        </Link>
      </div>
    </div>
  );
};
