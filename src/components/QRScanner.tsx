
import React, { useState } from "react";
import { QrCode, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { findStudentById, isStudentApproved } from "@/utils/mockData";
import { ScanResult, Student } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface QRScannerProps {
  onScanComplete: (result: ScanResult) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedStudent, setScannedStudent] = useState<Student | null>(null);
  const [approved, setApproved] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Simulate scanning a QR code
  const handleScan = () => {
    setScanning(true);
    
    setTimeout(() => {
      // Randomly select a student ID to simulate scanning
      const randomIndex = Math.floor(Math.random() * 7) + 1;
      const studentId = randomIndex.toString();
      
      const student = findStudentById(studentId);
      const isApproved = student ? isStudentApproved(student.id) : false;
      
      setScannedStudent(student || null);
      setApproved(isApproved);
      setScanning(false);
      
      if (student) {
        const result: ScanResult = {
          student,
          timestamp: new Date(),
          approved: isApproved,
        };
        
        onScanComplete(result);
        
        toast({
          title: isApproved ? "Exam Permit Approved" : "Exam Permit Denied",
          description: `${student.name} (${student.studentId}) is ${isApproved ? "approved" : "not approved"} for the exam.`,
          variant: isApproved ? "default" : "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "No student found with this QR code.",
          variant: "destructive",
        });
      }
    }, 1500); // Simulate scanning delay
  };

  const resetScan = () => {
    setScannedStudent(null);
    setApproved(null);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex items-center justify-center space-x-2">
          <QrCode className="h-6 w-6 text-blue-600" />
          <h3 className="font-semibold text-lg">Exam Permit Scanner</h3>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4">
        {scanning ? (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="w-32 h-32 border-4 border-t-blue-600 border-blue-300 rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium">Scanning QR code...</p>
          </div>
        ) : (
          <>
            {scannedStudent ? (
              <div className="space-y-4">
                <div className={`flex flex-col items-center p-4 rounded-lg border-2 ${approved ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
                  {approved ? (
                    <div className="bg-green-100 p-3 rounded-full mb-3">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                  ) : (
                    <div className="bg-red-100 p-3 rounded-full mb-3">
                      <X className="h-8 w-8 text-red-600" />
                    </div>
                  )}
                  <h4 className={`font-bold text-lg ${approved ? "text-green-700" : "text-red-700"}`}>
                    {approved ? "APPROVED" : "NOT APPROVED"}
                  </h4>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Label className="text-slate-500">Name:</Label>
                    <span className="font-medium col-span-2">{scannedStudent.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Label className="text-slate-500">ID:</Label>
                    <span className="font-medium col-span-2">{scannedStudent.studentId}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Label className="text-slate-500">Course:</Label>
                    <span className="font-medium col-span-2">{scannedStudent.course}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 space-y-6">
                <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                  <QrCode className="h-12 w-12 text-slate-400" />
                </div>
                <p className="text-slate-600 text-center">
                  Tap the button below to scan a student's exam permit QR code
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center border-t bg-slate-50 p-4">
        {scannedStudent ? (
          <Button 
            onClick={resetScan}
            variant="outline"
            className="w-full"
          >
            Scan Another Permit
          </Button>
        ) : (
          <Button 
            onClick={handleScan} 
            disabled={scanning}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {scanning ? "Scanning..." : "Scan QR Code"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QRScanner;
