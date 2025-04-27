"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/app/_context/UserContext";
import { TabsContentStaffs } from "./TabsContentStaffs";
import { TabsContentServices } from "./TabsContentServices";

export const FavoriteTab = () => {
  const { user } = useUser();
  return (
    <Tabs defaultValue="staffs">
      <TabsList>
        <TabsTrigger value="staffs">Дуртай Стилистүүд</TabsTrigger>
        <TabsTrigger value="services">Дуртай Үйлчилгээнүүд</TabsTrigger>
      </TabsList>
      <TabsContentStaffs user={user} />
      <TabsContentServices user={user} />
    </Tabs>
  );
};
