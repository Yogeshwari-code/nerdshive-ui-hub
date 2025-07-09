import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, AlertCircle, Info, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const notificationVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-sm transition-all",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        success: "bg-success/5 border-success/20 text-success-foreground",
        info: "bg-primary/5 border-primary/20 text-primary-foreground", 
        warning: "bg-warning/5 border-warning/20 text-warning-foreground",
        event: "bg-accent/5 border-accent/20 text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap = {
  success: CheckCircle,
  info: Info,
  warning: AlertCircle,
  event: Calendar,
  default: Info,
};

interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  title: string;
  message: string;
  timestamp?: Date;
  onDismiss?: () => void;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant = "default", title, message, timestamp, onDismiss, ...props }, ref) => {
    const Icon = iconMap[variant || "default"];

    return (
      <div
        ref={ref}
        className={cn(notificationVariants({ variant }), className)}
        {...props}
      >
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm">{title}</h4>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={onDismiss}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <p className="text-sm opacity-90">{message}</p>
          {timestamp && (
            <p className="text-xs opacity-70">
              {timestamp.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Notification.displayName = "Notification";

export { Notification, notificationVariants };