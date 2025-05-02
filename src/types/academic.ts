
export interface Faculty {
  id: string;
  name: string;
  schools: School[];
}

export interface School {
  id: string;
  name: string;
  facultyId: string;
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
  schoolId: string;
  programmes: Programme[];
}

export interface Programme {
  id: string;
  name: string;
  courseId: string;
  studyTime: "DAY" | "EVENING";
}

export interface CourseUnit {
  code: string;
  name: string;
  creditUnits: number;
  category: "CORE" | "ELECTIVE";
  status: "NORMAL" | "RETAKE";
}

export interface Invigilator {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  staffId: string;
  schoolId: string;
  school: School;
  status: "ACTIVE" | "INACTIVE";
}
