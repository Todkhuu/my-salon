import { TabDemo } from "./_components/Tabs";
import { LoginHeader } from "./_components/LoginHeader";
import { LoginFooter } from "./_components/LoginFooter";

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
