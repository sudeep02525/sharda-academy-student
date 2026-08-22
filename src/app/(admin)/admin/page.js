"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "@/admin-components/ConfirmModal";
import StudentProfileView from "@/admin-components/StudentProfileView";
import { io } from "socket.io-client";
import Link from "next/link";
import Sidebar from "@/admin-components/ui/Sidebar";
import Header from "@/admin-components/ui/Header";

// Import management components
import StudentManagement from "@/admin-components/StudentManagement";

import { API_BASE_URL } from "@/utils/config";

const getSidebarIcon = (id, className) => {
  switch (id) {
    case "overview":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      );
    case "students":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      );
    case "admissions":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      );
    case "schedules":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
      );
    case "biometric":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a14.805 14.805 0 0 0 1.586 6.74M15.01 1.777a8.962 8.962 0 0 1 3.74 2.235M8.457 20.278a14.887 14.887 0 0 1-2.715-3.328M11.662 2.011a8.968 8.968 0 0 1 3.2 1.53m-7.817 14.3a14.852 14.852 0 0 1-1.047-3.473M10.5 8.5a1.5 1.5 0 1 1 3 0v4.882c0 .866-.491 1.652-1.258 2.002L10.5 16.5M9 10.5a3 3 0 0 1 6 0v2.882c0 .577.327 1.101.839 1.335l.661.303"
          />
        </svg>
      );
    case "billing":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-19.5 8.25h3m3 0h3m-9-1.5h18a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      );
    case "pendingFees":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      );
    case "manualAttendance":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 2.24A2.25 2.25 0 0 1 7.5 6.108V16.5a2.25 2.25 0 0 0 2.25 2.25h1.5m3 0h3"
          />
        </svg>
      );
    case "homework":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
          />
        </svg>
      );
    case "study":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      );
    case "results":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0a50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 2.25V4.5m0 16.354V22.5"
          />
        </svg>
      );
    case "notices":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
          />
        </svg>
      );
    case "logs":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
          />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      );
  }
};



