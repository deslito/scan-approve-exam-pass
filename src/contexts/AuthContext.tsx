
import React, { createContext, useContext, useState, useEffect } from "react";

// Mock data for students
const mockStudents = {
  "asiimiretracy@gmail.com": {
    id: "S123456",
    name: "Asiimire Tracy",
    regNumber: "23/U/DCE/04387/PD",
    email: "asiimiretracy@gmail.com",
    role: "student" as const,
    semester: "I",
    yearOfStudy: 2,
    course: "Bachelor of Computer Science",
    gender: "Female",
    programme: "Day",
    feesBalance: 500000,
    permitStatus: "INVALID",
    photoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    faculty: "Science and Technology",
    department: "Computer Science"
  },
  "mubirutimothy@gmail.com": {
    id: "S234567",
    name: "Mubiru Timothy",
    regNumber: "21/U/ITD/3925/PD",
    email: "mubirutimothy@gmail.com",
    role: "student" as const,
    semester: "I",
    yearOfStudy: 2,
    course: "Bachelor in Information Technology and Computing",
    gender: "Male",
    programme: "Day",
    feesBalance: 0,
    permitStatus: "VALID",
    faculty: "Science and Technology",
    department: "Information Technology"
  },
  "twijukyedavid@gmail.com": {
    id: "S345678",
    name: "Twijukye David",
    regNumber: "21/U/BBA/3345/PD",
    email: "twijukyedavid@gmail.com",
    role: "student" as const,
    semester: "I",
    yearOfStudy: 2,
    course: "Bachelor in Business Administration",
    gender: "Male",
    programme: "Evening",
    feesBalance: 0,
    permitStatus: "VALID",
    faculty: "Business and Management",
    department: "Business Administration"
  },
  "muyingocynthia@gmail.com": {
    id: "S456789",
    name: "Muyingo Cynthia",
    regNumber: "21/U/ARC/38005/PD",
    email: "muyingocynthia@gmail.com",
    role: "student" as const,
    semester: "I",
    yearOfStudy: 2,
    course: "Bachelor in Architecture",
    gender: "Female",
    programme: "Day",
    feesBalance: 0,
    permitStatus: "VALID",
    faculty: "Engineering",
    department: "Architecture"
  }
};

// Mock data for invigilators
const mockInvigilators = {
  "nakirayisophia@kyu.edu": {
    id: "I789012",
    name: "Ms. Nakirayi Sophia",
    regNumber: "24/STAFF/002",
    email: "nakirayisophia@kyu.edu",
    role: "invigilator" as const,
    department: "Computer Science",
    faculty: "Science and Technology",
    academicYear: "2025",
    semester: "II"
  },
  "mugishajoel@kyu.edu": {
    id: "I654321",
    name: "Dr. Mugisha Joel",
    regNumber: "24/STAFF/001",
    email: "mugishajoel@kyu.edu",
    role: "invigilator" as const,
    department: "Information Technology",
    faculty: "Science and Technology",
    academicYear: "2025",
    semester: "II"
  }
};

// Mock data for admin
const mockAdmin = {
  "admin@kyu.edu": {
    id: "A456789",
    name: "Admin User",
    email: "admin@kyu.edu",
    role: "admin" as const
  }
};

// Types
interface User {
  id: string;
  name: string;
  regNumber?: string;
  email: string;
  role: "student" | "admin" | "invigilator";
  semester?: string;
  yearOfStudy?: number;
  course?: string;
  gender?: string;
  programme?: string;
  feesBalance?: number;
  permitStatus?: string;
  photoUrl?: string;
  faculty?: string;
  department?: string;
  academicYear?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const checkAuth = async () => {
      try {
        // In a real app, you would validate the token with your backend
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real app, you would validate credentials with your backend
      // and get a JWT token
      
      // For now, we'll simulate a successful login with mock data
      if (email && password) {
        // Check for student users
        if (mockStudents[email as keyof typeof mockStudents]) {
          const student = mockStudents[email as keyof typeof mockStudents];
          
          // Simple password validation for demo purposes
          if (email === "asiimiretracy@gmail.com" && password === "tracy" ||
              email === "mubirutimothy@gmail.com" && password === "timothy" ||
              email === "twijukyedavid@gmail.com" && password === "david" ||
              email === "muyingocynthia@gmail.com" && password === "cynthia") {
            setUser(student);
            localStorage.setItem("user", JSON.stringify(student));
            return;
          }
        }
        
        // Check for invigilator users
        if (mockInvigilators[email as keyof typeof mockInvigilators]) {
          const invigilator = mockInvigilators[email as keyof typeof mockInvigilators];
          
          // Simple password validation for demo purposes
          if (email === "nakirayisophia@kyu.edu" && password === "sophia" ||
              email === "mugishajoel@kyu.edu" && password === "joel") {
            setUser(invigilator);
            localStorage.setItem("user", JSON.stringify(invigilator));
            return;
          }
        }
        
        // Check for admin user
        if (mockAdmin[email as keyof typeof mockAdmin]) {
          const admin = mockAdmin[email as keyof typeof mockAdmin];
          
          // Simple password validation for demo purposes
          if (email === "admin@kyu.edu" && password === "admin") {
            setUser(admin);
            localStorage.setItem("user", JSON.stringify(admin));
            return;
          }
        }
        
        throw new Error("Invalid credentials");
      } else {
        throw new Error("Email and password are required");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
