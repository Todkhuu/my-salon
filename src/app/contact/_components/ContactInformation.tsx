import { Card, CardContent } from "@/components/ui/card";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const ContactInformation = () => {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">Холбоо барих мэдээлэл</h2>

      <div className="mb-8 space-y-4">
        <div className="flex items-start">
          <MapPin className="mr-3 h-5 w-5 text-black" />
          <div>
            <h3 className="font-bold">Байршил</h3>
            <p className="text-gray-600">123 Үндсэн гудамж, УБ хот</p>
          </div>
        </div>
        <div className="flex items-start">
          <Phone className="mr-3 h-5 w-5 text-black" />
          <div>
            <h3 className="font-bold">Утас</h3>
            <p className="text-gray-600">+(976) 9911-2233</p>
          </div>
        </div>
        <div className="flex items-start">
          <Mail className="mr-3 h-5 w-5 text-black" />
          <div>
            <h3 className="font-bold">И-мэйл</h3>
            <p className="text-gray-600">info@stylecut.mn</p>
          </div>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-bold">Ажлын цаг</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <span>Даваа - Ням</span>
              </div>
              <span>9:00 - 21:00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold">Бидэнтэй нэгдээрэй</h3>
        <div className="flex space-x-4">
          <Link
            href="#"
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="#"
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg">
        <Image
          src="/placeholder.svg?height=300&width=500"
          alt="Map location"
          width={500}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
