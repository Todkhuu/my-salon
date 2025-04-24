import { ServiceType, StaffType } from "@/app/utils/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  staff: StaffType | undefined;
  service: ServiceType | undefined;
};

export const CheckoutHeader = ({ staff, service }: Props) => {
  return (
    <div className="mb-8">
      <Link
        href={`/booking?staffs=${staff?._id}&service=${service?._id}`}
        className="mb-4 flex items-center text-sm text-gray-500 hover:underline"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Цаг захиалага руу буцах
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Захиалгаа баталгаажуулна уу</h1>
      <p className="text-gray-500">
        Цаг захиалгын мэдээллээ шалгаад, төлбөрөө хийж дуусгана уу
      </p>
    </div>
  );
};
