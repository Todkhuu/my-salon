"use client";

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
