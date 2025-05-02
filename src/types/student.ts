
export interface StudentData {
  id: string;
  name: string;
  regNumber: string;
  course: string;
  semester: string;
  feesBalance: number;
  permitStatus: "VALID" | "INVALID" | "EXPIRED";
  gender?: string;
  programme?: string;
  photoUrl?: string;
  email?: string;
}

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
  studentNumber: string;
  regNumber: string;
  gender: string;
  programme?: string;
  yearOfStudy: number;
  campus: string;
  semester: "I" | "II";
  academicYear: string;
  faculty: string;
  department: string;
  courseName?: string;
  courseUnits: CourseUnit[];
  examDate: string;
  status: "valid" | "pending" | "expired" | "approved";
  photoUrl?: string;
  printDate?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface Invigilation {
  id: string;
  permitId: string;
  invigilatorId: string;
  invigilatorName: string;
  scanTime: string;
  status: "approved" | "pending";
  notes?: string;
  isDuplicate: boolean;
}
