"use client";
import { UserType } from "@/app/utils/types";

type UserDataType = {
  user: UserType | null;
};

export function UserContactInfo({ user }: UserDataType) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-10 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 min-h-[25px]">Нэр</p>
          <p>{user?.username}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 min-h-[25px]">
            И-мэйл
          </p>
          <p>{user?.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 min-h-[25px]">
            Утасны дугаар
          </p>
          <p>{user?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}
