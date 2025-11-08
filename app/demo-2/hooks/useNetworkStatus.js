"use client";
import { useState, useEffect } from "react";

// Helper function to check actual network connectivity
const checkNetworkStatus = async () => {
  try {
    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    // Try to fetch a small resource to verify actual connectivity
    // Use a timestamp to prevent caching
    const response = await fetch(`/favicon.ico?t=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    // If fetch fails, we're likely offline
    // Don't log errors to avoid console spam
    return false;
  }
};

export const useNetworkStatus = () => {
  // Always start with true to match SSR (prevents hydration mismatch)
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted flag and initial status after mount
    setMounted(true);
    
    const updateStatus = async () => {
      // Always do a network check, don't trust navigator.onLine alone
      // navigator.onLine can be false even when online
      const actuallyOnline = await checkNetworkStatus();
      setIsOnline(actuallyOnline);
    };

    // Initial check - always verify with network request
    updateStatus();

    const handleOnline = async () => {
      // When online event fires, verify with actual network check
      const actuallyOnline = await checkNetworkStatus();
      setIsOnline(actuallyOnline);
    };
    
    const handleOffline = () => {
      // When offline event fires, trust it (usually accurate)
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Periodic check to catch cases where navigator.onLine is wrong
    // Check every 5 seconds if navigator says we're online
    // Also check if navigator says offline but we might actually be online
    const interval = setInterval(async () => {
      if (navigator.onLine) {
        // If navigator says online, verify with network check
        const actuallyOnline = await checkNetworkStatus();
        setIsOnline(actuallyOnline);
      } else {
        // If navigator says offline, still check (it might be wrong)
        // But only check occasionally to avoid too many requests
        const actuallyOnline = await checkNetworkStatus();
        setIsOnline(actuallyOnline);
      }
    }, 5000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  // Return true during SSR and initial render to prevent hydration mismatch
  if (!mounted) {
    return true;
  }

  return isOnline;
};

