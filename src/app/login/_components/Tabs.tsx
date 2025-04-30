"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabLogin } from "./TabLogin";
import { TabRegister } from "./TabRegister";
import { useState } from "react";

type TabType = "login" | "register";

export const TabDemo = () => {
  const [tab, setTab] = useState<TabType>("login");
  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as TabType)}
      className="w-full px-4 sm:px-0"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Нэвтрэх</TabsTrigger>
        <TabsTrigger value="register">Бүртгүүлэх</TabsTrigger>
      </TabsList>
      <TabLogin />
      <TabRegister setTab={setTab} />
    </Tabs>
  );
};
