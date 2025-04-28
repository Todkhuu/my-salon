"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { MoreHorizontal, Search } from "lucide-react";
import { AdminHeader } from "../appointments/_components/AdminHeader";
import { CustomerForm } from "./_components/CustomerForm";
import { toast } from "sonner";

// This would come from your database in a real app
const initialCustomers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    visits: 8,
    lastVisit: "2025-04-10",
    totalSpent: "$320",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "(555) 234-5678",
    visits: 12,
    lastVisit: "2025-04-05",
    totalSpent: "$485",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(555) 345-6789",
    visits: 3,
    lastVisit: "2025-03-20",
    totalSpent: "$95",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Sophia Garcia",
    email: "sophia@example.com",
    phone: "(555) 456-7890",
    visits: 6,
    lastVisit: "2025-04-01",
    totalSpent: "$210",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "David Lee",
    email: "david@example.com",
    phone: "(555) 567-8901",
    visits: 15,
    lastVisit: "2025-04-12",
    totalSpent: "$620",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    phone: "(555) 678-9012",
    visits: 4,
    lastVisit: "2025-03-15",
    totalSpent: "$170",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "James Taylor",
    email: "james@example.com",
    phone: "(555) 789-0123",
    visits: 9,
    lastVisit: "2025-03-28",
    totalSpent: "$345",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function CustomersPage() {
  //   const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewAppointmentsDialogOpen, setIsViewAppointmentsDialogOpen] =
    useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const handleAddCustomer = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditCustomer = (customer: any) => {
    setCurrentCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleDeleteCustomer = (customer: any) => {
    setCurrentCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleViewAppointments = (customer: any) => {
    setCurrentCustomer(customer);
    setIsViewAppointmentsDialogOpen(true);
  };

  const handleCreateCustomer = (data: any) => {
    const newCustomer = {
      id: `${customers.length + 1}`,
      ...data,
      visits: 0,
      lastVisit: "N/A",
      totalSpent: "$0",
      avatar: "/placeholder.svg?height=40&width=40",
    };

    setCustomers([...customers, newCustomer]);
    setIsAddDialogOpen(false);
    // toast({
    //   title: "Customer added",
    //   description: `${data.name} has been added to your customer database.`,
    // });
    toast("Customer added");
  };

  const handleUpdateCustomer = (data: any) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === currentCustomer.id ? { ...customer, ...data } : customer
    );

    setCustomers(updatedCustomers);
    setIsEditDialogOpen(false);
    // toast({
    //   title: "Customer updated",
    //   description: `${data.name}'s information has been updated successfully.`,
    // });
    toast("Customer updated");
  };

  const handleConfirmDelete = () => {
    const updatedCustomers = customers.filter(
      (customer) => customer.id !== currentCustomer.id
    );

    setCustomers(updatedCustomers);
    setIsDeleteDialogOpen(false);
    // toast({
    //   title: "Customer deleted",
    //   description: `${currentCustomer.name} has been removed from your customer database.`,
    //   variant: "destructive",
    // });
    toast("Customer deleted");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <AdminHeader
        title="Customers"
        description="Manage your barbershop customers"
        action={{ label: "Add Customer", onClick: handleAddCustomer }}
      />

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={customer.avatar || "/placeholder.svg"}
                          alt={customer.name}
                        />
                        <AvatarFallback>
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{customer.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{customer.email}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.visits}</TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "active" ? "default" : "secondary"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewAppointments(customer)}
                        >
                          View appointments
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditCustomer(customer)}
                        >
                          Edit customer
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDeleteCustomer(customer)}
                        >
                          Delete customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm
            onSubmit={handleCreateCustomer}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {currentCustomer && (
            <CustomerForm
              initialData={currentCustomer}
              onSubmit={handleUpdateCustomer}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {currentCustomer?.name} from your
              customer database. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Appointments Dialog */}
      <Dialog
        open={isViewAppointmentsDialogOpen}
        onOpenChange={setIsViewAppointmentsDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentCustomer?.name}'s Appointments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {currentCustomer ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Barber</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* This would be populated from your database in a real app */}
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        {currentCustomer.visits > 0
                          ? "Appointment history would be displayed here."
                          : "No appointment history found."}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-4">Loading customer data...</div>
            )}
            <div className="flex justify-end">
              <Button onClick={() => setIsViewAppointmentsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
