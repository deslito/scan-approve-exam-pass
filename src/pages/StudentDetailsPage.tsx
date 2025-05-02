
import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AlertCircle, CheckCircle, BadgeDollarSign, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { StudentData } from "@/types/student";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const StudentDetailsPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const studentData = location.state?.studentData as StudentData;
  const [processingApproval, setProcessingApproval] = useState(false);
  const [processingPending, setProcessingPending] = useState(false);
  const [permitStatus, setPermitStatus] = useState<'valid' | 'pending' | 'approved'>(
    studentData?.feesBalance === 0 ? 'valid' : 'pending'
  );
  const [scanHistory, setScanHistory] = useState<Array<{
    invigilator: string;
    timestamp: string;
    status: 'approved' | 'pending';
    staffId: string;
  }>>([]);

  if (!studentData) {
    return <Navigate to="/scan" replace />;
  }

  const isPermitValid = studentData.feesBalance === 0;
  const isApproved = permitStatus === 'approved';
  const isPending = permitStatus === 'pending';

  const handleApprove = () => {
    if (!isPermitValid) {
      toast.error("Cannot approve. Student has outstanding balance.");
      return;
    }

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

  const handlePending = () => {
    setProcessingPending(true);
    
    // Simulate API call
    setTimeout(() => {
      setPermitStatus('pending');
      
      // Add current invigilator to scan history
      const newScanRecord = {
        invigilator: user?.name || "Ms. Nakirayi Sophia",
        timestamp: new Date().toLocaleString(),
        status: 'pending' as const,
        staffId: user?.regNumber || "24/STAFF/002"
      };
      
      // Add to history with newest at the top
      setScanHistory([newScanRecord, ...scanHistory]);
      
      setProcessingPending(false);
      toast.warning("Permit marked as pending for review");
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
              className={`p-4 mb-2 ${record.status === 'approved' ? 'bg-green-50' : 'bg-yellow-50'} 
                          border-l-4 ${record.status === 'approved' ? 'border-green-500' : 'border-yellow-500'}`}
            >
              <div className="flex items-center">
                {record.status === 'approved' ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                )}
                <div>
                  <p className="font-medium">
                    {record.status === 'approved' ? 'Approved' : 'Marked as Pending'} by: {record.invigilator}
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
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-24 w-24 border-2 border-muted">
              <AvatarImage 
                src={studentData.photoUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"} 
                alt={studentData.name} 
              />
              <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{studentData.name}</h2>
                  <p className="text-muted-foreground">{studentData.regNumber}</p>
                </div>
                <Badge variant={isPermitValid ? "default" : "destructive"}>
                  {isPermitValid ? "VALID" : "INVALID"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Course</span>
              <span>{studentData.course}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Gender</span>
              <span>{studentData.gender || "Not specified"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Programme</span>
              <span>{studentData.programme || "Day"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Semester</span>
              <span>{studentData.semester}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Fees Balance</span>
              <span className={`font-semibold ${studentData.feesBalance > 0 ? 'text-red-500' : 'text-green-500'}`}>
                UGX {studentData.feesBalance.toLocaleString()}
              </span>
            </div>
          </div>

          {!isPermitValid && (
            <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Outstanding Balance</span>
              </div>
              <p className="mt-2 text-sm">
                Student has an outstanding balance of UGX {studentData.feesBalance.toLocaleString()}.
                Permit cannot be validated until full payment is made.
              </p>
            </div>
          )}

          {isPermitValid && !isApproved && !isPending && (
            <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Permit Valid</span>
              </div>
              <p className="mt-2 text-sm">
                All fees have been cleared. Student is eligible to take the exam.
              </p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Button 
              onClick={handleApprove} 
              className="flex-1 bg-university-green hover:bg-university-green/90"
              disabled={processingApproval || isApproved || !isPermitValid}
            >
              {processingApproval ? "Processing..." : isApproved ? "Approved" : "Approve"}
            </Button>
            <Button 
              onClick={handlePending} 
              className="flex-1" 
              variant="outline"
              disabled={processingPending}
            >
              {processingPending ? "Processing..." : "Pending"}
            </Button>
          </div>
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default StudentDetailsPage;
