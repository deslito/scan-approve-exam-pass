
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

// Simplified mock student data with only registration number and student number
const mockStudents = [
  {
    id: "S123456",
    studentNumber: "2300804387",
    regNumber: "23/U/DCE/04387/PD",
    permitStatus: "VALID"
  },
  {
    id: "S234567",
    studentNumber: "2100038005",
    regNumber: "21/U/ARC/38005/PD",
    permitStatus: "VALID"
  },
  {
    id: "S345678",
    studentNumber: "2100003925",
    regNumber: "21/U/ITD/3925/PD",
    permitStatus: "VALID"
  },
  {
    id: "S456789",
    studentNumber: "2100003345",
    regNumber: "21/U/BBA/3345/PD",
    permitStatus: "VALID"
  }
];

const ManageStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(mockStudents);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search by registration number or student number
    if (searchTerm) {
      const filteredStudents = mockStudents.filter(student => 
        student.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setStudents(filteredStudents);
    } else {
      setStudents(mockStudents);
    }
  };

  // Get color for permit status badge
  const getStatusColor = (status: string) => {
    return status === "VALID" ? "bg-green-500" : "bg-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Manage Students</h1>
          </div>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by reg number or student number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          
          <div className="space-y-4">
            {students.map((student) => (
              <Card key={student.id} className="p-4 neuro-card">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium mb-1">Reg Number: {student.regNumber}</div>
                    <div className="text-sm">Student Number: {student.studentNumber}</div>
                  </div>
                  <div>
                    <Badge className={getStatusColor(student.permitStatus)}>
                      {student.permitStatus}
                    </Badge>
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
    </div>
  );
};

export default ManageStudentsPage;
