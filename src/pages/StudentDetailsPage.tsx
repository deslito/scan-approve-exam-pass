
import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { StudentData } from "@/types/student";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const StudentDetailsPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const studentData = location.state?.studentData as StudentData;
  const [processingApproval, setProcessingApproval] = useState(false);
  const [permitStatus, setPermitStatus] = useState<'valid' | 'approved'>(
    studentData?.feesBalance === 0 ? 'valid' : 'valid'
  );
  const [scanHistory, setScanHistory] = useState<Array<{
    invigilator: string;
    timestamp: string;
    status: 'approved';
    staffId: string;
  }>>([]);

  if (!studentData) {
    return <Navigate to="/scan" replace />;
  }

  const isPermitValid = true; // All students have cleared fees
  const isApproved = permitStatus === 'approved';

  const handleApprove = () => {
    setProcessingApproval(true);
    
    // Simulate API call
    setTimeout(() => {
      setPermitStatus('approved');
      
      // Add current invigilator to scan history
      const newScanRecord = {
        invigilator: user?.name || "Dr. Mugisha Joel",
        timestamp: new Date().toLocaleString(),
        status: 'approved' as const,
        staffId: user?.regNumber || "24/STAFF/001"
      };
      
      // Add to history with newest at the top
      setScanHistory([newScanRecord, ...scanHistory]);
      
      setProcessingApproval(false);
      toast.success("Permit approved successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-university-blue text-white p-6">
        <h1 className="text-2xl font-bold">Student Details</h1>
      </div>

      {/* Scan history */}
      {scanHistory.length > 0 && (
        <div className="p-4 space-y-2">
          {scanHistory.map((record, index) => (
            <div 
              key={index} 
              className="p-4 mb-2 bg-green-50 border-l-4 border-green-500"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <div>
                  <p className="font-medium">
                    Approved by: {record.invigilator}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Staff ID: {record.staffId} • Time: {record.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4">
        <Card className="p-6 neuro-card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Student Number: {studentData.id || studentData.regNumber}</h2>
              <p className="text-muted-foreground">Registration Number: {studentData.regNumber}</p>
            </div>
            <Badge variant={isPermitValid ? "default" : "destructive"}>
              {isPermitValid ? "VALID" : "INVALID"}
            </Badge>
          </div>

          {isPermitValid && !isApproved && (
            <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Permit Valid</span>
              </div>
              <p className="mt-2 text-sm">
                Student is eligible to take the exam.
              </p>
            </div>
          )}

          <div className="mt-6">
            <Button 
              onClick={handleApprove} 
              className="w-full bg-university-green hover:bg-university-green/90"
              disabled={processingApproval || isApproved}
            >
              {processingApproval ? "Processing..." : isApproved ? "Approved" : "Approve"}
            </Button>
          </div>
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default StudentDetailsPage;
