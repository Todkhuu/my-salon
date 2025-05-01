import { Card, CardContent } from "@/components/ui/card";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

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

      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d285.0078839475883!2d106.91664423176118!3d47.91440416633872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969248b9807d57%3A0xf9ae8f46ed2063c0!2sWork!5e0!3m2!1sen!2smn!4v1746058726664!5m2!1sen!2smn"
          width="600"
          height="450"
          className="absolute top-0 left-0 w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
};
