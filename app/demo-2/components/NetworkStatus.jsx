"use client";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { useEffect, useState } from "react";
import { getSyncQueue } from "../services/syncQueue";

export default function NetworkStatus({ syncing }) {
  const isOnline = useNetworkStatus();
  const [pendingSync, setPendingSync] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkPendingSync = async () => {
      try {
        const queue = await getSyncQueue();
        setPendingSync(queue.length);
      } catch (err) {
        console.error("Failed to check sync queue:", err);
      }
    };

    checkPendingSync();
    const interval = setInterval(checkPendingSync, 2000);
    return () => clearInterval(interval);
  }, [syncing]);

  // Prevent hydration mismatch by not showing dynamic content until mounted
  if (!mounted) {
    return (
      <div className="flex items-center gap-4 mb-4 p-3 bg-[rgba(50,50,50)] rounded-lg border border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm font-medium">Online</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-4 p-3 bg-[rgba(50,50,50)] rounded-lg border border-gray-700">
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm font-medium">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
      
      {syncing && (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-blue-400">Syncing...</span>
        </div>
      )}
      
      {!isOnline && pendingSync > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-yellow-400">
            {pendingSync} pending {pendingSync === 1 ? "change" : "changes"}
          </span>
        </div>
      )}
      
      {isOnline && pendingSync === 0 && !syncing && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-green-400">All synced</span>
        </div>
      )}
    </div>
  );
}
