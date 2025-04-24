"use client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { addDays, isAfter, isBefore } from "date-fns";
import { generateTimeSlots } from "./timeSlots";
import { mn } from "date-fns/locale";

const timeSlots = generateTimeSlots();

type SelectorType = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
};

export function DateTimeSelector({
  date,
  setDate,
  selectedTime,
  setSelectedTime,
}: SelectorType) {
  const today = new Date();
  const oneWeekLater = addDays(today, 7);

  const isOutsideRange = (date: Date) =>
    isBefore(date, today) || isAfter(date, oneWeekLater);

  return (
    <div className="mb-6 rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-bold">Өдөр болон цаг сонгоно уу</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-medium">Өдөр</h3>
          <Calendar
            mode="single"
            selected={date}
            locale={mn}
            onSelect={(selected) => {
              if (selected && !isOutsideRange(selected)) {
                setDate(selected);
              }
            }}
            className="rounded-md border w-full"
            disabled={isOutsideRange}
            modifiersClassNames={{
              outsideRange: "text-gray-300",
            }}
          />
        </div>
        <div>
          <h3 className="mb-2 font-medium">Боломжит цаг</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className={`h-auto py-2 ${
                  selectedTime === time ? "bg-black text-white" : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
