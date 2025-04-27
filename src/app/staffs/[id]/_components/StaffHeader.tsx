import { StaffType } from "@/app/utils/types";
import Link from "next/link";

export const StaffHeader = ({ staff }: { staff: StaffType }) => {
  return (
    <div className="mb-8">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        Home
      </Link>{" "}
      /{" "}
      <Link href="/staffs" className="text-sm text-gray-500 hover:underline">
        Our Barbers
      </Link>{" "}
      / <span className="text-sm font-medium">{staff?.name}</span>
    </div>
  );
};
