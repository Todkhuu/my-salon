import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContentPersonal } from "./TabsContentPersonal";
import { TabsContentPreferences } from "./TabsContentPreferences";

export const ProfileTab = () => {
  return (
    <Tabs defaultValue="personal">
      <TabsList>
        <TabsTrigger value="personal">Хувийн мэдээлэл</TabsTrigger>
        <TabsTrigger value="preferences">Тохиргоо</TabsTrigger>
      </TabsList>
      <TabsContentPersonal />
      <TabsContentPreferences />
    </Tabs>
  );
};
