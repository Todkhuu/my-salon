"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "../appointments/_components/AdminHeader";
import { ServiceList } from "./_components/ServiceList";
import { CategoryList } from "./_components/CategoryList";
import { ServiceDialogs } from "./_components/ServiceDialogs";
import { toast } from "sonner";
import { useCategory } from "@/app/_context/CategoryContext";
import { CategoryType, ServiceType } from "@/app/utils/types";
import { useService } from "@/app/_context/ServiceContext";

// This would come from your database in a real app

export default function ServicesPage() {
  const { categories } = useCategory();
  const { services } = useService();
  // const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [serviceCategories, setServiceCategories] = useState<
    CategoryType[] | null
  >(categories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] =
    useState(false);
  const [currentService, setCurrentService] = useState<ServiceType | null>(
    null
  );
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  console.log("allServices: ", services);

  const filteredServices: ServiceType[] | undefined = services?.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("filteredServices: ", filteredServices);

  const handleAddService = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditService = (service: ServiceType) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  const handleDeleteServiceModal = (service: any) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateService = (data: any) => {
    const newService = {
      id: `service-${Date.now()}`,
      name: data.name,
      description: data.description,
      duration: data.duration,
      price: data.price,
      popular: data.popular,
      category: data.category,
    };

    const updatedCategories: any = serviceCategories?.map(
      (category: CategoryType) => {
        if (category._id === data.category) {
          return {
            ...category,
            services: [...category.services, newService],
          };
        }
        return category;
      }
    );

    setServiceCategories(updatedCategories);
    setIsAddDialogOpen(false);
    // toast({
    //   title: "Service created",
    //   description: `${data.name} has been added to your services.`,
    // });
    toast("");
  };

  const handleUpdateService = (data: any) => {
    const updatedCategories: any = serviceCategories?.map((category) => {
      // If the service is being moved to a different category
      if (data.category !== currentService?.category.name) {
        // Remove from old category
        if (category._id === currentService?.category.name) {
          return {
            ...category,
            services: category.services.filter(
              (s) => s._id !== currentService._id
            ),
          };
        }
        // Add to new category
        if (category._id === data.category) {
          const updatedService = {
            ...currentService,
            name: data.name,
            description: data.description,
            duration: data.duration,
            price: data.price,
            popular: data.popular,
            category: data.category,
          };
          return {
            ...category,
            services: [...category.services, updatedService],
          };
        }
      }
      // If staying in the same category, just update the service
      else if (category._id === currentService?.category._id) {
        return {
          ...category,
          services: category.services.map((s) =>
            s._id === currentService._id
              ? {
                  ...s,
                  name: data.name,
                  description: data.description,
                  duration: data.duration,
                  price: data.price,
                  popular: data.popular,
                }
              : s
          ),
        };
      }
      return category;
    });

    setServiceCategories(updatedCategories);
    setIsEditDialogOpen(false);
    // toast({
    //   title: "Service updated",
    //   description: `${data.name} has been updated successfully.`,
    // });
    toast("");
  };

  const handleDeleteService = () => {
    const updatedCategories: any = serviceCategories?.map((category) => {
      if (category._id === currentService?.category._id) {
        return {
          ...category,
          services: category.services.filter(
            (s) => s._id !== currentService._id
          ),
        };
      }
      return category;
    });

    setServiceCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    // toast({
    //   title: "Service deleted",
    //   description: `${currentService.name} has been deleted.`,
    //   variant: "destructive",
    // });
    toast("");
  };

  const handleAddCategory = () => {
    setIsAddCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setCurrentCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryDescription(category.description);
    setIsEditCategoryDialogOpen(true);
  };

  const handleCreateCategory = () => {
    const newCategoryId = `category-${Date.now()}`;
    const newCategory = {
      id: newCategoryId,
      name: newCategoryName,
      description: newCategoryDescription,
      services: [],
    };

    setServiceCategories([...serviceCategories, newCategory]);
    setIsAddCategoryDialogOpen(false);
    setNewCategoryName("");
    setNewCategoryDescription("");
    // toast({
    //   title: "Category created",
    //   description: `${newCategoryName} has been added to your service categories.`,
    // });
    toast("");
  };

  const handleUpdateCategory = () => {
    const updatedCategories: any = serviceCategories?.map((category) => {
      if (category._id === currentCategory.id) {
        return {
          ...category,
          name: newCategoryName,
          description: newCategoryDescription,
        };
      }
      return category;
    });

    setServiceCategories(updatedCategories);
    setIsEditCategoryDialogOpen(false);
    // toast({
    //   title: "Category updated",
    //   description: `${newCategoryName} has been updated successfully.`,
    // });
    toast("");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <AdminHeader
        title="Services"
        description="Manage your barbershop services"
        action={{ label: "Add Service", onClick: handleAddService }}
      />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ServiceList
            filteredServices={filteredServices}
            handleEditService={handleEditService}
            handleDeleteServiceModal={handleDeleteServiceModal}
          />
        </TabsContent>
        <TabsContent value="categories" className="mt-4 space-y-6">
          <CategoryList
            categories={serviceCategories}
            onEditCategory={handleEditCategory}
            onEditService={handleEditService}
            onDeleteService={handleDeleteServiceModal}
          />
          <div className="flex justify-center">
            <Button onClick={handleAddCategory}>Add New Category</Button>
          </div>
        </TabsContent>
      </Tabs>

      <ServiceDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isAddCategoryDialogOpen={isAddCategoryDialogOpen}
        setIsAddCategoryDialogOpen={setIsAddCategoryDialogOpen}
        isEditCategoryDialogOpen={isEditCategoryDialogOpen}
        setIsEditCategoryDialogOpen={setIsEditCategoryDialogOpen}
        currentService={currentService}
        currentCategory={currentCategory}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        newCategoryDescription={newCategoryDescription}
        setNewCategoryDescription={setNewCategoryDescription}
        onCreateService={handleCreateService}
        onUpdateService={handleUpdateService}
        onDeleteService={handleDeleteService}
        onCreateCategory={handleCreateCategory}
        onUpdateCategory={handleUpdateCategory}
      />
    </div>
  );
}
