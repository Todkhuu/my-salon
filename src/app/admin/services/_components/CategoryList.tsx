"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, MoreHorizontal } from "lucide-react";
import { CategoryType } from "@/app/utils/types";

interface CategoryListProps {
  categories: CategoryType[] | null;
  onEditCategory: (category: any) => void;
  onEditService: (service: any) => void;
  onDeleteService: (service: any) => void;
}

export function CategoryList({
  categories,
  onEditCategory,
  onEditService,
  onDeleteService,
}: CategoryListProps) {
  return (
    <div className="space-y-6">
      {categories?.map((category) => (
        <Card key={category._id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{category.name}</CardTitle>
            <Button size="sm" onClick={() => onEditCategory(category)}>
              Edit Category
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{category.description}</p>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.services.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No services in this category.
                      </TableCell>
                    </TableRow>
                  ) : (
                    category.services.map((service: any) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {service.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{service.duration} min</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>${service.price}</span>
                          </div>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onEditService(service)}
                              >
                                Edit service
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => onDeleteService(service)}
                              >
                                Delete service
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
