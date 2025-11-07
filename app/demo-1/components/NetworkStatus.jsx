"use client";
import { useState, useEffect } from "react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set initial status
    setIsOnline(navigator.onLine);

    // Listen for online event
    const handleOnline = () => setIsOnline(true);
    // Listen for offline event
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 mb-4">
      <div
        className={`w-3 h-3 rounded-full ${
          isOnline ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className="text-sm font-medium">
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}

