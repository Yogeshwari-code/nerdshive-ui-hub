import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Notification } from "@/components/ui/notification";
import { Bell, BellOff } from "lucide-react";
import { SAMPLE_NOTIFICATIONS } from "@/lib/demo-data";

export const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [showAll, setShowAll] = useState(false);

  const handleDismiss = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <Card className="glass-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-elegant">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </CardTitle>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              <BellOff className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No new notifications</p>
            <p className="text-sm">You're all caught up! 🎉</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedNotifications.map((notification) => (
              <Notification
                key={notification.id}
                variant={notification.type as any}
                title={notification.title}
                message={notification.message}
                timestamp={notification.timestamp}
                onDismiss={() => handleDismiss(notification.id)}
              />
            ))}
            
            {notifications.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-4"
              >
                {showAll ? 'Show Less' : `Show ${notifications.length - 3} More`}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};