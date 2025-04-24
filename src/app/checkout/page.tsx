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
