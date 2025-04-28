"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Button onClick={action.onClick} className="mt-2 sm:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
