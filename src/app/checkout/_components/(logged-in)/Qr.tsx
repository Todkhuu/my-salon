import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export const Qr = ({ isProcessing }: { isProcessing: boolean }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Image
        alt="qr"
        src={
          "https://res.cloudinary.com/ds6kxgjh0/image/upload/v1745468279/qr_kyd9cn.png"
        }
        width={300}
        height={300}
        className="border mb-6"
      />
      <Button
        type="submit"
        className="w-[300px] bg-black text-white hover:bg-gray-800"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Боловсруулж байна...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Захиалгыг баталгаажуулах
          </span>
        )}
      </Button>
    </div>
  );
};
