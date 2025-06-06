
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import PermitCard from "@/components/PermitCard";
import { PermitData, CourseUnit } from "@/components/PermitCard";
import TracyImage from "@/assets/tracy.png";
import { format } from "date-fns";

type ExtendedPermitData = Omit<PermitData, "semester"> & {
  displaySemester: string;
  semester: "I" | "II";
};

const HistoryPage = () => {
  const { user } = useAuth();

  const mockCourseUnits: CourseUnit[] = [
    {
      code: "CSC 301",
      name: "Advanced Programming",
      creditUnits: 4,
      category: "CORE",
      status: "NORMAL",
    },
    {
      code: "CSC 302",
      name: "Database Systems",
      creditUnits: 4,
      category: "CORE",
      status: "NORMAL",
    },
  ];

  const permitHistory: ExtendedPermitData[] = [
    {
      id: "PERM-123456",
      studentName: user?.name || "Asiimire Tracy",
      studentNumber: "2300804387",
      regNumber: user?.regNumber || "23/U/DCE/04387/PD",
      displaySemester: "Year 2 Semester II",
      semester: "II",
      gender: "Female",
      yearOfStudy: 2,
      faculty: "Science",
      department: "Computer Science",
      programme: "(DCE) DIPLOMA IN COMPUTER ENGINEERING",
      campus: "Main Campus",
      academicYear: "2023/2024",
      courseName: "Advanced Mathematics",
      examDate: "2025-05-15T10:30:00",
      status: "valid",
      courseUnits: mockCourseUnits,
      photoUrl: TracyImage,
      printDate: new Date().toISOString(),
    },
    {
      id: "PERM-123455",
      studentName: user?.name || "Asiimire Tracy",
      studentNumber: "2300804387",
      regNumber: user?.regNumber || "23/U/DCE/04387/PD",
      displaySemester: "Year 2 Semester I",
      semester: "I",
      gender: "Female",
      yearOfStudy: 2,
      faculty: "Science",
      department: "Computer Science",
      programme: "(DCE) DIPLOMA IN COMPUTER ENGINEERING",
      campus: "Main Campus",
      academicYear: "2023/2024",
      courseName: "Computer Science",
      examDate: "2025-05-18T14:00:00",
      status: "valid",
      courseUnits: mockCourseUnits,
      photoUrl: TracyImage,
      printDate: new Date().toISOString(),
    },
    {
      id: "PERM-123454",
      studentName: user?.name || "Asiimire Tracy",
      studentNumber: "2300804387",
      regNumber: user?.regNumber || "23/U/DCE/04387/PD",
      displaySemester: "Year 1 Semester II",
      semester: "II",
      gender: "Female",
      yearOfStudy: 1,
      faculty: "Science",
      department: "Computer Science",
      programme: "(DCE) DIPLOMA IN COMPUTER ENGINEERING",
      campus: "Main Campus",
      academicYear: "2022/2023",
      courseName: "Data Structures",
      examDate: "2024-01-10T09:00:00",
      status: "expired",
      courseUnits: mockCourseUnits,
      photoUrl: TracyImage,
      printDate: new Date().toISOString(),
    },
    {
      id: "PERM-123453",
      studentName: user?.name || "Asiimire Tracy",
      studentNumber: "2300804387",
      regNumber: user?.regNumber || "23/U/DCE/04387/PD",
      displaySemester: "Year 1 Semester I",
      semester: "I",
      gender: "Female",
      yearOfStudy: 1,
      faculty: "Science",
      department: "Computer Science",
      programme: "(DCE) DIPLOMA IN COMPUTER ENGINEERING",
      campus: "Main Campus",
      academicYear: "2022/2023",
      courseName: "Software Engineering",
      examDate: "2024-01-15T13:30:00",
      status: "expired",
      courseUnits: mockCourseUnits,
      photoUrl: TracyImage,
      printDate: new Date().toISOString(),
    },
  ];

  const groupedPermits: Record<string, ExtendedPermitData[]> =
    permitHistory.reduce((acc, permit) => {
      if (!acc[permit.displaySemester]) {
        acc[permit.displaySemester] = [];
      }
      acc[permit.displaySemester].push(permit);
      return acc;
    }, {} as Record<string, ExtendedPermitData[]>);

  const sortedSemesters = Object.keys(groupedPermits).sort().reverse();

  // Format date to include date and time
  const formatExamDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (error) {
      return "Date not available";
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <PageHeader title="Permit History" />

      <div className="p-4 space-y-6">
        {sortedSemesters.length > 0 ? (
          sortedSemesters.map((semester, index) => (
            <div key={semester} className="flex flex-col items-center space-y-4">
              <h2 className="text-lg font-semibold w-full max-w-3xl">{semester}</h2>
              {groupedPermits[semester].map((permit) => (
                <div key={permit.id} className="w-full max-w-3xl">
                  <PermitCard 
                    permitData={{
                      ...permit, 
                      examDate: formatExamDate(permit.examDate)
                    }} 
                    variant="simple" 
                  />
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No permit history found</p>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default HistoryPage;
