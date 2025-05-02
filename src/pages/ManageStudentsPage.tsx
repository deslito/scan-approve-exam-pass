
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

// Updated mock student data
const mockStudents = [
  {
    id: "S123456",
    name: "Asiimire Tracy",
    regNumber: "23/U/DCE/04387/PD",
    email: "asiimiretracy@gmail.com",
    permitStatus: "INVALID"
  },
  {
    id: "S234567",
    name: "Muyingo Cynthia",
    regNumber: "21/U/ARC/38005/PD",
    email: "muyingocynthia@gmail.com",
    permitStatus: "VALID"
  },
  {
    id: "S345678",
    name: "Mubiru Timothy",
    regNumber: "21/U/ITD/3925/PD",
    email: "mubirutimothy@gmail.com",
    permitStatus: "VALID"
  },
  {
    id: "S456789",
    name: "Twijukye David",
    regNumber: "21/U/BBA/3345/PD",
    email: "twijukyedavid@gmail.com",
    permitStatus: "VALID"
  }
];

const ManageStudentsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(mockStudents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    regNumber: "",
    role: "student",
    password: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search functionality
    if (searchTerm) {
      const filteredStudents = mockStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.regNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setStudents(filteredStudents);
    } else {
      setStudents(mockStudents);
    }
  };

  const handleAddStudent = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditStudent = (id: string) => {
    const student = mockStudents.find(student => student.id === id);
    if (student) {
      setCurrentStudent(student);
      setNewUser({
        name: student.name,
        email: student.email,
        regNumber: student.regNumber,
        role: "student",
        password: "", // Don't prefill password for security
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteStudent = (id: string) => {
    toast.info(`Delete confirmation for student ${id} would show here`);
  };
  
  const handleCreateAccount = () => {
    // Validation
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (newUser.role === "student" && !newUser.regNumber) {
      toast.error("Registration number is required for students");
      return;
    }
    
    // Mock account creation
    toast.success(`Account created for ${newUser.name} as ${newUser.role}`);
    
    // Reset form and close dialog
    setNewUser({
      name: "",
      email: "",
      regNumber: "",
      role: "student",
      password: "",
    });
    setIsAddDialogOpen(false);
  };
  
  const handleUpdateAccount = () => {
    // Validation
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (newUser.role === "student" && !newUser.regNumber) {
      toast.error("Registration number is required for students");
      return;
    }
    
    // Mock account update
    toast.success(`Account updated for ${newUser.name}`);
    
    // Reset form and close dialog
    setNewUser({
      name: "",
      email: "",
      regNumber: "",
      role: "student",
      password: "",
    });
    setIsEditDialogOpen(false);
    setCurrentStudent(null);
  };
  
  // Get color for permit status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case "VALID": return "bg-green-500";
      case "PENDING": return "bg-amber-500";
      case "EXPIRED": return "bg-destructive";
      case "INVALID": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Students</h1>
            <Button onClick={handleAddStudent} size="sm" className="flex items-center">
              <Plus className="w-4 h-4 mr-1" /> Add Student
            </Button>
          </div>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or reg number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          
          <div className="space-y-4">
            {students.map((student) => (
              <Card key={student.id} className="p-4 neuro-card">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{student.name}</div>
                    <div className="text-sm text-muted-foreground mb-1">{student.regNumber}</div>
                    <div className="text-sm">{student.email}</div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Badge className={getStatusColor(student.permitStatus)}>
                      {student.permitStatus}
                    </Badge>
                    <div className="flex space-x-2 mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditStudent(student.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-destructive"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {students.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No students found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Student Account</DialogTitle>
            <DialogDescription>
              Create a new student account with login credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Asiimire Tracy"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="student@kyu.edu"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="regNumber">Registration Number</Label>
              <Input
                id="regNumber"
                value={newUser.regNumber}
                onChange={(e) => setNewUser({ ...newUser, regNumber: e.target.value })}
                placeholder="XX/U/XXX/XXXXX/XX"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Student Account</DialogTitle>
            <DialogDescription>
              Update the student's account information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-regNumber">Registration Number</Label>
              <Input
                id="edit-regNumber"
                value={newUser.regNumber}
                onChange={(e) => setNewUser({ ...newUser, regNumber: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-password">Change Password</Label>
              <Input
                id="edit-password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Leave blank to keep current password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setCurrentStudent(null);
            }}>Cancel</Button>
            <Button onClick={handleUpdateAccount}>Update Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageStudentsPage;
