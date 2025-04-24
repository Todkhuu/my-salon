"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const HeroSection = ({ value, onChange }: Props) => {
  return (
    <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-16">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Бидний Үйлчилгээ
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            Таны гоо сайхан, хэв маягт нийцсэн мэргэжлийн үйлчилгээнүүдийг
            танилцуулж байна
          </p>
          <div className="mt-6 w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Үйлчилгээ хайх..."
                className="w-full pl-10 bg-white"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
