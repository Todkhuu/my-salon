"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, MoreHorizontal } from "lucide-react";
import { ServiceType } from "@/app/utils/types";

interface ServiceListProps {
  filteredServices: ServiceType[] | undefined;
  handleEditService: (service: ServiceType) => void;
  handleDeleteServiceModal: (service: ServiceType) => void;
}

export function ServiceList({
  filteredServices,
  handleEditService,
  handleDeleteServiceModal,
}: ServiceListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Үйлчилгээ</TableHead>
            <TableHead>Ангилал</TableHead>
            <TableHead>Хугацаа</TableHead>
            <TableHead>Үнэ</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Үйлчилгээ олдсонгүй.
              </TableCell>
            </TableRow>
          ) : (
            filteredServices?.map((service) => (
              <TableRow key={service._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {service.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{service.category.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{service.duration} мин</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span>{service.price}₮</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Цэс нээх</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditService(service)}
                      >
                        Үйлчилгээ засах
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDeleteServiceModal(service)}
                      >
                        Үйлчилгээ устгах
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
