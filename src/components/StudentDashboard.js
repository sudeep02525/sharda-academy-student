"use client";

import { useState, useEffect } from "react";
const getStudentSidebarIcon = (id, className) => {
  switch (id) {
    case "overview":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25a2.25 2.25 0 0 1-2.25 2.25h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      );
    case "attendance":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a14.805 14.805 0 0 0 1.586 6.74M15.01 1.777a8.962 8.962 0 0 1 3.74 2.235M8.457 20.278a14.887 14.887 0 0 1-2.715-3.328M11.662 2.011a8.968 8.968 0 0 1 3.2 1.53m-7.817 14.3a14.852 14.852 0 0 1-1.047-3.473M10.5 8.5a1.5 1.5 0 1 1 3 0v4.882c0 .866-.491 1.652-1.258 2.002L10.5 16.5M9 10.5a3 3 0 0 1 6 0v2.882c0 .577.327 1.101.839 1.335l.661.303" />
        </svg>
      );
    case "fees":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-19.5 8.25h3m3 0h3m-9-1.5h18a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      );
    case "academic":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A5.998 5.998 0 0 1 2.25 4.876V3.75a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 .75.75v1.127a5.999 5.999 0 0 1-2.882 5.108 50.64 50.64 0 0 0-2.658.813m-11.133 0A48.36 48.36 0 0 1 12 12.75c2.973 0 5.825-.266 8.594-.783m-16.727 0a48.38 48.38 0 0 0-2.185-1.573c-.636-.423-1.026-1.124-1.026-1.879m19.937 0a48.38 48.38 0 0 1 2.185 1.573c.636.423 1.026 1.124 1.026 1.879v6.587c0 .89-.533 1.687-1.34 2.05L12.75 22.5h-.008z" />
        </svg>
      );
    case "homework":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      );
    case "schedule":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
      );
    case "notifications":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      );
    case "profile":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      );
    default:
      return null;
  }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function StudentDashboard({ token, onLogout }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); 
  const [paySimulating, setPaySimulating] = useState(null);
  const [paySuccess, setPaySuccess] = useState(false);
  const [attendanceMonth, setAttendanceMonth] = useState("January 2026");
  
  // Clock state
  const [currentTime, setCurrentTime] = useState("");
  
  // Responsive sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Change Password state variables
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCodeInput, setOtpCodeInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpSuccess, setOtpSuccess] = useState("");
  const [otpError, setOtpError] = useState("");

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
    const shouldBeDark = isMobile ? systemDark : (savedTheme === "dark" || (!savedTheme && systemDark));
    
    if (shouldBeDark) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

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
  
  // Live Notifications Drawer state (top navbar bell)
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);

  // Homework list state (Tab 5)
  const [homeworkList, setHomeworkList] = useState([]);

  // Study notes directory list (Tab 5 right panel)
  const [studyNotes, setStudyNotes] = useState([]);

  // Notifications category active filter (Tab 7)
  const [notifCategoryFilter, setNotifCategoryFilter] = useState("All Notifications");

  // Notifications database (Tab 7)
  const [notificationsDb, setNotificationsDb] = useState([]);

  // Real-time clock setup
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto-dismiss warnings/success messages after 4 seconds
  useEffect(() => {
    let timeout;
    if (otpError || otpSuccess) {
      timeout = setTimeout(() => {
        setOtpError("");
        setOtpSuccess("");
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [otpError, otpSuccess]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Auto-refresh data when the active tab changes
  useEffect(() => {
    if (token) {
      fetchData(true); // Silent update on tab change
    }
  }, [activeTab, token]);

  // Polling and visibility change listeners
  useEffect(() => {
    if (!token) return;

    // Fetch initially
    fetchData();

    // Set up polling interval (every 10 seconds)
    const intervalId = setInterval(() => {
      fetchData(true); // silent background fetch
    }, 10000);

    // Fetch on window focus / visibility change (tab switch back)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchData(true);
      }
    };
    window.addEventListener("focus", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [token]);

  const handleDownload = (filename, fileData) => {
    if (!fileData) {
      alert("No attachment file is associated with this item.");
      return;
    }
    let finalUrl = fileData;
    if (fileData.startsWith("/uploads/")) {
      finalUrl = `${API_BASE_URL}${fileData}`;
    }
    if (finalUrl.startsWith("http://") || finalUrl.startsWith("https://") || finalUrl.startsWith("/")) {
      window.open(finalUrl, "_blank");
      return;
    }
    try {
      const link = document.createElement("a");
      link.href = finalUrl;
      link.download = filename || "attachment.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to download attachment.");
    }
  };

  const handlePrintReceipt = (invoice) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Tuition Fee Receipt - ${invoice.invoiceId}</title>
          <style>
            body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; color: #1e293b; background: #faf9f6; }
            .receipt-card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px solid #1a2e5a; border-radius: 16px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
            .header { text-align: center; border-bottom: 3px solid #f5c842; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { color: #1a2e5a; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 2px; }
            .header p { margin: 5px 0 0; font-size: 11px; color: #dc2626; font-weight: bold; letter-spacing: 2px; }
            .title { text-align: center; text-transform: uppercase; font-size: 14px; font-weight: 800; color: #1a2e5a; margin-bottom: 25px; letter-spacing: 1px; }
            .details-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .details-table td { padding: 10px 0; border-bottom: 1px solid #edf2f7; font-size: 13px; }
            .details-table td.label { color: #64748b; font-weight: 600; width: 150px; }
            .details-table td.value { color: #0f172a; font-weight: 700; text-align: right; }
            .total-row { background: #f8fafc; font-size: 15px; font-weight: 800; color: #1a2e5a; }
            .total-row td { padding: 15px 10px; border-bottom: none; }
            .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="receipt-card">
            <div class="header">
              <h1>SHARDA ACADEMY</h1>
              <p>PORTAL TUITION FEE RECEIPT</p>
            </div>
            <div class="title">OFFICIAL PAYMENT RECEIPT</div>
            <table class="details-table">
              <tr>
                <td class="label">Invoice ID</td>
                <td class="value">${invoice.invoiceId}</td>
              </tr>
              <tr>
                <td class="label">Student Name</td>
                <td class="value">${data?.student?.name || "Student"}</td>
              </tr>
              <tr>
                <td class="label">Class & Section</td>
                <td class="value">Standard ${data?.student?.classLevel || "N/A"} (${data?.student?.batch || "N/A"})</td>
              </tr>
              <tr>
                <td class="label">Description</td>
                <td class="value">${invoice.description}</td>
              </tr>
              <tr>
                <td class="label">Payment Date</td>
                <td class="value">${invoice.paymentDate ? new Date(invoice.paymentDate).toLocaleString() : "N/A"}</td>
              </tr>
              <tr>
                <td class="label">Payment Method</td>
                <td class="value">${invoice.paymentMethod || "UPI / Card sync"}</td>
              </tr>
              <tr class="total-row">
                <td>Amount Paid</td>
                <td style="text-align: right;">₹${invoice.amount.toLocaleString()}</td>
              </tr>
            </table>
            <div class="footer">
              Thank you for your payment. This is a computer-generated transaction record and requires no physical signature.<br>
              © ${new Date().getFullYear()} Sharda Academy SAMS
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const fetchData = async (isSilent = false) => {
    if (!token) return;
    if (!isSilent) setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/sams/student/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        onLogout();
        return;
      }
      const resData = await res.json();
      if (resData.success) {
        setData(resData);
        setHomeworkList(resData.homework && resData.homework.length > 0
          ? resData.homework.map(hw => ({
              id: hw._id,
              title: hw.title,
              dueDate: hw.dueDate,
              status: "Pending",
              teacher: hw.teacherName || "Academy Staff",
              subject: hw.subject,
              attachmentName: hw.attachmentName,
              attachmentData: hw.attachmentData,
              description: hw.description,
            }))
          : []
        );

        setStudyNotes(resData.studyMaterials && resData.studyMaterials.length > 0
          ? resData.studyMaterials.map(sm => ({
              id: sm._id,
              title: sm.title,
              pages: sm.pages || "N/A",
              size: sm.fileSize || "N/A",
              date: new Date(sm.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              subject: sm.subject,
              attachmentName: sm.attachmentName,
              attachmentData: sm.attachmentData,
              description: sm.description,
              materialType: sm.materialType,
            }))
          : []
        );

        // Populate notifications from real backend notices, preserving read state from localStorage
        const readIds = JSON.parse(localStorage.getItem("sams-read-notifs") || "[]");
        setNotificationsDb(resData.notices && resData.notices.length > 0
          ? resData.notices.map(n => ({
              id: n._id,
              type: n.category === "General" ? "Announcements" : n.category === "Student" ? "Class Updates" : n.category,
              title: n.title,
              desc: n.content,
              date: new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              unread: !readIds.includes(n._id),
              timeAgo: new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            }))
          : []
        );
      } else {
        if (!isSilent) setError(resData.message || "Failed to load student portfolio.");
      }
    } catch (err) {
      if (!isSilent) setError("Unable to sync details with SAMS backend.");
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  const executePayment = async () => {
    if (!paySimulating) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/sams/fees/${paySimulating._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Paid", paymentMethod: "UPI Checkout" }),
      });
      const resData = await res.json();
      if (resData.success) {
        setPaySuccess(true);
        setTimeout(() => {
          setPaySimulating(null);
          setPaySuccess(false);
          fetchData();
        }, 1500);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const toggleHomeworkStatus = (id) => {
    setHomeworkList(prev =>
      prev.map(hw => hw.id === id ? { ...hw, status: hw.status === "Pending" ? "Submitted" : "Pending" } : hw)
    );
  };

  const toggleNotificationRead = (id) => {
    setNotificationsDb(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, unread: false } : n);
      const readIds = updated.filter(n => !n.unread).map(n => n.id);
      localStorage.setItem("sams-read-notifs", JSON.stringify(readIds));
      return updated;
    });
  };

  const markAllNotificationsRead = () => {
    setNotificationsDb(prev => {
      const updated = prev.map(n => ({ ...n, unread: false }));
      const readIds = updated.map(n => n.id);
      localStorage.setItem("sams-read-notifs", JSON.stringify(readIds));
      return updated;
    });
  };

  const handleForgotPassword = async () => {
    if (!data?.student?.email) {
      setOtpError("Email not found for your account.");
      return;
    }
    setAuthLoading(true);
    setOtpError("");
    setOtpSuccess("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.student.email })
      });
      const resData = await res.json();
      if (resData.success) {
        setOtpSuccess("A password recovery OTP has been sent to your registered email.");
        setOtpSent(true); // Switch to OTP mode
        setResendTimer(60);
      } else {
        setOtpError(resData.message || "Failed to initiate password recovery.");
      }
    } catch (err) {
      setOtpError("Unable to connect to the server.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPasswordWithOtp = async (e) => {
    e.preventDefault();
    if (!otpCodeInput) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }
    if (!newPassword || newPassword !== confirmPassword) {
      setOtpError("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setOtpError("New password must be at least 6 characters.");
      return;
    }
    setAuthLoading(true);
    setOtpError("");
    setOtpSuccess("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.student.email, otp: otpCodeInput, newPassword })
      });
      const resData = await res.json();
      if (resData.success) {
        setOtpSuccess("Your security password has been changed successfully!");
        setOtpCodeInput("");
        setNewPassword("");
        setConfirmPassword("");
        setOtpSent(false); // Switch back to normal mode
      } else {
        setOtpError(resData.message || "Invalid or expired recovery code.");
      }
    } catch (err) {
      setOtpError("Unable to connect to the server.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (otpSent) {
      return handleResetPasswordWithOtp(e);
    }
    if (!newPassword || newPassword !== confirmPassword) {
      setOtpError("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setOtpError("New password must be at least 6 characters.");
      return;
    }
    setAuthLoading(true);
    setOtpError("");
    setOtpSuccess("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/sams/student/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const resData = await res.json();
      if (resData.success) {
        setOtpSuccess("Your security password has been changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setOtpError(resData.message || "Failed to update password. Verify current password.");
      }
    } catch (err) {
      setOtpError("Unable to connect to the server.");
    } finally {
      setAuthLoading(false);
    }
  };

  if (loading && !paySimulating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)] gap-4" style={{ minHeight: "100vh" }}>
        <div className="w-10 h-10 rounded-full border-4 border-[var(--card-border)] border-t-[var(--color-brand-gold)] animate-spin"></div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280" }}>Loading your dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-brand-beige p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl"></div>
        <div className="p-8 max-w-sm w-full bg-white rounded-3xl shadow-xl border border-brand-red/10 text-center space-y-5 animate-fade-in-up relative z-10">
          <div className="w-14 h-14 bg-red-50 text-brand-red rounded-full flex items-center justify-center text-2xl mx-auto border border-red-100 shadow-sm animate-bounce">⚠️</div>
          <h3 className="text-sm font-black text-brand-red uppercase tracking-wider">System Connection Failure</h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">{error}</p>
          <button onClick={() => window.location.reload()} className="w-full py-3.5 text-xs font-black text-white bg-brand-blue hover:bg-slate-800 rounded-xl shadow-md transition-all active:scale-95 duration-200 cursor-pointer">RETRY SECURE SESSION</button>
        </div>
      </div>
    );
  }

  // Null safety: data may not be loaded yet (e.g. during payment simulation)
  if (!data) return null;

  const { student, attendance, notices, timetable, fees, results } = data;

  const presentDays = attendance.filter((a) => a.status === "Present" || a.status === "Late").length;
  const attendanceRatio = attendance.length > 0 ? Math.round((presentDays / attendance.length) * 100) : 0;
  const pendingInvoices = fees.filter((f) => f.status === "Unpaid");

  // Re-create the sidebar navigation exactly matching the reference stylesheets (8 links!)
  const MENU_CATALOG = [
    { id: "overview", label: "Dashboard" },
    { id: "attendance", label: "Attendance" },
    { id: "fees", label: "Fees" },
    { id: "academic", label: "Tests & Results" },
    { id: "homework", label: "Homework & Notes" },
    { id: "schedule", label: "Timetable" },
    { id: "notifications", label: "Notifications" },
    { id: "profile", label: "Profile" },
  ];

  // Count type notifications
  const countNotifs = (type) => notificationsDb.filter(n => n.type === type).length;
  const unreadNotifs = notificationsDb.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] grid grid-cols-1 md:grid-cols-[auto_1fr] dotbg overflow-x-hidden md:h-screen md:overflow-hidden">

      {/* 📱 Mobile Menu Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-[#0a1835]/80 backdrop-blur-md z-45 md:hidden transition-opacity duration-300"
        />
      )}

      {/* 🖥️ Fixed Left Sidebar in solid Navy, gold active states, and animated soft premium glow spheres */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 md:sticky md:top-0 md:h-screen shrink-0 border-r border-slate-200/50 bg-[#0a1835] text-white overflow-hidden ${
        sidebarOpen 
          ? "w-64 translate-x-0" 
          : "w-64 -translate-x-full md:translate-x-0 md:w-64"
      }`}>
        {/* Soft floating background spheres in dashboard sidebar */}
        <div 
          className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-[#f1af3c]/15 to-amber-500/10 rounded-full pointer-events-none animate-pulse-glow"
          style={{ filter: "blur(70px)" }}
        ></div>
        <div 
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tr from-[#0f2347]/45 to-[#f1af3c]/10 rounded-full pointer-events-none"
          style={{ filter: "blur(80px)" }}
        ></div>
        
        {/* Brand header */}
        <div className="px-4 py-4 border-b border-white/8 relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="text-left min-w-0">
              <span className="block text-[12.5px] font-black text-white uppercase tracking-wider leading-none whitespace-nowrap">SHARDA ACADEMY</span>
              <span className="block text-[9px] font-bold text-brand-yellow uppercase tracking-widest leading-none mt-1 whitespace-nowrap">STUDENT PORTAL</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 hover:text-brand-yellow cursor-pointer ml-2"
            aria-label="Close Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Nav catalog */}
        <nav className="p-3 flex-grow space-y-1.5 overflow-y-auto no-scrollbar relative z-10">
          {MENU_CATALOG.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  setSidebarOpen(false);
                }}
                className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 group cursor-pointer ${
                  isActive
                    ? "bg-[#f1af3c] text-[#0a1835] shadow-lg shadow-[#f1af3c]/25 translate-x-1 border-l-4 border-[#0a1835]"
                    : "text-slate-100 hover:text-[#f1af3c] hover:bg-white/10 hover:translate-x-0.5 border-l-2 border-transparent hover:border-[#f1af3c]"
                }`}
              >
                {getStudentSidebarIcon(t.id, `h-5 w-5 transition-colors ${isActive ? "text-[#0a1835]" : "text-slate-300 group-hover:text-[#f1af3c]"}`)}
                <span>{t.label.toUpperCase()}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar user pill matching screenshots bottom */}
        <div className="p-4 border-t border-white/8 space-y-3 bg-[#030814]/30 relative z-10">
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-full bg-brand-yellow text-brand-blue flex items-center justify-center font-black text-sm flex-shrink-0 overflow-hidden">
                {student?.profilePhoto ? (
                  <img src={student.profilePhoto.startsWith('http') || student.profilePhoto.startsWith('data:') ? student.profilePhoto : `${API_BASE_URL}${student.profilePhoto}`} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  student?.name?.[0]?.toUpperCase()
                )}
              </div>
              <div className="text-left min-w-0">
                <span className="text-xs font-bold truncate block leading-none text-white sidebar-student-name" style={{ color: '#ffffff' }}>{student?.name?.toUpperCase()}</span>
                <p className="text-[10px] font-semibold truncate mt-1.5" style={{ color: '#cbd5e1' }}>Std {student?.classLevel}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white hover:border-transparent transition-all cursor-pointer flex-shrink-0"
              title="Sign Out Session"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* 🖥️ Header & Main Panel Layout */}
      <div className="flex-grow flex flex-col min-w-0 w-full md:h-screen md:overflow-hidden bg-[var(--background)] relative z-10">
        
        {/* Top Header exactly matching light Sharda theme */}
        <header className="p-4 bg-[#0a1835] border-b-2 border-brand-yellow sticky top-0 z-20 shadow-md">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white md:hidden cursor-pointer border border-white/10"
                aria-label="Open Sidebar Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="text-left">
                <h2 className="text-sm font-black uppercase tracking-wider text-white leading-none">
                  {MENU_CATALOG.find(m => m.id === activeTab)?.label?.toUpperCase()}
                </h2>
                <p className="font-sans text-xs font-semibold text-slate-200 mt-1.5 tracking-wider hidden sm:block">
                  {student?.name} · Std {student?.classLevel}th
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3.5">
              {/* Search Box */}
              <div className="hidden sm:flex items-center gap-2 bg-[#ffffff]/10 border border-white/10 px-3 py-1.5 rounded-xl w-60">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-slate-300 pointer-events-none flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="search-input bg-transparent border-none text-xs w-full text-white focus:outline-none p-0 placeholder-slate-400"
                />
              </div>

              {/* 🌗 Premium Light/Dark Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="hidden sm:flex p-2.5 rounded-xl border border-white/10 bg-white/5 text-white cursor-pointer transition-all items-center justify-center gap-1.5 theme-toggle-btn"
                title="Toggle Theme"
              >
                {darkMode ? (
                  // Moon Icon (shows in Dark Mode)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="#F4B63D" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                ) : (
                  // Sun Icon (shows in Light Mode)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="#F4B63D" className="w-4 h-4 animate-spin-slow">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m9.75-9h-2.25M4.95 19.05l1.59-1.59m11.92-11.92l1.59-1.59M3.52 12h2.25m11.92 7.05l-1.59-1.59M4.95 4.95l1.59 1.59M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
                  </svg>
                )}
              </button>

              {/* Notification bell */}
              <button
                onClick={() => setActiveTab("notifications")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white relative border border-white/5 cursor-pointer transition-all active:scale-95 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                {unreadNotifs > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-yellow border-2 border-[#0a1835] animate-pulse"></span>
                )}
              </button>
              
              {/* Avatar Circle - click to open Profile tab */}
              <button
                onClick={() => setActiveTab("profile")}
                title="My Profile"
                className="w-9 h-9 rounded-full bg-brand-yellow text-slate-900 flex items-center justify-center font-black text-xs border border-brand-yellow/30 flex-shrink-0 shadow-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-brand-yellow/60 transition-all active:scale-95"
              >
                {student?.profilePhoto ? (
                  <img src={student.profilePhoto.startsWith('http') || student.profilePhoto.startsWith('data:') ? student.profilePhoto : `${API_BASE_URL}${student.profilePhoto}`} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  student?.name?.[0]?.toUpperCase()
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-6 w-full max-w-7xl mx-auto space-y-6 flex-grow md:overflow-y-auto md:h-[calc(100vh-70px)] pb-24 md:pb-12 text-left relative z-10">

          {/* ========================================================
              TAB 1: DASHBOARD OVERVIEW
              ======================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* 🌟 OVERVIEW BANNER */}
              <div className="premium-glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-3 text-left">
                  <span className="font-sans text-xs font-bold tracking-wider uppercase text-brand-gold2 bg-brand-yellow/10 border border-brand-yellow/20 px-3 py-1 rounded-lg inline-block">
                    Welcome Back
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {student?.name?.toUpperCase()}
                  </h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-xs sm:text-sm text-slate-500 font-medium">
                    <span>Std: <strong className="welcome-subtitle-val">{student?.classLevel}th</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>Batch: <strong className="welcome-subtitle-val">{student?.batch}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>Roll: <strong className="welcome-subtitle-val">{student?.rollNumber}</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1.5 w-max">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Portal Active</span>
                    </span>
                    <p className="font-sans text-[11px] font-semibold text-slate-550 dark:text-slate-400 mt-1.5">Authenticated Student Session</p>
                  </div>
                  <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-brand-navy items-center justify-center flex-shrink-0 shadow-lg border border-white/10 overflow-hidden">
                    {student?.profilePhoto ? (
                      <img src={student.profilePhoto.startsWith('http') || student.profilePhoto.startsWith('data:') ? student.profilePhoto : `${API_BASE_URL}${student.profilePhoto}`} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display text-2xl font-extrabold text-brand-yellow">{student?.name?.[0]?.toUpperCase()}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 🎴 METRICS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Attendance card (Blue Theme) */}
                <div className="premium-glass-card p-5 flex flex-col justify-between min-h-[120px] border-l-4 border-l-[#0c46c4] shadow-sm hover-glow transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("attendance")}>
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#0c46c4] flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5 text-[#0c46c4]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                    </div>
                    {attendance.length > 0 ? (
                      <span className="hidden sm:inline-flex font-sans text-[10px] font-bold text-blue-600 bg-blue-50/70 border border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 px-2 py-0.5 rounded-full">
                        {attendanceRatio >= 75 ? "Good Standing" : "Below Target"}
                      </span>
                    ) : (
                      <span className="hidden sm:inline-flex font-sans text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 dark:bg-slate-55/10 dark:text-slate-400 dark:border-slate-55/20 px-2 py-0.5 rounded-full">
                        No RFID Scans
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-2xl sm:text-3xl font-black text-[#0c46c4] tracking-tight leading-none">
                      {attendance.length > 0 ? `${attendanceRatio}%` : "--"}
                    </div>
                    <p className="font-sans text-xs font-bold text-slate-505 uppercase tracking-widest mt-1.5">Attendance</p>
                  </div>
                </div>

                {/* 2. Overall Rank Card (Gold Theme) */}
                <div className="premium-glass-card p-5 flex flex-col justify-between min-h-[120px] border-l-4 border-l-[#f1af3c] shadow-sm hover-glow transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("academic")}>
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#d97706] flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5.5 h-5.5 text-[#d97706]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.303-1.2-1-1.5L12 13.5l-3.5.375c-.697.3-1 .879-1 1.5v3.375m9 0h-9M9 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm12 2.25H21a3.75 3.75 0 0 0-3.75-3.75h-1.5m3.75 3.75v3c0 1.243-1.007 2.25-2.25 2.25h-1.5m1.5-5.25h-1.5m-9 0H6.75A3.75 3.75 0 0 0 3 8.25v3c0 1.243 1.007 2.25 2.25 2.25h1.5m-1.5-5.25h1.5" />
                      </svg>
                    </div>
                    {results && results.length > 0 ? (
                      <span className="hidden sm:inline-flex font-sans text-[10px] font-bold text-amber-600 bg-amber-50/60 border border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 px-2 py-0.5 rounded-full">
                        Session Active
                      </span>
                    ) : (
                      <span className="hidden sm:inline-flex font-sans text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 dark:bg-slate-55/10 dark:text-slate-400 dark:border-slate-55/20 px-2 py-0.5 rounded-full">
                        No Graded Exams
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight leading-none">
                      {results && results.length > 0 ? "#--" : "--"}
                    </div>
                    <p className="font-sans text-xs font-bold text-slate-550 uppercase tracking-widest mt-1.5">Overall Rank</p>
                  </div>
                </div>

                {/* 3. Avg Test Score Card (Emerald Theme) */}
                <div className="premium-glass-card p-5 flex flex-col justify-between min-h-[120px] border-l-4 border-l-[#10b981] shadow-sm hover-glow transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("academic")}>
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10b981] flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5.5 h-5.5 text-[#10b981]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.69 50.69 0 0 0-2.24-.223m17.722 0a50.714 50.714 0 0 1 2.24-.223m-17.722 0 8.509-4.75a.75.75 0 0 1 .714 0l8.51 4.75m-18.3 0 1.292-.72M12 17.75v-3.5m-5.75-3v5.25a3 3 0 0 0 3 3h5.5a3 3 0 0 0 3-3v-5.25" />
                      </svg>
                    </div>
                    {results && results.length > 0 ? (
                      <span className="hidden sm:inline-flex font-sans text-[10px] font-bold text-emerald-600 bg-emerald-50/60 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Across {results.length} Exams
                      </span>
                    ) : (
                      <span className="hidden sm:inline-flex font-sans text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 dark:bg-slate-55/10 dark:text-slate-400 dark:border-slate-55/20 px-2 py-0.5 rounded-full">
                        No Graded Scores
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-2xl sm:text-3xl font-black text-[#10b981] tracking-tight leading-none">
                      {results && results.length > 0
                        ? `${Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)}%`
                        : "--"}
                    </div>
                    <p className="font-sans text-xs font-bold text-slate-550 uppercase tracking-widest mt-1.5">Avg. Test Score</p>
                  </div>
                </div>

                {/* 4. Fees Pending Card (Red/Green Reactive Theme) */}
                {(() => {
                  const totalPendingDues = pendingInvoices.reduce((acc, f) => acc + f.amount, 0);
                  const isPending = totalPendingDues > 0;
                  return (
                    <div className={`premium-glass-card p-5 flex flex-col justify-between min-h-[120px] border-l-4 ${isPending ? "border-l-[#dc2626]" : "border-l-[#10b981]"} shadow-sm hover-glow transition-all duration-300 cursor-pointer`} onClick={() => setActiveTab("fees")}>
                      <div className="flex justify-between items-start">
                        <div className={`w-9 h-9 rounded-xl ${isPending ? "bg-red-500/10" : "bg-emerald-500/10"} flex items-center justify-center flex-shrink-0`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${isPending ? "text-[#dc2626]" : "text-[#10b981]"}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-19.5 8.25h3m3 0h3m-9-1.5h18a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                        </div>
                        <span className={`hidden sm:inline-flex font-sans text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isPending 
                            ? "text-rose-600 bg-rose-50/60 border border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20" 
                            : "text-emerald-600 bg-emerald-50/60 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                        }`}>
                          {isPending ? (pendingInvoices[0]?.dueDate ? `Due ${new Date(pendingInvoices[0].dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : "Due soon") : "Cleared"}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className={`font-display text-2xl sm:text-3xl font-black ${isPending ? "text-[#dc2626]" : "text-[#10b981]"} tracking-tight leading-none`}>
                          ₹{totalPendingDues.toLocaleString()}
                        </div>
                        <p className="font-sans text-xs font-bold text-slate-550 uppercase tracking-widest mt-1.5">Fees Pending</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Today's Lectures timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left column: Today's Classes */}
                {/* Left column: Today's Classes */}
                <div className="lg:col-span-7 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider dashboard-section-heading flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 dashboard-section-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span>Today's Class Lectures</span>
                    </h4>
                    <span className="font-sans text-[11px] font-bold text-slate-500 hover:text-brand-yellow cursor-pointer transition-colors" onClick={() => setActiveTab("schedule")}>Full Timetable ↗</span>
                  </div>

                  <div className="space-y-3">
                    {(() => {
                      const todayWeekday = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                      const todaysClasses = timetable && timetable.length > 0 
                        ? timetable.filter(item => item.day.toLowerCase() === todayWeekday.toLowerCase())
                        : [];
                      
                      if (todaysClasses.length > 0) {
                        return todaysClasses.map((lecture, idx) => (
                          <div key={lecture._id || idx} className="p-4 premium-inner-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="text-left">
                              <h5 className="font-display text-sm font-bold text-slate-900 leading-tight">{lecture.subject}</h5>
                              <p className="font-sans text-xs text-slate-500 mt-1 font-semibold">{lecture.teacherName || "Academy Staff"} • {lecture.room || "Classroom"}</p>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-2 sm:pt-0 mt-1 sm:mt-0">
                              <span className="font-mono text-xs text-slate-500">{lecture.startTime} - {lecture.endTime}</span>
                              <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-200/60 text-indigo-600 text-[10px] font-bold uppercase rounded-lg dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20">Scheduled</span>
                            </div>
                          </div>
                        ));
                      }
                      
                      return (
                        <div className="premium-inner-card p-8 text-center flex flex-col items-center justify-center space-y-3">
                          <span className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                          </span>
                          <h5 className="font-display text-sm font-bold text-slate-800 dark:text-slate-200">No Lectures Scheduled Today</h5>
                          <p className="font-sans text-xs text-slate-400 max-w-sm">There are no dynamic classes assigned to your batch for today. Ask your administrator for the schedule release.</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Right Column: Upcoming Tests */}
                <div className="lg:col-span-5 space-y-6">
                  
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-3">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider dashboard-section-heading flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 dashboard-section-icon">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
                        </svg>
                        <span>Upcoming SAMS Tests</span>
                      </h4>
                      <span className="font-sans text-[11px] font-bold text-slate-500 hover:text-brand-yellow cursor-pointer transition-colors" onClick={() => setActiveTab("academic")}>View all ↗</span>
                    </div>

                    <div className="space-y-3 text-xs font-bold text-slate-700">
                      {(() => {
                        const upcomingExams = notices && notices.length > 0
                          ? notices.filter(n => n.category === "Exam" || n.category === "Exam Reminders" || n.category === "Test")
                          : [];
                        
                        if (upcomingExams.length > 0) {
                          return upcomingExams.map((exam, idx) => (
                            <div key={exam._id || idx} className="flex items-center justify-between p-2.5 premium-inner-card hover:border-brand-yellow/30 transition-colors">
                              <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 bg-red-50 text-brand-red border border-red-200 text-[10px] font-extrabold uppercase rounded-lg">
                                  {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                                <span className="text-left font-sans text-xs text-slate-700 dark:text-slate-350">
                                  {exam.title} 
                                  <span className="text-[10px] text-slate-400 block mt-0.5 font-medium line-clamp-1">{exam.content}</span>
                                </span>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </div>
                          ));
                        }
                        
                        return (
                          <div className="premium-inner-card p-6 text-center flex flex-col items-center justify-center space-y-3">
                            <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400 dark:text-slate-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.303-1.2-1-1.5L12 13.5l-3.5.375c-.697.3-1 .879-1 1.5v3.375m9 0h-9M9 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm12 2.25H21a3.75 3.75 0 0 0-3.75-3.75h-1.5m3.75 3.75v3c0 1.243-1.007 2.25-2.25 2.25h-1.5m1.5-5.25h-1.5m-9 0H6.75A3.75 3.75 0 0 0 3 8.25v3c0 1.243 1.007 2.25 2.25 2.25h1.5m-1.5-5.25h1.5" />
                              </svg>
                            </span>
                            <h5 className="font-display text-xs font-bold text-slate-800 dark:text-slate-200">No Upcoming Tests Scheduled</h5>
                            <p className="font-sans text-[10px] text-slate-400 max-w-[240px]">No upcoming test dates or exam schedules are currently published in the database.</p>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Performance Snapshot */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-2.5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider dashboard-section-heading">Performance Snapshot</h4>
                      <span className="font-sans text-xs font-bold text-slate-400">Weekly Tracker</span>
                    </div>

                    <div className="space-y-4">
                      {(() => {
                        const subjectTotals = {};
                        if (results) {
                          results.forEach(r => {
                            if (r.marks && r.marks.length > 0) {
                              r.marks.forEach(m => {
                                if (!subjectTotals[m.subject]) {
                                  subjectTotals[m.subject] = { obtained: 0, max: 0 };
                                }
                                subjectTotals[m.subject].obtained += m.obtained;
                                subjectTotals[m.subject].max += m.max;
                              });
                            }
                          });
                        }
                        const snapshotSubjectAverages = Object.keys(subjectTotals).map(subj => {
                          const avg = Math.round((subjectTotals[subj].obtained / subjectTotals[subj].max) * 100);
                          return { subject: subj, val: avg };
                        });
                        const overallAvg = results && results.length > 0
                          ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)
                          : 0;

                        if (results && results.length > 0 && snapshotSubjectAverages.length > 0) {
                          const colors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-orange-500", "bg-red-500"];
                          return (
                            <>
                              {/* Overall Progress bar */}
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold text-slate-505">
                                  <span>Overall Academic Performance</span>
                                  <span className="welcome-subtitle-val">{overallAvg}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-white/5 h-2.5 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/30">
                                  <div className="bg-brand-yellow h-full rounded-full animate-pulse-glow" style={{ width: `${overallAvg}%` }}></div>
                                </div>
                              </div>
                              
                              {/* Subject progress lines */}
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-2 text-xs font-bold text-slate-500 border-t border-slate-100 dark:border-slate-800/60">
                                {snapshotSubjectAverages.map((subj, idx) => (
                                  <div key={idx} className="space-y-1">
                                    <div className="flex justify-between"><span>{subj.subject}:</span><span className="text-slate-900 dark:text-white font-extrabold">{subj.val}%</span></div>
                                    <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                      <div className={`${colors[idx % colors.length]} h-full rounded-full`} style={{ width: `${subj.val}%` }}></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          );
                        }

                        return (
                          <div className="p-6 text-center flex flex-col items-center justify-center space-y-3">
                            <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                              </svg>
                            </span>
                            <h5 className="font-display text-xs font-bold text-slate-800 dark:text-slate-200">No Graded Results Found</h5>
                            <p className="font-sans text-[10px] text-slate-400 max-w-[240px]">Academic metrics and subject percentages will compile here as graded exam cards are registered in SAMS.</p>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Notices */}
              <div className="premium-glass-card p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider dashboard-section-heading flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 dashboard-section-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                    </svg>
                    <span>Recent Notices & System Feeds</span>
                  </h4>
                  <span className="font-sans text-[11px] font-bold text-slate-500 hover:text-brand-yellow cursor-pointer transition-colors" onClick={() => setActiveTab("notifications")}>All Notices ↗</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(() => {
                    const displayNotices = notices && notices.length > 0 ? notices.slice(0, 3) : [];
                    if (displayNotices.length > 0) {
                      return displayNotices.map((n, idx) => {
                        const isExam = n.category === "Exam" || n.category === "Exam Reminders" || n.category === "Test" || n.category === "Student";
                        const isHoliday = n.category === "Holiday" || n.category === "Holidays";
                        const badgeStyle = isExam ? "bg-red-50 text-brand-red border border-red-200/50" :
                                           isHoliday ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50" :
                                           "bg-blue-50 text-blue-600 border border-blue-200/50";
                        return (
                          <div key={n._id || idx} className="p-4 premium-inner-card text-left space-y-2 hover-glow transition-all">
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded ${badgeStyle}`}>{n.category || "Notice"}</span>
                              <span className="text-[10px] font-mono text-slate-400 font-bold">
                                {new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">{n.title}</h5>
                            <p className="font-sans text-xs text-slate-550 leading-relaxed font-medium line-clamp-2">{n.content}</p>
                          </div>
                        );
                      });
                    }

                    return (
                      <div className="col-span-1 md:col-span-3 p-8 text-center flex flex-col items-center justify-center space-y-3 premium-inner-card">
                        <span className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                          </svg>
                        </span>
                        <h5 className="font-display text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">All Caught Up!</h5>
                        <p className="font-sans text-xs text-slate-400">No recent notices have been posted by the administration.</p>
                      </div>
                    );
                  })()}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 2: ATTENDANCE TRACKER
              ======================================================== */}
          {activeTab === "attendance" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Four horizontal stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Overall Attendance", val: `${attendance.length > 0 ? attendanceRatio : 0}%`, sub: `${presentDays} of ${attendance.length} days`, progress: attendance.length > 0 ? attendanceRatio : 0, bgColor: "bg-brand-yellow", textColor: "text-slate-900" },
                  { label: "Days Present", val: presentDays, sub: "Gate verified scan", progress: attendance.length > 0 ? Math.round((presentDays / attendance.length) * 100) : 0, bgColor: "bg-emerald-500", textColor: "text-emerald-600" },
                  { label: "Days Absent", val: attendance.length - presentDays, sub: "Unexcused absences", progress: attendance.length > 0 ? Math.round(((attendance.length - presentDays) / attendance.length) * 100) : 0, bgColor: "bg-red-500", textColor: "text-brand-red" },
                  { label: "Late check-ins", val: attendance.filter(a => a.status === "Late").length, sub: "Check-in after gate cutoff", progress: attendance.length > 0 ? Math.round((attendance.filter(a => a.status === "Late").length / attendance.length) * 100) : 0, bgColor: "bg-blue-500", textColor: "text-blue-600" }
                ].map((ring, idx) => (
                  <div key={idx} className="p-5 premium-glass-card flex flex-col justify-between min-h-[110px]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{ring.label}</span>
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold ${ring.textColor} bg-slate-100 dark:bg-white/5`}>{ring.val}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/30">
                      <div className={`${ring.bgColor} h-full rounded-full`} style={{ width: `${ring.progress}%` }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-semibold">{ring.sub}</p>
                  </div>
                ))}
              </div>

              {attendance.length === 0 ? (
                <div className="premium-glass-card p-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center relative overflow-hidden animate-pulse">
                    <div className="biometric-laser-line"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a14.805 14.805 0 0 0 1.586 6.74M15.01 1.777a8.962 8.962 0 0 1 3.74 2.235M8.457 20.278a14.887 14.887 0 0 1-2.715-3.328M11.662 2.011a8.968 8.968 0 0 1 3.2 1.53m-7.817 14.3a14.852 14.852 0 0 1-1.047-3.473M10.5 8.5a1.5 1.5 0 1 1 3 0v4.882c0 .866-.491 1.652-1.258 2.002L10.5 16.5M9 10.5a3 3 0 0 1 6 0v2.882c0 .577.327 1.101.839 1.335l.661.303" />
                    </svg>
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-800 dark:text-slate-100">No Biometric Logs Found</h4>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                    There are no dynamic biometric check-in/check-out logs associated with your RFID student profile card. 
                    Please scan your RFID card at the academy gates upon entry and exit to log attendance.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Attendance History Table */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-3">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-navy">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z" />
                        </svg>
                        <span>Biometric Attendance Gate History</span>
                      </h4>
                      <span className="font-sans text-xs font-bold text-slate-400 hover:text-brand-yellow cursor-pointer transition-colors">Export CSV ↗</span>
                    </div>

                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200/60 dark:border-slate-800/30 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-3.5 px-4">Date</th>
                            <th className="py-3.5 px-4 text-center">Check-In Time</th>
                            <th className="py-3.5 px-4 text-center">Check-Out Time</th>
                            <th className="py-3.5 px-4 text-center">Verification Method</th>
                            <th className="py-3.5 px-4 text-center">Gate Terminal</th>
                            <th className="py-3.5 px-4 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/30 font-semibold text-slate-700 dark:text-slate-300">
                          {attendance.map((row, idx) => {
                            const val = row.status;
                            const badgeColor = val === "Present" ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400" :
                                               val === "Late" ? "bg-blue-50 text-blue-600 border border-blue-200/50 dark:bg-blue-500/10 dark:text-blue-400" :
                                               "bg-red-50 text-brand-red border border-red-200/50 dark:bg-red-500/10 dark:text-rose-450";
                            return (
                              <tr key={row._id || idx} className="hover:bg-slate-50/10 transition-all">
                                <td className="py-3.5 px-4 text-slate-900 dark:text-white font-mono font-bold">{row.date}</td>
                                <td className="py-3.5 px-4 text-center font-mono">{row.checkInTime || "--"}</td>
                                <td className="py-3.5 px-4 text-center font-mono">{row.checkOutTime || "--"}</td>
                                <td className="py-3.5 px-4 text-center font-mono">{row.method || "Biometric RFID"}</td>
                                <td className="py-3.5 px-4 text-center">{row.deviceName || "Biometric Gate Sync"}</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                                    {val}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================
              TAB 3: FEES LEDGER
              ======================================================== */}
          {activeTab === "fees" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Three horizontal stats card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* 1. Total Paid Card */}
                {(() => {
                  const totalPaid = fees.filter(f => f.status === "Paid").reduce((acc, f) => acc + f.amount, 0);
                  const totalPaidInstallments = fees.filter(f => f.status === "Paid").length;
                  return (
                    <div className="p-5 premium-glass-card text-left flex justify-between items-center shadow-sm">
                      <div className="space-y-2">
                        <h5 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider leading-none">Total Amount Paid</h5>
                        <p className="font-display text-2xl font-extrabold text-slate-900 dark:text-white leading-none">₹{totalPaid.toLocaleString()}</p>
                        <p className="font-sans text-xs font-semibold text-emerald-600 leading-none pt-1">{totalPaidInstallments} installments cleared</p>
                      </div>
                      <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </span>
                    </div>
                  );
                })()}

                {/* 2. Pending dues Card */}
                {(() => {
                  const totalPendingDues = pendingInvoices.reduce((acc, f) => acc + f.amount, 0);
                  return (
                    <div className="p-5 premium-glass-card text-left flex justify-between items-center shadow-sm">
                      <div className="space-y-2">
                        <h5 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider leading-none">Outstanding Dues</h5>
                        <p className="font-display text-2xl font-extrabold text-slate-900 dark:text-white leading-none">₹{totalPendingDues.toLocaleString()}</p>
                        <p className="font-sans text-xs font-semibold text-brand-gold2 leading-none pt-1">
                          {pendingInvoices.length > 0 ? `Next due: ${new Date(pendingInvoices[0].dueDate).toLocaleDateString()}` : "All settled"}
                        </p>
                      </div>
                      <span className="w-10 h-10 rounded-xl bg-amber-50 text-brand-gold2 flex items-center justify-center border border-brand-yellow/20 dark:bg-amber-500/10 dark:text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                      </span>
                    </div>
                  );
                })()}

                {/* 3. Total Course Fee progression */}
                {(() => {
                  const totalPaid = fees.filter(f => f.status === "Paid").reduce((acc, f) => acc + f.amount, 0);
                  const totalCourseFee = fees.reduce((acc, f) => acc + f.amount, 0);
                  const paidPercent = totalCourseFee > 0 ? Math.round((totalPaid / totalCourseFee) * 100) : 0;
                  return (
                    <div className="p-5 premium-glass-card text-left flex flex-col justify-between shadow-sm min-h-[110px]">
                      <div className="flex justify-between items-center mb-2">
                        <div className="space-y-2">
                          <h5 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider leading-none">Total Course Fee</h5>
                          <p className="font-display text-2xl font-extrabold text-slate-900 dark:text-white leading-none">₹{totalCourseFee.toLocaleString()}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-50 text-[10px] font-extrabold uppercase rounded-lg">{paidPercent}% paid</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/30">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: `${paidPercent}%` }}></div>
                      </div>
                    </div>
                  );
                })()}
                
              </div>

              {/* Payment History & Breakdown tables */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left panel: Payment History Table */}
                <div className="lg:col-span-8 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-19.5 8.25h3m3 0h3m-9-1.5h18a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25Z" />
                      </svg>
                      <span>SAMS Payment History Ledger</span>
                    </h4>
                    <span className="font-sans text-xs font-bold text-slate-400 hover:text-brand-yellow cursor-pointer transition-colors">Download Receipt ↗</span>
                  </div>

                  {fees && fees.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200/60 dark:border-slate-800/30 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-3 px-3">Transaction ID</th>
                            <th className="py-3 px-3">Period</th>
                            <th className="py-3 px-3">Date</th>
                            <th className="py-3 px-3">Mode</th>
                            <th className="py-3 px-3">Amount</th>
                            <th className="py-3 px-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/30 font-semibold text-slate-700 dark:text-slate-350">
                          {fees.map((row, idx) => (
                            <tr key={row._id || idx} className="hover:bg-slate-50/10 transition-all">
                              <td className="py-3.5 px-3 font-mono text-xs text-slate-900 dark:text-white font-bold">{row.invoiceId}</td>
                              <td className="py-3.5 px-3">{row.description}</td>
                              <td className="py-3.5 px-3 font-mono text-xs text-slate-450 font-medium">
                                {row.status === "Paid" && row.paymentDate ? new Date(row.paymentDate).toLocaleDateString() : `Due ${row.dueDate}`}
                              </td>
                              <td className="py-3.5 px-3 text-slate-500 font-medium">{row.paymentMethod || "--"}</td>
                              <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">₹{(row.amount || 0).toLocaleString()}</td>
                              <td className="py-3.5 px-3 text-center flex items-center justify-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  row.status === "Paid" 
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400" 
                                    : "bg-red-50 text-brand-red border border-red-200/50 dark:bg-red-500/10 dark:text-rose-450"
                                }`}>{row.status}</span>
                                {row.status === "Paid" && (
                                  <button
                                    onClick={() => handlePrintReceipt(row)}
                                    className="px-2 py-1.5 text-[8px] font-black uppercase text-[#0a1835] bg-brand-yellow hover:bg-amber-400 border border-transparent rounded shadow-sm transition duration-200 cursor-pointer flex items-center gap-1"
                                    title="Print Receipt"
                                  >
                                    <span>Receipt</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                      <span className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-19.5 8.25h3m3 0h3m-9-1.5h18a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                      </span>
                      <h5 className="font-display text-sm font-bold text-slate-800 dark:text-slate-200">No Fee Transactions Found</h5>
                      <p className="font-sans text-xs text-slate-400 max-w-sm">No transaction invoices have been generated for your student profile by the academy administration.</p>
                    </div>
                  )}
                </div>

                {/* Right panel: tuition dues breakdown & action */}
                <div className="lg:col-span-4 space-y-6">
                  {pendingInvoices.length > 0 ? (
                    <>
                      {/* Dynamic Invoice Breakdown */}
                      <div className="premium-glass-card p-5 space-y-4">
                        <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2.5">
                          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Invoice Fee Breakdown</h4>
                        </div>

                        <div className="space-y-3.5 text-xs font-semibold text-slate-650">
                          <div className="flex justify-between"><span>Base Tuition Fee</span><span className="text-slate-900 dark:text-white font-bold">₹{Math.round(pendingInvoices[0].amount * 0.85).toLocaleString()}</span></div>
                          <div className="flex justify-between"><span>Coaching Material Sync</span><span className="text-slate-900 dark:text-white font-bold">₹{Math.round(pendingInvoices[0].amount * 0.10).toLocaleString()}</span></div>
                          <div className="flex justify-between"><span>System Maintenance Fee</span><span className="text-slate-900 dark:text-white font-bold">₹{Math.round(pendingInvoices[0].amount * 0.05).toLocaleString()}</span></div>
                          <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-800/30 my-2"></div>
                          <div className="flex justify-between text-brand-navy font-extrabold text-sm"><span>Total Due</span><span className="text-brand-gold2 font-display text-base font-extrabold">₹{pendingInvoices[0].amount.toLocaleString()}</span></div>
                        </div>
                      </div>

                      {/* Payment due action box */}
                      <div className="p-5 premium-inner-card text-left space-y-4 shadow-sm">
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold2 bg-brand-yellow/10 px-2.5 py-1 rounded-md inline-block">PAYMENT DUE SOON</p>
                          <h3 className="font-display text-2xl font-black text-slate-900 dark:text-white tracking-tight pt-1">₹{pendingInvoices[0].amount.toLocaleString()}</h3>
                          <p className="font-sans text-xs text-slate-500 dark:text-slate-400 font-semibold font-mono">Due Date: {pendingInvoices[0].dueDate}</p>
                        </div>

                        <div className="space-y-3">
                          <button
                            onClick={() => setPaySimulating(pendingInvoices[0])}
                            className="w-full py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-brand-navy hover:bg-slate-800 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 duration-200 text-center block border-none font-sans"
                          >
                            Pay Now — UPI / Net Banking
                          </button>
                          <button
                            onClick={() => alert("Initiating official PDF billing download...")}
                            className="w-full py-3 text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-200 bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/20 rounded-xl transition cursor-pointer text-center block border border-slate-200 dark:border-slate-800/40 shadow-sm font-sans"
                          >
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="premium-glass-card p-6 text-center space-y-3">
                      <span className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <h5 className="font-display text-sm font-bold text-emerald-600 dark:text-emerald-400">All Fees Settled</h5>
                      <p className="font-sans text-xs text-slate-400">Your student account has zero outstanding invoices. Excellent compliance!</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* ========================================================
              TAB 4: TESTS & RESULTS
              ======================================================== */}
          {activeTab === "academic" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Top stats 4 widgets cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 premium-glass-card text-left shadow-sm">
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Current Class Rank</p>
                  <p className="font-display text-2xl font-extrabold text-brand-navy dark:text-white mt-1.5">{results && results.length > 0 ? "#--" : "--"}</p>
                  <p className="font-sans text-[11px] text-emerald-600 font-semibold mt-1">
                    {results && results.length > 0 ? "Academic Session Active" : "No graded exams logged"}
                  </p>
                </div>

                <div className="p-4 premium-glass-card text-left shadow-sm">
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Latest Test Score</p>
                  {(() => {
                    if (results && results.length > 0) {
                      const latest = results[0];
                      let latestObtained = 0, latestMax = 0;
                      if (latest.marks && latest.marks.length > 0) {
                        latest.marks.forEach(m => { latestObtained += m.obtained; latestMax += m.max; });
                      }
                      return (
                        <>
                          <p className="font-display text-2xl font-extrabold text-brand-navy dark:text-white mt-1.5 font-mono">
                            {latestMax > 0 ? `${latestObtained}/${latestMax}` : `${latest.percentage}%`}
                          </p>
                          <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-extrabold rounded-lg inline-block mt-1 truncate max-w-full dark:bg-amber-500/10 dark:text-amber-400">{latest.examName}</span>
                        </>
                      );
                    }
                    return (
                      <>
                        <p className="font-display text-2xl font-extrabold text-brand-navy dark:text-white mt-1.5">--</p>
                        <span className="px-2.5 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 text-[10px] font-semibold rounded-lg inline-block mt-1">Pending Grading</span>
                      </>
                    );
                  })()}
                </div>

                <div className="p-4 premium-glass-card text-left shadow-sm">
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Average Test Score</p>
                  {(() => {
                    if (results && results.length > 0) {
                      const avgScore = Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length);
                      return (
                        <>
                          <p className="font-display text-2xl font-extrabold text-brand-navy dark:text-white mt-1.5">{avgScore}%</p>
                          <p className="font-sans text-[11px] text-slate-505 font-semibold mt-1">Across {results.length} exams</p>
                        </>
                      );
                    }
                    return (
                      <>
                        <p className="font-display text-2xl font-extrabold text-brand-navy dark:text-white mt-1.5">--</p>
                        <p className="font-sans text-[11px] text-slate-400 font-semibold mt-1">No scores compiled</p>
                      </>
                    );
                  })()}
                </div>

                <div className="p-4 premium-glass-card text-left shadow-sm">
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Tests Attempted</p>
                  <p className="font-display text-2xl font-extrabold text-brand-navy dark:text-white mt-1.5">{results ? results.length : 0}</p>
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200/60 text-[10px] font-extrabold rounded-lg inline-block mt-1 dark:bg-indigo-500/10 dark:text-indigo-400">Total session entries</span>
                </div>

              </div>

              {/* Mid panel split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Test History Table */}
                <div className="lg:col-span-8 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z" />
                      </svg>
                      <span>Complete Test Performance Ledger</span>
                    </h4>
                    <span className="font-sans text-xs font-bold text-slate-400 hover:text-brand-yellow cursor-pointer transition-colors">Download Report ↗</span>
                  </div>

                  <div className="overflow-x-auto w-full">
                    {results && results.length > 0 ? (
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200/60 dark:border-slate-800/30 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-3 px-3">Test Name</th>
                            <th className="py-3 px-3 font-mono">Date</th>
                            <th className="py-3 px-3 text-center">Subject-wise Breakdown</th>
                            <th className="py-3 px-3 text-center">Total Marks</th>
                            <th className="py-3 px-3 text-center">Percentage</th>
                            <th className="py-3 px-3 text-center">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/30 font-semibold text-slate-700 dark:text-slate-300">
                          {results.map((row, idx) => {
                            let obtainedSum = 0, maxSum = 0;
                            if (row.marks && row.marks.length > 0) {
                              row.marks.forEach(m => { obtainedSum += m.obtained; maxSum += m.max; });
                            }
                            return (
                              <tr key={row._id || idx} className="hover:bg-slate-50/10 transition-all">
                                <td className="py-3.5 px-3 text-slate-900 dark:text-white font-bold">{row.examName}</td>
                                <td className="py-3.5 px-3 font-mono text-xs text-slate-400 font-medium">
                                  {new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                </td>
                                <td className="py-3.5 px-3 text-center font-mono text-[11px]">
                                  {row.marks ? row.marks.map(m => `${m.subject}: ${m.obtained}/${m.max}`).join(", ") : "--"}
                                </td>
                                <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-900 dark:text-white">{obtainedSum}/{maxSum}</td>
                                <td className="py-3.5 px-3 text-center font-mono text-emerald-650 font-extrabold">{row.percentage}%</td>
                                <td className="py-3.5 px-3 text-center">
                                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-extrabold dark:bg-amber-500/10 dark:text-amber-400">{row.grade}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                        <span className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.3 8.35a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                          </svg>
                        </span>
                        <h5 className="font-display text-sm font-bold text-slate-800 dark:text-slate-200">No scored tests logged</h5>
                        <p className="font-sans text-xs text-slate-400 max-w-sm">No exam cards or graded tests are currently compiled in your SAMS dynamic portfolio ledger.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right column vertical Subject performance & Ranks progression */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Subject performance progress bars */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2.5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Subject Averages</h4>
                    </div>

                    <div className="space-y-3">
                      {(() => {
                        const subjectTotals = {};
                        if (results) {
                          results.forEach(r => {
                            if (r.marks && r.marks.length > 0) {
                              r.marks.forEach(m => {
                                if (!subjectTotals[m.subject]) {
                                  subjectTotals[m.subject] = { obtained: 0, max: 0 };
                                }
                                subjectTotals[m.subject].obtained += m.obtained;
                                subjectTotals[m.subject].max += m.max;
                              });
                            }
                          });
                        }
                        const subjectAverages = Object.keys(subjectTotals).map(subj => {
                          const avg = Math.round((subjectTotals[subj].obtained / subjectTotals[subj].max) * 100);
                          return { subject: subj, average: avg };
                        });
                        
                        if (subjectAverages.length === 0) {
                          return <div className="text-xs text-slate-400 text-center py-4 font-semibold">No dynamic averages graded.</div>;
                        }
                        
                        const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-orange-500", "bg-red-500"];
                        return subjectAverages.map((subj, idx) => (
                          <div key={idx} className="space-y-1 text-xs font-bold text-slate-500">
                            <div className="flex justify-between"><span>{subj.subject}</span><span className="text-slate-900 dark:text-white font-extrabold">{subj.average}%</span></div>
                            <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/30">
                              <div className={`${colors[idx % colors.length]} h-full rounded-full`} style={{ width: `${subj.average}%` }}></div>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Rank progression list */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2.5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Rank Progression</h4>
                    </div>
                    
                    <div className="space-y-2 text-xs font-bold text-slate-650">
                      {results && results.length > 0 ? (
                        results.map((item, idx) => (
                          <div key={item._id || idx} className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0 dark:border-slate-800/20">
                            <span>{item.examName}</span>
                            <span className="px-2 py-0.5 rounded border text-[10px] font-extrabold bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-400">{item.grade} Grade</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 text-center py-2 font-semibold">No progression records.</div>
                      )}
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Subject Marks cards */}
              {(() => {
                const subjectTotals = {};
                if (results) {
                  results.forEach(r => {
                    if (r.marks && r.marks.length > 0) {
                      r.marks.forEach(m => {
                        if (!subjectTotals[m.subject]) {
                          subjectTotals[m.subject] = { obtained: 0, max: 0 };
                        }
                        subjectTotals[m.subject].obtained += m.obtained;
                        subjectTotals[m.subject].max += m.max;
                      });
                    }
                  });
                }
                const subjectAverages = Object.keys(subjectTotals).map(subj => {
                  const avg = Math.round((subjectTotals[subj].obtained / subjectTotals[subj].max) * 100);
                  return { subject: subj, average: avg, ratio: `${subjectTotals[subj].obtained}/${subjectTotals[subj].max}` };
                });
                
                if (subjectAverages.length === 0) return null;
                
                const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-650", "bg-orange-500", "bg-red-500"];
                const textColors = ["text-blue-600", "text-emerald-600", "text-purple-650", "text-orange-500", "text-red-500"];
                
                return (
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                    {subjectAverages.map((gauge, idx) => (
                      <div key={idx} className="p-4 premium-glass-card flex flex-col justify-between min-h-[95px] shadow-sm">
                        <div className="flex justify-between items-start">
                          <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">{gauge.subject}</span>
                          <span className={`text-[11px] font-extrabold ${textColors[idx % textColors.length]}`}>{gauge.ratio}</span>
                        </div>
                        <div className="mt-2.5">
                          <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/30">
                            <div className={`${colors[idx % colors.length]} h-full rounded-full`} style={{ width: `${Math.min(gauge.average, 100)}%` }}></div>
                          </div>
                          <span className="text-[10px] text-slate-405 block mt-1 font-semibold">{gauge.average}% Aggregate</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

            </div>
          )}

          {/* ========================================================
              TAB 5: HOMEWORKS & NOTES
              ======================================================== */}
          {activeTab === "homework" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Four stats horizontal widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 premium-inner-card flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Total Homework</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 dark:text-white mt-2 leading-none">{homeworkList.length}</p>
                  </div>
                </div>

                <div className="p-4 premium-inner-card flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-2.72 8.347-2.625 2.625L9 12.25" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Submitted Tasks</h5>
                    <p className="font-display text-lg font-extrabold text-[#10b981] mt-2 leading-none">
                      {homeworkList.filter(h => h.status === "Submitted").length}
                    </p>
                  </div>
                </div>

                <div className="p-4 premium-inner-card flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-brand-yellow flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Pending Homework</h5>
                    <p className="font-display text-lg font-extrabold text-[#f1af3c] mt-2 leading-none">
                      {homeworkList.filter(h => h.status === "Pending").length}
                    </p>
                  </div>
                </div>

                <div className="p-4 premium-inner-card flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-red-500/10 text-brand-red flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Late / Missed</h5>
                    <p className="font-display text-lg font-extrabold text-[#dc2626] mt-2 leading-none">
                      {homeworkList.filter(h => h.status === "Late").length}
                    </p>
                  </div>
                </div>

              </div>

              {/* Homework split with PDF notes */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left column: Homework lists */}
                <div className="lg:col-span-7 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z" />
                      </svg>
                      <span>Weekly Homework Tasks</span>
                    </h4>
                    <span className="font-sans text-[11px] font-bold text-slate-505 hover:text-brand-yellow cursor-pointer transition-colors" onClick={() => alert("Marked all assignments complete.")}>Mark All Done</span>
                  </div>

                  {homeworkList && homeworkList.length > 0 ? (
                    <div className="space-y-3">
                      {homeworkList.map((hw) => {
                        const isSubmitted = hw.status === "Submitted";
                        const isLate = hw.status === "Late";
                        
                        const badgeColor = hw.subject === "Physics" ? "bg-blue-50 text-blue-600 border border-blue-200/55 dark:bg-blue-500/10 dark:text-blue-400" :
                                           hw.subject === "Mathematics" ? "bg-purple-50 text-purple-600 border border-purple-200/55 dark:bg-purple-500/10 dark:text-purple-400" :
                                           hw.subject === "Chemistry" ? "bg-emerald-50 text-emerald-600 border border-emerald-200/55 dark:bg-emerald-500/10 dark:text-emerald-400" :
                                           hw.subject === "Biology" ? "bg-orange-50 text-orange-500 border border-orange-200/55 dark:bg-orange-500/10 dark:text-orange-400" :
                                           "bg-red-50 text-brand-red border border-red-200/55 dark:bg-red-500/10 dark:text-rose-450";
                                           
                        return (
                          <div key={hw.id} className="p-3.5 premium-inner-card flex items-center justify-between gap-4">
                            <div className="text-left space-y-1.5 min-w-0">
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${badgeColor}`}>{hw.subject}</span>
                                <span>by {hw.teacher}</span>
                              </div>
                              <h5 className={`font-display text-xs sm:text-sm font-bold truncate leading-snug ${isSubmitted ? "text-slate-400 line-through dark:text-slate-500" : "text-slate-900 dark:text-white"}`}>{hw.title}</h5>
                              <p className="font-sans text-[11px] text-slate-400">Due {hw.dueDate}</p>
                            </div>
                            
                            <div className="flex items-center gap-2.5 flex-shrink-0">
                              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                                isSubmitted ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400" :
                                isLate ? "bg-red-50 text-brand-red border border-red-200/50 dark:bg-red-500/10 dark:text-rose-450" :
                                "bg-amber-50 text-amber-600 border border-amber-200/40 dark:bg-amber-500/10 dark:text-amber-400"
                              }`}>{hw.status}</span>
                              
                              {hw.attachmentData && (
                                <button
                                  onClick={() => handleDownload(hw.attachmentName || "homework.pdf", hw.attachmentData)}
                                  className="p-1.5 bg-white dark:bg-white/5 hover:bg-brand-yellow text-blue-600 hover:text-[#0a1835] border border-slate-200 dark:border-slate-800/40 rounded-lg transition-all cursor-pointer shadow-sm active:scale-90 flex items-center justify-center"
                                  title="Download Attachment"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-650 dark:text-slate-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                  </svg>
                                </button>
                              )}

                              <button
                                onClick={() => toggleHomeworkStatus(hw.id)}
                                className="p-1.5 bg-white dark:bg-white/5 hover:bg-brand-yellow text-slate-800 hover:text-slate-900 border border-slate-200 dark:border-slate-800/40 rounded-lg transition-all cursor-pointer shadow-sm active:scale-90 flex items-center justify-center"
                                title="Toggle status"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-650 dark:text-slate-350">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="premium-inner-card p-8 text-center flex flex-col items-center justify-center space-y-3">
                      <span className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                      </span>
                      <h5 className="font-display text-sm font-bold text-slate-800 dark:text-slate-200">No Homework Tasks Assigned</h5>
                      <p className="font-sans text-xs text-slate-400 max-w-sm">There are no homework tasks currently assigned to your batch profile in the database.</p>
                    </div>
                  )}

                  {/* Note: Submission status is tracked locally and resets on page refresh. */}
                  <p className="text-[10px] text-slate-400 font-semibold italic pt-1 border-t border-slate-100 dark:border-slate-800/50">
                    Note: Submission status is tracked locally and resets on page refresh.
                  </p>
                </div>

                {/* Right Column: PDF Study Notes list */}
                <div className="lg:col-span-5 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                      <span>SAMS Study Notes & PDFs</span>
                    </h4>
                    <span className="font-sans text-xs font-bold text-slate-505 hover:text-brand-yellow cursor-pointer transition-colors">View All ↗</span>
                  </div>

                  {studyNotes && studyNotes.length > 0 ? (
                    <div className="space-y-3">
                      {studyNotes.map((note) => (
                        <div key={note.id} className="p-3 premium-inner-card flex items-center justify-between gap-3 hover-glow transition-all">
                          <div className="flex items-center gap-3 min-w-0 text-left">
                            <span className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/40 text-brand-yellow flex items-center justify-center flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-brand-gold2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z" />
                              </svg>
                            </span>
                            <div className="min-w-0">
                              <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate leading-none">{note.title}</h5>
                              <p className="font-sans text-[11px] text-slate-400 mt-1.5 font-semibold">{note.pages} • {note.size} • {note.date}</p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDownload(note.attachmentName || `${note.title}.pdf`, note.attachmentData)}
                            className="p-1.5 bg-white dark:bg-white/5 hover:bg-brand-yellow text-slate-900 rounded-lg border border-slate-200 dark:border-slate-800/40 transition cursor-pointer flex-shrink-0 shadow-sm flex items-center justify-center"
                            title="Download Note"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="premium-inner-card p-8 text-center flex flex-col items-center justify-center space-y-3">
                      <span className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                      </span>
                      <h5 className="font-display text-sm font-bold text-slate-800 dark:text-slate-200">No Study Materials</h5>
                      <p className="font-sans text-xs text-slate-400 max-w-sm">No coaching resource PDFs or lecture notes have been published in SAMS yet.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* ========================================================
              TAB 6: CLASS TIMETABLE (WEEKLY TIME-SLOT GRID TABLE!)
              ======================================================== */}
          {activeTab === "schedule" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-3">
                <div className="text-left">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy dark:text-white">Class Timetable</h4>
                  <p className="font-sans text-xs font-semibold text-slate-400 font-mono mt-1">January 2026 • Standard {student?.classLevel}th Board Batch A</p>
                </div>
                <span className="font-sans text-[10px] font-bold text-[#0a1835] dark:text-brand-yellow bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-slate-800/40 px-2.5 py-1 rounded uppercase tracking-wider">ACADEMIC AGENDA</span>
              </div>

              {/* Top card: Today's lectures */}
              <div className="premium-glass-card p-5 space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-ping"></span>
                  <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    Today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="px-2.5 py-0.5 bg-brand-yellow text-slate-900 text-[10px] font-extrabold uppercase rounded-lg shadow-sm">Today</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {(() => {
                    const todayWeekdayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                    const scheduleTodayClasses = timetable && timetable.length > 0 
                      ? timetable.filter(item => item.day.toLowerCase() === todayWeekdayName.toLowerCase())
                      : [];
                    
                    if (scheduleTodayClasses.length > 0) {
                      return scheduleTodayClasses.map((lecture, idx) => (
                        <div key={lecture._id || idx} className="p-3.5 premium-inner-card space-y-1.5 relative">
                          <div className="flex justify-between items-center">
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{lecture.subject}</h5>
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-indigo-50 border border-indigo-200/60 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20">Scheduled</span>
                          </div>
                          <p className="font-mono text-xs text-brand-navy dark:text-slate-200 font-bold">{lecture.startTime} - {lecture.endTime}</p>
                          <p className="font-sans text-[10px] text-slate-400 leading-none mt-1 font-semibold">Room: {lecture.room || "Classroom"} • {lecture.teacherName || "Academy Staff"}</p>
                        </div>
                      ));
                    }
                    return (
                      <div className="col-span-1 sm:col-span-4 p-8 text-center flex flex-col items-center justify-center space-y-3 premium-inner-card">
                        <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                          </svg>
                        </span>
                        <h5 className="font-display text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">No Lectures Scheduled Today</h5>
                        <p className="font-sans text-xs text-slate-400">There are no dynamic classes assigned to your batch for today.</p>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Middle card: Weekly Schedule time slot grid */}
              {timetable && timetable.length > 0 ? (
                <>
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy dark:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy dark:text-white">Weekly Schedule Grid</h4>
                    </div>

                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-xs text-center border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200/50 dark:border-slate-800/40 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-2.5 px-2 text-left">Time Slot</th>
                            <th className="py-2.5 px-2">Monday</th>
                            <th className="py-2.5 px-2">Tuesday</th>
                            <th className="py-2.5 px-2">Wednesday</th>
                            <th className="py-2.5 px-2">Thursday</th>
                            <th className="py-2.5 px-2">Friday</th>
                            <th className="py-2.5 px-2">Saturday</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/30 font-semibold text-slate-700 dark:text-slate-350">
                          {(() => {
                            const uniqueSlots = Array.from(new Set(timetable.map(t => `${t.startTime} - ${t.endTime}`)));
                            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                            
                            return uniqueSlots.map((slot, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/10 dark:hover:bg-white/5 transition-all">
                                <td className="py-3 px-2 text-left text-slate-450 dark:text-slate-400 font-mono text-xs font-bold">{slot}</td>
                                {daysOfWeek.map((day) => {
                                  const matches = timetable.filter(t => `${t.startTime} - ${t.endTime}` === slot && t.day.toLowerCase() === day.toLowerCase());
                                  const val = matches.length > 0 ? matches.map(m => m.subject).join(", ") : "--";
                                  let badgeStyle = "text-slate-400 dark:text-slate-600";
                                  
                                  if (val !== "--") {
                                    if (val.includes("Physics")) badgeStyle = "bg-blue-50 text-blue-700 border border-blue-200/55 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
                                    else if (val.includes("Chemistry")) badgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-200/55 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
                                    else if (val.includes("Mathematics")) badgeStyle = "bg-purple-50 text-purple-700 border border-purple-200/55 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20";
                                    else if (val.includes("Biology")) badgeStyle = "bg-orange-50 text-orange-700 border border-orange-200/55 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20";
                                    else if (val.includes("English")) badgeStyle = "bg-red-50 text-red-700 border border-red-200/55 dark:bg-red-500/10 dark:text-rose-450 dark:border-red-500/20";
                                    else badgeStyle = "bg-brand-navy text-brand-yellow border border-brand-yellow/15 shadow-sm dark:bg-brand-yellow dark:text-brand-navy";
                                  }
                                  
                                  return (
                                    <td key={day} className="py-3 px-1.5">
                                      <span className={`px-2.5 py-1.5 rounded-xl block text-xs truncate font-bold ${badgeStyle}`}>
                                        {val}
                                      </span>
                                    </td>
                                  );
                                })}
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Grid legend display */}
                    <div className="flex flex-wrap items-center gap-4 pt-3 text-[10px] font-bold uppercase text-slate-455 border-t border-slate-100 dark:border-slate-800/40">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Physics</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Chemistry</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Mathematics</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Biology</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> English</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-brand-navy border border-brand-yellow/40"></span> Other</span>
                    </div>
                  </div>

                  {/* Bottom row: Dynamic Duration chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {(() => {
                      const getDurationHours = (start, end) => {
                        try {
                          const parseTime = (tStr) => {
                            const [time, modifier] = tStr.trim().split(" ");
                            let [hours, minutes] = time.split(":").map(Number);
                            if (modifier === "PM" && hours < 12) hours += 12;
                            if (modifier === "AM" && hours === 12) hours = 0;
                            return hours + (minutes || 0) / 60;
                          };
                          return Math.abs(parseTime(end) - parseTime(start));
                        } catch (e) {
                          return 1.5;
                        }
                      };
                      
                      const subjectHours = {};
                      timetable.forEach(item => {
                        const hours = getDurationHours(item.startTime, item.endTime);
                        if (!subjectHours[item.subject]) {
                          subjectHours[item.subject] = 0;
                        }
                        subjectHours[item.subject] += hours;
                      });
                      
                      return Object.keys(subjectHours).map((subj, idx) => {
                        const hours = subjectHours[subj];
                        const maxHours = 12;
                        const percentage = Math.min(Math.round((hours / maxHours) * 100), 100);
                        let barColor = "bg-blue-500";
                        if (subj.includes("Chemistry")) barColor = "bg-emerald-500";
                        else if (subj.includes("Mathematics")) barColor = "bg-purple-500";
                        else if (subj.includes("Biology")) barColor = "bg-orange-500";
                        else if (subj.includes("English")) barColor = "bg-red-500";
                        
                        return (
                          <div key={idx} className="p-3.5 premium-inner-card text-left space-y-2 shadow-sm">
                            <div className="flex justify-between items-baseline font-bold leading-none">
                              <span className="font-sans text-xs text-slate-800 dark:text-slate-200">{subj}</span>
                              <span className="font-mono text-xs text-brand-navy dark:text-brand-yellow font-bold">{hours}h</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </>
              ) : (
                <div className="premium-glass-card p-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center relative overflow-hidden animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-800 dark:text-slate-100">No Weekly Timetable Released</h4>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                    The academy administration has not published a weekly schedule for your class section yet. 
                    Please check back later or contact support to request the timetable sync.
                  </p>
                </div>
              )}

            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 premium-inner-card flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Total Notifications</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 dark:text-white mt-2 leading-none">{notificationsDb.length}</p>
                  </div>
                </div>

                <div className="p-4 premium-inner-card flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-red-500/10 text-brand-red flex items-center justify-center relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>
                    {unreadNotifs > 0 && (
                      <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                    )}
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Unread Alerts</h5>
                    <p className="font-display text-lg font-extrabold text-brand-red mt-2 leading-none">{unreadNotifs}</p>
                  </div>
                </div>

                <div className="p-4 premium-inner-card flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-brand-yellow flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Exam Reminders</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 dark:text-white mt-2 leading-none">{countNotifs("Exam Reminders")}</p>
                  </div>
                </div>

                <div className="p-4 premium-inner-card flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Announcements</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 dark:text-white mt-2 leading-none">{countNotifs("Announcements")}</p>
                  </div>
                </div>
              </div>

              {/* Split layout: notifications checklist + filter category */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left column: All Notifications feed list */}
                <div className="lg:col-span-8 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                      </svg>
                      <span>Active Alerts Feed</span>
                    </h4>
                    <button 
                      onClick={markAllNotificationsRead}
                      className="font-sans text-xs font-bold uppercase text-brand-blue bg-[#fbbf24]/10 hover:bg-[#fbbf24]/20 border border-[#fbbf24]/20 px-3 py-1.5 rounded-lg cursor-pointer transition-all active:scale-95"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="space-y-3">
                    {notificationsDb
                      .filter(n => notifCategoryFilter === "All Notifications" || n.type === notifCategoryFilter)
                      .map((n) => {
                        const typeBadge = n.type === "Exam Reminders" ? "bg-red-50 text-brand-red border border-red-200" :
                                          n.type === "Announcements" ? "bg-purple-50 text-purple-700 border border-purple-200/60" :
                                          n.type === "Holidays" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                                          n.type === "Fee Reminders" ? "bg-amber-50 text-brand-gold2 border border-brand-yellow/20" :
                                          "bg-blue-50 text-blue-600 border border-blue-200";
                        return (
                          <div 
                            key={n.id} 
                            onClick={() => toggleNotificationRead(n.id)}
                            className={`p-4 border rounded-2xl hover-glow transition-all text-left space-y-2 cursor-pointer relative ${
                              n.unread 
                                ? "bg-blue-50/20 border-blue-500/25 dark:bg-blue-500/5 dark:border-blue-500/20" 
                                : "premium-inner-card opacity-80"
                            }`}
                          >
                            {/* Blue unread bullet indicator */}
                            {n.unread && (
                              <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                            )}
                            
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${typeBadge}`}>{n.type.split(" ")[0]}</span>
                              <span>•</span>
                              <span>{n.timeAgo}</span>
                            </div>
                            
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">{n.title}</h5>
                            <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{n.desc}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Right Column: filter by types & dates alerts */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Category filters exactly matching screenshot 7 */}
                  <div className="premium-glass-card p-4 space-y-3">
                    <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2 text-left">
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy dark:text-white">Filter by Type</h4>
                    </div>

                    <div className="space-y-1 text-xs font-bold text-slate-700">
                      {[
                        { label: "All Notifications", count: notificationsDb.length },
                        { label: "Exam Reminders", count: countNotifs("Exam Reminders") },
                        { label: "Announcements", count: countNotifs("Announcements") },
                        { label: "Holidays", count: countNotifs("Holidays") },
                        { label: "Class Updates", count: countNotifs("Class Updates") },
                        { label: "Fee Reminders", count: countNotifs("Fee Reminders") },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setNotifCategoryFilter(item.label)}
                          className={`w-full py-2.5 px-3 rounded-xl flex justify-between items-center transition cursor-pointer text-left border ${
                            notifCategoryFilter === item.label
                              ? "bg-blue-50/20 border-blue-200/60 text-blue-600 font-extrabold dark:bg-blue-500/10 dark:text-blue-400"
                              : "border-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-405"
                          }`}
                        >
                          <span className="font-sans">{item.label}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            notifCategoryFilter === item.label ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-450"
                          }`}>{item.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Dates exactly matching screenshot 7 */}
                  <div className="premium-glass-card p-4 space-y-3.5">
                    <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2 text-left">
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy dark:text-white">Important Upcoming Dates</h4>
                    </div>

                    <div className="space-y-2.5 text-xs font-bold text-slate-700">
                      {[
                        { date: "Jan 14", label: "Unit Test 3 (PCM)", dateClass: "bg-red-50 text-brand-red border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" },
                        { date: "Jan 18", label: "Physics Electrostatics HW Due", dateClass: "bg-indigo-50 text-indigo-600 border border-indigo-200/50 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20" },
                        { date: "Jan 20", label: "Parent-Teacher Meeting", dateClass: "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20" },
                        { date: "Jan 26", label: "Republic Day — Holiday", dateClass: "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" },
                        { date: "Jan 31", label: "Full Mock Test (JEE Pattern)", dateClass: "bg-red-50 text-brand-red border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" },
                        { date: "Feb 5", label: "Q4 Fee Due Date", dateClass: "bg-rose-50 text-rose-600 border border-rose-200/50 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 premium-inner-card">
                          <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg ${item.dateClass}`}>{item.date}</span>
                          <span className="text-left truncate font-semibold text-slate-700 dark:text-slate-300">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================
              TAB 8: MY PROFILE (SCREENSHOT 8 STYLED)
              ======================================================== */}
          {activeTab === "profile" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Top details avatar card */}
              <div className="premium-glass-card p-6 flex flex-col sm:flex-row sm:items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex items-center gap-5 text-left relative z-10 flex-grow">
                  <div className="w-20 h-20 rounded-2xl bg-brand-yellow text-slate-900 border-2 border-brand-navy flex items-center justify-center font-display text-3xl font-extrabold shadow-lg relative flex-shrink-0">
                    {student?.profilePhoto ? (
                      <img src={student.profilePhoto.startsWith('http') || student.profilePhoto.startsWith('data:') ? student.profilePhoto : `${API_BASE_URL}${student.profilePhoto}`} alt={student.name} className="w-full h-full object-cover rounded-[14px]" />
                    ) : (
                      student?.name?.[0]?.toUpperCase()
                    )}
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">{student?.name?.toUpperCase()}</h3>
                    <p className="font-sans text-xs font-semibold text-slate-400 font-mono">{student?.email} • {student?.phone}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-0.5 bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold uppercase rounded-lg">Batch {student?.batch}</span>
                      <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase rounded-lg">Roll {student?.rollNumber}</span>
                      <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold uppercase rounded-lg">
                        {student?.classLevel == 10 ? "Class 10 · SSC" : student?.classLevel == 12 ? "Class 12 · HSC" : `Std ${student?.classLevel}th`}
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-250 text-emerald-600 text-[10px] font-bold uppercase rounded-lg">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Split layout Personal Info vs Change Password */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left column: Personal details & parent info */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Personal details table replica */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2 text-left flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy">Personal Information</h4>
                    </div>

                    <div className="space-y-3 text-xs text-left">
                      <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 font-bold">Full Name:</span><span className="text-slate-900 font-extrabold">{student?.name}</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 font-bold">Email Address:</span><span className="text-slate-900 font-extrabold font-mono">{student?.email}</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 font-bold">Mobile Number:</span><span className="text-slate-900 font-extrabold font-mono">{student?.phone}</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 font-bold">Class / Division:</span><span className="text-slate-900 font-extrabold">Standard {student?.classLevel} ({student?.batch})</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 font-bold">Parent Phone:</span><span className="text-slate-900 font-extrabold font-mono">{student?.fatherPhone || student?.motherPhone || "N/A"}</span></div>
                      <div className="flex justify-between pb-1"><span className="text-slate-400 font-bold">Home Address (Optional):</span><span className="text-slate-900 font-extrabold text-right max-w-[180px] truncate" title={student?.homeAddress || "N/A"}>{student?.homeAddress || "N/A"}</span></div>
                    </div>
                  </div>

                  {/* Parent info details replica */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2 text-left flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 21c-2.902 0-5.54-1.088-7.54-2.881M21 8.625c0-1.036-.84-1.875-1.875-1.875h-.75c-1.036 0-1.875.84-1.875 1.875v.75c0 1.036.84 1.875 1.875 1.875h.75c1.036 0 1.875-.84 1.875-1.875v-.75zM3.75 6.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875h-.75c-1.036 0-1.875-.84-1.875-1.875v-.75zM12 9.75c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                      </svg>
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy dark:text-white">Parent / Guardian Info</h4>
                    </div>
                    <div className="space-y-3">
                      {/* Father */}
                      <div className="p-3.5 premium-inner-card flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-9 h-9 rounded-xl bg-slate-200/40 dark:bg-white/5 flex items-center justify-center text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-none">{student?.fatherName || "N/A"} <span className="text-[10px] text-slate-400 font-semibold font-mono">(Father)</span></h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-bold font-mono">{student?.fatherPhone || "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => alert("Helpline desk active: Dialing parent...")} className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/45 rounded-lg text-brand-navy dark:text-white hover:bg-brand-yellow hover:text-[#0a1835] transition duration-200 cursor-pointer shadow-sm flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.118-6.944-6.94l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                          </button>
                          <button onClick={() => alert("Helpline mailer desk active...")} className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/45 rounded-lg text-brand-navy dark:text-white hover:bg-brand-yellow hover:text-[#0a1835] transition duration-200 cursor-pointer shadow-sm flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Mother */}
                      <div className="p-3.5 premium-inner-card flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-9 h-9 rounded-xl bg-slate-200/40 dark:bg-white/5 flex items-center justify-center text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-none">{student?.motherName || "N/A"} <span className="text-[10px] text-slate-400 font-semibold font-mono">(Mother)</span></h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-bold font-mono">{student?.motherPhone || "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => alert("Dialing parent...")} className="p-2 bg-white border border-slate-200 rounded-lg text-brand-navy hover:bg-brand-yellow hover:text-[#0a1835] transition duration-200 cursor-pointer shadow-sm flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.118-6.944-6.94l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                          </button>
                          <button onClick={() => alert("Helpline mailer active...")} className="p-2 bg-white border border-slate-200 rounded-lg text-brand-navy hover:bg-brand-yellow hover:text-[#0a1835] transition duration-200 cursor-pointer shadow-sm flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right column: Change Security Password card */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2 text-left flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy">Change Security Password</h4>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
                      {otpError && (
                        <div className="p-3 text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-xl font-semibold">
                          ⚠️ {otpError}
                        </div>
                      )}
                      {otpSuccess && (
                        <div className="p-3 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-250 rounded-xl font-semibold">
                          ✓ {otpSuccess}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {!otpSent ? (
                          <div className="text-left space-y-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                            <input 
                              type="password" required={!otpSent}
                              value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl"
                            />
                          </div>
                        ) : (
                          <div className="text-left space-y-1 animate-fade-in-up">
                            <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">6-Digit OTP Code</label>
                            <input 
                              type="text" required={otpSent} maxLength={6}
                              value={otpCodeInput} onChange={(e) => setOtpCodeInput(e.target.value)}
                              placeholder="— — — — — —"
                              className="w-full px-3.5 py-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-mono font-bold text-xs rounded-xl"
                            />
                          </div>
                        )}

                        <div className="text-left space-y-1">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                          <input 
                            type="password" required
                            value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl"
                          />
                        </div>

                        <div className="text-left space-y-1">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
                          <input 
                            type="password" required
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl"
                          />
                        </div>

                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <button 
                          type="submit" disabled={authLoading}
                          className="px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest text-[#0a1835] bg-[#f1af3c] hover:bg-amber-400 rounded-xl shadow cursor-pointer transition-all active:scale-95 duration-200"
                        >
                          {authLoading ? "PROCESSING..." : (otpSent ? "RESET & CHANGE" : "CONFIRM CHANGE")}
                        </button>

                        {!otpSent ? (
                          <button 
                            type="button" 
                            onClick={handleForgotPassword}
                            className="text-[10px] font-bold text-slate-500 hover:text-brand-navy dark:hover:text-white underline uppercase tracking-wider cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        ) : (
                          <div className="flex gap-4 items-center">
                            <button 
                              type="button" 
                              onClick={handleForgotPassword}
                              disabled={authLoading || resendTimer > 0}
                              className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${resendTimer > 0 ? "text-slate-400 cursor-not-allowed" : "text-amber-600 hover:text-amber-700 cursor-pointer underline"}`}
                            >
                              {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                setOtpSent(false);
                                setOtpError("");
                                setOtpSuccess("");
                              }}
                              className="text-[10px] font-bold text-slate-500 hover:text-red-500 underline uppercase tracking-wider cursor-pointer"
                            >
                              Cancel Reset
                            </button>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Academic Performance summary replica */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2 text-left flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy dark:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5 6.75-6.75M19.5 12V9h-3" />
                      </svg>
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy dark:text-white">Academic Performance Summary</h4>
                    </div>

                    {/* Summary metrics row */}
                    {(() => {
                      const avgTestScore = results && results.length > 0
                        ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)
                        : 0;

                      const totalFeesAmount = fees ? fees.reduce((acc, f) => acc + f.amount, 0) : 0;
                      const totalPaidFees = fees ? fees.filter(f => f.status === "Paid").reduce((acc, f) => acc + f.amount, 0) : 0;
                      const feesSettledPercent = totalFeesAmount > 0 ? Math.round((totalPaidFees / totalFeesAmount) * 100) : 0;

                      return (
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: "Attendance", display: attendance.length > 0 ? `${attendanceRatio}%` : "--", color: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-500", prog: attendanceRatio },
                            { label: "Test Average", display: (results && results.length > 0) ? `${avgTestScore}%` : "--", color: "text-brand-gold2 dark:text-brand-yellow", bgColor: "bg-brand-yellow", prog: avgTestScore },
                            { label: "Fees Settled", display: totalFeesAmount > 0 ? `${feesSettledPercent}%` : "--", color: "text-brand-navy dark:text-slate-200", bgColor: "bg-brand-navy dark:bg-brand-yellow", prog: feesSettledPercent }
                          ].map((item, idx) => (
                            <div key={idx} className="p-3 premium-inner-card flex flex-col justify-between min-h-[80px]">
                              <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">{item.label}</span>
                              <span className={`text-base font-black text-center ${item.color} mt-1`}>{item.display}</span>
                              <div className="w-full bg-slate-200 dark:bg-white/5 h-1 rounded-full overflow-hidden mt-1.5">
                                <div className={`${item.bgColor} h-full`} style={{ width: `${item.prog}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                    
                    {/* Progress bars */}
                    <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                      {(() => {
                        const subjectTotals = {};
                        if (results) {
                          results.forEach(r => {
                            if (r.marks && r.marks.length > 0) {
                              r.marks.forEach(m => {
                                if (!subjectTotals[m.subject]) {
                                  subjectTotals[m.subject] = { obtained: 0, max: 0 };
                                }
                                subjectTotals[m.subject].obtained += m.obtained;
                                subjectTotals[m.subject].max += m.max;
                              });
                            }
                          });
                        }
                        const profileSubjectAverages = Object.keys(subjectTotals).map(subj => {
                          const avg = Math.round((subjectTotals[subj].obtained / subjectTotals[subj].max) * 100);
                          let barColor = "bg-blue-500";
                          if (subj.toLowerCase().includes("chemistry")) barColor = "bg-emerald-500";
                          else if (subj.toLowerCase().includes("mathematics") || subj.toLowerCase().includes("maths")) barColor = "bg-purple-500";
                          else if (subj.toLowerCase().includes("biology")) barColor = "bg-orange-500";
                          else if (subj.toLowerCase().includes("english")) barColor = "bg-red-500";
                          return { label: subj, val: avg, color: barColor };
                        });

                        if (profileSubjectAverages.length === 0) {
                          return <div className="text-xs text-slate-400 text-center py-4 font-semibold">No graded exam aggregates registered yet.</div>;
                        }

                        return profileSubjectAverages.map((bar, idx) => (
                          <div key={idx} className="space-y-1.5 text-left font-bold text-xs text-slate-500">
                            <div className="flex justify-between"><span>{bar.label} Marks Aggregate</span><span className="text-slate-900 dark:text-white font-mono font-bold">{bar.val}%</span></div>
                            <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.val}%` }}></div>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* UPI SIMULATOR CHECKOUT OVERLAY MODAL */}
      {paySimulating && (
        <div className="fixed inset-0 z-50 bg-brand-navy/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-white border border-brand-yellow/30 rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up space-y-5 text-left">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="text-left">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-gold2 bg-brand-yellow/10 px-2 py-0.5 rounded">SECURE CHECKOUT</span>
                <h3 className="font-display text-sm font-bold uppercase text-brand-navy mt-1.5">SAMS UPI Gateways</h3>
              </div>
              <button onClick={() => setPaySimulating(null)} className="text-slate-400 hover:text-slate-650 transition cursor-pointer border-none bg-transparent" aria-label="Close Checkout">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {paySuccess ? (
              <div className="py-6 text-center space-y-3.5 flex flex-col items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-250 shadow-sm animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <h4 className="font-display text-sm font-extrabold text-emerald-600 uppercase tracking-wider">Fees Settled Successfully!</h4>
                <p className="font-sans text-xs text-slate-500 font-medium leading-relaxed">Database logs compiled. Parent alerts triggered.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl text-xs space-y-2 text-left">
                  <p className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Invoice Statement:</p>
                  <p className="font-sans text-xs text-slate-900 font-bold leading-normal">{paySimulating.description}</p>
                  
                  <div className="w-full border-t border-dashed border-slate-200 my-2"></div>
                  
                  <p className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Outstanding Dues Amount:</p>
                  <p className="font-mono text-xl font-bold text-brand-red">₹{paySimulating.amount.toLocaleString()}</p>
                </div>
                
                <button
                  onClick={executePayment}
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-brand-navy hover:bg-slate-800 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 duration-200 text-center block border-none font-sans"
                >
                  SIMULATE UPI GATEWAY SUCCESS
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
