
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { CheckCircle, Clock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardStats from "@/components/DashboardStats";

const DashboardPage = () => {
  const { user } = useAuth();

  // Mock data
  const permitStatus = "valid"; // valid | pending | expired
  const paymentStatus = "paid"; // paid | pending | unpaid
  const nextExamDate = "2023-06-15";
  const courseProgress = 75;

  // Default to Year 1 Semester I if user data is not available
  const yearOfStudy = user?.yearOfStudy || 1;
  const semester = user?.semester || 'I';
  const currentSemester = `Year ${yearOfStudy} Semester ${semester}`;

  return (
    <div className="pb-16">
      <DashboardStats
        username={user?.name || "Asiimire Tracy"}
        regNumber={user?.regNumber || "23/U/DCE/04387/PD"}
        semester={currentSemester}
        permitStatus={permitStatus}
        paymentStatus={paymentStatus}
        courseProgress={courseProgress}
        examDate={nextExamDate}
      />

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/permit" className="block">
              <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center hover:shadow-neuro-inset transition-all duration-200 hover:bg-gray-50">
                <CreditCard className="w-6 h-6 text-university-blue" />
                <span className="mt-2 font-medium text-sm">View Permit</span>
              </div>
            </Link>
            <Link to="/history" className="block">
              <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center hover:shadow-neuro-inset transition-all duration-200 hover:bg-gray-50">
                <Clock className="w-6 h-6 text-university-blue" />
                <span className="mt-2 font-medium text-sm">Permit History</span>
              </div>
            </Link>
          </div>
        </section>
        {/* Recent Activity */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              See all
            </Button>
          </div>
          <div className="space-y-3">
            <ActivityItem
              title="Permit Generated"
              description="Advanced Mathematics"
              date="Today"
            />
            <ActivityItem
              title="Payment Confirmed"
              description="Semester Fees"
              date="Yesterday"
            />
          </div>
        </section>
      </div>

      <NavBar />
    </div>
  );
};

interface ActivityItemProps {
  title: string;
  description: string;
  date: string;
}

const ActivityItem = ({ title, description, date }: ActivityItemProps) => {
  return (
    <div className="neuro-card p-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
    </div>
  );
};

export default DashboardPage;
