
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import { Edit2, LogOut, Lock } from "lucide-react";
import { toast } from "sonner";
import AdminSidebar from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  const isAdmin = user?.role === "admin";
  const isInvigilator = user?.role === "invigilator";

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!passwordForm.currentPassword) {
      toast.error("Current password is required");
      return;
    }
    
    if (!passwordForm.newPassword) {
      toast.error("New password is required");
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Password changed successfully!");
      setIsDialogOpen(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen pb-16">
      {isAdmin && <AdminSidebar />}
      <div className={cn(
        "w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8", 
        isAdmin ? "md:ml-64 pt-16 md:pt-6" : ""
      )}>
        <PageHeader title="Profile" />

        <div className="space-y-6 mt-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-24 h-24 rounded-full bg-university-blue text-white flex items-center justify-center text-3xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
            {!isAdmin && <p className="text-muted-foreground">{user?.regNumber}</p>}
            <Button
              variant="outline"
              size="sm"
              className="mt-3 neuro-button"
              onClick={() => toast.info("Edit profile coming soon")}
            >
              <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Personal Information</h3>
            <div className="neuro-card p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Full Name</span>
                <span>{user?.name}</span>
              </div>
              {!isAdmin && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isInvigilator ? "Staff ID" : "Registration Number"}</span>
                    <span>{user?.regNumber}</span>
                  </div>
                  {isInvigilator && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Academic Year</span>
                        <span>2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Semester</span>
                        <span>II</span>
                      </div>
                    </>
                  )}
                  {!isInvigilator && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Semester</span>
                      <span>{user?.semester}</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Only show Academic Details for students */}
          {!isAdmin && !isInvigilator && (
            <div className="space-y-4">
              <h3 className="font-semibold">Academic Information</h3>
              <div className="neuro-card p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Program</span>
                  <span>Bachelor of Computer Science</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span>3rd Year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span>Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Password Change */}
          <div className="space-y-4">
            <h3 className="font-semibold">Security</h3>
            <div className="neuro-card p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-muted-foreground">Change your password</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="neuro-button"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Lock className="w-4 h-4 mr-2" /> Change
                </Button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8">
            <Button
              variant="outline"
              className="w-full text-permit-expired neuro-button"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        {!isAdmin && <NavBar />}
      </div>

      {/* Password Change Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change your password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordChange} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;

