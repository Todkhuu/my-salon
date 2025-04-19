"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  // required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  // required = false,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // required={required}
        // aria-invalid={!!error}
        className={error ? "ring-1 ring-red-500 border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
