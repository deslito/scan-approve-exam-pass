import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PermitPage from "./pages/PermitPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

// Invigilator pages
import ScanQRPage from "./pages/ScanQRPage";
import ScanHistoryPage from "./pages/ScanHistoryPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";

// Admin pages
import ManageStudentsPage from "./pages/ManageStudentsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManagePermitsPage from "./pages/ManagePermitsPage";
import SettingsPage from "./pages/SettingsPage";
import ManageInvigilatorsPage from "./pages/ManageInvigilatorsPage";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, requiredRoles }: { children: React.ReactNode, requiredRoles?: Array<"student" | "admin" | "invigilator"> }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has required role
  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  // Default redirect based on user role
  const getHomeRoute = () => {
    if (!user) return "/login";
    
    switch (user.role) {
      case "student": return "/";
      case "invigilator": return "/scan";
      case "admin": return "/";
      default: return "/";
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Student Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          {user?.role === "admin" ? <AdminDashboardPage /> : <DashboardPage />}
        </ProtectedRoute>
      } />
      <Route path="/permit" element={<ProtectedRoute requiredRoles={["student"]}><PermitPage /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute requiredRoles={["student"]}><HistoryPage /></ProtectedRoute>} />
      
      {/* Invigilator Routes */}
      <Route path="/scan" element={<ProtectedRoute requiredRoles={["invigilator"]}><ScanQRPage /></ProtectedRoute>} />
      <Route path="/student-details" element={<ProtectedRoute requiredRoles={["invigilator"]}><StudentDetailsPage /></ProtectedRoute>} />
      <Route path="/scan-history" element={<ProtectedRoute requiredRoles={["invigilator"]}><ScanHistoryPage /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/manage-students" element={<ProtectedRoute requiredRoles={["admin"]}><ManageStudentsPage /></ProtectedRoute>} />
      <Route path="/manage-invigilators" element={<ProtectedRoute requiredRoles={["admin"]}><ManageInvigilatorsPage /></ProtectedRoute>} />
      <Route path="/manage-permits" element={<ProtectedRoute requiredRoles={["admin"]}><ManagePermitsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute requiredRoles={["admin"]}><SettingsPage /></ProtectedRoute>} />
      
      {/* Common Routes */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      {/* 404 and Default Routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
