import { useStaff } from "@/app/_context/StaffContext";
import { StaffType } from "@/app/utils/types";
import Image from "next/image";

export const TeamSection = () => {
  const { staffs } = useStaff();
  return (
    <section className="max-w-[1400px] m-auto py-16 md:py-24">
      <div className="px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Манай Мэргэшсэн Багтай Танилц
          </h2>
          <p className="mb-12 text-gray-600">
            Бидний авьяастай мэргэжилтнүүд олон жилийн туршлага, чин сэтгэлийн
            хүсэл тэмүүллээ үйлчилгээндээ шингээн хүргэдэг.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {staffs?.slice(0, 4).map((staff: StaffType, index: number) => {
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={staff.image}
                    alt=""
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-xl font-bold">{staff.name}</h3>
                  <p className="mb-2 text-sm text-gray-500">
                    {staff.profession}
                  </p>
                  <p className="text-sm text-gray-600">{staff.about}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
