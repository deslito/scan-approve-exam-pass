
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import type { Invigilator } from "@/types/academic";

interface InvigilatorManagementProps {
  invigilators: Invigilator[];
  onAddInvigilator: (invigilator: Omit<Invigilator, 'id'>) => void;
  onUpdateInvigilator: (id: string, data: Partial<Invigilator>) => void;
  onDeleteInvigilator: (id: string) => void;
}

const InvigilatorManagement: React.FC<InvigilatorManagementProps> = ({
  invigilators,
  onAddInvigilator,
  onUpdateInvigilator,
  onDeleteInvigilator
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentInvigilator, setCurrentInvigilator] = useState<Invigilator | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    staffId: "",
    schoolId: "",
  });

  const handleAddInvigilator = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    onAddInvigilator({
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      staffId: formData.staffId,
      schoolId: formData.schoolId,
      status: "ACTIVE",
      school: {
        id: formData.schoolId,
        name: "School of Computing & Information Science",
        facultyId: "FAC001",
        courses: []
      }
    });
    
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      staffId: "",
      schoolId: "",
    });
    setIsAddDialogOpen(false);
    toast.success("Invigilator added successfully");
  };

  const handleEditInvigilator = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (currentInvigilator) {
      onUpdateInvigilator(currentInvigilator.id, {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        staffId: formData.staffId,
        schoolId: formData.schoolId,
      });
      
      setIsEditDialogOpen(false);
      toast.success("Invigilator updated successfully");
    }
  };

  const prepareForEdit = (invigilator: Invigilator) => {
    setCurrentInvigilator(invigilator);
    setFormData({
      name: invigilator.name,
      email: invigilator.email,
      phoneNumber: invigilator.phoneNumber,
      staffId: invigilator.staffId,
      schoolId: invigilator.schoolId,
    });
    setIsEditDialogOpen(true);
  };

  const confirmDelete = (invigilator: Invigilator) => {
    if (confirm(`Are you sure you want to delete ${invigilator.name}?`)) {
      onDeleteInvigilator(invigilator.id);
      toast.success("Invigilator deleted successfully");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-university-blue">Manage Invigilators</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-university-green hover:bg-university-green/90">
              <Plus className="w-4 h-4 mr-2" /> Add Invigilator
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Invigilator</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddInvigilator} className="space-y-4">
              <InvigilatorForm 
                formData={formData} 
                setFormData={setFormData} 
              />
              <div className="pt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-university-green hover:bg-university-green/90">
                  Add Invigilator
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader className="bg-university-blue/5">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Staff ID</TableHead>
              <TableHead>School/Department</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invigilators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No invigilators found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              invigilators.map((invigilator) => (
                <TableRow key={invigilator.id}>
                  <TableCell className="font-medium">{invigilator.name}</TableCell>
                  <TableCell>{invigilator.staffId}</TableCell>
                  <TableCell>{invigilator.school.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{invigilator.email}</p>
                      <p className="text-muted-foreground">
                        {invigilator.phoneNumber}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invigilator.status === "ACTIVE"
                          ? "bg-university-green/10 text-university-green"
                          : "bg-university-orange/10 text-university-orange"
                      }`}
                    >
                      {invigilator.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => prepareForEdit(invigilator)}
                      >
                        <Edit className="w-4 h-4 text-university-blue" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(invigilator)}
                      >
                        <Trash className="w-4 h-4 text-university-orange" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Invigilator</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditInvigilator} className="space-y-4">
            <InvigilatorForm 
              formData={formData} 
              setFormData={setFormData} 
            />
            <div className="pt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-university-blue hover:bg-university-blue/90">
                Update Invigilator
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface InvigilatorFormProps {
  formData: {
    name: string;
    email: string;
    phoneNumber: string;
    staffId: string;
    schoolId: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phoneNumber: string;
    staffId: string;
    schoolId: string;
  }>>;
}

const InvigilatorForm: React.FC<InvigilatorFormProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, schoolId: value }));
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          placeholder="Dr. Roy Desire" 
          required 
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@kyu.ac.ug"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          placeholder="+256 700 123456"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="staffId">Staff ID</Label>
        <Input 
          id="staffId" 
          placeholder="STAFF001" 
          required 
          value={formData.staffId}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="school">School/Department</Label>
        <Select value={formData.schoolId} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a school" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sch001">
              School of Computing & Information Science
            </SelectItem>
            <SelectItem value="sch002">
              School of Engineering
            </SelectItem>
            <SelectItem value="sch003">
              School of Management & Entrepreneurship
            </SelectItem>
            <SelectItem value="sch004">
              School of Education
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default InvigilatorManagement;
