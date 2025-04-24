import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const LocationHoursSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-[1400px] m-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Манай салбарт зочлоорой</h2>
          <p className="mb-12 text-gray-600">
            Орчин үеийн, тав тухтай орчинд таныг хүлээж байна
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-6 overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt=""
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-black" />
                <div>
                  <h3 className="font-bold">Байршил</h3>
                  <p className="text-gray-600">
                    123 Үндсэн гудамж, Хотын төв, Улаанбаатар 12345
                  </p>
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
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-bold">Ажлын цаг</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Даваа - Ням</span>
                    </div>
                    <span>9:00 - 21:00 </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-4 text-xl font-bold">Бидэнтэй холбогдох</h3>
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
              </CardContent>
            </Card>

            <div className="mt-6">
              <Link href="/services">
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Цаг захиалах
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
