
import React, { useState } from "react";
import { Calendar, ChevronDown, User, CheckCircle, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CourseUnit } from "@/types/student";
import { toast } from "sonner";

interface DashboardStatsProps {
  username: string;
  regNumber: string;
  semester: string;
  permitStatus: string;
  paymentStatus: string;
  courseProgress: number;
  examDate: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  username,
  regNumber,
  semester,
  permitStatus,
  paymentStatus,
  courseProgress,
  examDate,
}) => {
  const [showCourseUnits, setShowCourseUnits] = useState(false);
  
  // Mock course units data
  const courseUnits: CourseUnit[] = [
    {
      code: "CSC 201",
      name: "Data Structures",
      creditUnits: 4,
      category: "CORE",
      status: "NORMAL"
    },
    {
      code: "CSC 202",
      name: "Computer Networks",
      creditUnits: 3,
      category: "CORE",
      status: "NORMAL"
    },
    {
      code: "CSC 203",
      name: "Database Systems",
      creditUnits: 3,
      category: "CORE",
      status: "NORMAL"
    },
    {
      code: "CSC 204",
      name: "Computer Graphics",
      creditUnits: 3,
      category: "ELECTIVE",
      status: "NORMAL"
    },
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "valid":
        return <CheckCircle className="w-5 h-5 text-permit-valid" />;
      case "pending":
        return <Clock className="w-5 h-5 text-permit-pending" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-university-blue text-white p-6 pt-8 rounded-b-3xl">
        <h1 className="text-2xl font-bold">Welcome back,</h1>
        <p className="opacity-90 font-medium">{username}</p>
        <div className="text-xs opacity-75 mt-1">
          Reg: {regNumber} • {semester}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 -mt-6">
        <div className="glass-card p-4 flex justify-between">
          <div className="flex flex-col items-center transition-transform hover:scale-105 cursor-pointer">
            <div className="text-xs text-muted-foreground">Permit</div>
            <div className="flex items-center mt-1 font-medium">
              {getStatusIcon(permitStatus)}
              <span className="ml-1 capitalize">{permitStatus}</span>
            </div>
          </div>
          <div className="flex flex-col items-center transition-transform hover:scale-105 cursor-pointer">
            <div className="text-xs text-muted-foreground">Payment</div>
            <div className="flex items-center mt-1 font-medium">
              <CheckCircle className="w-5 h-5 text-permit-valid" />
              <span className="ml-1">{paymentStatus}</span>
            </div>
          </div>
          <div className="flex flex-col items-center transition-transform hover:scale-105 cursor-pointer">
            <div className="text-xs text-muted-foreground">Progress</div>
            <div className="flex items-center mt-1 font-medium">
              <div className="w-12 bg-muted h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-university-green"
                  style={{ width: `${courseProgress}%` }}
                ></div>
              </div>
              <span className="ml-1">{courseProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Exam Section */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-3 px-4">Current Semester</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="w-10 h-10 p-2 rounded-lg bg-muted text-university-blue" />
                <div className="ml-4">
                  <h3 className="font-medium">{semester}</h3>
                  <p className="text-sm text-muted-foreground">Next Exam: {examDate}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="neuro-button flex items-center gap-1"
                onClick={() => setShowCourseUnits(!showCourseUnits)}
              >
                View <ChevronDown className={`h-4 w-4 transition-transform ${showCourseUnits ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {showCourseUnits && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium text-sm mb-3">Enrolled Course Units</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="border-b">
                      <tr className="text-muted-foreground">
                        <th className="text-left p-2">Code</th>
                        <th className="text-left p-2">Course Unit</th>
                        <th className="text-center p-2">CU</th>
                        <th className="text-center p-2">Category</th>
                        <th className="text-center p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseUnits.map((unit, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-2">{unit.code}</td>
                          <td className="p-2">{unit.name}</td>
                          <td className="text-center p-2">{unit.creditUnits}</td>
                          <td className="text-center p-2">{unit.category}</td>
                          <td className="text-center p-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              unit.status === "RETAKE" ? 
                              "bg-university-orange/10 text-university-orange" : 
                              "bg-university-green/10 text-university-green"
                            }`}>
                              {unit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default DashboardStats;
