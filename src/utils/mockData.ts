
import { Student, ScanResult } from "../types";

// Mock list of approved students
export const approvedStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    studentId: "STD001",
    course: "Computer Science",
    approved: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    studentId: "STD002",
    course: "Mathematics",
    approved: true,
  },
  {
    id: "3",
    name: "Robert Johnson",
    studentId: "STD003",
    course: "Physics",
    approved: true,
  },
  {
    id: "4",
    name: "Emily Davis",
    studentId: "STD004",
    course: "Chemistry",
    approved: true,
  },
  {
    id: "5",
    name: "Michael Brown",
    studentId: "STD005",
    course: "Biology",
    approved: true,
  },
];

// Mock list of non-approved students (for testing)
export const nonApprovedStudents: Student[] = [
  {
    id: "6",
    name: "Sarah Wilson",
    studentId: "STD006",
    course: "Economics",
    approved: false,
  },
  {
    id: "7",
    name: "David Miller",
    studentId: "STD007",
    course: "History",
    approved: false,
  },
];

// Combined list for testing
export const allStudents: Student[] = [...approvedStudents, ...nonApprovedStudents];

// Initial empty scan results
export const initialScanResults: ScanResult[] = [];

// Function to find a student by ID
export const findStudentById = (id: string): Student | undefined => {
  return allStudents.find(student => student.id === id);
};

// Function to check if a student is approved
export const isStudentApproved = (id: string): boolean => {
  const student = findStudentById(id);
  return student ? student.approved : false;
};
