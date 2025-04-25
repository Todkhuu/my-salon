"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export const SubjectSelect = ({ value, error, onChange }: Props) => (
  <div className="space-y-2">
    <Label htmlFor="subject">
      Сэдэв<span className="text-red-500">*</span>
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={error ? "border-red-500" : ""}>
        <SelectValue placeholder="Сэдэв сонгоно уу" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="general">Ерөнхий асуулт</SelectItem>
        <SelectItem value="appointment">Цаг захиалгын асуулт</SelectItem>
        <SelectItem value="services">Үйлчилгээний мэдээлэл</SelectItem>
        <SelectItem value="feedback">Санал хүсэлт</SelectItem>
        <SelectItem value="careers">Ажлын боломж</SelectItem>
      </SelectContent>
    </Select>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
