
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Calendar, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studentData } from "@/types/studentData";
import { format } from "date-fns";

// Create mock scan history data using student data
const createMockScans = () => {
  return studentData.slice(0, 10).map((student, index) => {
    return {
      id: `SC00${index + 1}`,
      studentNumber: student.studentNumber,
      regNumber: student.registrationNumber,
      scanTime: `2025-05-${(index % 5) + 1}T${9 + (index % 8)}:${(index * 7) % 60}:00Z`,
      course: "Data Structures",
      permitStatus: "APPROVED",
      action: "ALLOWED"
    };
  });
};

const mockScans = createMockScans();

const ScanHistoryPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [scans, setScans] = useState(mockScans);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterScans(searchTerm, filter);
  };

  const filterScans = (search: string, actionFilter: string) => {
    let filtered = [...mockScans];
    
    if (search) {
      filtered = filtered.filter(scan => 
        scan.studentNumber.toLowerCase().includes(search.toLowerCase()) || 
        scan.regNumber.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (actionFilter !== "all") {
      filtered = filtered.filter(scan => scan.action.toLowerCase() === actionFilter.toLowerCase());
    }
    
    setScans(filtered);
  };
  
  const handleFilterChange = (value: string) => {
    setFilter(value);
    filterScans(searchTerm, value);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (error) {
      return "Date not available";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="bg-university-blue text-white p-6 pt-8">
        <h1 className="text-2xl font-bold">Scan History</h1>
        <p className="opacity-90 font-medium">View all permit scan records</p>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search scans..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </div>
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="allowed">Allowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {scans.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No scan records found.
            </div>
          ) : (
            scans.map((scan) => (
              <Card key={scan.id} className="p-4 neuro-card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">Student Number: {scan.studentNumber}</div>
                    <div className="text-sm text-muted-foreground">{scan.regNumber}</div>
                    <div className="text-sm">{scan.course}</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(scan.scanTime)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="default">
                      {scan.permitStatus}
                    </Badge>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="ml-1 text-xs font-medium text-green-600">
                        {scan.action}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        <div className="bg-muted rounded-lg p-4 mt-6">
          <h3 className="font-medium mb-2">Database Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded p-3 text-center">
              <div className="text-2xl font-bold">{mockScans.length}</div>
              <div className="text-xs text-muted-foreground">Total Scans</div>
            </div>
            <div className="bg-background rounded p-3 text-center">
              <div className="text-2xl font-bold">
                {mockScans.filter(scan => scan.action === "ALLOWED").length}
              </div>
              <div className="text-xs text-muted-foreground">Allowed</div>
            </div>
          </div>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default ScanHistoryPage;
