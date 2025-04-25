"use client";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SubmissionSuccess = ({ onReset }: { onReset: () => void }) => (
  <div className="rounded-lg bg-green-50 p-6">
    <div className="flex items-center">
      <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
      <h3 className="text-xl font-bold text-green-800">
        Зурвас амжилттай илгээгдлээ!
      </h3>
    </div>
    <p className="mt-2 text-green-700">
      Холбогдсонд баярлалаа. Бид танд аль болох хурдан хариу өгнө.
    </p>
    <Button
      className="mt-4 bg-black text-white hover:bg-gray-800"
      onClick={onReset}
    >
      Шинэ зурвас илгээх
    </Button>
  </div>
);
