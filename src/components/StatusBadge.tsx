
import React from "react";
import { Check, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PermitStatus = "valid" | "pending" | "expired" | "approved";

interface StatusBadgeProps {
  status: PermitStatus;
  className?: string;
  showIcon?: boolean;
}

const StatusBadge = ({ status, className, showIcon = true }: StatusBadgeProps) => {
  const getStatusDetails = (status: PermitStatus) => {
    switch (status) {
      case "valid":
        return {
          label: "VALID",
          icon: <Check className="w-3.5 h-3.5" />,
          className: "status-badge-valid",
        };
      case "pending":
        return {
          label: "PENDING",
          icon: <Clock className="w-3.5 h-3.5" />,
          className: "status-badge-pending",
        };
      case "approved":
        return {
          label: "APPROVED",
          icon: <Check className="w-3.5 h-3.5" />,
          className: "status-badge-approved",
        };
      case "expired":
        return {
          label: "EXPIRED",
          icon: <XCircle className="w-3.5 h-3.5" />,
          className: "status-badge-expired",
        };
      default:
        return {
          label: "UNKNOWN",
          icon: <XCircle className="w-3.5 h-3.5" />,
          className: "",
        };
    }
  };

  const { label, icon, className: statusClassName } = getStatusDetails(status);

  return (
    <span className={cn("status-badge", statusClassName, className)}>
      {showIcon && icon}
      {label}
    </span>
  );
};

export default StatusBadge;
