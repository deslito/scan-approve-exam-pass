
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import AdminSidebar from "@/components/AdminSidebar";

// Mock invigilator data
const mockInvigilators = [
  {
    id: "I001",
    name: "Dr. Mugisha Joel",
    staffId: "24/STAFF/001",
    email: "mugishajoel@kyu.edu",
    department: "School of Computing & Information Science",
    status: "ACTIVE",
  },
  {
    id: "I002",
    name: "Ms. Nakirayi Sophia",
    staffId: "24/STAFF/002",
    email: "nakirayisophia@kyu.edu",
    department: "School of Engineering",
    status: "ACTIVE",
  },
];

const ManageInvigilatorsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [invigilators, setInvigilators] = useState(mockInvigilators);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newInvigilator, setNewInvigilator] = useState({
    name: "",
    email: "",
    staffId: "",
    department: "",
    password: "",
    confirmPassword: ""
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search functionality
    if (searchTerm) {
      const filteredInvigilators = mockInvigilators.filter(invigilator => 
        invigilator.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        invigilator.staffId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setInvigilators(filteredInvigilators);
    } else {
      setInvigilators(mockInvigilators);
    }
  };

  const handleAddInvigilator = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditInvigilator = (id: string) => {
    toast.info(`Edit invigilator ${id} modal would open here`);
  };

  const handleDeleteInvigilator = (id: string) => {
    toast.info(`Delete confirmation for invigilator ${id} would show here`);
  };
  
  const handleCreateAccount = () => {
    // Validation
    if (!newInvigilator.name || !newInvigilator.email || !newInvigilator.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!newInvigilator.staffId) {
      toast.error("Staff ID is required");
      return;
    }
    
    if (newInvigilator.password !== newInvigilator.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Mock account creation
    toast.success(`Invigilator account created for ${newInvigilator.name}`);
    
    // Reset form and close dialog
    setNewInvigilator({
      name: "",
      email: "",
      staffId: "",
      department: "",
      password: "",
      confirmPassword: ""
    });
    setIsAddDialogOpen(false);
  };
  
  // Get color for status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-green-500";
      case "INACTIVE": return "bg-amber-500";
      case "SUSPENDED": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-6 md:ml-64 pt-16 md:pt-6">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Invigilators</h1>
            <Button onClick={handleAddInvigilator} size="sm" className="flex items-center">
              <Plus className="w-4 h-4 mr-1" /> Add Invigilator
            </Button>
          </div>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or staff ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          
          <div className="space-y-4">
            {invigilators.map((invigilator) => (
              <Card key={invigilator.id} className="p-4 neuro-card">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{invigilator.name}</div>
                    <div className="text-sm text-muted-foreground mb-1">{invigilator.staffId}</div>
                    <div className="text-sm">{invigilator.email}</div>
                    <div className="text-sm text-muted-foreground mt-1">{invigilator.department}</div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Badge className={getStatusColor(invigilator.status)}>
                      {invigilator.status}
                    </Badge>
                    <div className="flex space-x-2 mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditInvigilator(invigilator.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteInvigilator(invigilator.id)}
                        className="text-destructive"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {invigilators.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No invigilators found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Invigilator Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Invigilator Account</DialogTitle>
            <DialogDescription>
              Create a new invigilator account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newInvigilator.name}
                onChange={(e) => setNewInvigilator({ ...newInvigilator, name: e.target.value })}
                placeholder="Dr. Mugisha Joel"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newInvigilator.email}
                onChange={(e) => setNewInvigilator({ ...newInvigilator, email: e.target.value })}
                placeholder="mugishajoel@kyu.edu"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="staffId">Staff ID</Label>
              <Input
                id="staffId"
                value={newInvigilator.staffId}
                onChange={(e) => setNewInvigilator({ ...newInvigilator, staffId: e.target.value })}
                placeholder="24/STAFF/003"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select 
                value={newInvigilator.department}
                onValueChange={(value) => setNewInvigilator({ ...newInvigilator, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="School of Computing & Information Science">School of Computing & Information Science</SelectItem>
                  <SelectItem value="School of Engineering">School of Engineering</SelectItem>
                  <SelectItem value="School of Business">School of Business</SelectItem>
                  <SelectItem value="School of Education">School of Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newInvigilator.password}
                onChange={(e) => setNewInvigilator({ ...newInvigilator, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={newInvigilator.confirmPassword}
                onChange={(e) => setNewInvigilator({ ...newInvigilator, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAccount}>Create Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageInvigilatorsPage;
