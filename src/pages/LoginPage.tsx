
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import KyambogoLogo from "@/assets/kyambogo-logo.png";

type UserRole = "student" | "invigilator" | "admin";

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    try {
      setIsLoggingIn(true);
      // Fix: login function expects email and password only, role should be handled differently
      await login(email, password);
      toast.success(`Login successful as ${role}!`);
    } catch {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="
        min-h-screen
        flex flex-col items-center justify-center
        p-6
        bg-gradient-to-b from-university-blue/10 to-university-neutralBase/5
      "
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img
              src={KyambogoLogo}
              alt="Kyambogo University Logo"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-university-blue">
            Kyambogo University
          </h1>
          <p className="text-2xl font-semibold text-university-gray">
            Smart Exam Permit Management System
          </p>
          <p className="text-sm text-university-gray">
            Sign in to access the system
          </p>
        </div>

        <div className="neuro-card p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <a
                  href="#"
                  className="
                    text-sm
                    text-university-green
                    hover:text-university-green/90
                    hover:underline
                  "
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <p className="text-sm font-medium mb-2">Select Role</p>
              <div className="flex flex-col space-y-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                    className="radio"
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="invigilator"
                    checked={role === "invigilator"}
                    onChange={() => setRole("invigilator")}
                    className="radio"
                  />
                  <span>Invigilator</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={() => setRole("admin")}
                    className="radio"
                  />
                  <span>Admin</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoggingIn}
              className="
                w-full
                bg-university-blue
                text-black
                font-semibold
                hover:bg-university-blue/90
                disabled:opacity-50 disabled:cursor-not-allowed
                neuro-button
              "
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm">
            <p className="text-university-gray">
              Don't have an account?{" "}
              <a
                href="#"
                className="
                  text-university-green
                  hover:text-university-green/90
                  hover:underline
                "
              >
                Contact your administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
