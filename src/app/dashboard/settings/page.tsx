"use client";

import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CreditCard, Mail, Phone, Shield } from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    appointments: true,
    reminders: true,
    promotions: false,
    news: false,
  });

  const [smsNotifications, setSmsNotifications] = useState({
    appointments: true,
    reminders: true,
    promotions: false,
  });

  const handleEmailChange = (key: keyof typeof emailNotifications) => {
    setEmailNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSmsChange = (key: keyof typeof smsNotifications) => {
    setSmsNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Manage how you receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-appointments" className="font-medium">
                    Appointment Confirmations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails when your appointments are confirmed
                  </p>
                </div>
                <Switch
                  id="email-appointments"
                  checked={emailNotifications.appointments}
                  onCheckedChange={() => handleEmailChange("appointments")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-reminders" className="font-medium">
                    Appointment Reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminder emails before your scheduled appointments
                  </p>
                </div>
                <Switch
                  id="email-reminders"
                  checked={emailNotifications.reminders}
                  onCheckedChange={() => handleEmailChange("reminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-promotions" className="font-medium">
                    Promotions & Discounts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about special offers and discounts
                  </p>
                </div>
                <Switch
                  id="email-promotions"
                  checked={emailNotifications.promotions}
                  onCheckedChange={() => handleEmailChange("promotions")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-news" className="font-medium">
                    News & Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new services and barbershop updates
                  </p>
                </div>
                <Switch
                  id="email-news"
                  checked={emailNotifications.news}
                  onCheckedChange={() => handleEmailChange("news")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                SMS Notifications
              </CardTitle>
              <CardDescription>
                Manage how you receive text message notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-appointments" className="font-medium">
                    Appointment Confirmations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages when your appointments are confirmed
                  </p>
                </div>
                <Switch
                  id="sms-appointments"
                  checked={smsNotifications.appointments}
                  onCheckedChange={() => handleSmsChange("appointments")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-reminders" className="font-medium">
                    Appointment Reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminder text messages before your scheduled
                    appointments
                  </p>
                </div>
                <Switch
                  id="sms-reminders"
                  checked={smsNotifications.reminders}
                  onCheckedChange={() => handleSmsChange("reminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-promotions" className="font-medium">
                    Promotions & Discounts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages about special offers and discounts
                  </p>
                </div>
                <Switch
                  id="sms-promotions"
                  checked={smsNotifications.promotions}
                  onCheckedChange={() => handleSmsChange("promotions")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Notification Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-black p-2 text-white">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/2025
                      </p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Add New Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="billing-name">Full Name</Label>
                  <Input id="billing-name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Email</Label>
                  <Input
                    id="billing-email"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Address</Label>
                  <Input
                    id="billing-address"
                    defaultValue="123 Main St, Anytown, USA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-city">City</Label>
                  <Input id="billing-city" defaultValue="Anytown" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-state">State</Label>
                  <Select defaultValue="ca">
                    <SelectTrigger id="billing-state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                      <SelectItem value="fl">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-zip">ZIP Code</Label>
                  <Input id="billing-zip" defaultValue="12345" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Billing Information</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Manage your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-collection" className="font-medium">
                    Data Collection
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect data to improve your experience
                  </p>
                </div>
                <Switch id="data-collection" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="personalized-recommendations"
                    className="font-medium"
                  >
                    Personalized Recommendations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized service recommendations based on your
                    history
                  </p>
                </div>
                <Switch id="personalized-recommendations" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="third-party-sharing" className="font-medium">
                    Third-Party Data Sharing
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow sharing your data with trusted partners
                  </p>
                </div>
                <Switch id="third-party-sharing" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Change Password</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your password regularly for better security
                  </p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Login History</h3>
                  <p className="text-sm text-muted-foreground">
                    View your recent login activity
                  </p>
                </div>
                <Button variant="outline">View History</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
