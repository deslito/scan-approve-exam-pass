
import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import StatusBadge from "./StatusBadge";
import QRCode from "./QRCode";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { format } from "date-fns";

export interface CourseUnit {
  code: string;
  name: string;
  creditUnits: number;
  category: "CORE" | "ELECTIVE";
  status: "NORMAL" | "RETAKE";
}

export interface PermitData {
  id: string;
  studentName: string;
  gender: string;
  studentNumber: string;
  regNumber: string;
  programme: string;
  yearOfStudy: number;
  campus: string;
  semester: "I" | "II";
  academicYear: string;
  faculty?: string;
  department?: string;
  courseName?: string;
  courseUnits: CourseUnit[];
  examDate: string;
  status: "valid" | "pending" | "expired" | "approved";
  photoUrl?: string;
  printDate?: string;
  approvedBy?: string;
  approvedAt?: string;
}

interface PermitCardProps {
  permitData: PermitData;
  className?: string;
  variant?: "default" | "simple";
}

const PermitCard = ({ permitData, className, variant = "default" }: PermitCardProps) => {
  const printDateTime = new Date();

  return (
    <div
      className={cn(
        "w-full",
        variant === "default" ? "glass-card p-5 relative" : "neuro-card p-4 relative",
        className
      )}
    >
      {/* University Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
        <img
          src="/lovable-uploads/e13b93b5-6bf4-4524-bd51-dfbb4efac2c0.png"
          alt="Kyambogo University"
          className="w-3/4 h-auto object-contain"
        />
      </div>

      {/* University Header */}
      <div className="text-center mb-6 border-b pb-4 relative z-10">
        <img
          src="/lovable-uploads/e13b93b5-6bf4-4524-bd51-dfbb4efac2c0.png"
          alt="Kyambogo University Logo"
          className="h-20 mx-auto mb-2 object-contain"
        />
        <h2 className="text-lg font-semibold text-university-blue">Kyambogo University</h2>
        <p className="text-sm text-university-green">Knowledge and Skills for Service</p>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{format(printDateTime, "dd MMM yyyy")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{format(printDateTime, "HH:mm:ss")}</span>
          </div>
        </div>
      </div>

      {/* Student Bio Data */}
      <div className="flex items-start gap-4 mb-6 relative z-10">
        <Avatar className="h-24 w-24 border-2 border-muted">
          <AvatarImage src={permitData.photoUrl} />
          <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">{permitData.studentName}</h3>
            <StatusBadge status={permitData.status} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div>
              <span className="text-muted-foreground">Gender:</span>
              <span className="ml-2">{permitData.gender}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Student No:</span>
              <span className="ml-2">{permitData.studentNumber}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Reg Number:</span>
              <span className="ml-2">{permitData.regNumber}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Programme:</span>
              <span className="ml-2">{permitData.programme}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Study Year:</span>
              <span className="ml-2">{permitData.yearOfStudy}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Campus:</span>
              <span className="ml-2">{permitData.campus}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Semester:</span>
              <span className="ml-2">{permitData.semester}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Academic Year:</span>
              <span className="ml-2">{permitData.academicYear}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Faculty:</span>
              <span className="ml-2">{permitData.faculty}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Department:</span>
              <span className="ml-2">{permitData.department}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Units Section */}
      <div className="mt-6 border-t pt-4 relative z-10">
        <h4 className="font-semibold mb-3">Registered Course Units</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left py-2">Code</th>
                <th className="text-left py-2">Course Unit</th>
                <th className="text-center py-2">CU</th>
                <th className="text-center py-2">Category</th>
                <th className="text-center py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {permitData.courseUnits.map((unit, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2">{unit.code}</td>
                  <td className="py-2">{unit.name}</td>
                  <td className="text-center py-2">{unit.creditUnits}</td>
                  <td className="text-center py-2 capitalize">{unit.category}</td>
                  <td className="text-center py-2 capitalize">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs",
                      unit.status === "RETAKE" ? "bg-university-orange/10 text-university-orange" : "bg-university-green/10 text-university-green"
                    )}>
                      {unit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {variant === "default" && (
        <>
          <div className="mt-6 flex justify-center py-4 border-t relative z-10">
            <QRCode value={permitData.id} size={120} />
          </div>
          
          {/* Instructions */}
          <div className="mt-4 text-sm text-muted-foreground border-t pt-4 relative z-10">
            <h5 className="font-medium mb-2 text-foreground">Instructions:</h5>
            <ul className="space-y-1">
              <li>• Present this permit along with your student ID to the invigilator</li>
              <li>• Arrive at least 15 minutes before the exam</li>
              <li>• Electronic devices are not allowed during the exam</li>
              <li>• This QR code will be scanned for verification</li>
              <li>• Any permit tampering is considered exam malpractice</li>
            </ul>
          </div>
        </>
      )}

      {/* Approval Information */}
      {permitData.approvedBy && permitData.approvedAt && permitData.status === "approved" && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-sm relative z-10">
          <p className="font-medium text-green-700">
            Approved by: {permitData.approvedBy} at {permitData.approvedAt}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground relative z-10">
        <p>Kyambogo University - Examination Department</p>
        <p>P.O. Box 1, Kyambogo, Kampala, Uganda</p>
        <p className="text-university-blue">Knowledge and Skills for Service</p>
      </div>
    </div>
  );
};

export default PermitCard;
