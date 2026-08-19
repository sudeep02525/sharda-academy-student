"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { API_BASE_URL } from "@/utils/config";

const playNotificationSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
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

export default function NotificationListener() {
  const [permission, setPermission] = useState("default");
  const pathname = usePathname();

  useEffect(() => {
    // 1. Request Browser Notification Permission
    if ("Notification" in window) {
      Notification.requestPermission().then((status) => {
        setPermission(status);
      });
    }
  }, []);

  useEffect(() => {
    // Only connect if we are logged in
    const storedToken = localStorage.getItem("admin_token");
    if (!storedToken) return;
    
    // 2. Connect to Socket.io backend
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || `${API_BASE_URL}`;
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Connected to Real-Time Notifications Server!");
    });

    const triggerNotification = (title, body, emoji) => {
      playNotificationSound();
      
      // Show Beautiful In-App Toast
      toast((t) => (
        <div className="flex items-center gap-4 min-w-[280px]">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-green-100">
            <span className="text-2xl">{emoji}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-wide text-gray-800 dark:text-white">{title}</span>
            <span className="text-gray-600 dark:text-gray-200 font-medium text-sm">{body}</span>
          </div>
        </div>
      ), { duration: 10000, style: { background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' } });

      // Native OS Notification
      if (Notification.permission === "granted") {
        const notification = new Notification(`${emoji} ${title}`, {
          body: body,
        });

        // Click to open app
        notification.onclick = () => {
          window.focus();
        };
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    };

    socket.on("fee_paid", (data) => {
      console.log("Fee paid:", data);
      triggerNotification("Fee Payment Received", `Student ID ${data.studentId || "unknown"} just paid ₹${data.amountPaid || data.amount || "0"}.`, "✅");
    });

    return () => {
      socket.disconnect();
    };
  }, [pathname]);

  return <Toaster position="top-right" />;
}
