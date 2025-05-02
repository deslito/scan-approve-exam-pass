
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/AdminSidebar";
import { studentData } from "@/types/studentData";

// Create mock permit data based on student data
const generateMockPermits = () => {
  const courseUnits = [
    "Advanced Programming",
    "Database Systems",
    "Computer Networks",
    "Data Structures",
    "Operating Systems",
    "Software Engineering",
    "Web Development",
    "Artificial Intelligence"
  ];

  const invigilators = [
    "Dr. Mugisha Joel",
    "Ms. Nakirayi Sophia"
  ];

  return studentData.slice(0, 15).map((student, index) => {
    return {
      id: `P${index + 1}`,
      studentId: student.studentNumber,
      studentNumber: student.studentNumber,
      enrolledCourseUnit: courseUnits[index % courseUnits.length],
      status: "approved",
      expiryDate: "2025-05-30",
      approvedBy: invigilators[index % invigilators.length],
      approvedTime: "2025-05-10 10:30 AM"
    };
  });
};

const permits = generateMockPermits();

const ManagePermitsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPermits, setFilteredPermits] = useState(permits);

  // Filter permits based on search term
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term) {
      const filtered = permits.filter(
        (permit) =>
          permit.studentNumber.toLowerCase().includes(term.toLowerCase()) ||
          permit.enrolledCourseUnit.toLowerCase().includes(term.toLowerCase()) ||
          permit.approvedBy.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPermits(filtered);
    } else {
      setFilteredPermits(permits);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-6 md:ml-64 pt-16 md:pt-6">
        {/* Header */}
        <div className="p-4">
          <div className="bg-university-blue text-white p-6 pt-8">
            <h1 className="text-2xl font-bold">Manage Permits</h1>
            <p className="opacity-90 font-medium">View approved student examination permits</p>
          </div>

          {/* Main Content */}
          <div className="p-4 space-y-6">
            {/* Search and Filter */}
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search permits or invigilators..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <PermitsTable permits={filteredPermits} />
              </TabsContent>
              <TabsContent value="approved" className="mt-4">
                <PermitsTable permits={filteredPermits.filter((p) => p.status === "approved")} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusClasses = () => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "invalid":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusClasses()}`}
    >
      {status}
    </span>
  );
};

// Permits table component
interface Permit {
  id: string;
  studentId: string;
  studentNumber: string;
  enrolledCourseUnit: string;
  status: string;
  expiryDate: string;
  approvedBy: string;
  approvedTime: string;
}

const PermitsTable = ({ permits }: { permits: Permit[] }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student No.</TableHead>
            <TableHead>Enrolled Course Unit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approved By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permits.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No permits found.
              </TableCell>
            </TableRow>
          ) : (
            permits.map((permit) => (
              <TableRow key={permit.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{permit.studentNumber}</TableCell>
                <TableCell>{permit.enrolledCourseUnit}</TableCell>
                <TableCell>
                  <StatusBadge status={permit.status} />
                </TableCell>
                <TableCell>{permit.approvedBy}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagePermitsPage;
