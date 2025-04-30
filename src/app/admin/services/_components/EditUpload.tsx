"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { FileImage } from "lucide-react";

const EditUpload = ({ handleFile }: { handleFile: (_file: File) => void }) => {
  const [image, setImage] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (file) {
      handleFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      e.target.value = "";
    }
  };

  return (
    <label htmlFor="file-input" className="block">
      {image ? (
        <div className="h-[138px] rounded-md overflow-hidden">
          <Image
            alt="uploaded"
            src={image}
            width={1000}
            height={1000}
            quality={85}
            className="w-full h-[138px] object-cover object-center"
          />
        </div>
      ) : (
        <div className="h-[138px] border border-dashed rounded-md flex flex-col justify-center items-center">
          <FileImage className="stroke-[#71717a] w-[18px] h-[18px]" />
          <p className="text-[#71717a] text-[14px]">Зураг оруулах</p>
        </div>
      )}
      <Input
        id="file-input"
        onChange={handleOnChange}
        type="file"
        className="hidden"
      />
    </label>
  );
};
export default EditUpload;
