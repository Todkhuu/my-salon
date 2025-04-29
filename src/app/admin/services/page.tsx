"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MoreHorizontal, Search } from "lucide-react";
import { AdminHeader } from "../appointments/_components/AdminHeader";
import { useCategory } from "@/app/_context/CategoryContext";
import { AddServiceDialog } from "./_components/AddServiceDialog";
import { useService } from "@/app/_context/ServiceContext";
import { EditServiceDialog } from "./_components/EditServiceDialog";
import { DeleteServiceAlertDialog } from "./_components/DeleteServiceAlertDialog";
import { AddCategoryDialog } from "./_components/AddCategoryDialog";
import { EditCategoryDialog } from "./_components/EditCategoryDialog";

export default function ServicesPage() {
  const { categories } = useCategory();
  const { services, setServices } = useService();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services?.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <AdminHeader
          title="Үйлчилгээнүүд"
          description="Танай салоны үйлчилгээнүүдийг удирдах"
        />
        <AddServiceDialog />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Бүх үйлчилгээ</TabsTrigger>
          <TabsTrigger value="categories">Ангилалууд</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Үйлчилгээ хайх..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Үйлчилгээ</TableHead>
                  <TableHead>Ангилал</TableHead>
                  <TableHead>Хугацаа</TableHead>
                  <TableHead>Үнэ</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices?.map((service) => (
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
                        <span>{service.price} ₮</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Цэс нээх</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <EditServiceDialog service={service} />
                          <DeleteServiceAlertDialog
                            serviceId={service._id}
                            setServices={setServices}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="categories" className="mt-4 space-y-6">
          {categories?.map((category) => {
            const filteredService = services?.filter(
              (service) => service.category._id == category._id
            );
            return (
              <Card key={category._id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{category.name}</CardTitle>
                  <EditCategoryDialog category={category} />
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Үйлчилгээ</TableHead>
                          <TableHead>Хугацаа</TableHead>
                          <TableHead>Үнэ</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredService?.map((service) => (
                          <TableRow key={service._id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {service.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {service.description}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{service.duration} мин</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span>{service.price} ₮</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Цэс нээх</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <EditServiceDialog service={service} />
                                  <DeleteServiceAlertDialog
                                    serviceId={service._id}
                                    setServices={setServices}
                                  />
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <div className="flex justify-center">
            <AddCategoryDialog />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
