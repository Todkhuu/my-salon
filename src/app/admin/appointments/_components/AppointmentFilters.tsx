import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { AppointmentType } from "@/app/utils/types";
import { useService } from "@/app/_context/ServiceContext";

type Props = {
  allAppointment: AppointmentType[] | null;
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  statusFilter: string;
  setStatusFilter?: (value: string) => void;
  staffFilter: string;
  setStaffFilter?: (value: string) => void;
  serviceFilter: string;
  setServiceFilter?: (value: string) => void;
};

export const AppointmentFilters = ({
  allAppointment,
  date,
  setDate,
  statusFilter,
  setStatusFilter,
  staffFilter,
  setStaffFilter,
  serviceFilter,
  setServiceFilter,
}: Props) => {
  const { services } = useService();

  const uniqueStaffNames = [
    ...new Set(allAppointment?.map((a) => a.staffId.name)),
  ];

  return (
    <div className="space-y-4 ">
      <Card>
        <CardContent className="p-4 ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Filter by Status</h3>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                  <SelectItem value="CANCELED">CANCELED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Filter by Barber</h3>
              <Select value={staffFilter} onValueChange={setStaffFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select barber" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Barbers</SelectItem>
                  {uniqueStaffNames?.map((name) => {
                    return (
                      <SelectItem key={name} value={`${name}`}>
                        {name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Filter by Service</h3>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services?.map((service) => {
                    return (
                      <SelectItem key={service._id} value={`${service.name}`}>
                        {service.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
