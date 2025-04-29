"use client";
import { Login } from "./_components/Login";
import { LoginFooter } from "./_components/LoginFooter";
import { LoginHeader } from "./_components/LoginHeader";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:px-6">
      <div className="w-full max-w-md space-y-6">
        <LoginHeader />
        <Login />
        <LoginFooter />
      </div>
    </div>
  );
}
