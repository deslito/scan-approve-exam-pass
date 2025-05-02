import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Plus, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/AdminSidebar";

const ManagePermitsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const permits = [
    {
      id: "P001",
      studentId: "S123",
      studentName: "Asiimire Tracy",
      regNumber: "23/U/DCE/04387/PD",
      course: "Advanced Mathematics",
      status: "valid",
      expiryDate: "2023-06-15",
    },
    {
      id: "P002",
      studentId: "S456",
      studentName: "Jane Smith",
      regNumber: "UNI/2023/002",
      course: "Physics 101",
      status: "pending",
      expiryDate: "2023-06-18",
    },
    {
      id: "P003",
      studentId: "S789",
      studentName: "Robert Johnson",
      regNumber: "UNI/2023/003",
      course: "Computer Science",
      status: "expired",
      expiryDate: "2023-05-30",
    },
    {
      id: "P004",
      studentId: "S012",
      studentName: "Mary Williams",
      regNumber: "UNI/2023/004",
      course: "Biology",
      status: "valid",
      expiryDate: "2023-06-20",
    },
  ];

  // Filter permits based on search term
  const filteredPermits = permits.filter(
    (permit) =>
      permit.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-6 md:ml-64 pt-16 md:pt-6">
        {/* Header */}
        <div className="p-4">
          <div className="bg-university-blue text-white p-6 pt-8">
            <h1 className="text-2xl font-bold">Manage Permits</h1>
            <p className="opacity-90 font-medium">View and manage student examination permits</p>
          </div>

          {/* Main Content */}
          <div className="p-4 space-y-6">
            {/* Search and Filter */}
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search permits..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="valid">Valid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <PermitsTable permits={filteredPermits} />
              </TabsContent>
              <TabsContent value="valid" className="mt-4">
                <PermitsTable permits={filteredPermits.filter((p) => p.status === "valid")} />
              </TabsContent>
              <TabsContent value="pending" className="mt-4">
                <PermitsTable permits={filteredPermits.filter((p) => p.status === "pending")} />
              </TabsContent>
              <TabsContent value="expired" className="mt-4">
                <PermitsTable permits={filteredPermits.filter((p) => p.status === "expired")} />
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
      case "valid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
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
  studentName: string;
  regNumber: string;
  course: string;
  status: string;
  expiryDate: string;
}

const PermitsTable = ({ permits }: { permits: Permit[] }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Reg Number</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expiry</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permits.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No permits found.
              </TableCell>
            </TableRow>
          ) : (
            permits.map((permit) => (
              <TableRow key={permit.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{permit.studentName}</TableCell>
                <TableCell>{permit.regNumber}</TableCell>
                <TableCell>{permit.course}</TableCell>
                <TableCell>
                  <StatusBadge status={permit.status} />
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {new Date(permit.expiryDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagePermitsPage;
