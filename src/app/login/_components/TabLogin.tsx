import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

export const TabLogin = () => {
  return (
    <TabsContent value="login" className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs text-gray-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800"
      >
        Sign In
      </Button>
    </TabsContent>
  );
};
