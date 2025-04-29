import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const TestimonialsSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-[1400px] m-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Үйлчлүүлэгчдийн Сэтгэгдэл</h2>
          <p className="mb-12 text-gray-600">
            Бидний үгнээс гадна үйлчлүүлэгчдийн сэтгэгдлийг өөрсдөөс нь
            сонсоорой
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                &ldquo;StyleCut-д олон жил үйлчлүүлж байна. Саруул яг миний
                үсийг яаж тайрахыг мэддэг бөгөөд шинэ трендүүдээс хоцордоггүй нь
                үнэхээр таалагддаг.&ldquo;
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Client"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="font-medium">Цэцгээ</p>
                  <p className="text-sm text-gray-500">
                    2015 оноос хойш үнэнч үйлчлүүлэгч
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                &ldquo;Сара миний дүр төрхийг бүрэн өөрчилсөн! Нүүрний хэлбэрт
                минь тохируулсан, анхааралтай хийсэн будалт нь гайхалтай байсан.
                Хамгийн гоё үсний будаг!&ldquo;
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Client"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="font-medium">Жимсээ</p>
                  <p className="text-sm text-gray-500">Тогтмол үйлчлүүлэгч</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                &ldquo;Онлайн цаг захиалах систем маш амархан, үйлчилгээ нь
                үргэлж өндөр түвшинд байдаг. Гэрэлээгийн хийсэн хумсны арт
                гайхалтай би үргэлж магтдаг!&ldquo;
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Client"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="font-medium">Энхжин</p>
                  <p className="text-sm text-gray-500">
                    Сар бүрийн үйлчлүүлэгч
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
