import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input"; // эсвэл өөрийн input

interface FormInputProps {
  control: any;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export const FormInput = ({
  control,
  name,
  label,
  type = "text",
  placeholder = "",
}: FormInputProps) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className="w-full mt-2"
            />
            {fieldState?.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};
