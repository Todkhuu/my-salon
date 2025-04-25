"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextarea?: boolean;
};

export const FormField = ({
  id,
  label,
  required,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  isTextarea = false,
}: FieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {isTextarea ? (
        <Textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className={error ? "border-red-500" : ""}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? "border-red-500" : ""}
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
