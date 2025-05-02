
export interface Student {
  id: string;
  name: string;
  studentId: string;
  course: string;
  approved: boolean;
}

export interface ScanResult {
  student: Student;
  timestamp: Date;
  approved: boolean;
}
