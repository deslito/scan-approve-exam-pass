import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockScans = [
  {
    id: "SC001",
    studentName: "Asiimire Tracy",
    regNumber: "23/U/DCE/04387/PD",
    scanTime: "2023-06-01T09:15:00Z",
    course: "Advanced Mathematics",
    permitStatus: "INVALID",
    action: "DENIED"
  },
  {
    id: "SC002",
    studentName: "Muyingo Cynthia",
    regNumber: "21/U/ARC/38005/PD",
    scanTime: "2023-06-01T10:22:00Z",
    course: "Physics 101",
    permitStatus: "EXPIRED",
    action: "DENIED"
  },
  {
    id: "SC003",
    studentName: "Twijukye David",
    regNumber: "21/U/BBA/3345/PD",
    scanTime: "2023-06-02T08:45:00Z",
    course: "Computer Science",
    permitStatus: "PENDING",
    action: "DENIED"
  },
  {
    id: "SC004",
    studentName: "Mubiru Timothy",
    regNumber: "21/U/ITD/3925/PD",
    scanTime: "2023-06-02T13:10:00Z",
    course: "Business Administration",
    permitStatus: "APPROVED",
    action: "ALLOWED"
  }
];

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
        scan.studentName.toLowerCase().includes(search.toLowerCase()) || 
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
  
  const getActionIcon = (action: string) => {
    return action === "ALLOWED" ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <XCircle className="w-4 h-4 text-red-500" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
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
              <SelectItem value="denied">Denied</SelectItem>
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
                    <div className="font-semibold">{scan.studentName}</div>
                    <div className="text-sm text-muted-foreground">{scan.regNumber}</div>
                    <div className="text-sm">{scan.course}</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(scan.scanTime)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge 
                      variant={scan.permitStatus === "VALID" ? "default" : 
                             scan.permitStatus === "PENDING" ? "outline" : "destructive"}
                    >
                      {scan.permitStatus}
                    </Badge>
                    <div className="flex items-center">
                      {getActionIcon(scan.action)}
                      <span className={`ml-1 text-xs font-medium ${scan.action === "ALLOWED" ? "text-green-600" : "text-red-600"}`}>
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
