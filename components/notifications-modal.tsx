"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, MapPin, DollarSign, CheckCircle } from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  time: string
  unread: boolean
}

interface NotificationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notifications: Notification[]
  onMarkAsRead: (id: number) => void
}

export function NotificationsModal({ open, onOpenChange, notifications, onMarkAsRead }: NotificationsModalProps) {
  const markAllAsRead = () => {
    notifications.forEach((notif) => {
      if (notif.unread) {
        onMarkAsRead(notif.id)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  notification.unread
                    ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {notification.unread && <Badge className="h-2 w-2 p-0 bg-blue-500"></Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                  <div className="ml-2">
                    {notification.title.includes("posted") && <MapPin className="h-4 w-4 text-blue-500" />}
                    {notification.title.includes("accepted") && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {notification.title.includes("Payment") && <DollarSign className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
