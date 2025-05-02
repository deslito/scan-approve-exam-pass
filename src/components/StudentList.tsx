
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from "@/types";
import { Badge } from "@/components/ui/badge";
import { User, UserCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentListProps {
  students: Student[];
  title?: string;
}

const StudentList: React.FC<StudentListProps> = ({ students, title = "Student List" }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">{title}</h3>
          </div>
          <Badge variant="outline" className="text-xs px-2">
            {students.length} students
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Student Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <span>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={student.approved ? "default" : "destructive"}>
                      {student.approved ? "Approved" : "Not Approved"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentList;
