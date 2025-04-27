"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

export const ChangePasswordCard = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Бүртгэлийн мэдээлэл</CardTitle>
          <CardDescription>Бүртгэлийн тохиргоогоо удирдах</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Нууц үг</h3>
              <p className="text-sm text-muted-foreground">
                Сүүлд 3 сарын өмнө өөрчилсөн
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPasswordModal(true)}
            >
              Нууц үг солих
            </Button>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
};
