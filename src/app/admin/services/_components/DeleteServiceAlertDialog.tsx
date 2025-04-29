"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { ServiceType } from "@/app/utils/types";

interface DeleteServiceAlertDialogProps {
  serviceId: string;
  setServices: React.Dispatch<React.SetStateAction<ServiceType[] | null>>;
}

export function DeleteServiceAlertDialog({
  serviceId,
  setServices,
}: DeleteServiceAlertDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await axios.delete(`/api/service/${serviceId}`);

      toast.success("Үйлчилгээ амжилттай устгагдлаа");

      setServices((prev) => {
        if (!prev) return [];
        return prev.filter((service) => service._id !== serviceId);
      });

      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Үйлчилгээг устгах үед алдаа гарлаа");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-600"
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Устгах
      </Button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Та итгэлтэй байна уу?</AlertDialogTitle>
          <AlertDialogDescription>
            Энэ үйлдлийг буцаах боломжгүй. Үйлчилгээг бүрмөсөн устгах ба
            серверээс устгагдана.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Болих</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Устгаж байна..." : "Устгах"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
