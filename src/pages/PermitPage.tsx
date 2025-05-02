
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import PermitCard from "@/components/PermitCard";
import { AlertCircle, Download, Printer, Share2 } from "lucide-react";
import { toast } from "sonner";
import TracyImage from "@/assets/tracy.png";

const PermitPage = () => {
  const { user } = useAuth();
  const [isSharing, setIsSharing] = useState(false);
  
  const permitData = {
    id: "PERM-123456",
    studentName: user?.name || "Asiimire Tracy",
    studentNumber: "2300804387",
    regNumber: user?.regNumber || "23/U/DCE/04387/PD",
    gender: "FEMALE",
    programme: "(DCE) DIPLOMA IN COMPUTER ENGINEERING",
    yearOfStudy: 3,
    campus: "Main Campus",
    semester: "I" as const,
    academicYear: "2024/2025",
    faculty: "Science and Technology",
    department: "Computer Science",
    courseUnits: [
      {
        code: "CSC 201",
        name: "Data Structures",
        creditUnits: 4,
        category: "CORE" as const,
        status: "NORMAL" as const
      },
      {
        code: "CSC 203",
        name: "Database Systems",
        creditUnits: 3,
        category: "CORE" as const,
        status: "NORMAL" as const
      }
    ],
    examDate: "May 15, 2025",
    status: "valid" as const,
    photoUrl: TracyImage,
    printDate: new Date().toISOString()
  };

  const feesBalance = 500000;
  const isFullyPaid = feesBalance <= 0;

  const handleDownload = () => {
    if (!isFullyPaid) {
      toast.error("Cannot download permit. Please clear outstanding balance.");
      return;
    }
    toast.success("Permit downloaded successfully!");
  };

  const handlePrint = () => {
    if (!isFullyPaid) {
      toast.error("Cannot print permit. Please clear outstanding balance.");
      return;
    }
    toast.success("Printing permit...");
    window.print();
  };

  const handleShare = () => {
    if (!isFullyPaid) {
      toast.error("Cannot share permit. Please clear outstanding balance.");
      return;
    }
    setIsSharing(true);
    setTimeout(() => {
      toast.success("Permit link copied to clipboard!");
      setIsSharing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-16">
      <PageHeader title="Exam Permit" />

      <div className="p-4 space-y-6">
        <div className="mb-6">
          <h2 className="text-center text-lg font-semibold text-university-blue">
            Your Examination Permit
          </h2>
          <p className="text-center text-sm text-muted-foreground">
            Print this permit and present to the invigilator before the exam
          </p>
        </div>

        {/* Permit Card */}
        <div className="flex justify-center">
          <PermitCard
            permitData={permitData}
            className="w-full max-w-3xl shadow-lg animate-fade-in"
          />
        </div>

        {!isFullyPaid && (
          <div className="mx-4 p-4 bg-destructive/10 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Outstanding Balance</span>
            </div>
            <p className="mt-2 text-sm">
              You have an outstanding balance of UGX {feesBalance.toLocaleString()}. Please clear your fees to download the permit.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-3 mt-6">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 neuro-button"
            onClick={handleDownload}
            disabled={!isFullyPaid}
          >
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 neuro-button"
            onClick={handlePrint}
            disabled={!isFullyPaid}
          >
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 neuro-button"
            onClick={handleShare}
            disabled={isSharing || !isFullyPaid}
          >
            <Share2 className="w-4 h-4 mr-1" /> Share
          </Button>
        </div>

        {/* Permit Details */}
        <div className="mt-8">
          <h3 className="font-semibold mb-3">Permit Details</h3>
          <div className="neuro-card p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Permit ID</span>
              <span className="font-medium">{permitData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exam Date</span>
              <span className="font-medium">{permitData.examDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Year of Study</span>
              <span className="font-medium">Year {permitData.yearOfStudy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Semester</span>
              <span className="font-medium">Semester {permitData.semester}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4">
          <h3 className="font-semibold mb-3">Instructions</h3>
          <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
            <p>• Present this permit along with your student ID</p>
            <p>• Arrive at least 15 minutes before the exam</p>
            <p>• Electronic devices are not allowed during the exam</p>
            <p>• The QR code will be scanned for verification</p>
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default PermitPage;
