import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const FAQSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-[1400px] m-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Түгээмэл асуулт хариултууд
          </h2>
          <p className="mb-12 text-gray-600">
            Танд байж болох асуултуудад хурдан хариулт аваарай
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-bold">
                Заавал урьдчилан цаг авах хэрэгтэй юу?
              </h3>
              <p className="text-gray-600">
                Боломжтой тохиолдолд бид шууд ирсэн үйлчлүүлэгчдийг хүлээн авдаг
                ч, хүссэн цаг болон мэргэжилтнээ баталгаажуулахын тулд урьдчилан
                цаг захиалахыг бид санал болгож байна.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-bold">
                Хэд хоногийн өмнө захиалах хэрэгтэй вэ?
              </h3>
              <p className="text-gray-600">
                Ажлын өдрүүдэд 2-3 хоногийн өмнө захиалахыг зөвлөж байна.
                Амралтын өдрүүд эсвэл тодорхой мэргэжилтэн сонгох бол 5-7
                хоногийн өмнө захиалах нь хамгийн тохиромжтой.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-bold">
                Захиалга цуцлах бодлого тань юу вэ?
              </h3>
              <p className="text-gray-600">
                Захиалгаа цуцлах бол ядаж 24 цагийн өмнө мэдэгдсэнд талархана.
                Ингэснээр тухайн цагийг өөр үйлчлүүлэгчид санал болгох боломжтой
                болдог.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-bold">
                Та бэлгийн карт санал болгодог уу?
              </h3>
              <p className="text-gray-600">
                Тийм ээ! Бэлгийн картуудыг дэлгүүр дээр болон онлайнаар худалдан
                авах боломжтой. Аль ч тохиолдолд хамгийн тохиромжтой бэлэг
                болно.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/services">
            <Button className="bg-black text-white hover:bg-gray-800">
              Бүх үйлчилгээг үзэх
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
