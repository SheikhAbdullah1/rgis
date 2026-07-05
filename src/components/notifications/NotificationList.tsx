"use client";

import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  read?: boolean;
  createdAt?: string;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNotifications(data.notifications);
      })
      .finally(() => setLoading(false));
  }, []);

  const markAsRead = async (id: string) => {
    await fetch(`/api/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  };

  if (loading) return <p className="py-8 text-center text-gray-500">Loading notifications...</p>;

  if (notifications.length === 0) {
    return <p className="py-12 text-center text-gray-500">No notifications yet.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-6 py-10">
      <h1 className="text-3xl font-bold">Notifications</h1>

      {notifications.map((n) => (
        <div
          key={n._id}
          className={`flex items-start gap-4 rounded-xl border p-5 ${
            n.read ? "bg-white" : "bg-blue-50"
          }`}
        >
          <div className="rounded-full bg-blue-100 p-3 text-blue-600">
            <Bell size={20} />
          </div>

          <div className="flex-1">
            <p className="font-semibold">{n.title}</p>
            <p className="text-gray-600">{n.message}</p>
            {n.createdAt && (
              <p className="mt-1 text-sm text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            )}
          </div>

          {!n.read && (
            <button
              onClick={() => markAsRead(n._id)}
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
            >
              <Check size={16} />
              Mark read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}