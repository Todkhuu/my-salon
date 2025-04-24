import { ServiceType, StaffType } from "@/app/utils/types";
import Link from "next/link";

type Props = {
  staff: StaffType | undefined;
  service: ServiceType | undefined;
};

export const Breadcrumbs = ({ staff, service }: Props) => {
  return (
    <div className="mb-8">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        Нүүр хуудас
      </Link>{" "}
      /{" "}
      <Link
        href={`/booking?staffs=${staff?._id}&service=${service?._id}`}
        className="text-sm text-gray-500 hover:underline"
      >
        Цаг товлох
      </Link>{" "}
      / <span className="text-sm font-medium">Төлбөрийн хэсэг</span>
    </div>
  );
};
