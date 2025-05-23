"use client";
import { LoginFooter } from "../admin/login/_components/LoginFooter";
import { LoginHeader } from "../admin/login/_components/LoginHeader";
import { TabDemo } from "./_components/Tabs";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:px-6">
      <div className="w-full max-w-md space-y-6">
        <LoginHeader />
        <TabDemo />
        <LoginFooter />
      </div>
    </div>
  );
}
