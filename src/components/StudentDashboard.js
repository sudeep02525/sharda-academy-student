"use client";

import { useState, useEffect } from "react";
import { 
  ChartBarIcon, 
  FingerPrintIcon, 
  DocumentPlusIcon, 
  ClipboardIcon, 
  UsersIcon, 
  CreditCardIcon, 
  CalendarIcon,
  BellIcon,
  UserIcon
} from '@heroicons/react/24/outline';

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/sams/student/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await res.json();
      if (resData.success) {
        setData(resData);
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
      const res = await fetch(`http://localhost:5000/api/sams/fees/${paySimulating._id}`, {
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-brand-beige relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-yellow/5 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-brand-blue/5 blur-2xl animate-pulse"></div>
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-brand-yellow animate-spin mb-4 shadow shadow-brand-yellow/10"></div>
        <p className="text-xs font-black uppercase tracking-widest text-[#0a1835] font-sans">Syncing Secure Student Dashboard...</p>
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

  const { student, attendance, notices, timetable, fees, results } = data;

  const presentDays = attendance.filter((a) => a.status === "Present" || a.status === "Late").length;
  const attendanceRatio = attendance.length > 0 ? Math.round((presentDays / attendance.length) * 100) : 100;
  const pendingInvoices = fees.filter((f) => f.status === "Unpaid");

  // Re-create the sidebar navigation exactly matching the reference stylesheets (8 links!)
  const MENU_CATALOG = [
    { id: "overview", label: "Dashboard", icon: ChartBarIcon },
    { id: "attendance", label: "Attendance", icon: FingerPrintIcon },
    { id: "fees", label: "Fees", icon: CreditCardIcon },
    { id: "academic", label: "Tests & Results", icon: UsersIcon },
    { id: "homework", label: "Homework & Notes", icon: DocumentPlusIcon },
    { id: "schedule", label: "Timetable", icon: CalendarIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "profile", label: "Profile", icon: UserIcon },
  ];

  // Count type notifications
  const countNotifs = (type) => notificationsDb.filter(n => n.type === type).length;
  const unreadNotifs = notificationsDb.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-brand-beige text-[#0f1a30] grid grid-cols-1 md:grid-cols-[auto_1fr] noise dotbg relative overflow-x-hidden md:h-screen md:overflow-hidden font-sans">
      
      {/* Ambient backdrop glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none animate-float-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-yellow/3 blur-[140px] pointer-events-none animate-float-reverse"></div>

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
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-md">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <div className="text-left">
              <h1 className="text-xs font-black text-white uppercase tracking-wider leading-none">SHARDA ACADEMY</h1>
              <p className="text-[8px] font-black text-brand-yellow uppercase tracking-widest leading-none mt-1.5">STUDENT PORTAL</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 hover:text-brand-yellow cursor-pointer"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Nav catalog */}
        <nav className="p-3 flex-grow space-y-1.5 overflow-y-auto">
          {MENU_CATALOG.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                setSidebarOpen(false);
              }}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-3.5 group cursor-pointer ${
                activeTab === t.id
                  ? "bg-brand-yellow text-[#0a1835] font-black shadow-lg"
                  : "text-slate-300 hover:text-brand-yellow hover:bg-white/5"
              }`}
            >
              <t.icon className={`h-5 w-5 ${activeTab === t.id ? "text-[#0a1835]" : "text-slate-400 group-hover:text-brand-yellow transition-colors"}`} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar user pill matching screenshots bottom */}
        <div className="p-4 border-t border-white/8 space-y-3 bg-[#030814]/30">
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-yellow text-brand-blue flex items-center justify-center font-black text-xs flex-shrink-0">
                {student?.name?.[0]?.toUpperCase()}
              </div>
              <div className="text-left min-w-0">
                <h5 className="text-[10px] font-black text-white truncate leading-none">{student?.name}</h5>
                <p className="text-[8px] text-slate-400 font-bold truncate mt-1">Std {student?.classLevel} - Roll {student?.rollNumber}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="p-1.5 rounded-lg bg-red-950/20 text-brand-red border border-red-900/10 hover:bg-brand-red hover:text-white transition-all cursor-pointer flex-shrink-0"
              title="Sign Out Session"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* 🖥️ Header & Main Panel Layout */}
      <div className="flex-grow flex flex-col min-w-0 w-full md:h-screen md:overflow-hidden bg-[#faf9f6] relative z-10">
        
        {/* Top Header exactly matching light Sharda theme */}
        <header className="p-4 bg-[#0a1835] border-b-2 border-brand-yellow flex items-center justify-between sticky top-0 z-20 shadow-md">
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
              <h2 className="text-sm md:text-base font-black text-white tracking-wider">
                {MENU_CATALOG.find(m => m.id === activeTab)?.label}
              </h2>
              <p className="text-[9.5px] font-bold text-slate-350 font-mono mt-0.5 uppercase tracking-wider">
                {activeTab === "overview" ? currentTime : `${student?.name} • Std ${student?.classLevel}th`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3.5">
            {/* Search Box */}
            <div className="hidden sm:flex items-center gap-2 bg-[#ffffff]/10 border border-white/10 px-3 py-1.5 rounded-xl w-60">
              <span className="text-[10px] text-slate-300 pointer-events-none">🔍</span>
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent border-none text-xs w-full text-white focus:outline-none p-0 placeholder-slate-400"
              />
            </div>

            {/* Notification bell */}
            <button
              onClick={() => setActiveTab("notifications")}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white relative border border-white/5 cursor-pointer transition-all active:scale-95"
            >
              🔔
              {unreadNotifs > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-brand-yellow border border-[#0a1835] animate-pulse"></span>
              )}
            </button>
            
            {/* Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-brand-yellow text-slate-900 flex items-center justify-center font-black text-xs border border-brand-yellow/30 flex-shrink-0 shadow-md">
              {student?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-6 max-w-5xl w-full mx-auto space-y-6 flex-grow overflow-y-auto md:h-[calc(100vh-70px)] pb-24 md:pb-12 text-left relative z-10">

          {/* ========================================================
              TAB 1: DASHBOARD OVERVIEW
              ======================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* 🌟 OVERVIEW BANNER */}
              <div className="premium-glass-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="space-y-1.5 text-left relative z-10">
                  <span className="text-[8px] font-black uppercase text-brand-yellow tracking-widest bg-brand-yellow/10 px-2.5 py-1 rounded-md">
                    WELCOME BACK
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pt-1">
                    {student?.name}
                  </h2>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-extrabold text-slate-500 uppercase mt-1">
                    <span>Std: <strong className="text-[#0a1835]">{student?.classLevel}th Board Prep</strong></span>
                    <span>•</span>
                    <span>Batch: <strong className="text-[#0a1835]">{student?.batch}</strong></span>
                    <span>•</span>
                    <span>Roll Number: <strong className="text-[#0a1835]">{student?.rollNumber}</strong></span>
                  </div>
                </div>

                {/* Streak blocks on the right */}
                <div className="flex items-center gap-3.5 relative z-10 flex-shrink-0">
                  <div className="p-3 bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl text-left w-48 shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-wider text-brand-yellow bg-brand-yellow/10 px-2.5 py-0.5 rounded-md inline-block">7-day streak</span>
                    <p className="text-[10px] font-extrabold text-slate-650 mt-2">Keep it up — SAMS exams in 38 days!</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/50 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner">
                    <div className="w-14 h-14 rounded-xl bg-[#0a1835] flex items-center justify-center font-black text-xl text-brand-yellow">
                      {student?.name?.[0]?.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* 🎴 METRICS ROW */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Attendance card */}
                <div className="p-4 bg-emerald-50 border border-emerald-250 rounded-2xl text-left flex flex-col justify-between h-28 hover:border-emerald-500 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-xs">%</span>
                    <span className="text-[8px] font-bold text-emerald-600">↑ 2% vs last month</span>
                  </div>
                  <div>
                    <div className="text-xl font-black text-emerald-700 leading-tight">{attendanceRatio}%</div>
                    <p className="text-[9px] text-slate-450 font-bold uppercase mt-1">Attendance</p>
                  </div>
                </div>

                {/* 2. Overall Rank Card */}
                <div className="p-4 bg-purple-50 border border-purple-250 rounded-2xl text-left flex flex-col justify-between h-28 hover:border-purple-500 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center text-xs">🏆</span>
                    <span className="text-[8px] font-bold text-purple-600">↑ 6 positions</span>
                  </div>
                  <div>
                    <div className="text-xl font-black text-purple-700 leading-tight">#14</div>
                    <p className="text-[9px] text-slate-450 font-bold uppercase mt-1">Overall Rank</p>
                  </div>
                </div>

                {/* 3. Avg Test Score Card */}
                <div className="p-4 bg-blue-50 border border-blue-250 rounded-2xl text-left flex flex-col justify-between h-28 hover:border-blue-500 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs">📄</span>
                    <span className="text-[8px] font-bold text-blue-600">↑ 4pts this week</span>
                  </div>
                  <div>
                    <div className="text-xl font-black text-blue-700 leading-tight">73/100</div>
                    <p className="text-[9px] text-slate-450 font-bold uppercase mt-1">Avg. Test Score</p>
                  </div>
                </div>

                {/* 4. Fees Pending Card */}
                <div className="p-4 bg-amber-50 border border-brand-yellow/30 rounded-2xl text-left flex flex-col justify-between h-28 hover:border-brand-yellow transition-all">
                  <div className="flex justify-between items-center">
                    <span className="w-7 h-7 rounded-lg bg-brand-yellow/10 text-brand-yellow flex items-center justify-center text-xs">₹</span>
                    <span className="text-[8px] font-bold text-brand-yellow">Due Feb 5</span>
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#b45309] leading-tight">
                      {pendingInvoices.length > 0 ? `₹${pendingInvoices[0].amount.toLocaleString()}` : "₹0"}
                    </div>
                    <p className="text-[9px] text-slate-450 font-bold uppercase mt-1">Fees Pending</p>
                  </div>
                </div>

              </div>

              {/* Today's Lectures timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left column: Today's Classes */}
                <div className="lg:col-span-7 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835] flex items-center gap-2">
                      <span>⏰</span> Today's Class Lectures
                    </h4>
                    <span className="text-[8px] font-bold text-slate-450 hover:text-brand-yellow cursor-pointer" onClick={() => setActiveTab("schedule")}>Full Timetable ↗</span>
                  </div>

                  <div className="space-y-3">
                    {/* Class 1 */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-between gap-4">
                      <div className="text-left">
                        <h5 className="text-xs font-black text-slate-900 leading-tight">Physics</h5>
                        <p className="text-[9.5px] text-slate-450 mt-1 font-bold">Dr. Ramesh Sharma • Hall A</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-slate-500">9:00 - 10:30 AM</span>
                        <span className="px-2.5 py-1 bg-slate-200/60 border border-slate-300 text-slate-500 text-[8px] font-black uppercase rounded-lg">Completed</span>
                      </div>
                    </div>

                    {/* Class 2 */}
                    <div className="p-3.5 bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl flex items-center justify-between gap-4 animate-pulse-glow">
                      <div className="text-left">
                        <h5 className="text-xs font-black text-brand-yellow leading-tight">Mathematics</h5>
                        <p className="text-[9.5px] text-slate-650 mt-1 font-bold">Prof. Anand Verma • Hall B</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[#b45309] font-bold">11:00 AM - 12:30 PM</span>
                        <span className="px-2.5 py-1 bg-brand-yellow text-slate-900 text-[8px] font-black uppercase rounded-lg">Live Now</span>
                      </div>
                    </div>

                    {/* Class 3 */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-between gap-4">
                      <div className="text-left">
                        <h5 className="text-xs font-black text-slate-900 leading-tight">Chemistry</h5>
                        <p className="text-[9.5px] text-slate-450 mt-1 font-bold">Ms. Preet Kaur • Hall A</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-slate-500">2:00 - 3:30 PM</span>
                        <span className="px-2.5 py-1 bg-brand-yellow/10 border border-brand-yellow/20 text-[#b45309] text-[8px] font-black uppercase rounded-lg">Upcoming</span>
                      </div>
                    </div>

                    {/* Class 4 */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-between gap-4">
                      <div className="text-left">
                        <h5 className="text-xs font-black text-slate-900 leading-tight">English</h5>
                        <p className="text-[9.5px] text-slate-450 mt-1 font-bold">Mr. Suresh Nair • Room 7</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-slate-500">4:00 - 5:00 PM</span>
                        <span className="px-2.5 py-1 bg-brand-yellow/10 border border-brand-yellow/20 text-[#b45309] text-[8px] font-black uppercase rounded-lg">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Upcoming Tests */}
                <div className="lg:col-span-5 space-y-6">
                  
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835] flex items-center gap-2">
                        <span>📝</span> Upcoming SAMS Tests
                      </h4>
                      <span className="text-[8px] font-bold text-slate-450 hover:text-brand-yellow cursor-pointer" onClick={() => setActiveTab("academic")}>View all ↗</span>
                    </div>

                    <div className="space-y-3 text-xs font-bold text-slate-700">
                      <div className="flex items-center justify-between p-2 bg-slate-50 border rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 bg-red-100 text-brand-red border border-red-200 text-[8px] font-black uppercase rounded-lg">18 Jan</span>
                          <span className="text-left">Physics <span className="text-[9px] text-slate-450 block mt-0.5">Electrostatics notes</span></span>
                        </div>
                        <span className="text-slate-400">❯</span>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-slate-50 border rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 bg-blue-100 text-blue-600 border border-blue-200 text-[8px] font-black uppercase rounded-lg">21 Jan</span>
                          <span className="text-left">Mathematics <span className="text-[9px] text-slate-450 block mt-0.5">Integral Calculus syllabus</span></span>
                        </div>
                        <span className="text-slate-400">❯</span>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-slate-50 border rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 border border-emerald-250 text-[8px] font-black uppercase rounded-lg">25 Jan</span>
                          <span className="text-left">Chemistry <span className="text-[9px] text-slate-450 block mt-0.5">Organic Chemistry review</span></span>
                        </div>
                        <span className="text-slate-400">❯</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Snapshot */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">Performance Snapshot</h4>
                      <span className="text-[8px] font-bold text-slate-450">Weekly Tracker</span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Left Circular Ring */}
                      <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="40" cy="40" r="32" className="text-slate-100" strokeWidth="6.5" stroke="currentColor" fill="transparent" />
                          <circle cx="40" cy="40" r="32" className="text-brand-yellow" strokeWidth="6.5" stroke="currentColor" fill="transparent"
                            strokeDasharray={201.1}
                            strokeDashoffset={201.1 - (201.1 * 73) / 100}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-sm font-black text-[#0a1835]">73%</span>
                      </div>
                      
                      {/* Right Subject progress line */}
                      <div className="flex-grow space-y-1.5 text-[10px] font-bold text-slate-500">
                        <div className="flex justify-between"><span>Physics:</span><span className="text-slate-900 font-extrabold">78%</span></div>
                        <div className="flex justify-between"><span>Maths:</span><span className="text-slate-900 font-extrabold">91%</span></div>
                        <div className="flex justify-between"><span>Chemistry:</span><span className="text-slate-900 font-extrabold">65%</span></div>
                        <div className="flex justify-between"><span>Biology:</span><span className="text-slate-900 font-extrabold">55%</span></div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Notices */}
              <div className="premium-glass-card p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835] flex items-center gap-2">
                    <span>📢</span> Recent Notices & System Feeds
                  </h4>
                  <span className="text-[8px] font-bold text-slate-450 hover:text-brand-yellow cursor-pointer" onClick={() => setActiveTab("notifications")}>All Notices ↗</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Notice 1 */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl text-left space-y-2 hover-glow">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-red-55 text-brand-red border border-red-100 text-[8px] font-black uppercase rounded">Exam</span>
                      <span className="text-[8px] font-mono text-slate-400">Jan 18, 2026</span>
                    </div>
                    <h5 className="text-[11px] font-black text-slate-900 truncate leading-snug">Unit Test 3 - Physics & Chemistry</h5>
                    <p className="text-[9.5px] text-slate-500 leading-relaxed font-semibold">Syllabus: Electrostatics (Ch.1-3) + Hydrocarbons. Bring admit card.</p>
                  </div>

                  {/* Notice 2 */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl text-left space-y-2 hover-glow">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-emerald-55 text-emerald-600 border border-emerald-100 text-[8px] font-black uppercase rounded">Holiday</span>
                      <span className="text-[8px] font-mono text-slate-400">Jan 26, 2026</span>
                    </div>
                    <h5 className="text-[11px] font-black text-slate-900 truncate leading-snug">Republic Day - Institute Closed</h5>
                    <p className="text-[9.5px] text-slate-500 leading-relaxed font-semibold">The institute will remain closed on 26 Jan. Classes resume on 27 Jan.</p>
                  </div>

                  {/* Notice 3 */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl text-left space-y-2 hover-glow">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-amber-55 text-[#b45309] border border-brand-yellow/20 text-[8px] font-black uppercase rounded">Notice</span>
                      <span className="text-[8px] font-mono text-slate-400">Jan 20, 2026</span>
                    </div>
                    <h5 className="text-[11px] font-black text-slate-900 truncate leading-snug">Parent-Teacher Meeting</h5>
                    <p className="text-[9.5px] text-slate-500 leading-relaxed font-semibold">All parents are requested to attend PTM from 10 AM - 1 PM. Mandatory.</p>
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
              
              {/* Four circular stats rings */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Overall Attendance", val: attendanceRatio, color: "text-brand-yellow" },
                  { label: "Physics Attendance", val: 88, color: "text-emerald-500" },
                  { label: "Mathematics Attendance", val: 94, color: "text-purple-600" },
                  { label: "Chemistry Attendance", val: 79, color: "text-orange-500" }
                ].map((ring, idx) => (
                  <div key={idx} className="p-4 premium-glass-card flex items-center gap-4">
                    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="22" className="text-slate-100" strokeWidth="4.5" stroke="currentColor" fill="transparent" />
                        <circle cx="28" cy="28" r="22" className={ring.color} strokeWidth="4.5" stroke="currentColor" fill="transparent"
                          strokeDasharray={138.2}
                          strokeDashoffset={138.2 - (138.2 * ring.val) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-black text-slate-900">{ring.val}%</span>
                    </div>
                    <div className="text-left min-w-0 font-bold">
                      <div className="text-lg font-black text-[#0a1835] leading-none">{ring.val}%</div>
                      <p className="text-[9px] text-slate-450 uppercase mt-1 truncate">{ring.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Attendance metrics present/absent chips */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 border border-emerald-250 rounded-2xl flex items-center gap-3 text-left shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs">✓</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Days Present (total)</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">{presentDays}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-left shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-red-500/10 text-brand-red flex items-center justify-center text-xs">✕</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Days Absent (total)</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">{attendance.length - presentDays}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 text-left shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs">📅</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Holidays / Off Days</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">16</p>
                  </div>
                </div>
              </div>

              {/* Monthly calendar split with subject-wise progress */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left panel: Monthly Grid */}
                <div className="lg:col-span-7 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                      🗓️ {attendanceMonth} — Monthly Grid Logs
                    </h4>
                    <span className="text-[8px] font-bold text-slate-450">Coaching Records</span>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2.5 text-center text-[10.5px] font-bold">
                    {/* Days names */}
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i} className="text-slate-400 uppercase tracking-widest">{d}</span>
                    ))}
                    
                    {Array.from({ length: 31 }, (_, idx) => {
                      const dayNum = idx + 1;
                      let slotStyle = "bg-slate-50 text-slate-400 border border-slate-200/50";
                      
                      if ([1, 2, 4, 5, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19, 20, 22, 23, 24, 27, 28, 29, 30, 31].includes(dayNum)) {
                        slotStyle = "bg-emerald-50 text-emerald-600 border border-emerald-200"; 
                      } else if ([3, 9, 17, 25].includes(dayNum)) {
                        slotStyle = "bg-red-50 text-brand-red border border-red-200"; 
                      } else if ([14, 21, 26].includes(dayNum)) {
                        slotStyle = "bg-amber-50 text-[#b45309] border border-brand-yellow/20"; 
                      }
                      
                      return (
                        <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center font-mono mx-auto cursor-pointer hover:scale-110 transition font-black ${slotStyle}`}>
                          {dayNum}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Legend guide */}
                  <div className="flex items-center gap-4 text-[9.5px] font-bold uppercase text-slate-450 border-t border-[#f1af3c]/8 pt-3">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Present</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Absent</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span> Holiday</span>
                  </div>
                </div>

                {/* Right panel: Subject-wise attendance progress lines */}
                <div className="lg:col-span-5 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                      📚 Subject Attendance Ratios
                    </h4>
                    <span className="text-[8px] font-bold text-slate-450">SAMS Analytics</span>
                  </div>

                  <div className="space-y-3.5">
                    {/* Physics */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Physics</span>
                        <span className="text-[#0a1835]">88% <span className="text-[10px] text-slate-450 font-semibold">(42/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>

                    {/* Chemistry */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Chemistry</span>
                        <span className="text-[#0a1835]">79% <span className="text-[10px] text-slate-450 font-semibold">(38/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "79%" }}></div>
                      </div>
                    </div>

                    {/* Mathematics */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Mathematics</span>
                        <span className="text-[#0a1835]">94% <span className="text-[10px] text-slate-450 font-semibold">(45/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>

                    {/* Biology */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Biology</span>
                        <span className="text-[#0a1835]">63% <span className="text-[10px] text-slate-450 font-semibold">(30/48 lectures)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: "63%" }}></div>
                      </div>
                    </div>

                    {/* English */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>English</span>
                        <span className="text-[#0a1835]">83% <span className="text-[10px] text-slate-450 font-semibold">(40/48 lectures)</span></span>
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
                <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                    📑 Attendance History Logs
                  </h4>
                  <span className="text-[8px] font-bold text-slate-450 hover:text-brand-yellow cursor-pointer">Export CSV ↗</span>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#f1af3c]/8 text-slate-450 font-bold uppercase tracking-wider text-[9.5px]">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-center">Physics</th>
                        <th className="py-3 px-4 text-center">Chemistry</th>
                        <th className="py-3 px-4 text-center">Maths</th>
                        <th className="py-3 px-4 text-center">Biology</th>
                        <th className="py-3 px-4 text-center">English</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold">
                      {[
                        { date: "Jan 13, Mon", phy: "P", chm: "P", mth: "P", bio: "P", eng: "A" },
                        { date: "Jan 12, Sun", phy: "H", chm: "H", mth: "H", bio: "H", eng: "H" },
                        { date: "Jan 11, Sat", phy: "P", chm: "P", mth: "P", bio: "A", eng: "P" },
                        { date: "Jan 10, Fri", phy: "P", chm: "A", mth: "P", bio: "P", eng: "P" },
                        { date: "Jan 9, Thu", phy: "P", chm: "P", mth: "P", bio: "P", eng: "P" },
                        { date: "Jan 8, Wed", phy: "A", chm: "P", mth: "P", bio: "P", eng: "P" }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-all text-slate-650">
                          <td className="py-3 px-4 text-slate-700 font-mono">{row.date}</td>
                          {["phy", "chm", "mth", "bio", "eng"].map((subj) => {
                            const val = row[subj];
                            const badgeColor = val === "P" ? "bg-emerald-50 text-emerald-600 border border-emerald-250" :
                                               val === "A" ? "bg-red-55 text-brand-red border border-red-200" :
                                               "bg-slate-100 text-slate-400 border border-slate-200/50";
                            return (
                              <td key={subj} className="py-3 px-4 text-center">
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-black text-[9.5px] mx-auto ${badgeColor}`}>
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
              TAB 3: FEES & PAYMENTS
              ======================================================== */}
          {activeTab === "fees" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Three horizontal stats card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* 1. Total Paid Card */}
                <div className="p-5 bg-[#ffffff] border border-slate-200/60 rounded-2xl text-left flex justify-between items-center shadow-sm">
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none mb-2">Total Amount Paid</h5>
                    <p className="text-2xl font-black text-slate-900 font-mono leading-none">₹37,500</p>
                    <p className="text-[9px] text-emerald-600 font-bold mt-1.5">3 installments cleared</p>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg border border-emerald-100">✓</span>
                </div>

                {/* 2. Pending dues Card */}
                <div className="p-5 bg-[#ffffff] border border-slate-200/60 rounded-2xl text-left flex justify-between items-center shadow-sm">
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none mb-2">Outstanding Dues</h5>
                    <p className="text-2xl font-black text-slate-900 font-mono leading-none">
                      {pendingInvoices.length > 0 ? `₹${pendingInvoices[0].amount.toLocaleString()}` : "₹0"}
                    </p>
                    <p className="text-[9px] text-[#b45309] font-bold mt-1.5">Q4 Installment due Feb 5</p>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-amber-50 text-[#b45309] flex items-center justify-center font-black text-lg border border-brand-yellow/10">⚠️</span>
                </div>

                {/* 3. Total Course Fee progression */}
                <div className="p-5 bg-[#ffffff] border border-slate-200/60 rounded-2xl text-left flex flex-col justify-between shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none mb-1">Total Course Fee</h5>
                      <p className="text-2xl font-black text-slate-900 font-mono leading-none">₹46,000</p>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-50 border border-blue-250 text-blue-600 text-[8px] font-black uppercase rounded">81% paid</span>
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
                  <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                      💳 SAMS Payment History Ledger
                    </h4>
                    <span className="text-[8px] font-bold text-slate-450 hover:text-brand-yellow cursor-pointer">Download Receipt ↗</span>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#f1af3c]/8 text-slate-450 font-bold uppercase tracking-wider text-[9.5px]">
                          <th className="py-3 px-3">Transaction ID</th>
                          <th className="py-3 px-3">Period</th>
                          <th className="py-3 px-3">Date</th>
                          <th className="py-3 px-3">Mode</th>
                          <th className="py-3 px-3">Amount</th>
                          <th className="py-3 px-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-bold text-slate-650">
                        {[
                          { id: "TXN-2026-001", period: "Q3 Oct-Dec", date: "Dec 1, 2026", mode: "Online - UPI", amount: 12500, status: "Paid" },
                          { id: "TXN-2026-002", period: "Q2 Jul-Sep", date: "Sep 2, 2026", mode: "Online - Net", amount: 12500, status: "Paid" },
                          { id: "TXN-2026-003", period: "Q1 Apr-Jun", date: "Jun 5, 2026", mode: "Cash", amount: 12500, status: "Paid" },
                          { id: "TXN-2026-004", period: "Q4 Jan-Mar", date: "Feb 5, 2026", mode: "--", amount: 8500, status: "Pending" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-all">
                            <td className="py-3.5 px-3 font-mono text-[10px] text-slate-900">{row.id}</td>
                            <td className="py-3.5 px-3">{row.period}</td>
                            <td className="py-3.5 px-3 font-mono text-[10px] text-slate-400">{row.date}</td>
                            <td className="py-3.5 px-3 text-slate-450">{row.mode}</td>
                            <td className="py-3.5 px-3 font-mono font-black text-slate-900">₹{row.amount.toLocaleString()}</td>
                            <td className="py-3.5 px-3 text-center">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                row.status === "Paid" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-red-55 text-brand-red border border-red-200"
                              }`}>{row.status}</span>
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
                    <div className="border-b border-[#f1af3c]/8 pb-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">Q4 Fee Breakdown</h4>
                    </div>

                    <div className="space-y-2 text-xs font-bold text-slate-650">
                      <div className="flex justify-between"><span>Tuition Fee</span><span>₹7,000</span></div>
                      <div className="flex justify-between"><span>Study Material</span><span>₹800</span></div>
                      <div className="flex justify-between"><span>Lab Charges</span><span>₹400</span></div>
                      <div className="flex justify-between"><span>Library Fee</span><span>₹150</span></div>
                      <div className="flex justify-between"><span>Exam Fee</span><span>₹150</span></div>
                      <div className="w-full border-t border-dashed border-slate-200 my-2"></div>
                      <div className="flex justify-between text-[#0a1835] font-black"><span>Total Invoice</span><span className="text-brand-yellow">₹8,500</span></div>
                    </div>
                  </div>

                  {/* Payment due action box */}
                  <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl text-left space-y-4 shadow-sm">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-wider text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded-md inline-block">PAYMENT DUE SOON</p>
                      <h3 className="text-base font-black text-slate-900 font-mono tracking-tight pt-1">₹8,500</h3>
                      <p className="text-[9.5px] text-slate-450 font-bold">Due Date: February 5, 2026</p>
                    </div>

                    {pendingInvoices.length > 0 ? (
                      <div className="space-y-2.5">
                        <button
                          onClick={() => setPaySimulating(pendingInvoices[0])}
                          className="w-full py-3.5 text-xs font-black uppercase tracking-widest text-white bg-[#0a1835] hover:bg-slate-800 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 duration-200 text-center block border-none"
                        >
                          Pay Now — UPI / Net Banking
                        </button>
                        <button
                          onClick={() => alert("Initiating official PDF billing download...")}
                          className="w-full py-3 text-xs font-black uppercase tracking-widest text-slate-700 bg-white hover:bg-slate-50 rounded-xl transition cursor-pointer text-center block border border-slate-200 shadow-sm"
                        >
                          Download Invoice
                        </button>
                      </div>
                    ) : (
                      <div className="py-2 text-center text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-250 rounded-xl">
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
                
                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl text-left shadow-sm">
                  <p className="text-[8px] text-slate-450 font-bold uppercase tracking-wider">Current Class Rank</p>
                  <p className="text-xl font-black text-[#0a1835] mt-1.5">#3</p>
                  <p className="text-[9px] text-emerald-600 font-bold mt-1">↑ 11 positions since Nov</p>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl text-left shadow-sm">
                  <p className="text-[8px] text-slate-450 font-bold uppercase tracking-wider">Latest Test Score</p>
                  <p className="text-xl font-black text-[#0a1835] mt-1.5 font-mono">137/150</p>
                  <p className="text-[9px] text-brand-yellow font-bold mt-1">Mock Test 2 • Jan 10</p>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl text-left shadow-sm">
                  <p className="text-[8px] text-slate-450 font-bold uppercase tracking-wider">Average Test Score</p>
                  <p className="text-xl font-black text-[#0a1835] mt-1.5">73%</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-1">Across 5 exams</p>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl text-left shadow-sm">
                  <p className="text-[8px] text-slate-450 font-bold uppercase tracking-wider">Tests Attempted</p>
                  <p className="text-xl font-black text-[#0a1835] mt-1.5">5/6</p>
                  <p className="text-[9px] text-[#b45309] font-bold mt-1">1 upcoming test soon</p>
                </div>

              </div>

              {/* Mid panel split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Test History Table */}
                <div className="lg:col-span-8 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                      📑 Complete Test Performance Ledger
                    </h4>
                    <span className="text-[8px] font-bold text-slate-450 hover:text-brand-yellow cursor-pointer">Download Report ↗</span>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#f1af3c]/8 text-slate-450 font-bold uppercase tracking-wider text-[9.5px]">
                          <th className="py-3 px-3">Test Name</th>
                          <th className="py-3 px-3 font-mono">Date</th>
                          <th className="py-3 px-3 text-center">Phy</th>
                          <th className="py-3 px-3 text-center">Chem</th>
                          <th className="py-3 px-3 text-center">Maths</th>
                          <th className="py-3 px-3 text-center">Total</th>
                          <th className="py-3 px-3 text-center">Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-105 font-bold text-slate-650">
                        {[
                          { name: "Unit Test 1", date: "Nov 10, 2026", phy: "34/50", chm: "28/50", mth: "42/50", total: "104/150", rank: "#8" },
                          { name: "Unit Test 2", date: "Nov 28, 2026", phy: "38/50", chm: "32/50", mth: "45/50", total: "115/150", rank: "#6" },
                          { name: "Mock Test 1", date: "Dec 12, 2026", phy: "42/50", chm: "35/50", mth: "48/50", total: "125/150", rank: "#5" },
                          { name: "Unit Test 3", date: "Jan 5, 2026", phy: "45/50", chm: "30/50", mth: "50/50", total: "125/150", rank: "#4" },
                          { name: "Mock Test 2", date: "Jan 10, 2026", phy: "47/50", chm: "38/50", mth: "52/50", total: "137/150", rank: "#3" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-all">
                            <td className="py-3.5 px-3 text-slate-900 font-extrabold">{row.name}</td>
                            <td className="py-3.5 px-3 font-mono text-[10px] text-slate-400">{row.date}</td>
                            <td className="py-3.5 px-3 text-center font-mono">{row.phy}</td>
                            <td className="py-3.5 px-3 text-center font-mono">{row.chm}</td>
                            <td className="py-3.5 px-3 text-center font-mono">{row.mth}</td>
                            <td className="py-3.5 px-3 text-center font-mono font-black text-brand-yellow">{row.total}</td>
                            <td className="py-3.5 px-3 text-center">
                              <span className="px-2.5 py-0.5 rounded bg-brand-yellow text-slate-900 text-[9px] font-black">{row.rank}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right column vertical Subject performance & Ranks progression */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Vertical bar charts */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-[#f1af3c]/8 pb-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">Subject Performance</h4>
                    </div>

                    <div className="flex items-end justify-between h-36 pt-6 px-2 text-[9px] font-black text-slate-400">
                      {/* Phy 78% */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-slate-900 font-extrabold">78</span>
                        <div className="w-6 bg-brand-yellow rounded-t-md" style={{ height: "78px" }}></div>
                        <span>Phy</span>
                      </div>

                      {/* Chem 65% */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[#10b981] font-extrabold">65</span>
                        <div className="w-6 bg-[#10b981] rounded-t-md" style={{ height: "65px" }}></div>
                        <span>Chem</span>
                      </div>

                      {/* Math 91% */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[#8b5cf6] font-extrabold">91</span>
                        <div className="w-6 bg-[#8b5cf6] rounded-t-md" style={{ height: "91px" }}></div>
                        <span>Math</span>
                      </div>

                      {/* Bio 55% */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[#f97316] font-extrabold">55</span>
                        <div className="w-6 bg-[#f97316] rounded-t-md" style={{ height: "55px" }}></div>
                        <span>Bio</span>
                      </div>

                      {/* Eng 83% */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[#ef4444] font-extrabold">83</span>
                        <div className="w-6 bg-[#ef4444] rounded-t-md" style={{ height: "83px" }}></div>
                        <span>Eng</span>
                      </div>
                    </div>
                  </div>

                  {/* Rank progression ladder */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-[#f1af3c]/8 pb-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">Rank Progression</h4>
                    </div>
                    
                    <div className="flex items-end justify-between gap-1 text-[9px] font-bold text-slate-400 h-20 pt-4 text-center">
                      <div className="flex-grow space-y-1"><div className="bg-brand-yellow/30 h-6 rounded-md flex items-center justify-center text-[#0a1835] font-black">#14</div><span className="text-[7.5px]">UT1</span></div>
                      <div className="flex-grow space-y-1"><div className="bg-brand-yellow/45 h-9 rounded-md flex items-center justify-center text-[#0a1835] font-black">#11</div><span className="text-[7.5px]">UT2</span></div>
                      <div className="flex-grow space-y-1"><div className="bg-brand-yellow/60 h-12 rounded-md flex items-center justify-center text-[#0a1835] font-black">#8</div><span className="text-[7.5px]">MT1</span></div>
                      <div className="flex-grow space-y-1"><div className="bg-brand-yellow/75 h-15 rounded-md flex items-center justify-center text-[#0a1835] font-black">#6</div><span className="text-[7.5px]">UT3</span></div>
                      <div className="flex-grow space-y-1"><div className="bg-brand-yellow h-18 rounded-md flex items-center justify-center text-slate-900 font-black shadow-md">#3</div><span className="text-[7.5px] text-slate-600">MT2</span></div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom radial subject progress gauges */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: "Physics Marks", val: 94, ratio: "47/50", color: "text-brand-yellow" },
                  { label: "Chemistry Marks", val: 76, ratio: "38/50", color: "text-emerald-500" },
                  { label: "Mathematics Marks", val: 100, ratio: "52/50", color: "text-purple-650" },
                  { label: "Biology Marks", val: 70, ratio: "28/40", color: "text-orange-500" },
                  { label: "English Marks", val: 84, ratio: "42/50", color: "text-rose-500" }
                ].map((gauge, idx) => (
                  <div key={idx} className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-sm">
                    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="22" className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="transparent" />
                        <circle cx="28" cy="28" r="22" className={gauge.color} strokeWidth="4" stroke="currentColor" fill="transparent"
                          strokeDasharray={138.2}
                          strokeDashoffset={138.2 - (138.2 * Math.min(gauge.val, 100)) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-black text-slate-900">{gauge.val}%</span>
                    </div>
                    <div className="text-center font-bold">
                      <h5 className="text-[11px] text-slate-900 leading-none">{gauge.label.split(" ")[0]}</h5>
                      <span className="text-[9.5px] text-slate-450 block mt-1 font-mono font-bold">{gauge.ratio}</span>
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
                
                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs">📂</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Total Homework</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">6</p>
                  </div>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs">✓</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Submitted Tasks</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">1</p>
                  </div>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-brand-yellow flex items-center justify-center text-xs">🕒</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Pending Homework</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">4</p>
                  </div>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-red-500/10 text-brand-red flex items-center justify-center text-xs">⚠️</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Late / Missed</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">1</p>
                  </div>
                </div>

              </div>

              {/* Homework split with PDF notes */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left column: Homework lists */}
                <div className="lg:col-span-7 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835] flex items-center gap-2">
                      <span>📝</span> Weekly Homework Tasks
                    </h4>
                    <span className="text-[8px] font-bold text-slate-450 hover:text-brand-yellow cursor-pointer" onClick={() => alert("Marked all assignments complete.")}>Mark All Done</span>
                  </div>

                  <div className="space-y-3">
                    {homeworkList.map((hw) => {
                      const isSubmitted = hw.status === "Submitted";
                      const isLate = hw.status === "Late";
                      
                      const badgeColor = hw.subject === "Physics" ? "bg-blue-100 text-blue-600 border border-blue-200" :
                                         hw.subject === "Mathematics" ? "bg-purple-100 text-purple-600 border border-purple-200" :
                                         hw.subject === "Chemistry" ? "bg-emerald-100 text-emerald-600 border border-emerald-250" :
                                         hw.subject === "Biology" ? "bg-orange-100 text-orange-500 border border-orange-200" :
                                         "bg-red-100 text-brand-red border border-red-200";
                                         
                      return (
                        <div key={hw.id} className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-between gap-4">
                          <div className="text-left space-y-1.5 min-w-0">
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-450">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${badgeColor}`}>{hw.subject}</span>
                              <span>by {hw.teacher}</span>
                            </div>
                            <h5 className={`text-xs font-black truncate leading-snug ${isSubmitted ? "text-slate-455 line-through" : "text-slate-900"}`}>{hw.title}</h5>
                            <p className="text-[9px] text-slate-400">Due {hw.dueDate}</p>
                          </div>
                          
                          <div className="flex items-center gap-2.5 flex-shrink-0">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                              isSubmitted ? "bg-emerald-50 text-emerald-600 border border-emerald-250" :
                              isLate ? "bg-red-55 text-brand-red border border-red-200" :
                              "bg-brand-yellow/10 text-[#b45309] border border-brand-yellow/20"
                            }`}>{hw.status}</span>
                            
                            <button
                              onClick={() => toggleHomeworkStatus(hw.id)}
                              className="p-1.5 bg-white hover:bg-brand-yellow text-slate-800 hover:text-slate-900 border border-slate-200 rounded-lg transition cursor-pointer"
                              title="Toggle status"
                            >
                              ✓
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: PDF Study Notes list */}
                <div className="lg:col-span-5 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">
                      📁 SAMS Study Notes & PDFs
                    </h4>
                    <span className="text-[8px] font-bold text-slate-450 hover:text-brand-yellow cursor-pointer">View All ↗</span>
                  </div>

                  <div className="space-y-3">
                    {studyNotes.map((note) => (
                      <div key={note.id} className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-between gap-3 hover-glow">
                        <div className="flex items-center gap-3 min-w-0 text-left">
                          <span className="w-8 h-8 rounded-lg bg-white border text-brand-yellow flex items-center justify-center text-xs flex-shrink-0">📄</span>
                          <div className="min-w-0">
                            <h5 className="text-[11px] font-black text-slate-900 truncate leading-none">{note.title}</h5>
                            <p className="text-[8.5px] text-slate-450 mt-1 font-bold">{note.pages} • {note.size} • {note.date}</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => alert(`Initiating secure local PDF download of: ${note.title}`)}
                          className="p-1.5 bg-white hover:bg-brand-yellow text-slate-900 rounded-lg border border-slate-200 transition cursor-pointer flex-shrink-0"
                          title="Download Note"
                        >
                          ↓
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
              
              <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                <div className="text-left">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835]">Class Timetable</h4>
                  <p className="text-[9.5px] font-bold text-slate-450 font-mono mt-0.5">January 2026 • Standard {student?.classLevel}th Board Batch A</p>
                </div>
                <span className="text-[9px] font-bold text-[#0a1835] bg-[#fbbf24]/10 border border-[#fbbf24]/20 px-2 py-0.5 rounded uppercase tracking-wider">ACADEMIC AGENDA</span>
              </div>

              {/* Top card: Today — Monday, January 13 horizontal strip replica */}
              <div className="premium-glass-card p-4 space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-ping"></span>
                  <span className="text-xs font-black text-slate-900">Today — Monday, January 13 &nbsp;</span>
                  <span className="px-2 py-0.5 bg-brand-yellow text-slate-900 text-[8px] font-black uppercase rounded">Today</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Physics", val: "9:00 - 10:30 AM", room: "Hall A", teacher: "Dr. Ramesh Sharma", tag: "Completed", tagClass: "bg-slate-200/60 text-slate-600 border border-slate-300" },
                    { label: "Mathematics", val: "11:00 AM - 12:30 PM", room: "Hall B", teacher: "Prof. Anand Verma", tag: "Live", tagClass: "bg-brand-yellow text-slate-900 font-extrabold" },
                    { label: "Chemistry", val: "2:00 - 3:30 PM", room: "Hall A", teacher: "Ms. Preet Kaur", tag: "Upcoming", tagClass: "bg-brand-yellow/10 border border-brand-yellow/20 text-[#b45309]" },
                    { label: "English", val: "4:00 - 5:00 PM", room: "Room 7", teacher: "Mr. Suresh Nair", tag: "Upcoming", tagClass: "bg-brand-yellow/10 border border-brand-yellow/20 text-[#b45309]" }
                  ].map((lecture, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl space-y-1 relative">
                      <div className="flex justify-between items-center">
                        <h5 className="text-[11px] font-black text-slate-900">{lecture.label}</h5>
                        <span className={`px-1.5 py-0.5 rounded text-[7.5px] font-black uppercase ${lecture.tagClass}`}>{lecture.tag}</span>
                      </div>
                      <p className="font-mono text-[9px] text-[#0a1835] font-black">{lecture.val}</p>
                      <p className="text-[8px] text-slate-400 leading-none mt-1">Room: {lecture.room} • {lecture.teacher.split(" ")[1]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle card: Weekly Schedule time slot grid replica */}
              <div className="premium-glass-card p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span>📅</span>
                  <h4 className="text-xs font-black uppercase text-slate-900">Weekly Schedule Grid</h4>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-[10.5px] text-center border-collapse">
                    <thead>
                      <tr className="border-b border-[#f1af3c]/8 text-slate-400 font-bold uppercase tracking-wider text-[8.5px]">
                        <th className="py-2.5 px-2 text-left">Time Slot</th>
                        <th className="py-2.5 px-2">Monday</th>
                        <th className="py-2.5 px-2">Tuesday</th>
                        <th className="py-2.5 px-2">Wednesday</th>
                        <th className="py-2.5 px-2">Thursday</th>
                        <th className="py-2.5 px-2">Friday</th>
                        <th className="py-2.5 px-2">Saturday</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                      {[
                        { time: "9:00 - 10:30", mon: "Physics", tue: "Mathematics", wed: "Chemistry", thu: "Physics", fri: "Mathematics", sat: "Mock Test" },
                        { time: "11:00 - 12:30", mon: "Mathematics", tue: "Biology", wed: "English", thu: "Chemistry", fri: "Physics", sat: "Mock Test" },
                        { time: "2:00 - 3:30", mon: "Chemistry", tue: "Physics", wed: "Mathematics", thu: "Biology", fri: "English", sat: "--" },
                        { time: "4:00 - 5:00", mon: "English", tue: "--", wed: "Physics", thu: "Mathematics", fri: "Chemistry", sat: "--" }
                      ].map((slot, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-all">
                          <td className="py-3 px-2 text-left text-slate-400 font-mono text-[9.5px] font-black">{slot.time}</td>
                          {["mon", "tue", "wed", "thu", "fri", "sat"].map((day) => {
                            const val = slot[day];
                            let badgeStyle = "text-slate-400";
                            
                            // Match colors inside screenshots grid
                            if (val.includes("Physics")) badgeStyle = "bg-blue-50 text-blue-700 border border-blue-200";
                            else if (val.includes("Chemistry")) badgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-250";
                            else if (val.includes("Mathematics")) badgeStyle = "bg-purple-50 text-purple-700 border border-purple-200";
                            else if (val.includes("Biology")) badgeStyle = "bg-orange-50 text-orange-700 border border-orange-200";
                            else if (val.includes("English")) badgeStyle = "bg-red-50 text-red-700 border border-red-200";
                            else if (val.includes("Mock")) badgeStyle = "bg-[#0a1835] text-brand-yellow border border-brand-yellow/15 shadow-sm";
                            
                            return (
                              <td key={day} className="py-3 px-1.5">
                                <span className={`px-2.5 py-1.5 rounded-xl block text-[9.5px] truncate font-black ${badgeStyle}`}>
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
                <div className="flex flex-wrap items-center gap-3 pt-3 text-[9.5px] font-black uppercase text-slate-450 border-t border-slate-100">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Physics</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Chemistry</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Mathematics</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Biology</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> English</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#0a1835] border border-brand-yellow/40"></span> Mock Test</span>
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
                      <span className="text-[11px] text-slate-800">{dur.label}</span>
                      <span className="text-xs text-[#0a1835] font-black font-mono">{dur.hours}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${dur.color}`} style={{ width: `${dur.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 7: ANNOUNCEMENTS FEED (SCREENSHOT 7 STYLED)
              ======================================================== */}
          {activeTab === "notifications" && (
            <div className="space-y-6 text-left animate-fade-in-up">
              
              {/* Top stats notifications */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs">🔔</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Total Notifications</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">{notificationsDb.length}</p>
                  </div>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-red-500/10 text-brand-red flex items-center justify-center text-xs">🔴</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Unread Alerts</h5>
                    <p className="text-lg font-black text-brand-red mt-1.5">{unreadNotifs}</p>
                  </div>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-brand-yellow flex items-center justify-center text-xs">📋</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Exam Reminders</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">{countNotifs("Exam Reminders")}</p>
                  </div>
                </div>

                <div className="p-4 bg-[#ffffff] border border-slate-200/50 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center text-xs">📢</span>
                  <div>
                    <h5 className="text-[10px] text-slate-450 font-bold uppercase leading-none">Announcements</h5>
                    <p className="text-lg font-black text-slate-900 mt-1.5">{countNotifs("Announcements")}</p>
                  </div>
                </div>
              </div>

              {/* Split layout: notifications checklist + filter category */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left column: All Notifications feed list */}
                <div className="lg:col-span-8 premium-glass-card p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f1af3c]/8 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0a1835] flex items-center gap-2">
                      <span>🔔</span> Active Alerts Feed
                    </h4>
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-[9px] font-black uppercase text-brand-blue bg-[#fbbf24]/10 hover:bg-[#fbbf24]/20 border border-[#fbbf24]/20 px-3 py-1.5 rounded-lg cursor-pointer transition"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="space-y-3">
                    {notificationsDb
                      .filter(n => notifCategoryFilter === "All Notifications" || n.type === notifCategoryFilter)
                      .map((n) => {
                        const typeBadge = n.type === "Exam Reminders" ? "bg-red-50 text-brand-red border border-red-200" :
                                          n.type === "Announcements" ? "bg-purple-55 text-purple-700 border border-purple-200" :
                                          n.type === "Holidays" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                                          n.type === "Fee Reminders" ? "bg-amber-50 text-[#b45309] border border-brand-yellow/20" :
                                          "bg-blue-50 text-blue-600 border border-blue-250";
                        return (
                          <div 
                            key={n.id} 
                            onClick={() => toggleNotificationRead(n.id)}
                            className={`p-4 border rounded-2xl hover-glow transition-all text-left space-y-2 cursor-pointer relative ${
                              n.unread 
                                ? "bg-blue-50/20 border-blue-500/25" 
                                : "bg-slate-50 border-slate-200/50"
                            }`}
                          >
                            {/* Blue unread bullet indicator */}
                            {n.unread && (
                              <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                            )}
                            
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-450">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${typeBadge}`}>{n.type.split(" ")[0]}</span>
                              <span>•</span>
                              <span>{n.timeAgo}</span>
                            </div>
                            
                            <h5 className="text-xs font-black text-slate-900 leading-snug">{n.title}</h5>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{n.desc}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Right Column: filter by types & dates alerts */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Category filters exactly matching screenshot 7 */}
                  <div className="premium-glass-card p-4 space-y-3">
                    <div className="border-b border-[#f1af3c]/8 pb-2 text-left">
                      <h4 className="text-xs font-black uppercase text-[#0a1835]">Filter by Type</h4>
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
                              ? "bg-brand-yellow text-slate-900 font-black"
                              : "hover:bg-slate-50 text-slate-650"
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-black ${
                            notifCategoryFilter === item.label ? "bg-white text-slate-900" : "bg-slate-100 text-slate-500"
                          }`}>{item.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Dates exactly matching screenshot 7 */}
                  <div className="premium-glass-card p-4 space-y-3.5">
                    <div className="border-b border-[#f1af3c]/8 pb-2 text-left">
                      <h4 className="text-xs font-black uppercase text-[#0a1835]">Important Upcoming Dates</h4>
                    </div>

                    <div className="space-y-2.5 text-xs font-bold text-slate-700">
                      {[
                        { date: "Jan 14", label: "Unit Test 3 (PCM)", dateClass: "bg-red-50 text-brand-red border border-red-100" },
                        { date: "Jan 18", label: "Physics Electrostatics HW Due", dateClass: "bg-amber-50 text-[#b45309] border border-brand-yellow/10" },
                        { date: "Jan 20", label: "Parent-Teacher Meeting", dateClass: "bg-blue-50 text-blue-600 border border-blue-200" },
                        { date: "Jan 26", label: "Republic Day — Holiday", dateClass: "bg-emerald-50 text-emerald-600 border border-emerald-250" },
                        { date: "Jan 31", label: "Full Mock Test (JEE Pattern)", dateClass: "bg-red-50 text-brand-red border border-red-100" },
                        { date: "Feb 5", label: "Q4 Fee Due Date", dateClass: "bg-amber-55 text-[#b45309] border border-brand-yellow/20" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-slate-50 border rounded-xl">
                          <span className={`px-2.5 py-1 text-[8.5px] font-black uppercase rounded-lg ${item.dateClass}`}>{item.date}</span>
                          <span className="text-left truncate font-black text-slate-800">{item.label}</span>
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
              <div className="premium-glass-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex items-center gap-5 text-left relative z-10 flex-grow">
                  <div className="w-18 h-18 rounded-full bg-brand-yellow text-slate-900 border-2 border-[#0a1835] flex items-center justify-center font-black text-2xl shadow-lg relative flex-shrink-0">
                    {student?.name?.[0]?.toUpperCase()}
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{student?.name}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold font-mono">arjun.mehta@gmail.com • +91 98765 43210</p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-600 text-[8.5px] font-black uppercase rounded-lg">JEE Advanced 2026</span>
                      <span className="px-2.5 py-0.5 bg-purple-50 border border-purple-200 text-purple-700 text-[8.5px] font-black uppercase rounded-lg">Batch {student?.batch}</span>
                      <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 text-[8.5px] font-black uppercase rounded-lg">Roll {student?.rollNumber}</span>
                      <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-250 text-emerald-600 text-[8.5px] font-black uppercase rounded-lg">Active</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 relative z-10">
                  <button 
                    onClick={() => alert("Personal details modification desk requires parent key authentication.")}
                    className="px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all active:scale-95"
                  >
                    ✏️ Edit Profile
                  </button>
                </div>
              </div>

              {/* Split layout Personal Info vs Course details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left column: Personal details & parent info */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Personal details table replica */}
                  <div className="premium-glass-card p-5 space-y-3.5">
                    <div className="border-b border-[#f1af3c]/8 pb-2 text-left flex items-center gap-2">
                      <span>👤</span>
                      <h4 className="text-xs font-black uppercase text-[#0a1835]">Personal Information</h4>
                    </div>

                    <div className="space-y-2.5 text-xs text-left">
                      <div className="flex justify-between border-b border-slate-100 pb-1.5"><span className="text-slate-400 font-bold">Full Name:</span><span className="text-slate-900 font-black">{student?.name}</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5"><span className="text-slate-400 font-bold">Date of Birth:</span><span className="text-slate-900 font-black">15 March, 2007</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5"><span className="text-slate-400 font-bold">Gender:</span><span className="text-slate-900 font-black">Male</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5"><span className="text-slate-400 font-bold">Blood Group:</span><span className="text-slate-900 font-black">O+</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5"><span className="text-slate-400 font-bold">Aadhaar No:</span><span className="text-slate-900 font-black font-mono">XXXX-XXXX-4521</span></div>
                      <div className="flex justify-between pb-1"><span className="text-slate-400 font-bold">Home Address:</span><span className="text-slate-900 font-black text-right max-w-[180px] truncate" title="42, Shyam Nagar, Jaipur, Raj. 302001">42, Shyam Nagar, Mumbai</span></div>
                    </div>
                  </div>

                  {/* Parent info details replica */}
                  <div className="premium-glass-card p-5 space-y-3.5">
                    <div className="border-b border-[#f1af3c]/8 pb-2 text-left flex items-center gap-2">
                      <span>👥</span>
                      <h4 className="text-xs font-black uppercase text-[#0a1835]">Parent / Guardian Info</h4>
                    </div>

                    <div className="space-y-3">
                      {/* Father */}
                      <div className="p-3 bg-slate-50 border rounded-2xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 text-left">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">👨</div>
                          <div>
                            <h5 className="text-[10px] font-black text-slate-900 leading-none">Rajesh Mehta <span className="text-[8px] text-slate-400 font-bold font-mono">(Father)</span></h5>
                            <p className="text-[8.5px] text-slate-400 mt-1 font-bold font-mono">+91 99001 12345</p>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => alert("Helpline desk active: Dialing parent...")} className="p-1.5 bg-white border rounded-lg text-[#0a1835] hover:bg-brand-yellow hover:text-white transition cursor-pointer">📞</button>
                          <button onClick={() => alert("Helpline mailer desk active...")} className="p-1.5 bg-white border rounded-lg text-[#0a1835] hover:bg-brand-yellow hover:text-white transition cursor-pointer">✉️</button>
                        </div>
                      </div>

                      {/* Mother */}
                      <div className="p-3 bg-slate-50 border rounded-2xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 text-left">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">👩</div>
                          <div>
                            <h5 className="text-[10px] font-black text-slate-900 leading-none">Sunita Mehta <span className="text-[8px] text-slate-400 font-bold font-mono">(Mother)</span></h5>
                            <p className="text-[8.5px] text-slate-400 mt-1 font-bold font-mono">+91 98234 56789</p>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => alert("Dialing parent...")} className="p-1.5 bg-white border rounded-lg text-[#0a1835] hover:bg-brand-yellow hover:text-white transition cursor-pointer">📞</button>
                          <button onClick={() => alert("Helpline mailer active...")} className="p-1.5 bg-white border rounded-lg text-[#0a1835] hover:bg-brand-yellow hover:text-white transition cursor-pointer">✉️</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right column course details & statistics Circular gauges */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Course Details Grid panel replica */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-[#f1af3c]/8 pb-2 text-left flex items-center gap-2">
                      <span>🎓</span>
                      <h4 className="text-xs font-black uppercase text-[#0a1835]">Course & Enrollment Details</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-650 text-left">
                      <div className="p-3 bg-slate-50 border rounded-xl">
                        <p className="text-[8.5px] text-slate-400 uppercase tracking-wider mb-0.5">Enrolled Course</p>
                        <p className="text-[#0a1835] font-black">JEE Advanced 2026 (2-Year)</p>
                      </div>
                      
                      <div className="p-3 bg-slate-50 border rounded-xl">
                        <p className="text-[8.5px] text-slate-400 uppercase tracking-wider mb-0.5">Coaching Shift</p>
                        <p className="text-[#0a1835] font-black">Batch {student?.batch} — Morning Shift</p>
                      </div>

                      <div className="p-3 bg-slate-50 border rounded-xl">
                        <p className="text-[8.5px] text-slate-400 uppercase tracking-wider mb-0.5">Enrollment Date</p>
                        <p className="text-[#0a1835] font-black">April 1, 2024</p>
                      </div>

                      <div className="p-3 bg-slate-50 border rounded-xl">
                        <p className="text-[8.5px] text-slate-400 uppercase tracking-wider mb-0.5">Session Limit</p>
                        <p className="text-[#0a1835] font-black">March 31, 2026</p>
                      </div>

                      <div className="p-3 bg-slate-50 border rounded-xl">
                        <p className="text-[8.5px] text-slate-400 uppercase tracking-wider mb-0.5">Academic Fee Structure</p>
                        <p className="text-[#0a1835] font-black">₹46,000 / Year</p>
                      </div>

                      <div className="p-3 bg-slate-50 border rounded-xl">
                        <p className="text-[8.5px] text-slate-400 uppercase tracking-wider mb-0.5">Class Standard subjects</p>
                        <p className="text-[#0a1835] font-black truncate" title="Physics, Chemistry, Maths, Biology, English">Physics • Chemistry • Maths • Bio • Eng</p>
                      </div>

                      <div className="p-3 bg-slate-50 border rounded-xl">
                        <p className="text-[8.5px] text-slate-400 uppercase tracking-wider mb-0.5">Assigned Class Mentor</p>
                        <p className="text-[#0a1835] font-black">Dr. Ramesh Sharma</p>
                      </div>

                      <div className="p-3 bg-slate-50 border rounded-xl">
                        <p className="text-[8.5px] text-slate-400 uppercase tracking-wider mb-0.5">Coaching Batch Strength</p>
                        <p className="text-[#0a1835] font-black">42 Pre-registered Students</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Performance summary replica */}
                  <div className="premium-glass-card p-5 space-y-4">
                    <div className="border-b border-[#f1af3c]/8 pb-2 text-left flex items-center gap-2">
                      <span>📈</span>
                      <h4 className="text-xs font-black uppercase text-[#0a1835]">Academic Performance Summary</h4>
                    </div>

                    {/* Gauges row */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Overall Attendance", val: attendanceRatio, color: "text-emerald-500" },
                        { label: "Avg. Test Score", val: 73, color: "text-brand-yellow" },
                        { label: "Total Fees Paid", val: 81, color: "text-[#0a1835]" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center space-y-2">
                          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="28" cy="28" r="22" className="text-slate-100" strokeWidth="4.5" stroke="currentColor" fill="transparent" />
                              <circle cx="28" cy="28" r="22" className={item.color} strokeWidth="4.5" stroke="currentColor" fill="transparent"
                                strokeDasharray={138.2}
                                strokeDashoffset={138.2 - (138.2 * item.val) / 100}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute text-[10px] font-black text-slate-900">{item.val}%</span>
                          </div>
                          <span className="text-[8.5px] text-slate-450 uppercase font-black">{item.label}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Progress bars */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-100">
                      {[
                        { label: "Physics", val: 78, color: "bg-blue-500" },
                        { label: "Mathematics", val: 91, color: "bg-purple-500" },
                        { label: "Chemistry", val: 65, color: "bg-emerald-500" },
                        { label: "Biology", val: 55, color: "bg-orange-500" },
                        { label: "English", val: 83, color: "bg-red-500" }
                      ].map((bar, idx) => (
                        <div key={idx} className="space-y-1 text-left font-bold text-xs text-slate-500">
                          <div className="flex justify-between"><span>{bar.label} Marks Aggregate</span><span className="text-slate-900 font-mono">{bar.val}%</span></div>
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
        <div className="fixed inset-0 z-50 bg-[#0a1835]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-[#ffffff] border border-brand-yellow/30 rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up space-y-5 text-left">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <div className="text-left">
                <span className="text-[8px] font-black uppercase text-brand-yellow">SECURE CHECKOUT</span>
                <h3 className="text-xs font-black uppercase text-[#0a1835] mt-0.5">SAMS UPI Gateways</h3>
              </div>
              <button onClick={() => setPaySimulating(null)} className="text-slate-400 text-lg hover:text-slate-800 transition cursor-pointer border-none bg-transparent">✕</button>
            </div>

            {paySuccess ? (
              <div className="py-6 text-center space-y-3">
                <span className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto border border-emerald-200 shadow-sm animate-bounce">✓</span>
                <h4 className="text-sm font-black text-emerald-600 uppercase tracking-widest">Fees Settled Successfully!</h4>
                <p className="text-xs text-slate-400 font-semibold">Database logs compiled. Parent alerts triggered.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                  <p className="text-slate-450 font-bold uppercase tracking-wider text-[9px] leading-none">Invoice Statement:</p>
                  <p className="font-black text-[#0a1835] text-sm">{paySimulating.description}</p>
                  
                  <div className="w-full border-t border-dashed border-slate-250 my-2"></div>
                  
                  <p className="text-slate-450 font-bold uppercase tracking-wider text-[9px] leading-none">Outstanding Dues Amount:</p>
                  <p className="text-xl font-mono font-black text-brand-red">₹{paySimulating.amount.toLocaleString()}</p>
                </div>
                
                <button
                  onClick={executePayment}
                  className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-[#0a1835] hover:bg-slate-800 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 duration-200 text-center block border-none"
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
