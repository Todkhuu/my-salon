import { ServiceType } from "@/app/utils/types";
import Link from "next/link";

type Props = {
  service: ServiceType | null;
};

export default function Breadcrumbs({ service }: Props) {
  return (
    <div className="mb-8">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        Нүүр хуудас
      </Link>{" "}
      /{" "}
      <Link href="/services" className="text-sm text-gray-500 hover:underline">
        Үйлчилгээнүүд
      </Link>{" "}
      /{" "}
      <Link
        href={`/staffs?service=${service?._id}`}
        className="text-sm text-gray-500 hover:underline"
      >
        Артистууд
      </Link>{" "}
      /<span className="text-sm font-medium"> Цаг товлох</span>
    </div>
  );
}
