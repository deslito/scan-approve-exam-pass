
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { QrCode } from "lucide-react";
import NavBar from "@/components/NavBar";
import { StudentData } from "@/types/student";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import PermitCard from "@/components/PermitCard";
import { useAuth } from "@/contexts/AuthContext";

const ScanQRPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const [lastScannedPermit, setLastScannedPermit] = useState<any>(null);

  // Mock student data for simulation
  const mockStudents = {
    tracy: {
      id: "S123456",
      name: "Asiimire Tracy",
      regNumber: "23/U/DCE/04387/PD",
      course: "Bachelor of Computer Science",
      gender: "Female",
      programme: "Day",
      semester: "Year 2 Semester I",
      feesBalance: 500000, // Not cleared fees
      permitStatus: "INVALID",
      photoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    timothy: {
      id: "S234567",
      name: "Mubiru Timothy",
      regNumber: "21/U/ITD/3925/PD",
      course: "Bachelor in Information Technology and Computing",
      gender: "Male",
      programme: "Day",
      semester: "Year 2 Semester I",
      feesBalance: 0, // Cleared fees
      permitStatus: "VALID",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    david: {
      id: "S345678",
      name: "Twijukye David",
      regNumber: "21/U/BBA/3345/PD",
      course: "Bachelor in Business Administration",
      gender: "Male",
      programme: "Evening",
      semester: "Year 2 Semester I",
      feesBalance: 0, // Cleared fees
      permitStatus: "VALID",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    cynthia: {
      id: "S456789",
      name: "Muyingo Cynthia",
      regNumber: "21/U/ARC/38005/PD",
      course: "Bachelor in Architecture",
      gender: "Female",
      programme: "Day",
      semester: "Year 2 Semester I",
      feesBalance: 0, // Cleared fees
      permitStatus: "VALID",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  };

  // Simulate scan with a specific student
  const handleScanStudent = (studentKey: keyof typeof mockStudents) => {
    setScanning(true);
    setIsDrawerOpen(true);
    
    // Simulate QR code scanning with mock data
    setTimeout(() => {
      setScanning(false);
      const studentData = mockStudents[studentKey];
      
      const mockPermit = {
        id: `PERM-${studentData.id}`,
        studentName: studentData.name,
        studentNumber: studentData.id.replace('S', '2023/HD/'),
        regNumber: studentData.regNumber,
        gender: studentData.gender,
        yearOfStudy: 2,
        campus: "Main Campus",
        semester: "I" as const,
        academicYear: "2023/2024",
        faculty: "Science and Technology",
        department: studentData.course.split(" ").pop(),
        programme: studentData.course,
        courseUnits: [
          {
            code: "CSC 201",
            name: "Data Structures",
            creditUnits: 4,
            category: "CORE",
            status: "NORMAL"
          }
        ],
        examDate: "May 15, 2025",
        status: studentData.feesBalance === 0 ? "valid" as const : "expired" as const,
        photoUrl: studentData.photoUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        printDate: new Date().toISOString()
      };
      
      setLastScannedPermit(mockPermit);
      navigate("/student-details", { 
        state: { 
          studentData: {
            ...studentData
          } 
        }
      });
      toast.success(`QR Code for ${studentData.name} scanned successfully!`);
    }, 1500);
  };

  // Generic scan function for the main scan button
  const handleScan = () => {
    // Default to Timothy as requested
    handleScanStudent('timothy');
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
        
        {lastScannedPermit && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Last Scanned Permit</h2>
            <div className="bg-white rounded-lg p-4 shadow border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{lastScannedPermit.studentName}</p>
                  <p className="text-sm text-muted-foreground">{lastScannedPermit.regNumber}</p>
                  <div className="mt-1">
                    <Badge status={lastScannedPermit.status} />
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate("/student-details", { 
                    state: { 
                      studentData: { 
                        name: lastScannedPermit.studentName, 
                        regNumber: lastScannedPermit.regNumber, 
                        feesBalance: lastScannedPermit.status === "valid" ? 0 : 500000,
                        permitStatus: lastScannedPermit.status === "valid" ? "VALID" : "INVALID"
                      } 
                    } 
                  })}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-card rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-8 aspect-square max-w-xs mx-auto border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center">
            {scanning ? (
              <div className="text-center space-y-2">
                <div className="animate-pulse">
                  <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                </div>
                <p>Scanning...</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-sm">Camera preview will appear here</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleScan} 
              disabled={scanning}
              className="w-full bg-university-blue hover:bg-university-blue/80"
            >
              {scanning ? "Scanning..." : "Start Scanning"}
            </Button>
            
            {/* Test buttons for scanning different students */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => handleScanStudent('tracy')}
                className="w-full"
                disabled={scanning}
              >
                Tracy
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleScanStudent('timothy')}
                className="w-full"
                disabled={scanning}
              >
                Timothy
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleScanStudent('david')}
                className="w-full"
                disabled={scanning}
              >
                David
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleScanStudent('cynthia')}
                className="w-full"
                disabled={scanning}
              >
                Cynthia
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className={isMobile ? "h-[85%]" : ""}>
          <DrawerHeader>
            <DrawerTitle>Scan Results</DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <NavBar />
    </div>
  );
};

const Badge = ({ status }: { status: string }) => {
  let classes = "px-2 py-1 rounded-full text-xs font-medium";
  
  switch (status) {
    case "valid":
    case "completed":
    case "approved":
      classes += " bg-green-100 text-green-800";
      break;
    case "pending":
    case "scheduled":
      classes += " bg-blue-100 text-blue-800";
      break;
    case "expired":
    case "invalid":
      classes += " bg-red-100 text-red-800";
      break;
    default:
      classes += " bg-gray-100 text-gray-800";
  }
  
  return <span className={classes}>{status.toUpperCase()}</span>;
};

export default ScanQRPage;
