
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, CreditCard, Users, Calendar, AlertCircle, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from "@/components/AdminSidebar";

const AdminDashboardPage = () => {
  const { user } = useAuth();

  // Mock data
  const stats = {
    totalStudents: 2458,
    pendingPermits: 125,
    validPermits: 2000,
    expiredPermits: 458,
    verifiedToday: 200,
  };

  const recentActivities = [
    {
      id: 1,
      action: "Permit Generated",
      student: "Asiimire Tracy",
      timestamp: "10 minutes ago",
    },
    {
      id: 2,
      action: "Payment Verified",
      student: "Mubiru Timothy",
      timestamp: "25 minutes ago",
    },
    {
      id: 3,
      action: "Permit Expired",
      student: "Twijukye David",
      timestamp: "1 hour ago",
    },
    {
      id: 4,
      action: "Student Added",
      student: "Muyingo Cynthia",
      timestamp: "3 hours ago",
    },
  ];

  const statusDistribution = {
    approved: Math.round((stats.validPermits / stats.totalStudents) * 100),
    pending: Math.round((stats.pendingPermits / stats.totalStudents) * 100),
    expired: Math.round((stats.expiredPermits / stats.totalStudents) * 100),
  };

  return (
    <div className="min-h-screen bg-transparent">
      <AdminSidebar />
      <div className="md:pl-64 pt-16 md:pt-0">
        <div className="p-4">
          {/* Header */}
          <div className="bg-university-blue text-white p-6 pt-8 md:pt-16 rounded-b-3xl">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="opacity-90 font-medium">{user?.name}</p>
            <div className="text-xs opacity-75 mt-1">Role: Administrator</div>
          </div>

          {/* Quick Stats */}
          <div className="px-4 -mt-6">
            <div className="glass-card p-4">
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Total Students"
                  value={stats.totalStudents.toString()}
                  icon={<Users className="w-8 h-8 text-university-blue" />}
                />
                <StatCard
                  title="Pending Permits"
                  value={stats.pendingPermits.toString()}
                  icon={<AlertCircle className="w-8 h-8 text-amber-500" />}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 space-y-6">
            {/* Permit Status */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Permit Status Distribution</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <StatusProgressBar
                      label="Approved"
                      value={statusDistribution.approved}
                      color="bg-permit-valid"
                    />
                    <StatusProgressBar
                      label="Pending"
                      value={statusDistribution.pending}
                      color="bg-permit-pending"
                    />
                    <StatusProgressBar
                      label="Expired"
                      value={statusDistribution.expired}
                      color="bg-permit-expired"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/manage-invigilators" className="block">
                  <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center neuro-button">
                    <User className="w-6 h-6 text-university-blue" />
                    <span className="mt-2 font-medium text-sm">Manage Invigilators</span>
                  </div>
                </Link>
                <Link to="/manage-permits" className="block">
                  <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center neuro-button">
                    <CreditCard className="w-6 h-6 text-university-blue" />
                    <span className="mt-2 font-medium text-sm">Manage Permits</span>
                  </div>
                </Link>
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Link to="/activity" className="text-sm text-university-blue font-medium">
                  View All
                </Link>
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.student}</p>
                          </div>
                          <p className="text-xs text-muted-foreground text-right">{activity.timestamp}</p>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Today's Verification */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Today's Verification</h2>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-10 h-10 p-2 rounded-lg bg-muted text-university-blue" />
                    <div className="ml-4">
                      <h3 className="font-medium">{stats.verifiedToday} Permits Verified</h3>
                      <p className="text-sm text-muted-foreground">Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-white rounded-xl p-3 shadow-sm flex items-center">
    <div className="mr-3">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

interface StatusProgressBarProps {
  label: string;
  value: number;
  color: string;
}

const StatusProgressBar = ({ label, value, color }: StatusProgressBarProps) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-medium">{value}%</span>
    </div>
    <Progress value={value} className={`h-2 ${color}`} />
  </div>
);

export default AdminDashboardPage;
