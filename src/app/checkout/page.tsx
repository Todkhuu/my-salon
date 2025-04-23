"use client";

import { Check } from "lucide-react";
import { useUser } from "../_context/UserContext";
import LoggedInCheckoutPage from "./_components/LoggedIn";
import CheckoutPage from "./_components/LoggedOut";

function Page() {
  const { user } = useUser();
  return <div>{user ? <LoggedInCheckoutPage /> : <CheckoutPage />}</div>;
}

export default Page;

{
  /* <div className="mb-6 rounded-lg border p-6">
  <h2 className="mb-4 text-xl font-bold">Payment Method</h2>
  <Tabs defaultValue="card">
    <TabsList className="mb-4 grid w-full grid-cols-2">
      <TabsTrigger value="card">Credit Card</TabsTrigger>
      <TabsTrigger value="paypal">PayPal</TabsTrigger>
    </TabsList>
    <TabsContent value="card">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input id="card-number" placeholder="1234 5678 9012 3456" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" placeholder="MM/YY" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name-on-card">Name on Card</Label>
          <Input id="name-on-card" required />
        </div>
      </div>
    </TabsContent>
    <TabsContent value="paypal">
      <div className="flex flex-col items-center justify-center space-y-4 p-6">
        <p className="text-center text-gray-500">
          You will be redirected to PayPal to complete your payment.
        </p>
        <Image
          src="/placeholder.svg?height=60&width=120"
          alt="PayPal"
          width={120}
          height={60}
        />
      </div>
    </TabsContent>
  </Tabs>
</div>; */
}
