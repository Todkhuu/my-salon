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

interface DeleteServiceAlertDialogProps {
  serviceId: string;
}

export function DeleteServiceAlertDialog({
  serviceId,
}: DeleteServiceAlertDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await axios.delete(`/api/service/${serviceId}`);

      toast.success("Service deleted successfully");

      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete service");
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
        Delete
      </Button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            service and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