export default function AdminPortal() {
  const [token, setToken] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // authView: "login" | "forgot_email" | "forgot_otp"
  const [authView, setAuthView] = useState("login");
  // step: 1 = login panel, 3 = dashboard
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Live Toast for Real-time events
  const [liveToast, setLiveToast] = useState(null);

  // Audio helper for notifications
  const playNotificationSound = () => {
    try {
      // Playing a reliable public notification pop sound (Google Actions Library)
      const audio = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");
      audio.volume = 0.8;
      audio.play().catch(e => console.log("Audio play blocked:", e));
    } catch(e) {}
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
  }, []);

  useEffect(() => {
    if (liveToast) {
      const timer = setTimeout(() => setLiveToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [liveToast]);

  useEffect(() => {
    if (!token) return;
    const socket = io(API_BASE_URL);

    socket.on("fee_paid", (fee) => {
      setLiveToast({
        title: "Payment Received",
        message: `₹${fee.amount} paid by Student.`,
        type: "payment"
      });
      
      playNotificationSound();

      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification("Payment Received", {
          body: `₹${fee.amount} paid by Student.`,
          icon: "/logo.png"
        });
      }

      // Silent refresh to update dashboard metrics
      fetchAnalytics(token);
    });

    return () => socket.disconnect();
  }, [token]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Dashboard states
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Sync active tab with URL query parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && step === 3) {
      const url = new URL(window.location);
      url.searchParams.set("tab", activeTab);
      window.history.pushState({}, "", url);
    }
  }, [activeTab, step]);

  const [studentSearch, setStudentSearch] = useState("");
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, feeId: null, remainingBalance: 0, amountPaid: "", error: "" });
  const [viewingStudentProfile, setViewingStudentProfile] = useState(null);

  const getSubjectOptions = (cls, stream) => {
    if (!cls) return [];
    if (cls < 11) {
      return [
        "Mathematics",
        "Science",
        "English",
        "History",
        "Geography",
        "Hindi",
        "Marathi",
      ];
    } else {
      if (stream && stream.includes("Science")) {
        return [
          "Physics",
          "Chemistry",
          "Mathematics",
          "Biology",
          "English",
          "IT",
        ];
      } else if (stream && stream.includes("Commerce")) {
        return [
          "Accountancy",
          "Economics",
          "Business Studies",
          "Mathematics",
          "Secretarial Practice",
          "English",
          "IT",
        ];
      }
      return ["English", "IT"];
    }
  };

  // Collapsible sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setSidebarOpen(true);
    }
  }, []);

  // Simulate biometric punch state
  const [simBiometricId, setSimBiometricId] = useState("RFID-9988-77");
  const [simSuccess, setSimSuccess] = useState("");

  // Custom Confirmation Modal State
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false });

  const promptConfirm = (title, message, onConfirm, type = "danger") => {
    setConfirmConfig({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmConfig({ isOpen: false });
      },
      onCancel: () => setConfirmConfig({ isOpen: false }),
      type,
    });
  };

  // New ERP states
  const [newHomework, setNewHomework] = useState({
    title: "",
    description: "",
    subject: "Physics",
    classLevel: 10,
    batch: "Batch A",
    dueDate: "",
    teacherName: "",
  });

  const [newStudyMaterial, setNewStudyMaterial] = useState({
    title: "",
    description: "",
    subject: "Physics",
    classLevel: 10,
    batch: "All Batches",
    materialType: "Notes",
    pages: "",
    fileSize: "",
  });

  const [newManualAttendance, setNewManualAttendance] = useState({
    studentId: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
    checkInTime: "09:00 AM",
    checkOutTime: "04:00 PM",
  });

  const [newResultCard, setNewResultCard] = useState({
    studentId: "",
    examName: "Unit Test 3",
    marks: [],
  });

  const [newNoticeBroadcast, setNewNoticeBroadcast] = useState({
    title: "",
    content: "",
    category: "General",
    classLevel: 10,
    stream: "",
    targetStudent: "",
  });

  const [fileAttachment, setFileAttachment] = useState({ name: "", data: "" });

  // CRUD Forms
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "student",
    rollNumber: "",
    classLevel: 10,
    batch: "Batch A",
    biometricId: "",
    fatherName: "",
    fatherPhone: "",
    fatherEmail: "",
    motherName: "",
    motherPhone: "",
    motherEmail: "",
    homeAddress: "",
    password: "",
    profilePhoto: "",
    status: "Active",
  });
  const [newUserPhotoFile, setNewUserPhotoFile] = useState(null);
  const [newUserPhotoPreview, setNewUserPhotoPreview] = useState("");

  const [newFee, setNewFee] = useState({
    studentId: "",
    amount: "",
    dueDate: "",
    description: "",
  });
  const [newSchedule, setNewSchedule] = useState({
    classLevel: 10,
    batch: "Batch A",
    subject: "",
    teacherName: "Prof. Sudeep Das",
    day: "Monday",
    startTime: "04:00 PM",
    endTime: "05:30 PM",
    room: "Classroom 101",
  });

  const [idCardSimulating, setIdCardSimulating] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editUserPhotoFile, setEditUserPhotoFile] = useState(null);
  const [editUserPhotoPreview, setEditUserPhotoPreview] = useState("");
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [classFilter, setClassFilter] = useState("all");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = (e) => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        if (e.matches) {
          setDarkMode(true);
          document.documentElement.classList.add("dark");
        } else {
          setDarkMode(false);
          document.documentElement.classList.remove("dark");
        }
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    const isMobile = window.innerWidth < 640;
    const systemDark = mediaQuery.matches;
    const savedTheme = localStorage.getItem("sams-theme");
    const shouldBeDark = isMobile
      ? systemDark
      : savedTheme === "dark" || (!savedTheme && systemDark);

    if (shouldBeDark) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // Auto-dismiss messages and errors after 5 seconds to prevent static alerts
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("sams-theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sams-theme", "dark");
      setDarkMode(true);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    const savedName = localStorage.getItem("admin_name") || "Administrator";
    if (savedToken) {
      setToken(savedToken);
      setAdminName(savedName);
      setStep(3);
      fetchAnalytics(savedToken);
    }
  }, []);

  const fetchAnalytics = async (authToken) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/analytics`, {
        credentials: "include",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setDashboardData(data);
        if (data.usersList && data.usersList.length > 0) {
          const firstStudent = data.usersList.find((u) => u.role === "student");
          if (firstStudent) {
            setNewFee((prev) => ({ ...prev, studentId: firstStudent._id }));
          }
        }
      } else {
        setError(data.message || "Failed to load admin analytics.");
      }
    } catch (err) {
      setError("Failed to connect to Sharda Academy server.");
    } finally {
      setLoading(false);
    }
  };

  // ─── ADMIN LOGIN (Email + Password) ──────────────────────────────────────────
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.user.role !== "admin") {
          setError(
            "Forbidden: This portal is restricted to Admin accounts only.",
          );
          return;
        }
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_name", data.user.name);
        setToken(data.token);
        setAdminName(data.user.name);
        setStep(3);
        fetchAnalytics(data.token);
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("Unable to connect to Sharda Academy server.");
    } finally {
      setLoading(false);
    }
  };

  // ─── FORGOT PASSWORD — Step 1: Request OTP ───────────────────────────────────
  const handleForgotRequest = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthView("forgot_otp");
        setMessage(
          "A 6-digit recovery code has been dispatched to your email. Check backend logs.",
        );
        setResendTimer(60);
      } else {
        setError(data.message || "No admin account found with this email.");
      }
    } catch (err) {
      setError("Connection failed. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // ─── FORGOT PASSWORD — Step 2: Verify OTP + Reset Password ──────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(
          "Password reset successfully! You can now log in with your new password.",
        );
        setAuthView("login");
        setOtp("");
        setNewPassword("");
      } else {
        setError(data.message || "Invalid or expired recovery code.");
      }
    } catch (err) {
      setError("Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    setToken("");
    setAdminName("");
    setStep(1);
    setAuthView("login");
    setEmail("");
    setPassword("");
    setDashboardData(null);
  };

  // Simulate hardware biometric tap event
  const simulateBiometricSync = async () => {
    setError("");
    setSimSuccess("");
    try {
      const res = await fetch(`${API_BASE_URL}/admin/biometric-sync`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          biometricId: simBiometricId,
          deviceId: "Front Entrance Biometric Device",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSimSuccess(
          `Biometric Synced: Registered ${data.type.toUpperCase()} safely! Check terminal logs.`,
        );
        fetchAnalytics(token);
      } else {
        setError(data.message || "Biometric card check failed.");
      }
    } catch (err) {
      setError("Sync failed.");
    }
  };

  // CRUD OPERATIONS
  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(newUser).forEach((key) => {
        if (key === "profilePhoto") return;
        if (newUser[key] !== undefined && newUser[key] !== null) {
          formData.append(key, newUser[key]);
        }
      });

      if (newUserPhotoFile) {
        formData.append("profilePhoto", newUserPhotoFile);
      }

      const res = await fetch(`${API_BASE_URL}/admin/users`, {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage(
          `Successfully registered student profile for ${newUser.name}!`,
        );
        setNewUser({
          name: "",
          email: "",
          phone: "",
          role: "student",
          rollNumber: "",
          classLevel: 10,
          batch: "Batch A",
          biometricId: "",
          parentEmail: "",
          fatherPhone: "",
          homeAddress: "",
          password: "",
          profilePhoto: "",
          status: "Active",
        });
        setNewUserPhotoFile(null);
        setNewUserPhotoPreview("");
        fetchAnalytics(token);
      } else {
        setError(data.message || "Failed to create user.");
      }
    } catch (err) {
      setError("Failed to register student.");
    } finally {
      setLoading(false);
    }
  };

  const createHomework = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/admin/homework`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newHomework,
          attachmentName: fileAttachment.name,
          attachmentData: fileAttachment.data,
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage(
          "Homework assignment uploaded and student email notifications dispatched successfully!",
        );
        setNewHomework({
          title: "",
          description: "",
          subject: "Physics",
          classLevel: 10,
          batch: "Batch A",
          dueDate: "",
          teacherName: "",
        });
        setFileAttachment({ name: "", data: "" });
        fetchAnalytics(token);
      } else {
        setError(resData.message || "Failed to upload homework.");
      }
    } catch (err) {
      setError("Failed to upload homework.");
    } finally {
      setLoading(false);
    }
  };

  const createStudyMaterial = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/study-materials`,
        {
        credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...newStudyMaterial,
            attachmentName: fileAttachment.name,
            attachmentData: fileAttachment.data,
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setMessage("Study material notes uploaded successfully!");
        setNewStudyMaterial({
          title: "",
          description: "",
          subject: "Physics",
          classLevel: 10,
          batch: "All Batches",
          materialType: "Notes",
          pages: "",
          fileSize: "",
        });
        setFileAttachment({ name: "", data: "" });
        fetchAnalytics(token);
      } else {
        setError(data.message || "Failed to upload study material.");
      }
    } catch (err) {
      setError("Failed to upload study material.");
    } finally {
      setLoading(false);
    }
  };

  const markAttendanceManually = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/admin/attendance`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newManualAttendance),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(
          `Manually recorded attendance status for student successfully!`,
        );
        setNewManualAttendance((prev) => ({ ...prev, studentId: "" }));
        fetchAnalytics(token);
      } else {
        setError(data.message || "Failed to mark attendance.");
      }
    } catch (err) {
      setError("Failed to mark attendance.");
    } finally {
      setLoading(false);
    }
  };

  const sendFeeReminder = async (invoiceId) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/fees/remind/${invoiceId}`,
        {
        credentials: "include",
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setMessage(
          "Direct parent & student fee email reminder dispatched successfully!",
        );
        fetchAnalytics(token);
      } else {
        setError(data.message || "Failed to send fee reminder.");
      }
    } catch (err) {
      setError("Failed to send fee reminder.");
    } finally {
      setLoading(false);
    }
  };

  const uploadResultCard = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const student = usersList.find((u) => u._id === newResultCard.studentId);
    if (!student) {
      setError("Please select a student first.");
      setLoading(false);
      return;
    }

    const marksArray = newResultCard.marks.map((m) => ({
      subject: m.subject,
      obtained: parseInt(m.obtained) || 0,
      max: parseInt(m.max) || 100,
      passingMarks: parseInt(m.passingMarks) || 35,
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/admin/results`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          examName: newResultCard.examName,
          classLevel: student.classLevel || 10,
          batch: student.batch || "All Batches",
          results: [
            {
              studentId: newResultCard.studentId,
              marks: marksArray,
            },
          ],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(
          "Student marks scorecard uploaded and email alerts dispatched to parents successfully!",
        );
        setNewResultCard((prev) => ({ ...prev, studentId: "", marks: [] }));
        fetchAnalytics(token);
      } else {
        setError(data.message || "Failed to upload marks results.");
      }
    } catch (err) {
      setError("Failed to upload marks results.");
    } finally {
      setLoading(false);
    }
  };

  const broadcastNotice = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/admin/notices`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNoticeBroadcast),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(
          "Announcement notice bulletin broadcasted and bulk emails dispatched successfully!",
        );
        setNewNoticeBroadcast({ title: "", content: "", category: "General" });
        fetchAnalytics(token);
      } else {
        setError(data.message || "Failed to broadcast notice bulletin.");
      }
    } catch (err) {
      setError("Failed to broadcast notice.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileAttachment({
        name: file.name,
        data: reader.result, // Base64 Data URL
      });
    };
    reader.readAsDataURL(file);
  };

  const deleteUser = (id) => {
    promptConfirm(
      "Delete Student",
      "Are you sure you want to delete this student record?",
      async () => {
        setLoading(true);
        try {
          await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        credentials: "include",
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchAnalytics(token);
        } catch (err) {
          // deleted
        } finally {
          setLoading(false);
        }
      },
    );
  };

  const startEditingStudent = (student) => {
    setEditingStudent({
      _id: student._id,
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      rollNumber: student.rollNumber || "",
      classLevel: student.classLevel || 10,
      batch: student.batch || "Batch A",
      biometricId: student.biometricId || "",
      parentEmail: student.parentEmail || "",
      dob: student.dob || "",
      gender: student.gender || "",
      bloodGroup: student.bloodGroup || "",
      aadhaarNo: student.aadhaarNo || "",
      homeAddress: student.homeAddress || "",
      fatherName: student.fatherName || "",
      fatherPhone: student.fatherPhone || "",
      motherName: student.motherName || "",
      motherPhone: student.motherPhone || "",
      profilePhoto: student.profilePhoto || "",
      status: student.status || "Active",
      password: "",
    });
    setShowEditStudentModal(true);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(editingStudent).forEach((key) => {
        if (key === "profilePhoto") return;
        if (editingStudent[key] !== undefined && editingStudent[key] !== null) {
          formData.append(key, editingStudent[key]);
        }
      });

      if (editUserPhotoFile) {
        formData.append("profilePhoto", editUserPhotoFile);
      } else if (editingStudent.profilePhoto === "") {
        // Explicitly clear photo
        formData.append("profilePhoto", "");
      }

      const res = await fetch(
        `${API_BASE_URL}/admin/users/${editingStudent._id}`,
        {
        credentials: "include",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      const data = await res.json();
      if (data.success) {
        setMessage(
          `Successfully updated student profile for ${editingStudent.name}!`,
        );
        setShowEditStudentModal(false);
        setEditingStudent(null);
        setEditUserPhotoFile(null);
        setEditUserPhotoPreview("");
        fetchAnalytics(token);
      } else {
        setError(data.message || "Failed to update user.");
      }
    } catch (err) {
      setError("Failed to connect to backend for updating student.");
    } finally {
      setLoading(false);
    }
  };

  const issueInvoice = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/fees`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFee),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Tuition invoice issued successfully!");
        setNewFee({
          studentId:
            dashboardData?.usersList?.find((u) => u.role === "student")?._id ||
            "",
          amount: "",
          dueDate: "",
          description: "",
        });
        fetchAnalytics(token);
      }
    } catch (err) {
      // invoice failed
    } finally {
      setLoading(false);
    }
  };

  const markInvoicePaid = (feeId, remainingBalance) => {
    setPaymentModal({ isOpen: true, feeId, remainingBalance, amountPaid: remainingBalance.toString(), error: "" });
  };

  const submitPayment = async () => {
    const amountPaid = Number(paymentModal.amountPaid);
    if (isNaN(amountPaid) || amountPaid <= 0) {
      setPaymentModal(prev => ({ ...prev, error: "Please enter a valid amount." }));
      return;
    }

    const minAllowed = Math.min(4000, paymentModal.remainingBalance);
    if (amountPaid < minAllowed) {
      setPaymentModal(prev => ({ ...prev, error: `Minimum partial payment allowed is ₹${minAllowed.toLocaleString()}` }));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/fees/${paymentModal.feeId}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amountPaid: amountPaid,
          paymentMethod: "Admin Desk Cashier",
        }),
      });
      
      const data = await res.json();
      if (!res.ok || !data.success) {
        setPaymentModal(prev => ({ ...prev, error: data.message || "Payment update failed." }));
        return;
      }
      
      await fetchAnalytics(token);
      setPaymentModal({ isOpen: false, feeId: null, remainingBalance: 0, amountPaid: "", error: "" });
      setLiveToast({ title: "Collection Successful", message: `₹${amountPaid} was recorded successfully!` });
    } catch (err) {
      setPaymentModal(prev => ({ ...prev, error: "Payment failed to process." }));
    } finally {
      setLoading(false);
    }
  };

  const scheduleRoutine = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/timetables`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSchedule),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Routine class scheduled successfully!");
        setNewSchedule({
          classLevel: 10,
          batch: "Batch A",
          subject: "",
          teacherName: "Prof. Sudeep Das",
          day: "Monday",
          startTime: "04:00 PM",
          endTime: "05:30 PM",
          room: "Classroom 101",
        });
        fetchAnalytics(token);
      }
    } catch (err) {
      // schedule failed
    } finally {
      setLoading(false);
    }
  };

  const approveInquiry = async (id, status) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/admissions/${id}`,
        {
        credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setMessage(`Inquiry marked as ${status}!`);
        fetchAnalytics(token);
      }
    } catch (err) {
      // inquiry failed
    } finally {
      setLoading(false);
    }
  };

  // Simulating CSV ledger report downloads
  const simulateExportCSV = () => {
    alert(
      "System exporting complete student records to System-Ledger.csv... Check your browser downloads folder!",
    );
  };

  const printIDCard = (student) => {
    setIdCardSimulating(student);
  };

  const triggerBrowserPrintID = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Student ID Card - ${idCardSimulating.name}</title>
          <style>
            body { font-family: 'Inter', system-ui, -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #faf9f6; }
            .card { width: 330px; height: 480px; border: 4px solid #0a1835; border-radius: 16px; padding: 20px; text-align: center; box-shadow: 0 4px 15px rgba(10,24,53,0.1); position: relative; background: #ffffff; }
            .header { border-bottom: 3px solid #f1af3c; padding-bottom: 10px; margin-bottom: 20px; }
            .header h2 { color: #0a1835; margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 1px; }
            .header p { margin: 2px 0; font-size: 10px; color: #dc2626; font-weight: bold; letter-spacing: 2px; }
            .avatar { border-radius: 50%; background: #0a1835; color: white; display: flex; justify-content: center; align-items: center; font-size: 32px; font-weight: bold; margin: 0 auto 20px; width: 90px; height: 90px; border: 2px solid #f1af3c; }
            .name { font-size: 18px; font-weight: 800; color: #0a1835; margin: 0 0 10px 0; }
            .details { font-size: 12px; color: #0f1a30; margin-bottom: 5px; text-align: left; background: #faf9f6; padding: 10px; border-radius: 8px; border: 1px solid rgba(10,24,53,0.06); }
            .details p { margin: 4px 0; }
            .barcode { font-family: monospace; font-size: 10px; margin-top: 30px; border-top: 1px solid rgba(10,24,53,0.1); padding-top: 10px; color: #888; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2>SHARDA ACADEMY</h2>
              <p>MANKHURD - 43</p>
            </div>
            <div class="avatar">${idCardSimulating.name[0].toUpperCase()}</div>
            <h3 class="name">${idCardSimulating.name}</h3>
            
            <div class="details">
              <p><strong>Roll Number:</strong> ${idCardSimulating.rollNumber}</p>
              <p><strong>Class Level:</strong> Standard ${idCardSimulating.classLevel}</p>
              <p><strong>Stream:</strong> ${idCardSimulating.stream || "N/A"}</p>
              <p><strong>Biometric Card:</strong> ${idCardSimulating.biometricId || "RFID-9988-77"}</p>
            </div>

            <div class="barcode">
              ||||| | ||||| || ||| | ||| ||||<br>
              RFID-CARD-AUTHENTICATED
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Render Login / Forgot Password Panels
  if (step < 3) {
    return (
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[var(--background)] dotbg noise overflow-x-hidden relative">
        {/* Theme Toggle on Login Screen */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
          <button onClick={toggleTheme} className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0a1835]/50 backdrop-blur-md text-slate-600 dark:text-brand-gold cursor-pointer transition-all hover:scale-105 shadow-sm">
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m9.75-9h-2.25M4.95 19.05l1.59-1.59m11.92-11.92l1.59-1.59M3.52 12h2.25m11.92 7.05l-1.59-1.59M4.95 4.95l1.59 1.59M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" /></svg>
            )}
          </button>
        </div>

        {/* 🎨 Left Panel: High-End Showcase (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-6 bg-[#060f22] text-white flex-col justify-between p-12 relative overflow-hidden border-r border-white/5">
          {/* Slow-rotating background glow */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-gold/10 to-amber-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"></div>
          <div className="absolute -bottom-40 -right-40 w-[650px] h-[650px] bg-gradient-to-tr from-navy/30 to-gold/5 rounded-full blur-[160px] pointer-events-none"></div>

          {/* Top Branding - Kept original main logo */}
          <div className="flex items-center gap-3 relative z-10">
            <img
              src="/logo.png"
              alt="Sharda Academy Logo"
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="text-left">
              <div className="text-lg font-black text-gold tracking-widest uppercase leading-none">
                SHARDA ACADEMY
              </div>
              <span className="text-[9px] font-bold text-slate-450 tracking-widest uppercase leading-none mt-1.5 block">
                Master ERP Platform
              </span>
            </div>
          </div>

          {/* Central Showcase Content */}
          <div className="my-auto space-y-8 relative z-10 max-w-lg text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-lg inline-block">
                Admin Portal
              </span>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white font-display">
                Command and Control the{" "}
                <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
                  Entire Academy
                </span>{" "}
                System
              </h1>
              <p className="text-xs text-slate-200/90 leading-relaxed font-semibold">
                Welcome to the central administrative hub of Sharda Academy.
                Securely manage student records, monitor real-time biometric
                attendance, process tuition fees, coordinate exam results, and
                dispatch instant notifications across the entire institution.
              </p>
            </div>

            {/* Frosted Showcase Highlight Panel */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-4">
              <div className="text-xs font-black uppercase tracking-wider text-gold">
                Master Control Panels:
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <svg
                    className="w-5 h-5 text-gold mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.947 11.947 0 0112 20c-3.167 0-6.079-1.225-8.258-3.236m12.258-2.636a6 6 0 11-12.258 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 2.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                  <div>
                    <div className="font-bold text-white text-[11px]">
                      User Registration
                    </div>
                    <p className="text-[10px] text-slate-200/70 mt-0.5">
                      Enrolls student profiles and logins
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg
                    className="w-5 h-5 text-gold mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  <div>
                    <div className="font-bold text-white text-[11px]">
                      System Analytics
                    </div>
                    <p className="text-[10px] text-slate-200/70 mt-0.5">
                      Overview of billing & tap logs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg
                    className="w-5 h-5 text-gold mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5zM3 10.5h18"
                    />
                  </svg>
                  <div>
                    <div className="font-bold text-white text-[11px]">
                      Ledger Management
                    </div>
                    <p className="text-[10px] text-slate-200/70 mt-0.5">
                      Tuition invoices & cashier counters
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg
                    className="w-5 h-5 text-gold mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                    />
                  </svg>
                  <div>
                    <div className="font-bold text-white text-[11px]">
                      Broadcast Bulletins
                    </div>
                    <p className="text-[10px] text-slate-200/70 mt-0.5">
                      Sends automated email/SMS notices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Brand Label removed */}
          <div className="h-0 relative z-10 pointer-events-none"></div>
        </div>

        {/* 📝 Right Panel: Sign-in Section */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
          {/* Mobile Header Branding - Kept original main logo */}
          <div className="flex flex-col items-center mb-6 text-center lg:hidden">
            <img
              src="/logo.png"
              alt="Sharda Academy Logo"
              className="w-14 h-14 mb-2"
              onError={(e) => {
                e.target.style.display = "none";
              }}
              style={{ objectFit: "contain" }}
            />
            <h2 className="text-lg font-black text-navy uppercase tracking-tight">
              SHARDA ACADEMY
            </h2>
            <p className="text-[9px] font-bold text-gold uppercase tracking-widest">
              Master Admin Portal
            </p>
          </div>

          {/* Unified White Card with Gold highlight */}
          <div className="w-full max-w-[448px] p-8 rounded-2xl bg-white border border-gold/30 shadow-2xl space-y-6">
            {/* Alert banners */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 animate-pulse w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-gold/30 text-xs font-semibold text-gold-dark w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span>{message}</span>
              </div>
            )}

            {/* ── LOGIN VIEW: Email + Password ──────────────────────── */}
            {authView === "login" && (
              <form
                onSubmit={handleAdminLogin}
                className="space-y-4 text-xs animate-fade-in-up"
              >
                <div className="text-center pb-2 border-b border-slate-100">
                  <div className="text-sm font-black uppercase tracking-wider text-navy">
                    Secure Admin Sign In
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                    Master Admin Access Only
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 focus:outline-none select-none cursor-pointer"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815 3 3m-3-3a8.2 8.2 0 0 1-4.59 1.59M12.013 9.014a3 3 0 1 0 4.28 4.28"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-xs font-extrabold text-[#0a1835] bg-[#f1af3c] hover:bg-amber-400 shadow-md shadow-[#f1af3c]/20 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer mt-2"
                >
                  {loading ? "AUTHENTICATING..." : "SIGN IN TO PORTAL"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthView("forgot_email");
                    setError("");
                    setMessage("");
                  }}
                  className="block w-full text-center text-[10px] font-bold text-slate-500 hover:text-[#0a1835] uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                >
                  Forgot Password?
                </button>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href="/"
                    className="block w-full text-center text-[10px] font-black text-[#f1af3c] hover:text-amber-500 uppercase tracking-widest transition-colors duration-200"
                  >
                    Student Portal Login →
                  </a>
                </div>
              </form>
            )}

            {/* ── FORGOT: Step 1 — Enter Email ──────────────────────── */}
            {authView === "forgot_email" && (
              <form
                onSubmit={handleForgotRequest}
                className="space-y-4 text-xs animate-fade-in-up"
              >
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-wider text-navy">
                    Password Recovery
                  </h3>
                  <p className="text-xs font-bold text-slate-455 mt-1 uppercase tracking-widest">
                    Enter your registered admin email
                  </p>
                </div>

                <div className="text-left">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-xs font-extrabold text-[#0a1835] bg-[#f1af3c] hover:bg-amber-400 shadow-md shadow-[#f1af3c]/20 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer mt-2"
                >
                  {loading ? "SENDING CODE..." : "SEND RECOVERY CODE"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthView("login");
                    setError("");
                    setMessage("");
                  }}
                  className="block w-full text-center text-xs font-bold text-slate-500 hover:text-[#0a1835] uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </form>
            )}

            {/* ── FORGOT: Step 2 — OTP + New Password ──────────────── */}
            {authView === "forgot_otp" && (
              <form
                onSubmit={handleResetPassword}
                className="space-y-4 text-xs animate-fade-in-up"
              >
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-wider text-navy">
                    Reset Password
                  </h3>
                  <p className="text-xs font-bold text-slate-455 mt-1 uppercase tracking-widest">
                    Enter the 6-digit email recovery code
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      6-Digit Email OTP
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="— — — — — —"
                      className="w-full px-4 py-2.5 text-center font-mono text-lg tracking-widest rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Create new secure password"
                        className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 focus:outline-none select-none cursor-pointer"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815 3 3m-3-3a8.2 8.2 0 0 1-4.59 1.59M12.013 9.014a3 3 0 1 0 4.28 4.28"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer mt-2"
                >
                  {loading ? "RESETTING..." : "RESET & SIGN IN"}
                </button>

                <div className="flex flex-col space-y-3 pt-2">
                  <button
                    type="button"
                    disabled={loading || resendTimer > 0}
                    onClick={() => handleForgotRequest()}
                    className={`block w-full text-center text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${resendTimer > 0 ? "text-slate-400 cursor-not-allowed" : "text-amber-600 hover:text-amber-700 cursor-pointer"}`}
                  >
                    {resendTimer > 0
                      ? `Resend OTP (${resendTimer}s)`
                      : "Resend OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthView("login");
                      setError("");
                      setMessage("");
                      setOtp("");
                      setNewPassword("");
                    }}
                    className="block w-full text-center text-[10px] font-bold text-slate-500 hover:text-[#0a1835] uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  const {
    metrics = {},
    syncLogs = [],
    usersList = [],
    feesList = [],
    inquiriesList = [],
    activityLogs = [],
  } = dashboardData || {};

  return (
    <div className="min-h-screen bg-brand-beige text-[var(--text-primary)] flex flex-col md:flex-row noise dotbg relative">
      {/* Mobile Sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* 🖥️ Collapsible Sidebar for Admin ERP */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        title="SHARDA ACADEMY"
        subtitle="Portal Online"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={[
          { id: "overview", label: "Analytics Overview" },
          { id: "students", label: "Students CRUD" },
          { id: "manualAttendance", label: "Manual Attendance" },
          { id: "homework", label: "Homework Upload" },
          { id: "study", label: "Study Materials" },
          { id: "billing", label: "Tuition Fees" },
          { id: "results", label: "Results & Marks" },
          { id: "notices", label: "Notice Broadcast" },
          { id: "schedules", label: "Class Schedules" },
          { id: "logs", label: "Audit Activity Logs" },
        ]}
        getIcon={getSidebarIcon}
        userName={adminName || "ADMINISTRATOR"}
        userRole="Academy Admin"
        onLogout={handleLogout}
      />

      {/* Main Panel Content Area */}
      <div className="flex-grow flex flex-col min-w-0 w-full">
        <Header
          setSidebarOpen={setSidebarOpen}
          title={
            activeTab === "overview"
              ? "OVERVIEW"
              : activeTab === "students"
                ? "STUDENTS CRUD"
                : activeTab === "billing"
                  ? "TUITION FEES"
                  : activeTab === "schedules"
                    ? "CLASS SCHEDULES"
                    : activeTab === "logs"
                      ? "AUDIT ACTIVITY LOGS"
                      : activeTab.toUpperCase()
          }
          toggleTheme={toggleTheme}
          darkMode={darkMode}
          showThemeToggle={true}
        />

        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6 flex-grow">
          {error && (
            <div className="p-3.5 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-2.5 shadow-sm animate-pulse w-full">
              <div className="flex items-center gap-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="w-4 h-4 text-red-600 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError("")}
                className="p-1 rounded-lg hover:bg-red-100 text-red-600 transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Dismiss Error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          {message && (
            <div className="p-3.5 text-xs font-semibold text-brand-blue bg-brand-yellow-light border border-brand-yellow/30 rounded-xl flex items-center justify-between gap-2.5 shadow-sm w-full">
              <div className="flex items-center gap-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-brand-yellow-dark flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>{message}</span>
              </div>
              <button
                onClick={() => setMessage("")}
                className="p-1 rounded-lg hover:bg-amber-100 text-brand-yellow-dark transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Dismiss Message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          {viewingStudentProfile ? (
            <StudentProfileView 
              student={viewingStudentProfile} 
              feesList={dashboardData?.feesList || []}
              onClose={() => setViewingStudentProfile(null)} 
            />
          ) : (
            <>
          {/* ========================================================
              TAB CONTENT: OVERVIEW
              ======================================================== */}
          {activeTab === "overview" &&
            (() => {
              const students = usersList.filter((u) => u.role === "student");
              const unpaidFees = feesList.filter((f) => f.status === "Unpaid");
              const paidFees = feesList.filter((f) => f.status === "Paid");
              const recentActivity = activityLogs.slice(0, 6);
              const recentStudents = students.slice(0, 5);
              const recentInquiries = inquiriesList.slice(0, 4);
              const totalUnpaid = unpaidFees.reduce(
                (sum, f) => sum + (f.amount || 0),
                0,
              );

              return (
                <div className="space-y-6">
                  {/* ── Row 1: 3 KPI cards ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      {
                        label: "Total Students",
                        value: metrics.students || students.length,
                        sub: "Active Learners",
                        color: "#0c46c4",
                        bg: "#dbeafe",
                        icon: "students",
                      },
                      {
                        label: "Paid Invoices",
                        value: `₹${metrics.paidFees || 0}`,
                        sub: "Consolidated",
                        color: "#d97706",
                        bg: "#fef3c7",
                        icon: "billing",
                      },
                      {
                        label: "Pending Fees",
                        value: `₹${totalUnpaid}`,
                        sub: `${unpaidFees.length} invoices`,
                        color: "#dc2626",
                        bg: "#fee2e2",
                        icon: "billing",
                      },
                    ].map((card, i) => (
                      <div
                        key={i}
                        className="p-4 bg-white rounded-2xl shadow-sm border border-brand-blue/6 hover-glow transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: card.bg,
                              color: card.color,
                            }}
                          >
                            {getSidebarIcon(card.icon, "w-4.5 h-4.5")}
                          </div>
                        </div>
                        <div
                          className="text-xl font-black tracking-tight"
                          style={{ color: card.color }}
                        >
                          {card.value}
                        </div>
                        <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 mt-0.5">
                          {card.label}
                        </p>
                        <p
                          className="text-[8px] font-semibold mt-0.5"
                          style={{ color: card.color + "aa" }}
                        >
                          {card.sub}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* ── Row 2: Quick Actions ── */}
                  <div className="bg-white rounded-2xl shadow-sm border border-brand-blue/6 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100">
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                        Quick Actions
                      </h4>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                        Jump to any section instantly
                      </p>
                    </div>
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {[
                        {
                          label: "Add Student",
                          tab: "students",
                          bg: "bg-blue-50",
                          text: "text-[#0c46c4]",
                          border: "border-blue-200",
                          icon: "students",
                        },
                        {
                          label: "Mark Attendance",
                          tab: "manualAttendance",
                          bg: "bg-green-50",
                          text: "text-emerald-700",
                          border: "border-green-200",
                          icon: "manualAttendance",
                        },
                        {
                          label: "Upload Homework",
                          tab: "homework",
                          bg: "bg-amber-50",
                          text: "text-amber-700",
                          border: "border-amber-200",
                          icon: "homework",
                        },
                        {
                          label: "Add Fee",
                          tab: "billing",
                          bg: "bg-yellow-50",
                          text: "text-[#d97706]",
                          border: "border-yellow-200",
                          icon: "billing",
                        },
                        {
                          label: "Post Notice",
                          tab: "notices",
                          bg: "bg-purple-50",
                          text: "text-purple-700",
                          border: "border-purple-200",
                          icon: "notices",
                        },
                        {
                          label: "View Results",
                          tab: "results",
                          bg: "bg-red-50",
                          text: "text-[#dc2626]",
                          border: "border-red-200",
                          icon: "results",
                        },
                      ].map((a, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTab(a.tab)}
                          className={`p-3 rounded-xl border ${a.bg} ${a.border} ${a.text} flex items-center gap-2.5 text-left cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg bg-white/70 flex items-center justify-center flex-shrink-0`}
                          >
                            {getSidebarIcon(a.icon, "w-4 h-4")}
                          </div>
                          <span className="text-[9px] font-extrabold uppercase tracking-wider leading-tight">
                            {a.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── Row 3: Recent Activity Log + Pending Fees ── */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-brand-blue/6 overflow-hidden">
                      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                            Recent Activity
                          </h4>
                          <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                            Latest system events
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveTab("logs")}
                          className="text-[9px] font-extrabold uppercase tracking-wider text-[#0c46c4] hover:underline cursor-pointer"
                        >
                          View All →
                        </button>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {recentActivity.length === 0 ? (
                          <div className="px-5 py-8 text-center text-[10px] text-slate-400 font-semibold">
                            No activity logged yet.
                          </div>
                        ) : (
                          recentActivity.map((log, i) => (
                            <div
                              key={log._id || i}
                              className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50/60 transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-[#0a1835]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                                {getSidebarIcon(
                                  "logs",
                                  "w-3.5 h-3.5 text-[#0a1835]",
                                )}
                              </div>
                              <div className="flex-grow min-w-0">
                                <p className="text-[10px] font-bold text-[#0a1835] truncate">
                                  {log.action || log.message || "System Event"}
                                </p>
                                <p className="text-[8.5px] text-slate-400 font-semibold truncate mt-0.5">
                                  {log.adminName || log.user || "Admin"} •{" "}
                                  {log.timestamp
                                    ? new Date(log.timestamp).toLocaleString(
                                        "en-IN",
                                        {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        },
                                      )
                                    : "—"}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Pending Fee Invoices */}
                    <div className="bg-white rounded-2xl shadow-sm border border-brand-blue/6 overflow-hidden">
                      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                            Pending Fees
                          </h4>
                          <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                            {unpaidFees.length} unpaid invoices · ₹{totalUnpaid}{" "}
                            due
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveTab("billing")}
                          className="text-[9px] font-extrabold uppercase tracking-wider text-[#d97706] hover:underline cursor-pointer"
                        >
                          Manage →
                        </button>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {unpaidFees.length === 0 ? (
                          <div className="px-5 py-8 text-center flex flex-col items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-250 flex items-center justify-center mb-2 text-emerald-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            </div>
                            <p className="text-[10px] text-emerald-600 font-bold">
                              All fees cleared!
                            </p>
                            <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                              No pending invoices at this time.
                            </p>
                          </div>
                        ) : (
                          unpaidFees.slice(0, 5).map((fee, i) => {
                            const student = usersList.find(
                              (u) =>
                                u._id === fee.studentId ||
                                u._id === fee.studentId?._id,
                            );
                            return (
                              <div
                                key={fee._id || i}
                                className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50/60 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center font-black text-xs text-red-700 flex-shrink-0">
                                  {student?.name?.[0]?.toUpperCase() || "S"}
                                </div>
                                <div className="flex-grow min-w-0">
                                  <p className="text-[10px] font-bold text-[#0a1835] truncate">
                                    {student?.name || "Student"}
                                  </p>
                                  <p className="text-[9px] text-slate-400 font-semibold truncate">
                                    {fee.description || "Fee Invoice"} • Due{" "}
                                    {fee.dueDate
                                      ? new Date(
                                          fee.dueDate,
                                        ).toLocaleDateString("en-IN")
                                      : "—"}
                                  </p>
                                </div>
                                <span className="text-[10px] font-black text-[#dc2626] flex-shrink-0">
                                  ₹{fee.amount}
                                </span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          {/* ========================================================
              TAB CONTENT: STUDENTS CRUD & ID CARDS
              ======================================================== */}
          {activeTab === "students" &&
            (() => {
              const students = usersList
                .filter((u) => u.role === "student")
                .filter((student) => {
                  if (!studentSearch) return true;
                  const searchStr = studentSearch.toLowerCase();
                  return (
                    student.name?.toLowerCase().includes(searchStr) ||
                    student.email?.toLowerCase().includes(searchStr) ||
                    student.rollNumber?.toLowerCase().includes(searchStr)
                  );
                });
              const classLevels = [
                ...new Set(students.map((s) => Number(s.classLevel) || 10)),
              ].sort((a, b) => a - b);
              const filteredLevels =
                classFilter === "all"
                  ? classLevels
                  : classLevels.filter((c) => c === parseInt(classFilter));

              return (
                <div className="space-y-5">
                  {/* Header with Add Student Button */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-[#0a1835]">
                        Student Directory
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                        {students.length} registered students across{" "}
                        {classLevels.length} classes
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddStudentModal(true)}
                      className="px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0a1835] bg-brand-yellow hover:bg-amber-400 rounded-xl shadow-md shadow-brand-yellow/20 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <span>Add Student</span>
                    </button>
                  </div>

                  {/* Class Filter Pills & Search */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      <button
                        onClick={() => setClassFilter("all")}
                        className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                          classFilter === "all"
                            ? "bg-[#0a1835] text-white border-[#0a1835] shadow-md"
                            : "bg-white text-slate-500 border-slate-200 hover:border-[#0a1835] hover:text-[#0a1835]"
                        }`}
                      >
                        All ({students.length})
                      </button>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => {
                        const count = students.filter(
                          (s) => (Number(s.classLevel) || 10) === cls,
                        ).length;
                        if (count === 0) return null;
                        return (
                          <button
                            key={cls}
                            onClick={() => setClassFilter(String(cls))}
                            className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                              classFilter === String(cls)
                                ? "bg-[#0a1835] text-white border-[#0a1835] shadow-md"
                                : "bg-white text-slate-500 border-slate-200 hover:border-[#0a1835] hover:text-[#0a1835]"
                            }`}
                          >
                            Std {cls} ({count})
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5 w-full sm:w-64 bg-white/50 shadow-sm flex-shrink-0 mb-3 sm:mb-0">
                      <svg
                        className="w-3.5 h-3.5 text-slate-400 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search by name, email, or roll no..."
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        className="bg-transparent border-none text-[10px] w-full focus:outline-none focus:ring-0 focus:border-transparent placeholder-slate-400 text-slate-700 font-medium"
                      />
                    </div>
                  </div>

                  {/* Class-wise Grouped Sections */}
                  {filteredLevels.map((cls) => {
                    const classStudents = students.filter(
                      (s) => (Number(s.classLevel) || 10) === cls,
                    );
                    const isFoundation = cls <= 5;
                    const isMiddle = cls > 5 && cls <= 8;
                    const sectionColor = isFoundation
                      ? "#d97706"
                      : isMiddle
                        ? "#0c46c4"
                        : "#dc2626";
                    const sectionBg = isFoundation
                      ? "bg-amber-50"
                      : isMiddle
                        ? "bg-blue-50"
                        : "bg-red-50";
                    const avatarBg = isFoundation
                      ? "bg-amber-500"
                      : isMiddle
                        ? "bg-[#0c46c4]"
                        : "bg-[#0a1835]";
                    const classBadge = isFoundation
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : isMiddle
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-red-50 text-red-700 border-red-200";
                    const wingName = isFoundation
                      ? "Foundation Wing"
                      : isMiddle
                        ? "Middle Wing"
                        : "Senior Wing";

                    return (
                      <div
                        key={cls}
                        className="bg-white dark:bg-[#0c1830] border border-brand-blue/6 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden"
                      >
                        {/* Section Header */}
                        <div
                          className={`px-5 py-3.5 ${sectionBg} dark:bg-white/5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm shadow-sm"
                              style={{ backgroundColor: sectionColor }}
                            >
                              {cls}
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#0a1835] dark:text-white uppercase tracking-wider">
                                Standard {cls}
                              </h4>
                              <p
                                className="text-[9px] font-semibold mt-0.5"
                                style={{ color: sectionColor }}
                              >
                                {wingName} • {classStudents.length} student
                                {classStudents.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Students in this class */}
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                          {classStudents.map((student) => {
                            const initial = student.name
                              ? student.name[0].toUpperCase()
                              : "S";
                            return (
                              <div
                                key={student._id}
                                onClick={() => setViewingStudentProfile(student)}
                                className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                              >
                                {/* Card Top Bar */}
                                <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                                  <div className="flex items-center gap-4 flex-grow min-w-0">
                                    <div
                                      className={`w-10 h-10 rounded-full ${avatarBg} text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm`}
                                    >
                                      {initial}
                                    </div>
                                    <div className="flex-grow min-w-0 text-left">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h5 className="text-[13px] font-black text-slate-900 truncate max-w-[140px] sm:max-w-none">
                                          {student.name}
                                        </h5>
                                        <span
                                          className={`px-2 py-0.5 rounded-md border text-[8px] font-extrabold uppercase tracking-wider ${classBadge}`}
                                        >
                                          Std {cls}
                                        </span>
                                        {student.stream ? (
                                          <span className="px-2 py-0.5 rounded-md border border-slate-200 text-slate-900 text-[8px] font-bold">
                                            {student.stream}{" "}
                                            {student.subjects
                                              ? `(${student.subjects})`
                                              : ""}
                                          </span>
                                        ) : null}
                                      </div>
                                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 font-mono">
                                        Roll: {student.rollNumber || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 flex-wrap mt-2 sm:mt-0 justify-start sm:justify-end flex-shrink-0">
                                    <button
                                      onClick={() =>
                                        startEditingStudent(student)
                                      }
                                      className="px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-900 rounded-lg border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                      ✏️ EDIT
                                    </button>
                                    <button
                                      onClick={() => printIDCard(student)}
                                      className="px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-900 rounded-lg border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.2}
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-1.2 6.477a6 6 0 0 0-5.1 0A2.25 2.25 0 0 0 3 18.062v.188c0 .245.02.49.06.732a1.492 1.492 0 0 0 1.378 1.12h7.624a1.492 1.492 0 0 0 1.378-1.12c.04-.242.06-.487.06-.732v-.188a2.25 2.25 0 0 0-1.238-2.028Z"
                                        />
                                      </svg>
                                      ID CARD
                                    </button>
                                    <button
                                      onClick={() => deleteUser(student._id)}
                                      className="px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg border border-red-200 dark:border-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.2}
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                      DELETE
                                    </button>
                                  </div>
                                </div>
                                {/* Detail Row */}
                                <div className="px-5 py-2.5 bg-slate-50 grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-slate-100">
                                  <div className="text-left">
                                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                      Email
                                    </p>
                                    <p className="text-[10px] font-semibold text-slate-900 truncate">
                                      {student.email}
                                    </p>
                                  </div>
                                  <div className="text-left">
                                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                      Phone
                                    </p>
                                    <p className="text-[10px] font-semibold text-slate-900">
                                      {student.phone || "N/A"}
                                    </p>
                                  </div>
                                  <div className="text-left">
                                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                      Parent Email
                                    </p>
                                    <p className="text-[10px] font-semibold text-slate-900 truncate">
                                      {student.parentEmail || "Not Registered"}
                                    </p>
                                  </div>
                                  <div className="text-left">
                                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                      RFID Biometric
                                    </p>
                                    <p className="text-[10px] font-mono font-bold text-emerald-600 flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                      {student.biometricId || "RFID-9988-77"}
                                    </p>
                                  </div>
                                </div>
                                {/* Additional Details Row */}
                                <div className="px-5 py-2.5 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
                                  <div className="text-left">
                                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                      Parent Mobile / Contact
                                    </p>
                                    <p className="text-[10px] font-semibold text-slate-900">
                                      {student.fatherPhone ||
                                        student.motherPhone ||
                                        "N/A"}
                                    </p>
                                  </div>
                                  <div className="text-left col-span-1">
                                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                      Home Address (Optional)
                                    </p>
                                    <p
                                      className="text-[10px] font-semibold text-slate-900 truncate"
                                      title={student.homeAddress}
                                    >
                                      {student.homeAddress || "N/A"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {students.length === 0 && (
                    <div className="py-16 text-center bg-white rounded-2xl border border-brand-blue/6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-slate-300 mx-auto mb-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                      </svg>
                      <p className="text-xs font-bold text-slate-400">
                        No students registered yet
                      </p>
                      <p className="text-[10px] text-slate-300 mt-1">
                        Click "+ Add Student" to register your first student
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

          {/* ========================================================
              </h4>
              {inquiriesList.map((inq) => (
                <div
                  key={inq._id}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Class Level: Std {inq.classLevel}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                        inq.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : inq.status === "Contacted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900">
                      Candidate: {inq.name}
                    </p>
                    <p className="text-slate-500">Parent: {inq.parentName}</p>
                    <p className="text-slate-500">
                      Phone: {inq.phone} | Email: {inq.email}
                    </p>
                  </div>

                  {inq.status === "Pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveInquiry(inq._id, "Approved")}
                        className="flex-grow py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <span>APPROVE APPLICATION</span>
                      </button>
                      <button
                        onClick={() => approveInquiry(inq._id, "Contacted")}
                        className="py-2 px-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.2}
                          stroke="currentColor"
                          className="w-3.5 h-3.5 text-slate-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.514 2.022a12.083 12.083 0 0 1-6.173-6.173L9.75 12c.362-.27.527-.732.417-1.173L9.06 6.405a1.022 1.022 0 0 0-1.091-.852H6.75A2.25 2.25 0 0 0 4.5 8.125V6.75Z"
                          />
                        </svg>
                        <span>MARK CONTACTED</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}



          {/* ========================================================
              TAB CONTENT: TUITION FEES
              ======================================================== */}
          {activeTab === "billing" &&
            (() => {
              const students = usersList.filter((u) => u.role === "student");
              const feesWithClass = feesList.map((fee) => {
                const student = students.find(
                  (s) =>
                    s._id === fee.studentId?._id || s._id === fee.studentId,
                );
                return {
                  ...fee,
                  classLevel:
                    student?.classLevel || fee.studentId?.classLevel || 10,
                };
              });
              const feeClassLevels = [
                ...new Set(feesWithClass.map((f) => f.classLevel)),
              ].sort((a, b) => a - b);

              return (
                <div className="space-y-6">
                  {/* Issue Invoice Form */}
                  <div className="p-5 bg-white border border-brand-blue/6 rounded-2xl shadow-sm">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835] mb-4">
                      Issue Tuition Invoice
                    </h4>
                    <form
                      onSubmit={issueInvoice}
                      className="space-y-3 text-[11px]"
                    >
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Select Student
                        </label>
                        <select
                          value={newFee.studentId}
                          onChange={(e) =>
                            setNewFee({ ...newFee, studentId: e.target.value })
                          }
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-brand-text-navy focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all cursor-pointer"
                        >
                          {[
                            ...new Set(
                              students.map((s) => Number(s.classLevel) || 10),
                            ),
                          ]
                            .sort((a, b) => a - b)
                            .map((cls) => (
                              <optgroup key={cls} label={`Standard ${cls}`}>
                                {students
                                  .filter(
                                    (s) => (Number(s.classLevel) || 10) === cls,
                                  )
                                  .map((s) => (
                                    <option key={s._id} value={s._id}>
                                      {s.name} (Roll: {s.rollNumber})
                                    </option>
                                  ))}
                              </optgroup>
                            ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          required
                          placeholder="Fee Amount (₹)"
                          value={newFee.amount}
                          onChange={(e) =>
                            setNewFee({
                              ...newFee,
                              amount: parseInt(e.target.value),
                            })
                          }
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-brand-text-navy placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                        />
                        <input
                          type="date"
                          required
                          value={newFee.dueDate}
                          onChange={(e) =>
                            setNewFee({ ...newFee, dueDate: e.target.value })
                          }
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-brand-text-navy placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Description (e.g. Term 1 Coaching Fee)"
                        value={newFee.description}
                        onChange={(e) =>
                          setNewFee({ ...newFee, description: e.target.value })
                        }
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-brand-text-navy placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow shadow-brand-yellow/15 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                      >
                        ISSUE INVOICE BILL
                      </button>
                    </form>
                  </div>

                  {/* Class-wise Fee Sections */}
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider text-[#0a1835] mb-4">
                      Fee Ledger by Class
                    </h4>

                    <div className="space-y-4">
                      {feeClassLevels.map((cls) => {
                        const classFees = feesWithClass.filter(
                          (f) => f.classLevel === cls,
                        );
                        const totalAmount = classFees.reduce(
                          (sum, f) => sum + (f.amount || 0),
                          0,
                        );
                        const paidCount = classFees.filter(
                          (f) => f.status === "Paid",
                        ).length;
                        const unpaidCount = classFees.filter(
                          (f) => f.status !== "Paid",
                        ).length;
                        const isFoundation = cls <= 5;
                        const isMiddle = cls > 5 && cls <= 8;
                        const sectionColor = isFoundation
                          ? "#d97706"
                          : isMiddle
                            ? "#0c46c4"
                            : "#dc2626";
                        const sectionBg = isFoundation
                          ? "bg-amber-50"
                          : isMiddle
                            ? "bg-blue-50"
                            : "bg-red-50";

                        return (
                          <div
                            key={cls}
                            className="bg-white border border-brand-blue/6 rounded-2xl shadow-sm overflow-hidden"
                          >
                            {/* Section Header */}
                            <div
                              className={`px-5 py-3.5 ${sectionBg} border-b border-slate-100 flex items-center justify-between`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm shadow-sm"
                                  style={{ backgroundColor: sectionColor }}
                                >
                                  {cls}
                                </div>
                                <div>
                                  <h4 className="text-xs font-black text-[#0a1835] uppercase tracking-wider">
                                    Standard {cls} Fees
                                  </h4>
                                  <p
                                    className="text-[9px] font-semibold mt-0.5"
                                    style={{ color: sectionColor }}
                                  >
                                    {classFees.length} invoice
                                    {classFees.length !== 1 ? "s" : ""} • Total
                                    ₹{totalAmount.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 text-[8px] font-extrabold uppercase rounded-md bg-emerald-100 text-emerald-700">
                                  {paidCount} Paid
                                </span>
                                {unpaidCount > 0 && (
                                  <span className="px-2 py-0.5 text-[8px] font-extrabold uppercase rounded-md bg-red-100 text-red-700">
                                    {unpaidCount} Unpaid
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Fee Items */}
                            <div className="divide-y divide-slate-100">
                              {classFees.map((fee) => (
                                <div
                                  key={fee._id}
                                  className="px-5 py-3 flex items-center justify-between text-xs hover:bg-slate-50/50 transition-colors"
                                >
                                  <div>
                                    <h5 className="font-bold text-[#0a1835]">
                                      {fee.description || "Tuition Fee"}
                                    </h5>
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                      Student: {fee.studentId?.name} • Invoice:{" "}
                                      {fee.invoiceId}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex flex-col text-right">
                                      <p className="font-mono font-black text-[#0a1835] text-sm leading-tight">
                                        ₹{((fee.amount || 0) - (fee.amountPaid || 0)).toLocaleString()}
                                      </p>
                                      <span className="text-[10px] text-slate-400 font-bold uppercase">Pending</span>
                                    </div>
                                    <div className="text-right space-y-1">
                                      <span
                                        className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-md inline-block ${
                                          fee.status === "Paid"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : fee.status === "Partial"
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                      >
                                        {fee.status}
                                      </span>
                                      {(fee.status === "Unpaid" || fee.status === "Partial" || fee.status === "Pending") && (
                                        <div className="flex gap-2 justify-end">
                                          <button
                                            onClick={() =>
                                              markInvoicePaid(fee._id, (fee.amount || 0) - (fee.amountPaid || 0))
                                            }
                                            className="px-2.5 py-1 text-[8px] font-extrabold uppercase text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow cursor-pointer transition-all"
                                          >
                                            MARK PAID
                                          </button>
                                          <button
                                            onClick={() =>
                                              sendFeeReminder(fee._id)
                                            }
                                            className="px-2.5 py-1 text-[8px] font-extrabold uppercase text-white bg-[#0c46c4] hover:bg-blue-800 rounded-md shadow cursor-pointer transition-all"
                                          >
                                            REMIND ✉
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}

                      {feesList.length === 0 && (
                        <div className="py-12 text-center bg-white rounded-2xl border border-brand-blue/6">
                          <p className="text-xs font-bold text-slate-400">
                            No invoices issued yet
                          </p>
                          <p className="text-[10px] text-slate-300 mt-1">
                            Use the form above to issue your first invoice
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

          {/* ========================================================
              TAB CONTENT: AUDIT ACTIVITY LOGS
              ======================================================== */}
          {activeTab === "logs" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                System Audit Timeline Logs
              </h4>
              <div className="space-y-3 border-l-2 border-slate-200 pl-4 py-2">
                {activityLogs.map((log) => (
                  <div key={log._id} className="text-xs relative">
                    <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-brand-blue border border-white"></span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()} |{" "}
                      {new Date(log.timestamp).toLocaleDateString()}
                    </span>
                    <p className="font-bold text-slate-850 mt-0.5 leading-snug">
                      {log.action}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">
                      User: {log.adminName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB CONTENT: TIMETABLES SCHEDULES
              ======================================================== */}
          {activeTab === "schedules" && (
            <div className="p-4 bg-white border border-brand-blue/10 rounded-xl shadow">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                Schedule Class Routines
              </h4>
              <form
                onSubmit={scheduleRoutine}
                className="space-y-3 text-[11px]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={
                      newSchedule.classLevel >= 11 && newSchedule.stream
                        ? `${newSchedule.classLevel}-${newSchedule.stream}`
                        : newSchedule.classLevel
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      const cls = parseInt(val);
                      const streamVal = val.includes("-")
                        ? val.substring(val.indexOf("-") + 1)
                        : "";
                      setNewSchedule({
                        ...newSchedule,
                        classLevel: cls,
                        stream: streamVal,
                      });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-brand-text-navy focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all cursor-pointer"
                  >
                    {[
                      { val: "1", label: "Class 1" },
                      { val: "2", label: "Class 2" },
                      { val: "3", label: "Class 3" },
                      { val: "4", label: "Class 4" },
                      { val: "5", label: "Class 5" },
                      { val: "6", label: "Class 6" },
                      { val: "7", label: "Class 7" },
                      { val: "8", label: "Class 8" },
                      { val: "9", label: "Class 9" },
                      { val: "10", label: "Class 10" },
                      { val: "11-Science", label: "11th Science" },
                      { val: "11-Commerce", label: "11th Commerce" },
                      { val: "12-Science", label: "12th Science" },
                      { val: "12-Commerce", label: "12th Commerce" },
                    ].map((opt) => (
                      <option key={opt.val} value={opt.val}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={newSchedule.subject}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        subject: e.target.value,
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-brand-text-navy focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all cursor-pointer"
                  >
                    {getSubjectOptions(
                      newSchedule.classLevel,
                      newSchedule.stream,
                    ).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Teacher Name"
                    value={newSchedule.teacherName}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        teacherName: e.target.value,
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-brand-text-navy placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <select
                    value={newSchedule.day}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, day: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-brand-text-navy focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all cursor-pointer"
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Start Time (e.g. 04:00 PM)"
                    value={newSchedule.startTime}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-brand-text-navy placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                  />
                  <input
                    type="text"
                    required
                    placeholder="End Time (e.g. 05:30 PM)"
                    value={newSchedule.endTime}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-brand-text-navy placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Room Number (e.g. Classroom 101)"
                  value={newSchedule.room}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, room: e.target.value })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-brand-text-navy placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow shadow-brand-yellow/15 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                >
                  SCHEDULE ROUTINE
                </button>
              </form>
            </div>
          )}

          {/* ========================================================
              TAB CONTENT: MANUAL ATTENDANCE
              ======================================================== */}
          {activeTab === "manualAttendance" && (
            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm text-left space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-2.5">
                Manual Attendance Ledger Punch
              </h4>
              <form
                onSubmit={markAttendanceManually}
                className="space-y-4 text-xs font-semibold text-slate-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Select Student
                    </label>
                    <select
                      required
                      value={newManualAttendance.studentId}
                      onChange={(e) =>
                        setNewManualAttendance({
                          ...newManualAttendance,
                          studentId: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      <option value="">-- Choose Student --</option>
                      {usersList
                        .filter((u) => u.role === "student")
                        .map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.name} (Std {s.classLevel} - Roll {s.rollNumber})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Attendance Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newManualAttendance.date}
                      onChange={(e) =>
                        setNewManualAttendance({
                          ...newManualAttendance,
                          date: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Status
                    </label>
                    <select
                      value={newManualAttendance.status}
                      onChange={(e) =>
                        setNewManualAttendance({
                          ...newManualAttendance,
                          status: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Check-In Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 09:00 AM"
                      value={newManualAttendance.checkInTime}
                      onChange={(e) =>
                        setNewManualAttendance({
                          ...newManualAttendance,
                          checkInTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Check-Out Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 04:00 PM"
                      value={newManualAttendance.checkOutTime}
                      onChange={(e) =>
                        setNewManualAttendance({
                          ...newManualAttendance,
                          checkOutTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow shadow-brand-yellow/15 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                >
                  PUNCH MANUAL ATTENDANCE
                </button>
              </form>
            </div>
          )}

          {/* ========================================================
              TAB CONTENT: HOMEWORK UPLOAD
              ======================================================== */}
          {activeTab === "homework" && (
            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm text-left space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-2.5">
                Upload Homework Assignments
              </h4>
              <form
                onSubmit={createHomework}
                className="space-y-4 text-xs font-semibold text-slate-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Assignment Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Solve Electrostatics Ch.2 Q1-Q15"
                      value={newHomework.title}
                      onChange={(e) =>
                        setNewHomework({
                          ...newHomework,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Subject
                    </label>
                    <select
                      value={newHomework.subject}
                      onChange={(e) =>
                        setNewHomework({
                          ...newHomework,
                          subject: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      {getSubjectOptions(
                        newHomework.classLevel,
                        newHomework.stream,
                      ).map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Class
                    </label>
                    <select
                      value={
                        newHomework.classLevel >= 11 && newHomework.stream
                          ? `${newHomework.classLevel}-${newHomework.stream}`
                          : newHomework.classLevel
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        const cls = parseInt(val);
                        const streamVal = val.includes("-")
                          ? val.substring(val.indexOf("-") + 1)
                          : "";
                        setNewHomework({
                          ...newHomework,
                          classLevel: cls,
                          stream: streamVal,
                        });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      {[
                        { val: "1", label: "Class 1" },
                        { val: "2", label: "Class 2" },
                        { val: "3", label: "Class 3" },
                        { val: "4", label: "Class 4" },
                        { val: "5", label: "Class 5" },
                        { val: "6", label: "Class 6" },
                        { val: "7", label: "Class 7" },
                        { val: "8", label: "Class 8" },
                        { val: "9", label: "Class 9" },
                        { val: "10", label: "Class 10" },
                        { val: "11-Science", label: "11th Science" },
                        { val: "11-Commerce", label: "11th Commerce" },
                        { val: "12-Science", label: "12th Science" },
                        { val: "12-Commerce", label: "12th Commerce" },
                      ].map((opt) => (
                        <option key={opt.val} value={opt.val}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Due Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newHomework.dueDate}
                      onChange={(e) =>
                        setNewHomework({
                          ...newHomework,
                          dueDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Teacher Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Sharma"
                      value={newHomework.teacherName}
                      onChange={(e) =>
                        setNewHomework({
                          ...newHomework,
                          teacherName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Attachment File (PDF/Image)
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 cursor-pointer animate-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                    Assignment Description
                  </label>
                  <textarea
                    placeholder="Provide detailed tasks and descriptions..."
                    value={newHomework.description}
                    onChange={(e) =>
                      setNewHomework({
                        ...newHomework,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 h-20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow shadow-brand-yellow/15 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                >
                  UPLOAD HOMEWORK ASSIGNMENT
                </button>
              </form>
            </div>
          )}

          {/* ========================================================
              TAB CONTENT: STUDY MATERIALS
              ======================================================== */}
          {activeTab === "study" && (
            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm text-left space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-2.5">
                Upload Study Notes & Worksheets
              </h4>
              <form
                onSubmit={createStudyMaterial}
                className="space-y-4 text-xs font-semibold text-slate-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Material Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Integral Calculus formula sheet"
                      value={newStudyMaterial.title}
                      onChange={(e) =>
                        setNewStudyMaterial({
                          ...newStudyMaterial,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Subject
                    </label>
                    <select
                      value={newStudyMaterial.subject}
                      onChange={(e) =>
                        setNewStudyMaterial({
                          ...newStudyMaterial,
                          subject: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      {getSubjectOptions(
                        newStudyMaterial.classLevel,
                        newStudyMaterial.stream,
                      ).map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Class
                    </label>
                    <select
                      value={
                        newStudyMaterial.classLevel >= 11 &&
                        newStudyMaterial.stream
                          ? `${newStudyMaterial.classLevel}-${newStudyMaterial.stream}`
                          : newStudyMaterial.classLevel
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        const cls = parseInt(val);
                        const streamVal = val.includes("-")
                          ? val.substring(val.indexOf("-") + 1)
                          : "";
                        setNewStudyMaterial({
                          ...newStudyMaterial,
                          classLevel: cls,
                          stream: streamVal,
                        });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      {[
                        { val: "1", label: "Class 1" },
                        { val: "2", label: "Class 2" },
                        { val: "3", label: "Class 3" },
                        { val: "4", label: "Class 4" },
                        { val: "5", label: "Class 5" },
                        { val: "6", label: "Class 6" },
                        { val: "7", label: "Class 7" },
                        { val: "8", label: "Class 8" },
                        { val: "9", label: "Class 9" },
                        { val: "10", label: "Class 10" },
                        { val: "11-Science", label: "11th Science" },
                        { val: "11-Commerce", label: "11th Commerce" },
                        { val: "12-Science", label: "12th Science" },
                        { val: "12-Commerce", label: "12th Commerce" },
                      ].map((opt) => (
                        <option key={opt.val} value={opt.val}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Material Type
                    </label>
                    <select
                      value={newStudyMaterial.materialType}
                      onChange={(e) =>
                        setNewStudyMaterial({
                          ...newStudyMaterial,
                          materialType: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      <option value="Notes">Notes</option>
                      <option value="Worksheet">Worksheet</option>
                      <option value="Syllabus">Syllabus</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Pages Count
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12 pages"
                      value={newStudyMaterial.pages}
                      onChange={(e) =>
                        setNewStudyMaterial({
                          ...newStudyMaterial,
                          pages: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      File Size
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1.2 MB"
                      value={newStudyMaterial.fileSize}
                      onChange={(e) =>
                        setNewStudyMaterial({
                          ...newStudyMaterial,
                          fileSize: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Upload PDF/Image
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 cursor-pointer animate-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                    Brief Description
                  </label>
                  <textarea
                    placeholder="Brief description of the material..."
                    value={newStudyMaterial.description}
                    onChange={(e) =>
                      setNewStudyMaterial({
                        ...newStudyMaterial,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 h-20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow shadow-brand-yellow/15 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                >
                  UPLOAD STUDY MATERIAL
                </button>
              </form>
            </div>
          )}

          {/* ========================================================
              TAB CONTENT: RESULTS
              ======================================================== */}
          {activeTab === "results" && (
            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm text-left space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-2.5">
                Upload Student Marks Result Cards
              </h4>
              <form
                onSubmit={uploadResultCard}
                className="space-y-4 text-xs font-semibold text-slate-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Select Student
                    </label>
                    <select
                      required
                      value={newResultCard.studentId}
                      onChange={(e) => {
                        const sId = e.target.value;
                        const student = usersList.find((u) => u._id === sId);
                        const subjects = student
                          ? getSubjectOptions(
                              student.classLevel,
                              student.stream,
                            )
                          : [];
                        const initialMarks = subjects.map((sub, idx) => ({
                          id: Date.now() + idx,
                          subject: sub,
                          obtained: "",
                          max: "100",
                          passingMarks: "35",
                        }));
                        setNewResultCard({
                          ...newResultCard,
                          studentId: sId,
                          marks: initialMarks,
                        });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      <option value="">-- Choose Student --</option>
                      {usersList
                        .filter((u) => u.role === "student")
                        .map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.name} (Std {s.classLevel} - Roll {s.rollNumber})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Exam / Test Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Unit Test 3"
                      value={newResultCard.examName}
                      onChange={(e) =>
                        setNewResultCard({
                          ...newResultCard,
                          examName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
                {newResultCard.marks.length > 0 && (
                  <div className="space-y-3 mt-4 border-t border-slate-100 pt-4">
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                      <h5 className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                        Subject Marks
                      </h5>
                      <div className="flex items-center gap-4">
                        <span className="text-[#0a1835] font-black text-xs">
                          Total:{" "}
                          {(() => {
                            let ob = 0,
                              mx = 0;
                            newResultCard.marks.forEach((m) => {
                              ob += Number(m.obtained) || 0;
                              mx += Number(m.max) || 0;
                            });
                            return mx > 0
                              ? ((ob / mx) * 100).toFixed(1) + "%"
                              : "0%";
                          })()}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setNewResultCard({
                              ...newResultCard,
                              marks: [
                                ...newResultCard.marks,
                                {
                                  id: Date.now(),
                                  subject: "",
                                  obtained: "",
                                  max: "100",
                                  passingMarks: "35",
                                },
                              ],
                            });
                          }}
                          className="text-[10px] font-bold text-brand-blue hover:text-brand-yellow uppercase"
                        >
                          + Add Subject
                        </button>
                      </div>
                    </div>
                    {newResultCard.marks.map((m, index) => {
                      const isFail =
                        m.obtained !== "" &&
                        Number(m.obtained) < Number(m.passingMarks);
                      return (
                        <div key={m.id} className="flex gap-2 items-center">
                          <div className="flex-1">
                            <input
                              type="text"
                              required
                              placeholder="Subject Name"
                              value={m.subject}
                              onChange={(e) => {
                                const newM = [...newResultCard.marks];
                                newM[index].subject = e.target.value;
                                setNewResultCard({
                                  ...newResultCard,
                                  marks: newM,
                                });
                              }}
                              className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-slate-900 font-bold text-[10px] focus:outline-none focus:ring-1 focus:ring-brand-yellow/50"
                            />
                          </div>
                          <div className="w-16">
                            <input
                              type="number"
                              required
                              placeholder="Pass"
                              value={m.passingMarks}
                              onChange={(e) => {
                                const newM = [...newResultCard.marks];
                                newM[index].passingMarks = e.target.value;
                                setNewResultCard({
                                  ...newResultCard,
                                  marks: newM,
                                });
                              }}
                              className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-slate-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-brand-yellow/50 text-center"
                            />
                          </div>
                          <div className="w-16">
                            <input
                              type="number"
                              required
                              placeholder="Max"
                              value={m.max}
                              onChange={(e) => {
                                const newM = [...newResultCard.marks];
                                newM[index].max = e.target.value;
                                setNewResultCard({
                                  ...newResultCard,
                                  marks: newM,
                                });
                              }}
                              className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-slate-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-brand-yellow/50 text-center"
                            />
                          </div>
                          <div className="w-16">
                            <input
                              type="number"
                              required
                              placeholder="Obtain"
                              value={m.obtained}
                              onChange={(e) => {
                                const newM = [...newResultCard.marks];
                                newM[index].obtained = e.target.value;
                                setNewResultCard({
                                  ...newResultCard,
                                  marks: newM,
                                });
                              }}
                              className={`w-full px-2 py-1.5 bg-white border ${isFail ? "border-red-400 text-red-600" : "border-slate-200 text-slate-900"} rounded font-mono text-xs focus:outline-none focus:ring-1 focus:ring-brand-yellow/50 text-center`}
                            />
                          </div>
                          <div className="w-10 text-center">
                            {m.obtained !== "" && (
                              <span
                                className={`text-[10px] font-black uppercase tracking-wider ${isFail ? "text-red-500" : "text-green-500"}`}
                              >
                                {isFail ? "Fail" : "Pass"}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newM = newResultCard.marks.filter(
                                (item) => item.id !== m.id,
                              );
                              setNewResultCard({
                                ...newResultCard,
                                marks: newM,
                              });
                            }}
                            className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-3.5 h-3.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow shadow-brand-yellow/15 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                >
                  UPLOAD MARKS & DISPATCH ALERTS
                </button>
              </form>
            </div>
          )}

          {/* ========================================================
              TAB CONTENT: NOTICE BROADCAST
              ======================================================== */}
          {activeTab === "notices" && (
            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm text-left space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue border-b border-slate-100 pb-2.5">
                Notice Bulletin Broadcast Portal
              </h4>
              <form
                onSubmit={broadcastNotice}
                className="space-y-4 text-xs font-semibold text-slate-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Notice Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Republic Day Celebration"
                      value={newNoticeBroadcast.title}
                      onChange={(e) =>
                        setNewNoticeBroadcast({
                          ...newNoticeBroadcast,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                      Category
                    </label>
                    <select
                      value={newNoticeBroadcast.category}
                      onChange={(e) =>
                        setNewNoticeBroadcast({
                          ...newNoticeBroadcast,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                    >
                      <option value="General">General Notice</option>
                      <option value="Student">Student Notice</option>
                      <option value="Specific Student">Specific Student</option>
                      <option value="Teacher">Teacher Notice</option>
                      <option value="Parent">Parent Notice</option>
                    </select>
                  </div>
                  {newNoticeBroadcast.category === "Specific Student" && (
                    <div>
                      <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                        Student Email or Roll No
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. student@email.com or SA-101"
                        value={newNoticeBroadcast.targetStudent || ""}
                        onChange={(e) =>
                          setNewNoticeBroadcast({
                            ...newNoticeBroadcast,
                            targetStudent: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                      />
                    </div>
                  )}
                  {(newNoticeBroadcast.category === "Student" ||
                    newNoticeBroadcast.category === "Parent") && (
                    <div>
                      <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                        Target Class
                      </label>
                      <select
                        value={
                          newNoticeBroadcast.classLevel >= 11 &&
                          newNoticeBroadcast.stream
                            ? `${newNoticeBroadcast.classLevel}-${newNoticeBroadcast.stream}`
                            : newNoticeBroadcast.classLevel || ""
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) {
                            setNewNoticeBroadcast({
                              ...newNoticeBroadcast,
                              classLevel: "",
                              stream: "",
                            });
                            return;
                          }
                          const cls = parseInt(val);
                          const streamVal = val.includes("-")
                            ? val.substring(val.indexOf("-") + 1)
                            : "";
                          setNewNoticeBroadcast({
                            ...newNoticeBroadcast,
                            classLevel: cls,
                            stream: streamVal,
                          });
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-900"
                      >
                        <option value="">All Classes</option>
                        {[
                          { val: "1", label: "Class 1" },
                          { val: "2", label: "Class 2" },
                          { val: "3", label: "Class 3" },
                          { val: "4", label: "Class 4" },
                          { val: "5", label: "Class 5" },
                          { val: "6", label: "Class 6" },
                          { val: "7", label: "Class 7" },
                          { val: "8", label: "Class 8" },
                          { val: "9", label: "Class 9" },
                          { val: "10", label: "Class 10" },
                          { val: "11-Science", label: "11th Science" },
                          { val: "11-Commerce", label: "11th Commerce" },
                          { val: "12-Science", label: "12th Science" },
                          { val: "12-Commerce", label: "12th Commerce" },
                        ].map((opt) => (
                          <option key={opt.val} value={opt.val}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[9px] uppercase text-slate-400 mb-1.5 font-extrabold">
                    Notice Content Bulletin
                  </label>
                  <textarea
                    required
                    placeholder="Input complete bulletin notices description..."
                    value={newNoticeBroadcast.content}
                    onChange={(e) =>
                      setNewNoticeBroadcast({
                        ...newNoticeBroadcast,
                        content: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 h-36 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow shadow-brand-yellow/15 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                >
                  BROADCAST BULLETIN & BULK EMAIL
                </button>
              </form>
            </div>
          )}
          </>
          )}
        </main>
      </div>

      {/* STUDENT ID CARD EXPORT DIALOG MODAL */}
      {idCardSimulating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-t-2xl sm:rounded-2xl shadow-xl border border-brand-blue/10 animate-slide-up space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-850">
                ID Card Generator
              </h3>
              <button
                onClick={() => setIdCardSimulating(null)}
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 border-2 border-brand-blue bg-white rounded-xl text-center shadow-lg max-w-[280px] mx-auto space-y-3 relative overflow-hidden">
              <div className="border-b border-brand-red pb-1">
                <h4 className="text-sm font-black text-brand-blue">
                  SHARDA ACADEMY
                </h4>
                <p className="text-[8px] font-bold text-brand-red uppercase tracking-wider">
                  Mankhurd - 43
                </p>
              </div>
              <div className="w-14 h-14 rounded-full gradient-brand-header text-white font-bold flex items-center justify-center text-lg mx-auto shadow-sm">
                {idCardSimulating.name[0].toUpperCase()}
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900 leading-tight">
                  {idCardSimulating.name}
                </h5>
                <p className="text-[10px] text-brand-red font-semibold">
                  {idCardSimulating.rollNumber}
                </p>
              </div>

              <div className="text-left text-[9px] bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-0.5">
                <p>
                  <strong>Class Level:</strong> Standard{" "}
                  {idCardSimulating.classLevel}
                </p>
                <p>
                  <strong>Stream:</strong> {idCardSimulating.stream || "N/A"}
                </p>
                <p>
                  <strong>RFID Card:</strong>{" "}
                  <span className="text-emerald-600 font-bold">
                    {idCardSimulating.biometricId || "RFID-9988-77"}
                  </span>
                </p>
              </div>

              <div className="pt-2 text-[8px] font-mono text-slate-400 leading-none">
                ||||||||||||||||||||||||||||||||||||||
                <br />
                STUDENT-RFID-AUTHENTICATED
              </div>
            </div>

            <button
              onClick={triggerBrowserPrintID}
              className="w-full py-3.5 text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow shadow-brand-yellow/20 transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096a42.42 42.42 0 0 0-10.56 0m10.56 0L17.66 18m0 0a1.072 1.072 0 0 1-.767.983c-2.449.698-5.022.698-7.472 0A1.073 1.073 0 0 1 8.66 18m9 0v-2.625M8.66 18v-2.625m9-.002a3 3 0 0 0-3-3h-5.32a3 3 0 0 0-3 3M16.5 7.5V3a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v4.5m10.5 0V9a1.5 1.5 0 0 1-1.5 1.5h-10.5A1.5 1.5 0 0 1 3 9V7.5m13.5 0h.008v.008H16.5V7.5Z"
                />
              </svg>
              <span>PRINT ID CARD</span>
            </button>
          </div>
        </div>
      )}

      {/* ══════ ADD STUDENT MODAL POPUP ══════ */}
      {paymentModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up space-y-5 text-left">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="text-left">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">FEE COLLECTION</span>
                <h3 className="font-display text-sm font-bold uppercase text-[#0a1835] mt-1.5">Mark Invoice Paid</h3>
              </div>
              <button onClick={() => setPaymentModal({ isOpen: false, feeId: null, remainingBalance: 0, amountPaid: "", error: "" })} className="text-slate-400 hover:text-slate-650 transition cursor-pointer border-none bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl text-xs space-y-2 text-left">
                <p className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Outstanding Dues Amount:</p>
                <p className="font-mono text-xl font-bold text-brand-red mb-3">₹{paymentModal.remainingBalance.toLocaleString()}</p>
                
                <div className="w-full border-t border-dashed border-slate-200 my-3"></div>

                <label className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Amount Collected (₹):</label>
                <input 
                  type="number" 
                  value={paymentModal.amountPaid}
                  onChange={(e) => {
                    setPaymentModal(prev => ({ ...prev, amountPaid: e.target.value, error: "" }));
                  }}
                  className={`w-full p-3 border ${paymentModal.error ? 'border-red-500' : 'border-slate-200'} rounded-xl font-mono text-lg text-[#0a1835] focus:outline-none focus:border-[#0a1835] transition-colors`}
                />
                {paymentModal.error && <p className="text-red-500 text-xs mt-1.5 font-semibold">{paymentModal.error}</p>}
              </div>
              
              <button
                onClick={submitPayment}
                disabled={loading}
                className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 duration-200 text-center block border-none font-sans"
              >
                {loading ? "PROCESSING..." : "CONFIRM PAYMENT"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-brand-blue/10 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0a1835] flex items-center justify-between">
              <div>
                <div className="text-sm font-black text-white uppercase tracking-wider">
                  Register New Student
                </div>
                <p className="text-[9px] text-slate-300 font-semibold mt-0.5">
                  Fill in the student profile details below
                </p>
              </div>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-lg transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={(e) => {
                createUser(e);
                setShowAddStudentModal(false);
              }}
              className="p-6 space-y-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-130px)] text-left"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Student name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@email.com"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Mobile number"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="SA-2026-001"
                    value={newUser.rollNumber}
                    onChange={(e) =>
                      setNewUser({ ...newUser, rollNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Class
                  </label>
                  <select
                    value={
                      newUser.classLevel >= 11 && newUser.stream
                        ? `${newUser.classLevel}-${newUser.stream}`
                        : newUser.classLevel
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      const cls = parseInt(val);
                      const streamVal = val.includes("-")
                        ? val.substring(val.indexOf("-") + 1)
                        : "";
                      setNewUser({
                        ...newUser,
                        classLevel: cls,
                        stream: streamVal,
                        ...(cls < 11 ? { subjects: "" } : {}),
                      });
                    }}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg cursor-pointer"
                  >
                    {[
                      { val: "1", label: "Class 1" },
                      { val: "2", label: "Class 2" },
                      { val: "3", label: "Class 3" },
                      { val: "4", label: "Class 4" },
                      { val: "5", label: "Class 5" },
                      { val: "6", label: "Class 6" },
                      { val: "7", label: "Class 7" },
                      { val: "8", label: "Class 8" },
                      { val: "9", label: "Class 9" },
                      { val: "10", label: "Class 10" },
                      { val: "11-Science", label: "11th Science" },
                      { val: "11-Commerce", label: "11th Commerce" },
                      { val: "12-Science", label: "12th Science" },
                      { val: "12-Commerce", label: "12th Commerce" },
                    ].map((opt) => (
                      <option key={opt.val} value={opt.val}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {newUser.classLevel >= 11 && (
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Subjects
                    </label>
                    <select
                      value={newUser.subjects || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, subjects: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg cursor-pointer"
                    >
                      <option value="">Select Subjects</option>
                      {newUser.stream === "Science" ? (
                        <>
                          <option value="PCM">PCM</option>
                          <option value="PCB">PCB</option>
                          <option value="PCMB">PCMB</option>
                        </>
                      ) : newUser.stream === "Commerce" ? (
                        <>
                          <option value="Commerce with Maths">
                            Commerce with Maths
                          </option>
                          <option value="Commerce with SP">
                            Commerce with SP
                          </option>
                          <option value="General Commerce">
                            General Commerce
                          </option>
                        </>
                      ) : null}
                    </select>
                  </div>
                )}
              </div>

              {/* Father Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Father's full name"
                    value={newUser.fatherName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, fatherName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Father's Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Father's contact number"
                    value={newUser.fatherPhone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, fatherPhone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              {/* Mother Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Mother's full name"
                    value={newUser.motherName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, motherName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mother's Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Mother's contact number"
                    value={newUser.motherPhone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, motherPhone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              {/* Father & Mother Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Father's Email
                  </label>
                  <input
                    type="email"
                    placeholder="father@email.com"
                    value={newUser.fatherEmail}
                    onChange={(e) =>
                      setNewUser({ ...newUser, fatherEmail: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mother's Email
                  </label>
                  <input
                    type="email"
                    placeholder="mother@email.com"
                    value={newUser.motherEmail}
                    onChange={(e) =>
                      setNewUser({ ...newUser, motherEmail: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Home Address (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Home Address"
                  value={newUser.homeAddress}
                  onChange={(e) =>
                    setNewUser({ ...newUser, homeAddress: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Portal Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Initial password"
                    value={newUser.password || ""}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Profile Photo (Optional)
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    {newUserPhotoPreview ? (
                      <div className="relative w-12 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={newUserPhotoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setNewUserPhotoFile(null);
                            setNewUserPhotoPreview("");
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold shadow-md hover:bg-red-650"
                          title="Remove Photo"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">
                          No Photo
                        </span>
                      </div>
                    )}
                    <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-dashed border-slate-350 hover:border-brand-yellow/50 bg-slate-50 hover:bg-amber-50/20 rounded-lg cursor-pointer transition text-[10px] font-bold uppercase text-slate-550 min-w-0">
                      <svg
                        className="w-3.5 h-3.5 text-slate-400 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <span className="truncate">Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setNewUserPhotoFile(file);
                            setNewUserPhotoPreview(URL.createObjectURL(file));
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="flex-1 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 text-xs font-extrabold uppercase tracking-widest text-[#0a1835] bg-brand-yellow hover:bg-amber-400 rounded-xl shadow-md shadow-brand-yellow/20 transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                >
                  Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ══════ EDIT STUDENT MODAL POPUP ══════ */}
      {showEditStudentModal && editingStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-brand-blue/10 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0a1835] flex items-center justify-between">
              <div>
                <div className="text-sm font-black text-white uppercase tracking-wider">
                  Edit Student Profile
                </div>
                <p className="text-[9px] text-slate-300 font-semibold mt-0.5">
                  Modify student parameters and click Save Changes
                </p>
              </div>
              <button
                onClick={() => {
                  setShowEditStudentModal(false);
                  setEditingStudent(null);
                }}
                className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-lg transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleEditUser}
              className="p-6 space-y-4 max-h-[80vh] overflow-y-auto overflow-x-hidden text-left"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Student name"
                    value={editingStudent.name}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@email.com"
                    value={editingStudent.email}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Mobile number"
                    value={editingStudent.phone}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="SA-2026-001"
                    value={editingStudent.rollNumber}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        rollNumber: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Class
                  </label>
                  <select
                    value={
                      editingStudent.classLevel >= 11 && editingStudent.stream
                        ? `${editingStudent.classLevel}-${editingStudent.stream}`
                        : editingStudent.classLevel
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      const cls = parseInt(val);
                      const streamVal = val.includes("-")
                        ? val.substring(val.indexOf("-") + 1)
                        : "";
                      setEditingStudent({
                        ...editingStudent,
                        classLevel: cls,
                        stream: streamVal,
                        ...(cls < 11 ? { subjects: "" } : {}),
                      });
                    }}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg cursor-pointer"
                  >
                    {[
                      { val: "1", label: "Class 1" },
                      { val: "2", label: "Class 2" },
                      { val: "3", label: "Class 3" },
                      { val: "4", label: "Class 4" },
                      { val: "5", label: "Class 5" },
                      { val: "6", label: "Class 6" },
                      { val: "7", label: "Class 7" },
                      { val: "8", label: "Class 8" },
                      { val: "9", label: "Class 9" },
                      { val: "10", label: "Class 10" },
                      { val: "11-Science", label: "11th Science" },
                      { val: "11-Commerce", label: "11th Commerce" },
                      { val: "12-Science", label: "12th Science" },
                      { val: "12-Commerce", label: "12th Commerce" },
                    ].map((opt) => (
                      <option key={opt.val} value={opt.val}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {editingStudent.classLevel >= 11 && (
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Subjects
                    </label>
                    <select
                      value={editingStudent.subjects || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          subjects: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg cursor-pointer"
                    >
                      <option value="">Select Subjects</option>
                      {editingStudent.stream === "Science" ? (
                        <>
                          <option value="PCM">PCM</option>
                          <option value="PCB">PCB</option>
                          <option value="PCMB">PCMB</option>
                        </>
                      ) : editingStudent.stream === "Commerce" ? (
                        <>
                          <option value="Commerce with Maths">
                            Commerce with Maths
                          </option>
                          <option value="Commerce with SP">
                            Commerce with SP
                          </option>
                          <option value="General Commerce">
                            General Commerce
                          </option>
                        </>
                      ) : null}
                    </select>
                  </div>
                )}
              </div>

              {/* Father Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Father's full name"
                    value={editingStudent.fatherName || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        fatherName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Father's Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Father's contact number"
                    value={editingStudent.fatherPhone || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        fatherPhone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              {/* Mother Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Mother's full name"
                    value={editingStudent.motherName || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        motherName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mother's Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Mother's contact number"
                    value={editingStudent.motherPhone || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        motherPhone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              {/* Father & Mother Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Father's Email
                  </label>
                  <input
                    type="email"
                    placeholder="father@email.com"
                    value={editingStudent.fatherEmail || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        fatherEmail: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mother's Email
                  </label>
                  <input
                    type="email"
                    placeholder="mother@email.com"
                    value={editingStudent.motherEmail || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        motherEmail: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Home Address (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Home Address"
                  value={editingStudent.homeAddress}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      homeAddress: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 animate-fade-in">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Reset Password
                  </label>
                  <input
                    type="password"
                    placeholder="New password"
                    value={editingStudent.password || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Account Status
                  </label>
                  <select
                    value={editingStudent.status || "Active"}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    {editUserPhotoPreview ? (
                      <div className="relative w-12 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={editUserPhotoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setEditUserPhotoFile(null);
                            setEditUserPhotoPreview("");
                            setEditingStudent({
                              ...editingStudent,
                              profilePhoto: "",
                            });
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold shadow-md hover:bg-red-650"
                          title="Remove Photo"
                        >
                          ×
                        </button>
                      </div>
                    ) : editingStudent.profilePhoto ? (
                      <div className="relative w-12 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={
                            editingStudent.profilePhoto.startsWith("http") ||
                            editingStudent.profilePhoto.startsWith("data:")
                              ? editingStudent.profilePhoto
                              : `${API_BASE_URL}${editingStudent.profilePhoto}`
                          }
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setEditUserPhotoFile(null);
                            setEditUserPhotoPreview("");
                            setEditingStudent({
                              ...editingStudent,
                              profilePhoto: "",
                            });
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold shadow-md hover:bg-red-650"
                          title="Remove Photo"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">
                          No Photo
                        </span>
                      </div>
                    )}
                    <label className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 border border-dashed border-slate-350 hover:border-brand-yellow/50 bg-slate-50 hover:bg-amber-50/20 rounded-lg cursor-pointer transition text-[10px] font-bold uppercase text-slate-550 flex-shrink-0 min-w-0">
                      <svg
                        className="w-3.5 h-3.5 text-slate-400 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <span className="truncate">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setEditUserPhotoFile(file);
                            setEditUserPhotoPreview(URL.createObjectURL(file));
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditStudentModal(false);
                    setEditingStudent(null);
                  }}
                  className="flex-1 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 text-xs font-extrabold uppercase tracking-widest text-[#0a1835] bg-brand-yellow hover:bg-amber-400 rounded-xl shadow-md shadow-brand-yellow/20 transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════ CONFIRMATION MODAL ══════ */}
      <ConfirmModal config={confirmConfig} />

      {/* Real-time Toast Notification */}
      {liveToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div className="bg-white border-l-4 border-emerald-500 shadow-2xl rounded-r-xl p-4 pr-10 relative flex items-start gap-3 max-w-sm">
            <button onClick={() => setLiveToast(null)} className="absolute top-2 right-2 text-slate-400 hover:text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-500 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5zM3 10.5h18" /></svg>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-slate-800">{liveToast.title}</h4>
              <p className="text-[10px] font-semibold text-slate-500 mt-0.5 line-clamp-2">{liveToast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
