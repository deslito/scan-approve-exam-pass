
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminSidebar from "@/components/AdminSidebar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Bell, Moon, Sun } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [theme, setTheme] = React.useState("light");

  const handleNotificationChange = (checked: boolean) => {
    setEmailNotifications(checked);
    toast.success(`Email notifications ${checked ? 'enabled' : 'disabled'}`);
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast.success(`Theme changed to ${value} mode`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {isAdmin && <AdminSidebar />}
      <div className={isAdmin ? "md:ml-64 pt-16 md:pt-6" : ""}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-6">
            {/* Notifications Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about important updates
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={handleNotificationChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label>Theme</Label>
                  <RadioGroup
                    value={theme}
                    onValueChange={handleThemeChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center gap-1">
                        <Sun className="h-4 w-4" /> Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center gap-1">
                        <Moon className="h-4 w-4" /> Dark
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
