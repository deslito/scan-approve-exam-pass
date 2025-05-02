
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, User, History, LogOut, Users, Settings, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const NavBar = () => {
  const { user } = useAuth();
  const userRole = user?.role || "student";
  const location = useLocation();

  if (userRole === "admin") {
    return null;  // Don't render NavBar for admin users
  }

  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case "student":
        return [
          { label: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/" },
          { label: "Permit", icon: <CreditCard className="w-5 h-5" />, href: "/permit" },
          { label: "History", icon: <History className="w-5 h-5" />, href: "/history" },
          { label: "Profile", icon: <User className="w-5 h-5" />, href: "/profile" },
        ];
      case "invigilator":
        return [
          { label: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/" },
          { label: "Scan QR", icon: <ScanLine className="w-5 h-5" />, href: "/scan" },
          { label: "History", icon: <History className="w-5 h-5" />, href: "/scan-history" },
          { label: "Profile", icon: <User className="w-5 h-5" />, href: "/profile" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} isActive={location.pathname === item.href} />
        ))}
      </div>
    </nav>
  );
};

const NavItem = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  return (
    <Link
      to={item.href}
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {item.icon}
      <span className="text-xs mt-1">{item.label}</span>
    </Link>
  );
};

export default NavBar;
