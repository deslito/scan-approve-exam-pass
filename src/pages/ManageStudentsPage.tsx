
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { studentData } from "@/types/studentData";

const ManageStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search by registration number or student number
    if (searchTerm) {
      const filteredStudents = studentData.filter(student => 
        student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setStudents(filteredStudents);
    } else {
      setStudents(studentData);
    }
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
              <Card key={student.studentNumber} className="p-4 neuro-card">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium mb-1">Reg Number: {student.registrationNumber}</div>
                    <div className="text-sm">Student Number: {student.studentNumber}</div>
                  </div>
                  <div>
                    <Badge className="bg-green-500">
                      VALID
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
