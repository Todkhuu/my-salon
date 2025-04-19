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
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabLogin />
      <TabRegister setTab={setTab} />
    </Tabs>
  );
};
