import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const ValuesSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-[1400px] m-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Бидний Үнэт Зүйлс</h2>
          <p className="mb-12 text-gray-600">
            StyleCut-д бидний хийж буй бүхий л зүйлсийг төгс байдалд хүргэх
            хүсэл тэмүүлэл, мөн эдгээр үндсэн зарчим биднийг хөтөлдөг.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-black p-3 text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Чанартай Урлал</h3>
              <p className="text-gray-600">
                Бид хийж буй ажлаараа бахархаж, үргэлж нарийн хийцтэй, өндөр
                чанартай үйлчилгээг хүргэхэд чин сэтгэлээсээ ханддаг.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-black p-3 text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">
                Хүн Бүрт Нээлттэй Орчин
              </h3>
              <p className="text-gray-600">
                Хүн бүр өөрийгөө тав тухтай, хүндлэгдсэн, үнэ цэнтэй мэдрэх
                дулаан уур амьсгалыг бүрдүүлдэг.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-black p-3 text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Тасралтгүй Өсөлт</h3>
              <p className="text-gray-600">
                Бид үргэлж шинэ зүйл сурах, ур чадвараа сайжруулах, хамгийн
                сүүлийн үеийн чиг хандлага, техникүүдтэй хөл нийлүүлэн алхахыг
                зорьдог.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
