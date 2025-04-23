"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { UserType } from "@/app/utils/types";

type UserDataType = {
  user: UserType | null;
};

export function UserContactInfo({ user }: UserDataType) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save the updated user data
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p>{formData.username}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p>{formData.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p>{formData.phoneNumber}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="mr-1 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="first-name">First Name</Label>
        <Input
          id="first-name"
          name="firstName"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end md:col-span-2">
        <Button variant="outline" size="sm" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
