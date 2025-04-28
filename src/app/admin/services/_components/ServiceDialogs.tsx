"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceForm } from "./ServiceForm";

interface ServiceDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  isAddCategoryDialogOpen: boolean;
  setIsAddCategoryDialogOpen: (open: boolean) => void;
  isEditCategoryDialogOpen: boolean;
  setIsEditCategoryDialogOpen: (open: boolean) => void;
  currentService: any;
  currentCategory: any;
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  newCategoryDescription: string;
  setNewCategoryDescription: (description: string) => void;
  onCreateService: (data: any) => void;
  onUpdateService: (data: any) => void;
  onDeleteService: () => void;
  onCreateCategory: () => void;
  onUpdateCategory: () => void;
}

export function ServiceDialogs({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  isAddCategoryDialogOpen,
  setIsAddCategoryDialogOpen,
  isEditCategoryDialogOpen,
  setIsEditCategoryDialogOpen,
  currentService,
  currentCategory,
  newCategoryName,
  setNewCategoryName,
  newCategoryDescription,
  setNewCategoryDescription,
  onCreateService,
  onUpdateService,
  onDeleteService,
  onCreateCategory,
  onUpdateCategory,
}: ServiceDialogsProps) {
  return (
    <>
      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <ServiceForm
            onSubmit={onCreateService}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {currentService && (
            <ServiceForm
              initialData={currentService}
              onSubmit={onUpdateService}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Service Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the service "{currentService?.name}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDeleteService}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Category Dialog */}
      <Dialog
        open={isAddCategoryDialogOpen}
        onOpenChange={setIsAddCategoryDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="categoryName" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Spa Services"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="categoryDescription"
                className="text-sm font-medium"
              >
                Description
              </label>
              <Input
                id="categoryDescription"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                placeholder="e.g. Relaxing spa treatments"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddCategoryDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={onCreateCategory} disabled={!newCategoryName}>
                Create Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog
        open={isEditCategoryDialogOpen}
        onOpenChange={setIsEditCategoryDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="editCategoryName" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="editCategoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="editCategoryDescription"
                className="text-sm font-medium"
              >
                Description
              </label>
              <Input
                id="editCategoryDescription"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditCategoryDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={onUpdateCategory} disabled={!newCategoryName}>
                Update Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
