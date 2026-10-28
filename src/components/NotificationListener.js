"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { API_BASE_URL } from "@/utils/config";

const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    
    const playBeep = (freq, startTime, duration) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(1, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = audioCtx.currentTime;
    // Energetic rapid triple-beep
    playBeep(1200, now, 0.2);
    playBeep(1200, now + 0.15, 0.2);
    playBeep(1500, now + 0.3, 0.4);
  } catch (err) {
    console.error("Audio playback failed", err);
  }
};

export default function NotificationListener({ role = "auto" }) {
  const [, setPermission] = useState("default");
  const pathname = usePathname();

  const isAdmin = role === "admin" || (role === "auto" && pathname?.startsWith("/admin"));

  useEffect(() => {
    // 1. Request Browser Notification Permission
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission().then((status) => {
        setPermission(status);
      }).catch((err) => {
        console.warn("Notification permission request failed", err);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check login state
    if (isAdmin) {
      const storedToken = localStorage.getItem("admin_token");
      if (!storedToken) return;
    } else {
      // For student portal, check if user session indicator exists
      const hasSession = localStorage.getItem("user_role") || localStorage.getItem("user_token");
      // If student is on login page without credentials, avoid persistent connection
      if (!hasSession && pathname === "/") {
        // Allow connection if auth cookie may be present or wait for login
      }
    }
    
    // Connect to Socket.io backend
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || `${API_BASE_URL}`;
    const socket = io(socketUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"]
    });

    socket.on("connect", () => {
      console.log(`Connected to Real-Time Notifications Server! Mode: ${isAdmin ? "Admin" : "Student"}`);
    });

    const triggerNotification = (title, body, emoji, borderColor = "border-indigo-100") => {
      playNotificationSound();
      
      // Show Beautiful In-App Toast
      toast(() => (
        <div className="flex items-center gap-4 min-w-[280px]">
          <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm border ${borderColor}`}>
            <span className="text-2xl">{emoji}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-wide text-gray-800 dark:text-white">{title}</span>
            <span className="text-gray-600 dark:text-gray-200 font-medium text-sm">{body}</span>
          </div>
        </div>
      ), { duration: 10000, style: { background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' } });

      // Native OS Notification
      if (typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission === "granted") {
          const notification = new Notification(`${emoji} ${title}`, { body });
          notification.onclick = () => {
            window.focus();
          };
        }
      }
    };

    if (isAdmin) {
      // Admin-specific events
      socket.on("fee_paid", (data) => {
        console.log("Admin fee_paid event:", data);
        triggerNotification(
          "Fee Payment Received",
          `Student ID ${data?.studentId || "unknown"} just paid ₹${data?.amountPaid || data?.amount || "0"}.`,
          "✅",
          "border-green-100"
        );
      });
    } else {
      // Student-specific events
      socket.on("new_notice", (data) => {
        console.log("New notice:", data);
        triggerNotification("New Notice Added!", `Check out the latest notice: ${data?.title || "New updates available"}`, "📢");
      });

      socket.on("new_homework", (data) => {
        console.log("New homework:", data);
        triggerNotification("New Homework Assigned!", `Homework for subject: ${data?.subject || "Unknown"}`, "📚");
      });

      socket.on("new_fee", (data) => {
        console.log("New fee request:", data);
        triggerNotification("New Fee Payment Required", `A fee record of ₹${data?.amount || "0"} has been added.`, "💰");
      });

      socket.on("fee_paid", (data) => {
        console.log("Fee paid event:", data);
        const storedUserStr = localStorage.getItem("user_details");
        if (storedUserStr) {
          try {
            const user = JSON.parse(storedUserStr);
            if (data?.studentId && user?._id && data.studentId !== user._id) {
              return; // Not for this student
            }
          } catch (e) {
            console.error("Failed to parse user details for fee notification filtering:", e);
          }
        }
        triggerNotification("Payment Successful!", `Your payment of ₹${data?.amountPaid || "0"} has been recorded. Status: ${data?.status || "Success"}`, "✅", "border-green-100");
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [pathname, isAdmin]);

  return <Toaster position="top-right" />;
}
