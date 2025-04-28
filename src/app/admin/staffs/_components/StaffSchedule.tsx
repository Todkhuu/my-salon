"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Copy, Save } from "lucide-react";
import { toast } from "sonner";

// Generate time options in 30-minute increments
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, "0");
      const minuteStr = minute.toString().padStart(2, "0");
      const time = `${hourStr}:${minuteStr}`;
      const label = `${hour % 12 || 12}:${minuteStr} ${
        hour < 12 ? "AM" : "PM"
      }`;
      options.push({ value: time, label });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

export type DaySchedule = {
  isWorking: boolean;
  startTime: string;
  endTime: string;
  breaks: Array<{ start: string; end: string }>;
};

export type BarberSchedule = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

type BarberScheduleProps = {
  barberId: string;
  barberName: string;
  initialSchedule?: BarberSchedule;
  onSave: (barberId: string, schedule: BarberSchedule) => void;
};

const defaultDaySchedule: DaySchedule = {
  isWorking: false,
  startTime: "09:00",
  endTime: "17:00",
  breaks: [],
};

const defaultSchedule: BarberSchedule = {
  monday: { ...defaultDaySchedule, isWorking: true },
  tuesday: { ...defaultDaySchedule, isWorking: true },
  wednesday: { ...defaultDaySchedule, isWorking: true },
  thursday: { ...defaultDaySchedule, isWorking: true },
  friday: { ...defaultDaySchedule, isWorking: true },
  saturday: { ...defaultDaySchedule },
  sunday: { ...defaultDaySchedule },
};

export function BarberSchedule({
  barberId,
  barberName,
  initialSchedule,
  onSave,
}: BarberScheduleProps) {
  //   const { toast } = useToast();
  const [schedule, setSchedule] = useState<BarberSchedule>(
    initialSchedule || defaultSchedule
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleDay = (day: keyof BarberSchedule) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isWorking: !prev[day].isWorking,
      },
    }));
  };

  const handleTimeChange = (
    day: keyof BarberSchedule,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSaveSchedule = () => {
    onSave(barberId, schedule);
    setIsEditing(false);
    // toast({
    //   title: "Schedule saved",
    //   description: `${barberName}'s schedule has been updated successfully.`,
    // });
    toast("");
  };

  const copyDayToAll = (sourceDay: keyof BarberSchedule) => {
    const sourceDaySchedule = schedule[sourceDay];
    const updatedSchedule = Object.keys(schedule).reduce(
      (acc, day) => ({
        ...acc,
        [day]: { ...sourceDaySchedule },
      }),
      {} as BarberSchedule
    );
    setSchedule(updatedSchedule);
    // toast({
    //   title: "Schedule copied",
    //   description: `${
    //     sourceDay.charAt(0).toUpperCase() + sourceDay.slice(1)
    //   }'s schedule has been applied to all days.`,
    // });
    toast("");
  };

  const applyWeekdaySchedule = () => {
    const weekdaySchedule = schedule.monday;
    setSchedule((prev) => ({
      ...prev,
      tuesday: { ...weekdaySchedule },
      wednesday: { ...weekdaySchedule },
      thursday: { ...weekdaySchedule },
      friday: { ...weekdaySchedule },
    }));
    // toast({
    //   title: "Weekday schedule applied",
    //   description: "Monday's schedule has been applied to all weekdays.",
    // });
    toast("");
  };

  const days: Array<{ key: keyof BarberSchedule; label: string }> = [
    { key: "monday", label: "Mon" },
    { key: "tuesday", label: "Tue" },
    { key: "wednesday", label: "Wed" },
    { key: "thursday", label: "Thu" },
    { key: "friday", label: "Fri" },
    { key: "saturday", label: "Sat" },
    { key: "sunday", label: "Sun" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">
              {barberName}'s Weekly Schedule
            </CardTitle>
            <CardDescription>Set working days and hours</CardDescription>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <Button onClick={handleSaveSchedule} size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
              >
                Edit Schedule
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyDayToAll("monday")}
            >
              <Copy className="mr-2 h-3 w-3" />
              Copy Monday to All
            </Button>
            <Button variant="outline" size="sm" onClick={applyWeekdaySchedule}>
              <Copy className="mr-2 h-3 w-3" />
              Apply to Weekdays
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
          {days.map(({ key, label }) => (
            <div
              key={key}
              className={`rounded-lg border p-3 ${
                schedule[key].isWorking
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{label}</h3>
                {isEditing && (
                  <Switch
                    checked={schedule[key].isWorking}
                    onCheckedChange={() => handleToggleDay(key)}
                    aria-label={`Toggle ${label}`}
                  />
                )}
              </div>

              {schedule[key].isWorking ? (
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-3 w-3" />
                    {isEditing ? (
                      <div className="grid w-full grid-cols-2 gap-1">
                        <div>
                          <Label htmlFor={`${key}-start`} className="sr-only">
                            Start Time
                          </Label>
                          <Select
                            value={schedule[key].startTime}
                            onValueChange={(value) =>
                              handleTimeChange(key, "startTime", value)
                            }
                          >
                            <SelectTrigger
                              id={`${key}-start`}
                              className="h-7 text-xs"
                            >
                              <SelectValue placeholder="Start" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map((option) => (
                                <SelectItem
                                  key={`${key}-start-${option.value}`}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor={`${key}-end`} className="sr-only">
                            End Time
                          </Label>
                          <Select
                            value={schedule[key].endTime}
                            onValueChange={(value) =>
                              handleTimeChange(key, "endTime", value)
                            }
                          >
                            <SelectTrigger
                              id={`${key}-end`}
                              className="h-7 text-xs"
                            >
                              <SelectValue placeholder="End" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map((option) => (
                                <SelectItem
                                  key={`${key}-end-${option.value}`}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <span>
                        {formatTime(schedule[key].startTime)} -{" "}
                        {formatTime(schedule[key].endTime)}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-sm text-muted-foreground">
                  Not Working
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to format time from 24h to 12h format
function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}
