"use client";

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/notifications/unread")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCount(data.count);
        }
      });
  }, []);

  return (
    <div className="relative">
      {" "}
      <Bell />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-2">
          {count}
        </span>
      )}
    </div>
  );
}
