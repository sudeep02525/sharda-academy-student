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
  
  // Live Notifications Drawer state (top navbar bell)
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);

  // Homework list mock state (Tab 5)
  const [homeworkList, setHomeworkList] = useState([
    { id: 1, title: "Solve Problems: Electrostatics Ch.2 Q1-Q15", dueDate: "Jan 14", status: "Pending", teacher: "Dr. Ramesh Sharma", subject: "Physics" },
    { id: 2, title: "Exercise 7.3 - Integration by Parts (All)", dueDate: "Jan 14", status: "Submitted", teacher: "Prof. Anand Verma", subject: "Mathematics" },
    { id: 3, title: "Organic Mechanisms: Markovnikov Rule - 10 problems", dueDate: "Jan 16", status: "Pending", teacher: "Ms. Preet Kaur", subject: "Chemistry" },
    { id: 4, title: "Draw and label Cell Division (Mitosis + Meiosis)", dueDate: "Jan 16", status: "Late", teacher: "Dr. Nidhi Joshi", subject: "Biology" },
    { id: 5, title: "Write essay on 'Technology and Education' (500 words)", dueDate: "Jan 17", status: "Pending", teacher: "Mr. Suresh Nair", subject: "English" },
    { id: 6, title: "Practice Set 8 - Differential Equations (Q1-Q20)", dueDate: "Jan 18", status: "Pending", teacher: "Prof. Anand Verma", subject: "Mathematics" }
  ]);

  // Study notes mock directory list (Tab 5 right panel)
  const [studyNotes, setStudyNotes] = useState([
    { id: 1, title: "Electrostatics - Complete Notes", pages: "48 pages", size: "3.2 MB", date: "Jan 10", subject: "Physics" },
    { id: 2, title: "Integral Calculus - Formula Sheet", pages: "12 pages", size: "1.1 MB", date: "Jan 8", subject: "Mathematics" },
    { id: 3, title: "Organic Chemistry - Reaction Mechanisms", pages: "72 pages", size: "5.4 MB", date: "Jan 8", subject: "Chemistry" },
    { id: 4, title: "Laws of Motion - Short Notes", pages: "24 pages", size: "2.0 MB", date: "Dec 28", subject: "Physics" },
    { id: 5, title: "Cell Division - Diagrams & Notes", pages: "36 pages", size: "4.1 MB", date: "Dec 22", subject: "Biology" },
    { id: 6, title: "Essay Writing Guide - Advanced", pages: "10 pages", size: "0.8 MB", date: "Dec 18", subject: "English" }
  ]);

  // Notifications category active filter (Tab 7)
  const [notifCategoryFilter, setNotifCategoryFilter] = useState("All Notifications");

  // Notifications mock database (Tab 7)
  const [notificationsDb, setNotificationsDb] = useState([
    { id: 1, type: "Exam Reminders", title: "Unit Test 3 — Scheduled Tomorrow", desc: "Unit Test 3 for Physics (Electrostatics) and Chemistry (Hydrocarbons) is scheduled for January 14. Bring your admit card and stationery.", date: "Jan 13", unread: true, timeAgo: "2 hours ago" },
    { id: 2, type: "Announcements", title: "Parent-Teacher Meeting — Jan 20", desc: "Dear students, please inform your parents about the upcoming PTM on January 20 from 10:00 AM to 1:00 PM. Attendance is compulsory.", date: "Jan 13", unread: true, timeAgo: "5 hours ago" },
    { id: 3, type: "Holidays", title: "Republic Day — Institute Closed Jan 26", desc: "The institute will remain closed on 26th January 2026 on account of Republic Day. Regular classes will resume from January 27th.", date: "Jan 12", unread: true, timeAgo: "Yesterday" },
    { id: 4, type: "Class Updates", title: "Extra Class — Mathematics on Jan 15", desc: "An extra class for Integration (Chapter 7) has been scheduled on January 15 from 5:00 PM - 7:30 PM in Hall B. Attendance mandatory.", date: "Jan 12", unread: false, timeAgo: "Yesterday" },
    { id: 5, type: "Fee Reminders", title: "Fee Reminder: Q4 Installment Due Feb 5", desc: "Your Q4 fee installment of ₹8,500 is due on February 5, 2026. Pay before the due date to avoid a late fee penalty of ₹500.", date: "Jan 11", unread: false, timeAgo: "2 days ago" },
    { id: 6, type: "Announcements", title: "Mock Test 2 Results Published", desc: "Results for Mock Test 2 (Jan 10) are now available. You scored 137/150 and your batch rank is #3. Great improvement this month!", date: "Jan 10", unread: false, timeAgo: "3 days ago" },
    { id: 7, type: "Class Updates", title: "Revised Syllabus for February", desc: "The syllabus for February has been updated. Please check the updated study plan on the portal. New chapters added: Thermodynamics & Wave Optics.", date: "Jan 9", unread: false, timeAgo: "4 days ago" },
    { id: 8, type: "Exam Reminders", title: "Full Syllabus Mock Test — Jan 31", desc: "A full-length JEE-pattern mock test (3 hours) is scheduled on January 31, 2026. This is a mandatory test. Syllabus: Complete PCM.", date: "Jan 8", unread: false, timeAgo: "5 days ago" }
  ]);

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

  useEffect(() => {
    fetchData();
  }, []);

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
      console.error(err);
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

  const fetchData = async () => {
    setLoading(true);
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
        if (resData.homework && resData.homework.length > 0) {
          setHomeworkList(resData.homework.map(hw => ({
            id: hw._id,
            title: hw.title,
            dueDate: hw.dueDate,
            status: "Pending",
            teacher: hw.teacherName || "Academy Staff",
            subject: hw.subject,
            attachmentName: hw.attachmentName,
            attachmentData: hw.attachmentData,
            description: hw.description,
          })));
        }
        if (resData.studyMaterials && resData.studyMaterials.length > 0) {
          setStudyNotes(resData.studyMaterials.map(sm => ({
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
          })));
        }
        // Populate notifications from real backend notices
        if (resData.notices && resData.notices.length > 0) {
          setNotificationsDb(resData.notices.map(n => ({
            id: n._id,
            type: n.category === "General" ? "Announcements" : n.category === "Student" ? "Class Updates" : n.category,
            title: n.title,
            desc: n.content,
            date: new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            unread: true,
            timeAgo: new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          })));
        }
      } else {
        setError(resData.message || "Failed to load student portfolio.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to sync details with SAMS backend.");
    } finally {
      setLoading(false);
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
      console.error(err);
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
    setNotificationsDb(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllNotificationsRead = () => {
    setNotificationsDb(prev =>
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  if (loading && !paySimulating) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f8f7f4", gap: "16px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid #e5e7eb", borderTopColor: "#f1af3c", animation: "spin 0.7s linear infinite" }}></div>
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
  const attendanceRatio = attendance.length > 0 ? Math.round((presentDays / attendance.length) * 100) : 100;
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
    <div className="min-h-screen bg-[#f8f7f4] text-[#111827] grid grid-cols-1 md:grid-cols-[auto_1fr] dotbg overflow-x-hidden md:h-screen md:overflow-hidden">

      {/* 📱 Mobile Menu Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-[#0a1835]/80 backdrop-blur-md z-45 md:hidden transition-opacity duration-300"
        />
      )}

      {/* 🖥️ Fixed Left Sidebar in solid Navy, gold active states */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 md:sticky md:top-0 md:h-screen shrink-0 border-r border-slate-200/50 bg-[#0a1835] text-white ${
        sidebarOpen 
          ? "w-64 translate-x-0" 
          : "w-64 -translate-x-full md:translate-x-0 md:w-64"
      }`}>
        
        {/* Brand header */}
        <div className="p-5 flex items-center justify-between border-b border-white/8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="text-left">
              <h1 className="text-sm font-extrabold text-white uppercase tracking-wide leading-none">SHARDA ACADEMY</h1>
              <p className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest leading-none mt-1.5">STUDENT PORTAL</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 hover:text-brand-yellow cursor-pointer"
            aria-label="Close Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Nav catalog */}
        <nav className="p-3 flex-grow space-y-1.5 overflow-y-auto">
          {MENU_CATALOG.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  setSidebarOpen(false);
                }}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-3.5 group cursor-pointer ${
                  isActive
                    ? "bg-brand-yellow text-[#0a1835] font-black shadow-lg"
                    : "text-slate-300 hover:text-brand-yellow hover:bg-white/5"
                }`}
              >
                {getStudentSidebarIcon(t.id, `h-5 w-5 ${isActive ? "text-[#0a1835]" : "text-slate-400 group-hover:text-brand-yellow transition-colors"}`)}
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar user pill matching screenshots bottom */}
        <div className="p-4 border-t border-white/8 space-y-3 bg-[#030814]/30">
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
                <h5 className="text-xs font-bold text-white truncate leading-none">{student?.name}</h5>
                <p className="text-[10px] text-slate-400 font-semibold truncate mt-1">Std {student?.classLevel} - Roll {student?.rollNumber}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-950/20 text-brand-red border border-red-900/10 hover:bg-brand-red hover:text-white transition-all cursor-pointer flex-shrink-0"
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
      <div className="flex-grow flex flex-col min-w-0 w-full md:h-screen md:overflow-hidden bg-[#faf9f6] relative z-10">
        
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
                <h2 className="font-display text-base sm:text-lg font-black text-white tracking-wide leading-none">
                  {MENU_CATALOG.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="font-sans text-xs font-semibold text-white/50 mt-1.5 tracking-wider">
                  {activeTab === "overview" ? currentTime : `${student?.name} · Std ${student?.classLevel}th`}
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
              
              {/* Avatar Circle */}
              <div className="w-9 h-9 rounded-full bg-brand-yellow text-slate-900 flex items-center justify-center font-black text-xs border border-brand-yellow/30 flex-shrink-0 shadow-md">
                {student?.name?.[0]?.toUpperCase()}
              </div>
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
                    {student?.name}
                  </h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-xs sm:text-sm text-slate-500 font-medium">
                    <span>Std: <strong className="text-brand-navy font-bold">{student?.classLevel}th Board Prep</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>Batch: <strong className="text-brand-navy font-bold">{student?.batch}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>Roll: <strong className="text-brand-navy font-bold">{student?.rollNumber}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="bg-[#0a1835]/5 border border-[#0a1835]/10 rounded-2xl p-3.5 text-left min-w-[200px]">
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 border border-emerald-250 px-2 py-0.5 rounded flex items-center gap-1.5 w-max">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Portal Active</span>
                    </span>
                    <p className="font-sans text-xs font-semibold text-slate-700 mt-2">Authenticated Secure Session</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-navy flex items-center justify-center flex-shrink-0 shadow-lg border border-white/10">
                    <span className="font-display text-2xl font-extrabold text-brand-yellow">{student?.name?.[0]?.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* 🎴 METRICS ROW */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Attendance card */}
                <div className="premium-glass-card p-5 flex flex-col justify-between min-h-[120px]">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center text-base font-bold">
                      %
                    </div>
                    <span className="font-sans text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/50">↑ 2% this month</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-600 leading-none">{attendanceRatio}%</div>
                    <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">Attendance</p>
                  </div>
                </div>

                {/* 2. Overall Rank Card */}
                <div className="premium-glass-card p-5 flex flex-col justify-between min-h-[120px]">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5.5 h-5.5 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.303-1.2-1-1.5L12 13.5l-3.5.375c-.697.3-1 .879-1 1.5v3.375m9 0h-9M9 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm12 2.25H21a3.75 3.75 0 0 0-3.75-3.75h-1.5m3.75 3.75v3c0 1.243-1.007 2.25-2.25 2.25h-1.5m1.5-5.25h-1.5m-9 0H6.75A3.75 3.75 0 0 0 3 8.25v3c0 1.243 1.007 2.25 2.25 2.25h1.5m-1.5-5.25h1.5" />
                      </svg>
                    </div>
                    <span className="font-sans text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100/50">↑ 6 positions</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-purple-650 leading-none">#14</div>
                    <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">Overall Rank</p>
                  </div>
                </div>

                {/* 3. Avg Test Score Card */}
                <div className="premium-glass-card p-5 flex flex-col justify-between min-h-[120px]">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5.5 h-5.5 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
                      </svg>
                    </div>
                    <span className="font-sans text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/50">↑ 4pts this week</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-blue-600 leading-none">73/100</div>
                    <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">Avg. Test Score</p>
                  </div>
                </div>

                {/* 4. Fees Pending Card */}
                <div className="premium-glass-card p-5 flex flex-col justify-between min-h-[120px]">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-xl bg-brand-yellow/10 text-brand-gold2 border border-brand-yellow/20 flex items-center justify-center text-base font-bold">
                      ₹
                    </div>
                    <span className="font-sans text-[10px] font-bold text-brand-gold2 bg-amber-50 px-2 py-0.5 rounded-full border border-brand-yellow/20">Due Feb 5</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-brand-gold2 leading-none">
                      {pendingInvoices.length > 0 ? `₹${pendingInvoices[0].amount.toLocaleString()}` : "₹0"}
                    </div>
                    <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">Fees Pending</p>
                  </div>
                </div>

              </div>

              {/* Today's Lectures timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left column: Today's Classes */}
                {/* Left column: Today's Classes */}
                <div className="lg:col-span-7 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span>Today's Class Lectures</span>
                    </h4>
                    <span className="font-sans text-[11px] font-bold text-slate-500 hover:text-brand-yellow cursor-pointer transition-colors" onClick={() => setActiveTab("schedule")}>Full Timetable ↗</span>
                  </div>

                  <div className="space-y-3">
                    {/* Class 1 */}
                    <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl flex items-center justify-between gap-4">
                      <div className="text-left">
                        <h5 className="font-display text-sm font-bold text-slate-900 leading-tight">Physics</h5>
                        <p className="font-sans text-xs text-slate-500 mt-1 font-semibold">Dr. Ramesh Sharma • Hall A</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-500">9:00 - 10:30 AM</span>
                        <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded-lg border border-slate-300/50">Completed</span>
                      </div>
                    </div>

                    {/* Class 2 */}
                    <div className="p-4 bg-brand-yellow/5 border border-brand-yellow/20 rounded-2xl flex items-center justify-between gap-4 animate-pulse-glow">
                      <div className="text-left">
                        <h5 className="font-display text-sm font-bold text-brand-gold2 leading-tight">Mathematics</h5>
                        <p className="font-sans text-xs text-slate-600 mt-1 font-semibold">Prof. Anand Verma • Hall B</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-brand-gold2 font-bold">11:00 AM - 12:30 PM</span>
                        <span className="px-2.5 py-1 bg-brand-yellow text-slate-900 text-[10px] font-extrabold uppercase rounded-lg shadow-sm">Live Now</span>
                      </div>
                    </div>

                    {/* Class 3 */}
                    <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl flex items-center justify-between gap-4">
                      <div className="text-left">
                        <h5 className="font-display text-sm font-bold text-slate-900 leading-tight">Chemistry</h5>
                        <p className="font-sans text-xs text-slate-500 mt-1 font-semibold">Ms. Preet Kaur • Hall A</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-500">2:00 - 3:30 PM</span>
                        <span className="px-2.5 py-1 bg-brand-yellow/10 border border-brand-yellow/25 text-brand-gold2 text-[10px] font-bold uppercase rounded-lg">Upcoming</span>
                      </div>
                    </div>

                    {/* Class 4 */}
                    <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl flex items-center justify-between gap-4">
                      <div className="text-left">
                        <h5 className="font-display text-sm font-bold text-slate-900 leading-tight">English</h5>
                        <p className="font-sans text-xs text-slate-500 mt-1 font-semibold">Mr. Suresh Nair • Room 7</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-500">4:00 - 5:00 PM</span>
                        <span className="px-2.5 py-1 bg-brand-yellow/10 border border-brand-yellow/25 text-brand-gold2 text-[10px] font-bold uppercase rounded-lg">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Upcoming Tests */}
                <div className="lg:col-span-5 space-y-6">
                  
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
                        </svg>
                        <span>Upcoming SAMS Tests</span>
                      </h4>
                      <span className="font-sans text-[11px] font-bold text-slate-500 hover:text-brand-yellow cursor-pointer transition-colors" onClick={() => setActiveTab("academic")}>View all ↗</span>
                    </div>

                    <div className="space-y-3 text-xs font-bold text-slate-700">
                      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/30 rounded-xl hover:border-brand-yellow/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-red-50 text-brand-red border border-red-200 text-[10px] font-extrabold uppercase rounded-lg">18 Jan</span>
                          <span className="text-left font-sans text-xs text-slate-700">Physics <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Electrostatics notes</span></span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/30 rounded-xl hover:border-brand-yellow/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-extrabold uppercase rounded-lg">21 Jan</span>
                          <span className="text-left font-sans text-xs text-slate-700">Mathematics <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Integral Calculus syllabus</span></span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/30 rounded-xl hover:border-brand-yellow/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-extrabold uppercase rounded-lg">25 Jan</span>
                          <span className="text-left font-sans text-xs text-slate-700">Chemistry <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Organic Chemistry review</span></span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Performance Snapshot */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Performance Snapshot</h4>
                      <span className="font-sans text-xs font-bold text-slate-400">Weekly Tracker</span>
                    </div>

                    <div className="space-y-4">
                      {/* Overall Progress bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>Overall Academic Performance</span>
                          <span className="text-brand-navy font-bold">73%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
                          <div className="bg-brand-yellow h-full rounded-full animate-pulse-glow" style={{ width: "73%" }}></div>
                        </div>
                      </div>
                      
                      {/* Subject progress lines */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-2 text-xs font-bold text-slate-500 border-t border-slate-100">
                        <div className="space-y-1">
                          <div className="flex justify-between"><span>Physics:</span><span className="text-slate-900 font-extrabold">78%</span></div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full rounded-full" style={{ width: "78%" }}></div></div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between"><span>Maths:</span><span className="text-slate-900 font-extrabold">91%</span></div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-purple-500 h-full rounded-full" style={{ width: "91%" }}></div></div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between"><span>Chemistry:</span><span className="text-slate-900 font-extrabold">65%</span></div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full rounded-full" style={{ width: "65%" }}></div></div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between"><span>Biology:</span><span className="text-slate-900 font-extrabold">55%</span></div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-orange-500 h-full rounded-full" style={{ width: "55%" }}></div></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Notices */}
              <div className="premium-glass-card p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
                    <span>Recent Notices & System Feeds</span>
                  </h4>
                  <span className="font-sans text-[11px] font-bold text-slate-500 hover:text-brand-yellow cursor-pointer transition-colors" onClick={() => setActiveTab("notifications")}>All Notices ↗</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Notice 1 */}
                  <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl text-left space-y-2 hover-glow transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-red-100/60 text-brand-red border border-red-200/50 text-[10px] font-extrabold uppercase rounded">Exam</span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">Jan 18, 2026</span>
                    </div>
                    <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">Unit Test 3 - Physics & Chemistry</h5>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed font-medium">Syllabus: Electrostatics (Ch.1-3) + Hydrocarbons. Bring admit card.</p>
                  </div>

                  {/* Notice 2 */}
                  <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl text-left space-y-2 hover-glow transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-emerald-100/60 text-emerald-700 border border-emerald-200/50 text-[10px] font-extrabold uppercase rounded">Holiday</span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">Jan 26, 2026</span>
                    </div>
                    <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">Republic Day - Institute Closed</h5>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed font-medium">The institute will remain closed on 26 Jan. Classes resume on 27 Jan.</p>
                  </div>

                  {/* Notice 3 */}
                  <div className="p-4 bg-slate-50 border border-slate-200/40 rounded-2xl text-left space-y-2 hover-glow transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-amber-100/60 text-brand-gold2 border border-brand-yellow/20 text-[10px] font-extrabold uppercase rounded">Notice</span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">Jan 20, 2026</span>
                    </div>
                    <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">Parent-Teacher Meeting</h5>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed font-medium">All parents are requested to attend PTM from 10 AM - 1 PM. Mandatory.</p>
                  </div>
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
                  { label: "Overall Attendance", val: attendanceRatio, bgColor: "bg-brand-yellow", textColor: "text-slate-900" },
                  { label: "Physics Attendance", val: 88, bgColor: "bg-blue-500", textColor: "text-blue-600" },
                  { label: "Mathematics Attendance", val: 94, bgColor: "bg-purple-600", textColor: "text-purple-600" },
                  { label: "Chemistry Attendance", val: 79, bgColor: "bg-emerald-500", textColor: "text-emerald-600" }
                ].map((ring, idx) => (
                  <div key={idx} className="p-5 premium-glass-card flex flex-col justify-between min-h-[110px]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{ring.label}</span>
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold ${ring.textColor} bg-slate-100`}>{ring.val}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                      <div className={`${ring.bgColor} h-full rounded-full`} style={{ width: `${ring.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Attendance metrics present/absent chips */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50/50 border border-emerald-200/50 rounded-2xl flex items-center gap-3.5 text-left shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Days Present (total)</h5>
                    <p className="font-display text-xl font-extrabold text-slate-900 mt-2 leading-none">{presentDays}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50/50 border border-red-200/50 rounded-2xl flex items-center gap-3.5 text-left shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-red-500/10 text-brand-red flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-brand-red">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Days Absent (total)</h5>
                    <p className="font-display text-xl font-extrabold text-slate-900 mt-2 leading-none">{attendance.length - presentDays}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/50 border border-blue-200/50 rounded-2xl flex items-center gap-3.5 text-left shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Holidays / Off Days</h5>
                    <p className="font-display text-xl font-extrabold text-slate-900 mt-2 leading-none">16</p>
                  </div>
                </div>
              </div>

              {/* Monthly calendar split with subject-wise progress */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left panel: Monthly Grid */}
                <div className="lg:col-span-7 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008" />
                      </svg>
                      <span>{attendanceMonth} — Monthly Grid Logs</span>
                    </h4>
                    <span className="font-sans text-xs font-bold text-slate-400">Coaching Records</span>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2.5 text-center text-xs font-bold">
                    {/* Days names */}
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i} className="text-slate-400 uppercase tracking-widest text-[10px]">{d}</span>
                    ))}
                    
                    {Array.from({ length: 31 }, (_, idx) => {
                      const dayNum = idx + 1;
                      let slotStyle = "bg-slate-50 text-slate-400 border border-slate-200/40";
                      
                      if ([1, 2, 4, 5, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19, 20, 22, 23, 24, 27, 28, 29, 30, 31].includes(dayNum)) {
                        slotStyle = "bg-emerald-50 text-emerald-600 border border-emerald-100"; 
                      } else if ([3, 9, 17, 25].includes(dayNum)) {
                        slotStyle = "bg-red-50 text-brand-red border border-red-150"; 
                      } else if ([14, 21, 26].includes(dayNum)) {
                        slotStyle = "bg-amber-50 text-brand-gold2 border border-brand-yellow/20"; 
                      }
                      
                      return (
                        <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center font-mono mx-auto cursor-pointer hover:scale-110 transition font-bold text-xs ${slotStyle}`}>
                          {dayNum}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Legend guide */}
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase text-slate-400 border-t border-slate-100 pt-3">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Present</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Absent</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span> Holiday</span>
                  </div>
                </div>

                {/* Right panel: Subject-wise attendance progress lines */}
                <div className="lg:col-span-5 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
                      </svg>
                      <span>Subject Attendance Ratios</span>
                    </h4>
                    <span className="font-sans text-xs font-bold text-slate-400">SAMS Analytics</span>
                  </div>

                  <div className="space-y-4">
                    {/* Physics */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Physics</span>
                        <span className="text-brand-navy font-bold">88% <span className="text-[10px] text-slate-400 font-semibold">(42/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>

                    {/* Chemistry */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Chemistry</span>
                        <span className="text-brand-navy font-bold">79% <span className="text-[10px] text-slate-400 font-semibold">(38/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "79%" }}></div>
                      </div>
                    </div>

                    {/* Mathematics */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Mathematics</span>
                        <span className="text-brand-navy font-bold">94% <span className="text-[10px] text-slate-400 font-semibold">(45/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>

                    {/* Biology */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Biology</span>
                        <span className="text-brand-navy font-bold">63% <span className="text-[10px] text-slate-400 font-semibold">(30/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "63%" }}></div>
                      </div>
                    </div>

                    {/* English */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>English</span>
                        <span className="text-brand-navy font-bold">83% <span className="text-[10px] text-slate-400 font-semibold">(40/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "83%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Attendance History Table */}
              <div className="premium-glass-card p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-navy">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z" />
                    </svg>
                    <span>Attendance History Logs</span>
                  </h4>
                  <span className="font-sans text-xs font-bold text-slate-400 hover:text-brand-yellow cursor-pointer transition-colors">Export CSV ↗</span>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4 text-center">Physics</th>
                        <th className="py-3.5 px-4 text-center">Chemistry</th>
                        <th className="py-3.5 px-4 text-center">Maths</th>
                        <th className="py-3.5 px-4 text-center">Biology</th>
                        <th className="py-3.5 px-4 text-center">English</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {[
                        { date: "Jan 13, Mon", phy: "P", chm: "P", mth: "P", bio: "P", eng: "A" },
                        { date: "Jan 12, Sun", phy: "H", chm: "H", mth: "H", bio: "H", eng: "H" },
                        { date: "Jan 11, Sat", phy: "P", chm: "P", mth: "P", bio: "A", eng: "P" },
                        { date: "Jan 10, Fri", phy: "P", chm: "A", mth: "P", bio: "P", eng: "P" },
                        { date: "Jan 9, Thu", phy: "P", chm: "P", mth: "P", bio: "P", eng: "P" },
                        { date: "Jan 8, Wed", phy: "A", chm: "P", mth: "P", bio: "P", eng: "P" }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-all">
                          <td className="py-3.5 px-4 text-slate-900 font-mono font-bold">{row.date}</td>
                          {["phy", "chm", "mth", "bio", "eng"].map((subj) => {
                            const val = row[subj];
                            const badgeColor = val === "P" ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50" :
                                               val === "A" ? "bg-red-50 text-brand-red border border-red-200/50" :
                                               "bg-slate-100 text-slate-400 border border-slate-200/50";
                            return (
                              <td key={subj} className="py-3.5 px-4 text-center">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs mx-auto ${badgeColor}`}>
                                  {val}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

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
                <div className="p-5 bg-white border border-slate-200/60 rounded-2xl text-left flex justify-between items-center shadow-sm">
                  <div className="space-y-2">
                    <h5 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider leading-none">Total Amount Paid</h5>
                    <p className="font-display text-2xl font-extrabold text-slate-900 leading-none">₹37,500</p>
                    <p className="font-sans text-xs font-semibold text-emerald-600 leading-none pt-1">3 installments cleared</p>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                </div>

                {/* 2. Pending dues Card */}
                <div className="p-5 bg-white border border-slate-200/60 rounded-2xl text-left flex justify-between items-center shadow-sm">
                  <div className="space-y-2">
                    <h5 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider leading-none">Outstanding Dues</h5>
                    <p className="font-display text-2xl font-extrabold text-slate-900 leading-none">
                      {pendingInvoices.length > 0 ? `₹${pendingInvoices[0].amount.toLocaleString()}` : "₹0"}
                    </p>
                    <p className="font-sans text-xs font-semibold text-brand-gold2 leading-none pt-1">Q4 Installment due Feb 5</p>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-amber-50 text-brand-gold2 flex items-center justify-center border border-brand-yellow/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                  </span>
                </div>

                {/* 3. Total Course Fee progression */}
                <div className="p-5 bg-white border border-slate-200/60 rounded-2xl text-left flex flex-col justify-between shadow-sm min-h-[110px]">
                  <div className="flex justify-between items-center mb-2">
                    <div className="space-y-2">
                      <h5 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider leading-none">Total Course Fee</h5>
                      <p className="font-display text-2xl font-extrabold text-slate-900 leading-none">₹46,000</p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-extrabold uppercase rounded-lg">81% paid</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                    <div className="bg-brand-yellow h-full rounded-full" style={{ width: "81%" }}></div>
                  </div>
                </div>

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

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-3">Transaction ID</th>
                          <th className="py-3 px-3">Period</th>
                          <th className="py-3 px-3">Date</th>
                          <th className="py-3 px-3">Mode</th>
                          <th className="py-3 px-3">Amount</th>
                          <th className="py-3 px-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {(fees || []).map((row, idx) => (
                          <tr key={row._id || idx} className="hover:bg-slate-50 transition-all">
                            <td className="py-3.5 px-3 font-mono text-xs text-slate-900 font-bold">{row.invoiceId}</td>
                            <td className="py-3.5 px-3">{row.description}</td>
                            <td className="py-3.5 px-3 font-mono text-xs text-slate-450 font-medium">
                              {row.status === "Paid" && row.paymentDate ? new Date(row.paymentDate).toLocaleDateString() : `Due ${row.dueDate}`}
                            </td>
                            <td className="py-3.5 px-3 text-slate-500 font-medium">{row.paymentMethod || "--"}</td>
                            <td className="py-3.5 px-3 font-mono font-bold text-slate-900">₹{(row.amount || 0).toLocaleString()}</td>
                            <td className="py-3.5 px-3 text-center flex items-center justify-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                row.status === "Paid" ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50" : "bg-red-50 text-brand-red border border-red-200/50"
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
                </div>

                {/* Right panel: Q4 fee breakdown */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Q4 Breakdown */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2.5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Q4 Fee Breakdown</h4>
                    </div>

                    <div className="space-y-3.5 text-xs font-semibold text-slate-600">
                      <div className="flex justify-between"><span>Tuition Fee</span><span className="text-slate-900 font-bold">₹7,000</span></div>
                      <div className="flex justify-between"><span>Study Material</span><span className="text-slate-900 font-bold">₹800</span></div>
                      <div className="flex justify-between"><span>Lab Charges</span><span className="text-slate-900 font-bold">₹400</span></div>
                      <div className="flex justify-between"><span>Library Fee</span><span className="text-slate-900 font-bold">₹150</span></div>
                      <div className="flex justify-between"><span>Exam Fee</span><span className="text-slate-900 font-bold">₹150</span></div>
                      <div className="w-full border-t border-dashed border-slate-200 my-2"></div>
                      <div className="flex justify-between text-brand-navy font-extrabold text-sm"><span>Total Invoice</span><span className="text-brand-gold2 font-display text-base font-extrabold">₹8,500</span></div>
                    </div>
                  </div>

                  {/* Payment due action box */}
                  <div className="p-5 bg-slate-50 border border-slate-200/40 rounded-2xl text-left space-y-4 shadow-sm">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold2 bg-brand-yellow/10 px-2.5 py-1 rounded-md inline-block">PAYMENT DUE SOON</p>
                      <h3 className="font-display text-2xl font-black text-slate-900 tracking-tight pt-1">₹8,500</h3>
                      <p className="font-sans text-xs text-slate-500 font-semibold">Due Date: February 5, 2026</p>
                    </div>

                    {pendingInvoices.length > 0 ? (
                      <div className="space-y-3">
                        <button
                          onClick={() => setPaySimulating(pendingInvoices[0])}
                          className="w-full py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-brand-navy hover:bg-slate-800 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 duration-200 text-center block border-none font-sans"
                        >
                          Pay Now — UPI / Net Banking
                        </button>
                        <button
                          onClick={() => alert("Initiating official PDF billing download...")}
                          className="w-full py-3 text-xs font-bold uppercase tracking-widest text-slate-700 bg-white hover:bg-slate-50 rounded-xl transition cursor-pointer text-center block border border-slate-200 shadow-sm font-sans"
                        >
                          Download Invoice
                        </button>
                      </div>
                    ) : (
                      <div className="py-2.5 text-center text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 rounded-xl">
                        ✓ All Tuition Fees Settled
                      </div>
                    )}
                  </div>

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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl text-left shadow-sm">
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Current Class Rank</p>
                  <p className="font-display text-2xl font-extrabold text-brand-navy mt-1.5">#3</p>
                  <p className="font-sans text-[11px] text-emerald-600 font-semibold mt-1">↑ 11 positions since Nov</p>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl text-left shadow-sm">
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Latest Test Score</p>
                  <p className="font-display text-2xl font-extrabold text-brand-navy mt-1.5 font-mono">137/150</p>
                  <p className="font-sans text-[11px] text-brand-gold2 font-bold mt-1">Mock Test 2 • Jan 10</p>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl text-left shadow-sm">
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Average Test Score</p>
                  <p className="font-display text-2xl font-extrabold text-brand-navy mt-1.5">73%</p>
                  <p className="font-sans text-[11px] text-slate-500 font-semibold mt-1">Across 5 exams</p>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl text-left shadow-sm">
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Tests Attempted</p>
                  <p className="font-display text-2xl font-extrabold text-brand-navy mt-1.5">5/6</p>
                  <p className="font-sans text-[11px] text-brand-gold2 font-bold mt-1">1 upcoming test soon</p>
                </div>

              </div>

              {/* Mid panel split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Test History Table */}
                <div className="lg:col-span-8 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">
                      📑 Complete Test Performance Ledger
                    </h4>
                    <span className="font-sans text-xs font-bold text-slate-400 hover:text-brand-yellow cursor-pointer transition-colors">Download Report ↗</span>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-3">Test Name</th>
                          <th className="py-3 px-3 font-mono">Date</th>
                          <th className="py-3 px-3 text-center">Phy</th>
                          <th className="py-3 px-3 text-center">Chem</th>
                          <th className="py-3 px-3 text-center">Maths</th>
                          <th className="py-3 px-3 text-center">Total</th>
                          <th className="py-3 px-3 text-center">Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {[
                          { name: "Unit Test 1", date: "Nov 10, 2026", phy: "34/50", chm: "28/50", mth: "42/50", total: "104/150", rank: "#8" },
                          { name: "Unit Test 2", date: "Nov 28, 2026", phy: "38/50", chm: "32/50", mth: "45/50", total: "115/150", rank: "#6" },
                          { name: "Mock Test 1", date: "Dec 12, 2026", phy: "42/50", chm: "35/50", mth: "48/50", total: "125/150", rank: "#5" },
                          { name: "Unit Test 3", date: "Jan 5, 2026", phy: "45/50", chm: "30/50", mth: "50/50", total: "125/150", rank: "#4" },
                          { name: "Mock Test 2", date: "Jan 10, 2026", phy: "47/50", chm: "38/50", mth: "52/50", total: "137/150", rank: "#3" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-all">
                            <td className="py-3.5 px-3 text-slate-900 font-bold">{row.name}</td>
                            <td className="py-3.5 px-3 font-mono text-xs text-slate-400 font-medium">{row.date}</td>
                            <td className="py-3.5 px-3 text-center font-mono text-xs">{row.phy}</td>
                            <td className="py-3.5 px-3 text-center font-mono text-xs">{row.chm}</td>
                            <td className="py-3.5 px-3 text-center font-mono text-xs">{row.mth}</td>
                            <td className="py-3.5 px-3 text-center font-mono font-bold text-brand-gold2 text-xs">{row.total}</td>
                            <td className="py-3.5 px-3 text-center">
                              <span className="px-2.5 py-0.5 rounded bg-brand-yellow text-slate-900 text-[10px] font-bold">{row.rank}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right column vertical Subject performance & Ranks progression */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Subject performance progress bars */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2.5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Subject Averages</h4>
                     </div>

                     <div className="space-y-3">
                       {[
                         { label: "Physics", val: 78, color: "bg-blue-500" },
                         { label: "Chemistry", val: 65, color: "bg-emerald-500" },
                         { label: "Mathematics", val: 91, color: "bg-purple-500" },
                         { label: "Biology", val: 55, color: "bg-orange-500" },
                         { label: "English", val: 83, color: "bg-red-500" }
                       ].map((subj, idx) => (
                         <div key={idx} className="space-y-1 text-xs font-bold text-slate-500">
                           <div className="flex justify-between"><span>{subj.label}</span><span className="text-slate-900">{subj.val}%</span></div>
                           <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                             <div className={`${subj.color} h-full rounded-full`} style={{ width: `${subj.val}%` }}></div>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>

                  {/* Rank progression list */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2.5">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Rank Progression</h4>
                    </div>
                    
                    <div className="space-y-2 text-xs font-bold text-slate-650">
                      {[
                        { exam: "Mock Test 2 (MT2)", rank: "#3", status: "Latest" },
                        { exam: "Unit Test 3 (UT3)", rank: "#6", status: "Completed" },
                        { exam: "Mock Test 1 (MT1)", rank: "#8", status: "Completed" },
                        { exam: "Unit Test 2 (UT2)", rank: "#11", status: "Completed" },
                        { exam: "Unit Test 1 (UT1)", rank: "#14", status: "Completed" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0">
                          <span>{item.exam}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${item.status === "Latest" ? "bg-brand-yellow text-slate-900" : "bg-slate-100 text-slate-500"}`}>{item.rank}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Subject Marks cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: "Physics Marks", val: 94, ratio: "47/50", bgColor: "bg-blue-500", textColor: "text-blue-600" },
                  { label: "Chemistry Marks", val: 76, ratio: "38/50", bgColor: "bg-emerald-500", textColor: "text-emerald-600" },
                  { label: "Mathematics Marks", val: 100, ratio: "52/50", bgColor: "bg-purple-650", textColor: "text-purple-650" },
                  { label: "Biology Marks", val: 70, ratio: "28/40", bgColor: "bg-orange-500", textColor: "text-orange-500" },
                  { label: "English Marks", val: 84, ratio: "42/50", bgColor: "bg-red-500", textColor: "text-red-500" }
                ].map((gauge, idx) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200/50 rounded-2xl flex flex-col justify-between min-h-[95px] shadow-sm">
                    <div className="flex justify-between items-start">
                      <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">{gauge.label.split(" ")[0]}</span>
                      <span className={`text-[11px] font-extrabold ${gauge.textColor}`}>{gauge.ratio}</span>
                    </div>
                    <div className="mt-2.5">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/50">
                        <div className={`${gauge.bgColor} h-full rounded-full`} style={{ width: `${Math.min(gauge.val, 100)}%` }}></div>
                      </div>
                      <span className="text-[10px] text-slate-405 block mt-1 font-semibold">{gauge.val}% Aggregate</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 5: HOMEWORKS & NOTES
              ======================================================== */}
          {activeTab === "homework" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Four stats horizontal widgets */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Total Homework</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 mt-2 leading-none">6</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Submitted Tasks</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 mt-2 leading-none">1</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-brand-yellow flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Pending Homework</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 mt-2 leading-none">4</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-red-500/10 text-brand-red flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Late / Missed</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 mt-2 leading-none">1</p>
                  </div>
                </div>

              </div>

              {/* Homework split with PDF notes */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left column: Homework lists */}
                <div className="lg:col-span-7 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z" />
                      </svg>
                      <span>Weekly Homework Tasks</span>
                    </h4>
                    <span className="font-sans text-[11px] font-bold text-slate-500 hover:text-brand-yellow cursor-pointer transition-colors" onClick={() => alert("Marked all assignments complete.")}>Mark All Done</span>
                  </div>

                  <div className="space-y-3">
                    {homeworkList.map((hw) => {
                      const isSubmitted = hw.status === "Submitted";
                      const isLate = hw.status === "Late";
                      
                      const badgeColor = hw.subject === "Physics" ? "bg-blue-50 text-blue-600 border border-blue-200/55" :
                                         hw.subject === "Mathematics" ? "bg-purple-50 text-purple-600 border border-purple-200/55" :
                                         hw.subject === "Chemistry" ? "bg-emerald-50 text-emerald-600 border border-emerald-200/55" :
                                         hw.subject === "Biology" ? "bg-orange-50 text-orange-500 border border-orange-200/55" :
                                         "bg-red-50 text-brand-red border border-red-200/55";
                                         
                      return (
                        <div key={hw.id} className="p-3.5 bg-slate-50 border border-slate-200/40 rounded-2xl flex items-center justify-between gap-4">
                          <div className="text-left space-y-1.5 min-w-0">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${badgeColor}`}>{hw.subject}</span>
                              <span>by {hw.teacher}</span>
                            </div>
                            <h5 className={`font-display text-xs sm:text-sm font-bold truncate leading-snug ${isSubmitted ? "text-slate-400 line-through" : "text-slate-900"}`}>{hw.title}</h5>
                            <p className="font-sans text-[11px] text-slate-400">Due {hw.dueDate}</p>
                          </div>
                          
                          <div className="flex items-center gap-2.5 flex-shrink-0">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                              isSubmitted ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50" :
                              isLate ? "bg-red-50 text-brand-red border border-red-200/50" :
                              "bg-brand-yellow/10 text-brand-gold2 border border-brand-yellow/20"
                            }`}>{hw.status}</span>
                            
                            {hw.attachmentData && (
                              <button
                                onClick={() => handleDownload(hw.attachmentName || "homework.pdf", hw.attachmentData)}
                                className="p-1.5 bg-white hover:bg-brand-yellow text-blue-600 hover:text-[#0a1835] border border-slate-200 rounded-lg transition-all cursor-pointer shadow-sm active:scale-90 flex items-center justify-center"
                                title="Download Attachment"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                              </button>
                            )}

                            <button
                              onClick={() => toggleHomeworkStatus(hw.id)}
                              className="p-1.5 bg-white hover:bg-brand-yellow text-slate-800 hover:text-slate-900 border border-slate-200 rounded-lg transition-all cursor-pointer shadow-sm active:scale-90 flex items-center justify-center"
                              title="Toggle status"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Note: Submission status is tracked locally and resets on page refresh. */}
                  <p className="text-[10px] text-slate-400 font-semibold italic pt-1 border-t border-slate-100">
                    Note: Submission status is tracked locally and resets on page refresh.
                  </p>
                </div>

                {/* Right Column: PDF Study Notes list */}
                <div className="lg:col-span-5 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                      <span>SAMS Study Notes & PDFs</span>
                    </h4>
                    <span className="font-sans text-xs font-bold text-slate-505 hover:text-brand-yellow cursor-pointer transition-colors">View All ↗</span>
                  </div>

                  <div className="space-y-3">
                    {studyNotes.map((note) => (
                      <div key={note.id} className="p-3 bg-slate-50 border border-slate-200/40 rounded-2xl flex items-center justify-between gap-3 hover-glow transition-all">
                        <div className="flex items-center gap-3 min-w-0 text-left">
                          <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-brand-yellow flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-brand-gold2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z" />
                            </svg>
                          </span>
                          <div className="min-w-0">
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 truncate leading-none">{note.title}</h5>
                            <p className="font-sans text-[11px] text-slate-400 mt-1.5 font-semibold">{note.pages} • {note.size} • {note.date}</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDownload(note.attachmentName || `${note.title}.pdf`, note.attachmentData)}
                          className="p-1.5 bg-white hover:bg-brand-yellow text-slate-900 rounded-lg border border-slate-200 transition cursor-pointer flex-shrink-0 shadow-sm flex items-center justify-center"
                          title="Download Note"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================
              TAB 6: CLASS TIMETABLE (WEEKLY TIME-SLOT GRID TABLE!)
              ======================================================== */}
          {activeTab === "schedule" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="text-left">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-navy">Class Timetable</h4>
                  <p className="font-sans text-xs font-semibold text-slate-400 font-mono mt-1">January 2026 • Standard {student?.classLevel}th Board Batch A</p>
                </div>
                <span className="font-sans text-[10px] font-bold text-brand-navy bg-brand-yellow/10 border border-brand-yellow/20 px-2.5 py-1 rounded uppercase tracking-wider">ACADEMIC AGENDA</span>
              </div>

              {/* Top card: Today — Monday, January 13 horizontal strip replica */}
              <div className="premium-glass-card p-5 space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-ping"></span>
                  <span className="font-display text-sm font-bold text-slate-900">Today — Monday, January 13 &nbsp;</span>
                  <span className="px-2.5 py-0.5 bg-brand-yellow text-slate-900 text-[10px] font-extrabold uppercase rounded-lg shadow-sm">Today</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Physics", val: "9:00 - 10:30 AM", room: "Hall A", teacher: "Dr. Ramesh Sharma", tag: "Completed", tagClass: "bg-slate-200 text-slate-600 border border-slate-300/50" },
                    { label: "Mathematics", val: "11:00 AM - 12:30 PM", room: "Hall B", teacher: "Prof. Anand Verma", tag: "Live", tagClass: "bg-brand-yellow text-slate-900 font-black" },
                    { label: "Chemistry", val: "2:00 - 3:30 PM", room: "Hall A", teacher: "Ms. Preet Kaur", tag: "Upcoming", tagClass: "bg-brand-yellow/10 border border-brand-yellow/25 text-brand-gold2" },
                    { label: "English", val: "4:00 - 5:00 PM", room: "Room 7", teacher: "Mr. Suresh Nair", tag: "Upcoming", tagClass: "bg-brand-yellow/10 border border-brand-yellow/25 text-brand-gold2" }
                  ].map((lecture, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/40 rounded-xl space-y-1.5 relative">
                      <div className="flex justify-between items-center">
                        <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900">{lecture.label}</h5>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${lecture.tagClass}`}>{lecture.tag}</span>
                      </div>
                      <p className="font-mono text-xs text-brand-navy font-bold">{lecture.val}</p>
                      <p className="font-sans text-[10px] text-slate-400 leading-none mt-1 font-semibold">Room: {lecture.room} • {lecture.teacher.split(" ")[1]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle card: Weekly Schedule time slot grid replica */}
              <div className="premium-glass-card p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <h4 className="font-display text-sm font-bold uppercase text-brand-navy">Weekly Schedule Grid</h4>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-xs text-center border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-2 text-left">Time Slot</th>
                        <th className="py-2.5 px-2">Monday</th>
                        <th className="py-2.5 px-2">Tuesday</th>
                        <th className="py-2.5 px-2">Wednesday</th>
                        <th className="py-2.5 px-2">Thursday</th>
                        <th className="py-2.5 px-2">Friday</th>
                        <th className="py-2.5 px-2">Saturday</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {[
                        { time: "9:00 - 10:30", mon: "Physics", tue: "Mathematics", wed: "Chemistry", thu: "Physics", fri: "Mathematics", sat: "Mock Test" },
                        { time: "11:00 - 12:30", mon: "Mathematics", tue: "Biology", wed: "English", thu: "Chemistry", fri: "Physics", sat: "Mock Test" },
                        { time: "2:00 - 3:30", mon: "Chemistry", tue: "Physics", wed: "Mathematics", thu: "Biology", fri: "English", sat: "--" },
                        { time: "4:00 - 5:00", mon: "English", tue: "--", wed: "Physics", thu: "Mathematics", fri: "Chemistry", sat: "--" }
                      ].map((slot, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-all">
                          <td className="py-3 px-2 text-left text-slate-400 font-mono text-xs font-bold">{slot.time}</td>
                          {["mon", "tue", "wed", "thu", "fri", "sat"].map((day) => {
                            const val = slot[day];
                            let badgeStyle = "text-slate-400";
                            
                            // Match colors inside screenshots grid
                            if (val.includes("Physics")) badgeStyle = "bg-blue-50 text-blue-700 border border-blue-200/55";
                            else if (val.includes("Chemistry")) badgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-200/55";
                            else if (val.includes("Mathematics")) badgeStyle = "bg-purple-50 text-purple-700 border border-purple-200/55";
                            else if (val.includes("Biology")) badgeStyle = "bg-orange-50 text-orange-700 border border-orange-200/55";
                            else if (val.includes("English")) badgeStyle = "bg-red-50 text-red-700 border border-red-200/55";
                            else if (val.includes("Mock")) badgeStyle = "bg-brand-navy text-brand-yellow border border-brand-yellow/15 shadow-sm";
                            
                            return (
                              <td key={day} className="py-3 px-1.5">
                                <span className={`px-2.5 py-1.5 rounded-xl block text-xs truncate font-bold ${badgeStyle}`}>
                                  {val}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Grid legend display */}
                <div className="flex flex-wrap items-center gap-4 pt-3 text-[10px] font-bold uppercase text-slate-450 border-t border-slate-100">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Physics</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Chemistry</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Mathematics</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Biology</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> English</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-brand-navy border border-brand-yellow/40"></span> Mock Test</span>
                </div>
              </div>

              {/* Bottom row: Duration chips */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                  { label: "Physics", hours: "9h", val: 80, color: "bg-blue-500" },
                  { label: "Chemistry", hours: "7.5h", val: 65, color: "bg-emerald-500" },
                  { label: "Mathematics", hours: "10.5h", val: 95, color: "bg-purple-500" },
                  { label: "Biology", hours: "4.5h", val: 40, color: "bg-orange-500" },
                  { label: "English", hours: "4h", val: 35, color: "bg-red-500" }
                ].map((dur, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-slate-200/50 rounded-2xl text-left space-y-2 shadow-sm">
                    <div className="flex justify-between items-baseline font-bold leading-none">
                      <span className="font-sans text-xs text-slate-800">{dur.label}</span>
                      <span className="font-mono text-xs text-brand-navy font-bold">{dur.hours}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${dur.color}`} style={{ width: `${dur.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

                   {activeTab === "notifications" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Top stats notifications */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Total Notifications</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 mt-2 leading-none">{notificationsDb.length}</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-red-500/10 text-brand-red flex items-center justify-center">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Unread Alerts</h5>
                    <p className="font-display text-lg font-extrabold text-brand-red mt-2 leading-none">{unreadNotifs}</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-brand-yellow flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Exam Reminders</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 mt-2 leading-none">{countNotifs("Exam Reminders")}</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200/50 rounded-2xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.82a4.418 4.418 0 003.32-.156l6.414-3.207a1.125 1.125 0 000-2.012l-6.414-3.207a4.418 4.418 0 00-3.32-.156L4 10.5v3l6.34 2.32zM4 10.5h1.5M4 13.5h1.5M10.34 7.68V16.3M17.25 12h1.5" />
                    </svg>
                  </span>
                  <div>
                    <h5 className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Announcements</h5>
                    <p className="font-display text-lg font-extrabold text-slate-900 mt-2 leading-none">{countNotifs("Announcements")}</p>
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
                                ? "bg-blue-50/20 border-blue-500/25" 
                                : "bg-slate-50 border-slate-200/40"
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
                            
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 leading-snug">{n.title}</h5>
                            <p className="font-sans text-xs text-slate-500 leading-relaxed font-medium">{n.desc}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Right Column: filter by types & dates alerts */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Category filters exactly matching screenshot 7 */}
                  <div className="premium-glass-card p-4 space-y-3">
                    <div className="border-b border-slate-100 pb-2 text-left">
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy">Filter by Type</h4>
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
                          className={`w-full py-2.5 px-3 rounded-xl flex justify-between items-center transition cursor-pointer text-left ${
                            notifCategoryFilter === item.label
                              ? "bg-brand-yellow text-slate-900 font-extrabold"
                              : "hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <span className="font-sans">{item.label}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            notifCategoryFilter === item.label ? "bg-white text-slate-900" : "bg-slate-100 text-slate-500"
                          }`}>{item.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Dates exactly matching screenshot 7 */}
                  <div className="premium-glass-card p-4 space-y-3.5">
                    <div className="border-b border-slate-100 pb-2 text-left">
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy">Important Upcoming Dates</h4>
                    </div>

                    <div className="space-y-2.5 text-xs font-bold text-slate-700">
                      {[
                        { date: "Jan 14", label: "Unit Test 3 (PCM)", dateClass: "bg-red-50 text-brand-red border border-red-100" },
                        { date: "Jan 18", label: "Physics Electrostatics HW Due", dateClass: "bg-amber-50 text-brand-gold2 border border-brand-yellow/10" },
                        { date: "Jan 20", label: "Parent-Teacher Meeting", dateClass: "bg-blue-50 text-blue-600 border border-blue-200" },
                        { date: "Jan 26", label: "Republic Day — Holiday", dateClass: "bg-emerald-50 text-emerald-600 border border-emerald-200" },
                        { date: "Jan 31", label: "Full Mock Test (JEE Pattern)", dateClass: "bg-red-50 text-brand-red border border-red-100" },
                        { date: "Feb 5", label: "Q4 Fee Due Date", dateClass: "bg-amber-50 text-brand-gold2 border border-brand-yellow/20" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200/40 rounded-xl">
                          <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg ${item.dateClass}`}>{item.date}</span>
                          <span className="text-left truncate font-semibold text-slate-700">{item.label}</span>
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
                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">{student?.name}</h3>
                    <p className="font-sans text-xs font-semibold text-slate-400 font-mono">{student?.email} • {student?.phone}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold uppercase rounded-lg">JEE Advanced 2026</span>
                      <span className="px-2.5 py-0.5 bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold uppercase rounded-lg">Batch {student?.batch}</span>
                      <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase rounded-lg">Roll {student?.rollNumber}</span>
                      <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-250 text-emerald-600 text-[10px] font-bold uppercase rounded-lg">Active</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 relative z-10">
                  <button 
                    onClick={() => alert("Personal details modification desk requires parent key authentication.")}
                    className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm cursor-pointer transition-all active:scale-95 duration-200 flex items-center gap-1.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-slate-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Split layout Personal Info vs Course details */}
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
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy">Parent / Guardian Info</h4>
                    </div>

                    <div className="space-y-3">
                      {/* Father */}
                      <div className="p-3.5 bg-slate-50 border border-slate-200/40 rounded-2xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 leading-none">{student?.fatherName || "N/A"} <span className="text-[10px] text-slate-400 font-semibold font-mono">(Father)</span></h5>
                            <p className="text-xs text-slate-500 mt-1.5 font-bold font-mono">{student?.fatherPhone || "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => alert("Helpline desk active: Dialing parent...")} className="p-2 bg-white border border-slate-200 rounded-lg text-brand-navy hover:bg-brand-yellow hover:text-[#0a1835] transition duration-200 cursor-pointer shadow-sm flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.118-6.944-6.94l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                          </button>
                          <button onClick={() => alert("Helpline mailer desk active...")} className="p-2 bg-white border border-slate-200 rounded-lg text-brand-navy hover:bg-brand-yellow hover:text-[#0a1835] transition duration-200 cursor-pointer shadow-sm flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Mother */}
                      <div className="p-3.5 bg-slate-50 border border-slate-200/40 rounded-2xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-display text-xs sm:text-sm font-bold text-slate-900 leading-none">{student?.motherName || "N/A"} <span className="text-[10px] text-slate-400 font-semibold font-mono">(Mother)</span></h5>
                            <p className="text-xs text-slate-500 mt-1.5 font-bold font-mono">{student?.motherPhone || "N/A"}</p>
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

                {/* Right column course details & statistics Circular gauges */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Course Details Grid panel replica */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2 text-left flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A5.998 5.998 0 0 1 2.25 4.876V3.75a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 .75.75v1.127a5.999 5.999 0 0 1-2.882 5.108 50.64 50.64 0 0 0-2.658.813m-11.133 0A48.36 48.36 0 0 1 12 12.75c2.973 0 5.825-.266 8.594-.783m-16.727 0a48.38 48.38 0 0 0-2.185-1.573c-.636-.423-1.026-1.124-1.026-1.879m19.937 0a48.38 48.38 0 0 1 2.185 1.573c.636.423 1.026 1.124 1.026 1.879v6.587c0 .89-.533 1.687-1.34 2.05L12.75 22.5h-.008z" />
                      </svg>
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy">Course & Enrollment Details</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-600 text-left">
                      <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl">
                        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider mb-1">Enrolled Course</p>
                        <p className="text-brand-navy font-extrabold text-xs">JEE Advanced 2026 (2-Year)</p>
                      </div>
                      
                      <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl">
                        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider mb-1">Coaching Shift</p>
                        <p className="text-brand-navy font-extrabold text-xs">Batch {student?.batch} — Morning Shift</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl">
                        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider mb-1">Enrollment Date</p>
                        <p className="text-brand-navy font-extrabold text-xs">April 1, 2024</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl">
                        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider mb-1">Session Limit</p>
                        <p className="text-brand-navy font-extrabold text-xs">March 31, 2026</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl">
                        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider mb-1">Academic Fee Structure</p>
                        <p className="text-brand-navy font-extrabold text-xs">₹46,000 / Year</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl">
                        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider mb-1">Class Standard subjects</p>
                        <p className="text-brand-navy font-extrabold text-xs truncate" title="Physics, Chemistry, Maths, Biology, English">Physics • Chemistry • Maths • Bio • Eng</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl">
                        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider mb-1">Assigned Class Mentor</p>
                        <p className="text-brand-navy font-extrabold text-xs">Dr. Ramesh Sharma</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl">
                        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider mb-1">Coaching Batch Strength</p>
                        <p className="text-brand-navy font-extrabold text-xs">42 Pre-registered Students</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Performance summary replica */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2 text-left flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-brand-navy">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5 6.75-6.75M19.5 12V9h-3" />
                      </svg>
                      <h4 className="font-display text-sm font-bold uppercase text-brand-navy">Academic Performance Summary</h4>
                    </div>

                    {/* Summary metrics row */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Attendance", val: attendanceRatio, color: "text-emerald-600", bgColor: "bg-emerald-500" },
                        { label: "Test Average", val: 73, color: "text-brand-gold2", bgColor: "bg-brand-yellow" },
                        { label: "Fees Settled", val: 81, color: "text-brand-navy", bgColor: "bg-brand-navy" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl flex flex-col justify-between min-h-[80px]">
                          <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">{item.label}</span>
                          <span className={`text-base font-black text-center ${item.color} mt-1`}>{item.val}%</span>
                          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-1.5">
                            <div className={`${item.bgColor} h-full`} style={{ width: `${item.val}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Progress bars */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      {[
                        { label: "Physics", val: 78, color: "bg-blue-500" },
                        { label: "Mathematics", val: 91, color: "bg-purple-500" },
                        { label: "Chemistry", val: 65, color: "bg-emerald-500" },
                        { label: "Biology", val: 55, color: "bg-orange-500" },
                        { label: "English", val: 83, color: "bg-red-500" }
                      ].map((bar, idx) => (
                        <div key={idx} className="space-y-1.5 text-left font-bold text-xs text-slate-500">
                          <div className="flex justify-between"><span>{bar.label} Marks Aggregate</span><span className="text-slate-900 font-mono font-bold">{bar.val}%</span></div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.val}%` }}></div>
                          </div>
                        </div>
                      ))}
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
