"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";



const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function UserLogin({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    const shouldBeDark = isMobile ? systemDark : savedTheme === "dark" || (!savedTheme && systemDark);

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

  // Tab states: "signin" or "forgot"
  const [tab, setTab] = useState("signin");
  const [step, setStep] = useState(1); // For forgot: 1=Email, 2=OTP/NewPass
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const resendIntervalRef = useRef(null);

  // Start 40-second countdown
  const startResendTimer = () => {
    setResendTimer(40);
    if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);
    resendIntervalRef.current = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(resendIntervalRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // Clean up timer on unmount
  useEffect(() => () => { if (resendIntervalRef.current) clearInterval(resendIntervalRef.current); }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        if (data.user.role !== "student") {
          setError("Forbidden: This portal is strictly for Students.");
          return;
        }
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("user_role", data.user.role);
        localStorage.setItem("user_name", data.user.name);
        localStorage.setItem("user_email", data.user.email);
        onAuthSuccess(data.token, data.user.role);
      } else {
        setError(data.message || "Invalid email address or password.");
      }
    } catch (err) {
      setError("Unable to connect to Sharda Academy server.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotRequest = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStep(2);
        setMessage(`A 6-digit recovery code has been sent to ${email}. Check your email inbox.`);
        startResendTimer();
      } else {
        setError(data.message || "Failed to request recovery code.");
      }
    } catch (err) {
      setError("Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("Your password has been successfully reset! You can now log in.");
        setTab("signin");
        setStep(1);
        setPassword("");
        setOtp("");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-brand-beige dotbg noise overflow-x-hidden relative">
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
        {/* Slow-rotating background glow using absolute inline blur filters for cross-browser premium aesthetics */}
        <div 
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-brand-gold/15 to-amber-500/10 rounded-full pointer-events-none animate-pulse-glow"
          style={{ filter: "blur(120px)" }}
        ></div>
        <div 
          className="absolute -bottom-40 -right-40 w-[650px] h-[650px] bg-gradient-to-tr from-brand-navy2/40 to-brand-gold/10 rounded-full pointer-events-none"
          style={{ filter: "blur(140px)" }}
        ></div>

        {/* Top Branding - Kept original main logo with explicit div/span to bypass global overrides */}
        <div className="flex items-center gap-3 relative z-10">
          <img src="/logo.png" alt="Sharda Academy Logo" className="w-12 h-12 object-contain"
            onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="text-left">
            <div 
              className="text-lg font-black tracking-widest uppercase leading-none"
              style={{ color: "#f1af3c" }}
            >
              SHARDA ACADEMY
            </div>
            <span 
              className="text-[9px] font-bold tracking-widest uppercase leading-none mt-1.5 block"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              Student Portal
            </span>
          </div>
        </div>

        {/* Central Showcase Content - Bypassing global header/p overrides */}
        <div className="my-auto space-y-8 relative z-10 max-w-lg text-left">
          <div className="space-y-3">
            <span 
              className="text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-lg inline-block"
              style={{ 
                color: "#f1af3c", 
                backgroundColor: "rgba(241, 175, 60, 0.1)", 
                borderColor: "rgba(241, 175, 60, 0.2)", 
                borderWidth: "1px", 
                borderStyle: "solid" 
              }}
            >
              Student Portal Gateway
            </span>
            <div 
              className="text-3xl lg:text-4xl font-black tracking-tight leading-tight font-display"
              style={{ color: "#ffffff" }}
            >
              Access Your <span className="bg-gradient-to-r from-brand-gold to-amber-400 bg-clip-text text-transparent" style={{ color: "transparent" }}>Academic Destiny</span> in Real-Time
            </div>
            <div 
              className="text-xs leading-relaxed font-semibold"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
            >
              Sharda Academy's Student Portal connects students directly with live timetable routines, biometric check-in trackers, fee ledgers, and dynamic examination performance matrices.
            </div>
          </div>

          {/* Frosted Showcase Highlight Panel */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-4">
            <div className="text-xs font-black uppercase tracking-wider" style={{ color: "#f1af3c" }}>Portal Synchronized Features:</div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#f1af3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <div>
                  <div className="font-bold text-[11px]" style={{ color: "#ffffff" }}>Multi-Role Gateway</div>
                  <span className="text-[10px] mt-0.5 block" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Secure session tokening</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#f1af3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a14.805 14.805 0 001.586 6.74M15.01 1.777a8.962 8.962 0 013.74 2.235M8.457 20.278a14.887 14.887 0 01-2.715-3.328M11.662 2.011a8.968 8.968 0 013.2 1.53m-7.817 14.3a14.852 14.852 0 01-1.047-3.473M10.5 8.5a1.5 1.5 0 113 0v4.882c0 .866-.491 1.652-1.258 2.002L10.5 16.5M9 10.5a3 3 0 016 0v2.882c0 .577.327 1.101.839 1.335l.661.303" />
                </svg>
                <div>
                  <div className="font-bold text-[11px]" style={{ color: "#ffffff" }}>Biometric Attendance</div>
                  <span className="text-[10px] mt-0.5 block" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Real-time hardware tap sync</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#f1af3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                <div>
                  <div className="font-bold text-[11px]" style={{ color: "#ffffff" }}>Performance Tracker</div>
                  <span className="text-[10px] mt-0.5 block" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Mock results & batch rankings</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#f1af3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5zM3 10.5h18" />
                </svg>
                <div>
                  <div className="font-bold text-[11px]" style={{ color: "#ffffff" }}>Tuition Invoices</div>
                  <span className="text-[10px] mt-0.5 block" style={{ color: "rgba(255, 255, 255, 0.7)" }}>UPI checkout & receipts download</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Brand Label removed */}
        <div className="h-0 relative z-10 pointer-events-none"></div>
      </div>

      {/* 📝 Right Panel: Sign-in Section */}
      <div className="col-span-12 lg:col-span-6 flex flex-col justify-center items-center min-h-screen lg:min-h-0 p-6 sm:p-12 relative z-10">
        
        {/* Mobile Header Branding (Shown only on small screens) */}
        <div className="flex flex-col items-center mb-6 text-center lg:hidden">
          <img src="/logo.png" alt="Sharda Academy Logo" className="w-14 h-14 mb-2"
            onError={(e) => { e.target.style.display = 'none'; }} style={{ objectFit: "contain" }} />
          <h2 className="text-lg font-black text-brand-blue uppercase tracking-tight">SHARDA ACADEMY</h2>
          <p className="text-[9px] font-bold text-brand-yellow uppercase tracking-widest mt-0.5">Student Portal Gateway</p>
        </div>

        {/* Unified White Card matching Admin Portal exactly */}
        <div className="w-full max-w-md p-8 rounded-2xl bg-white border border-gold/30 shadow-2xl space-y-6">
          {/* Header Label - Synced with Admin sizes and bypassing h3 global overrides */}
          {tab !== "forgot" && (
            <div className="text-center pb-2 border-b border-slate-100">
              <div className="text-sm font-black uppercase tracking-wider text-navy">
                Sign In To Student Portal
              </div>
              <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                Enrolled Academy Students Only
              </div>
            </div>
          )}

          {/* Message / Error alerts */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 animate-pulse w-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4 text-red-600 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 border border-brand-yellow/30 text-xs font-medium text-slate-700 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4 text-brand-yellow-dark shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>{message}</span>
            </div>
          )}

          {/* ========================================================
              1. SIGN IN FORM
              ======================================================== */}
          {tab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4 text-xs animate-fade-in-up">
              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Registered Email</label>
                  <input
                    type="email" required
                    value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} required
                      value={password} onChange={e=>setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 focus:outline-none select-none cursor-pointer"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815 3 3m-3-3a8.2 8.2 0 0 1-4.59 1.59M12.013 9.014a3 3 0 1 0 4.28 4.28" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer mt-2"
                style={{ color: "#0a1835", backgroundColor: "#f1af3c", boxShadow: "0 4px 6px -1px rgba(241, 175, 60, 0.2), 0 2px 4px -1px rgba(241, 175, 60, 0.1)" }}
              >
                {loading ? "AUTHENTICATING..." : "SIGN IN TO PORTAL"}
              </button>

              <button
                type="button"
                onClick={() => { setTab("forgot"); setStep(1); setError(""); setMessage(""); }}
                className="block w-full text-center text-[10px] font-bold text-slate-500 transition uppercase tracking-wider cursor-pointer"
                style={{ transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.target.style.color = "#0a1835"; }}
                onMouseLeave={(e) => { e.target.style.color = "#6b7280"; }}
              >
                Forgot Password?
              </button>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/admin" 
                  className="block w-full text-center text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest transition-colors duration-200"
                >
                  Admin Portal Login →
                </Link>
              </div>
            </form>
          )}

          {/* ========================================================
              2. FORGOT PASSWORD RECOVERY FORM
              ======================================================== */}
          {tab === "forgot" && (
            step === 1 ? (
              <form onSubmit={handleForgotRequest} className="space-y-4 text-xs animate-fade-in-up">
                <div className="text-center pb-2 border-b border-slate-100">
                  <div className="text-xs font-black uppercase tracking-wider text-navy">Reset Your Password</div>
                  <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Enter your registered email</div>
                </div>
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Registered Email</label>
                  <input
                    type="email" required
                    value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer mt-2"
                  style={{ color: "#0a1835", backgroundColor: "#f1af3c", boxShadow: "0 4px 6px -1px rgba(241, 175, 60, 0.2), 0 2px 4px -1px rgba(241, 175, 60, 0.1)" }}
                >
                  {loading ? "SENDING OTP..." : "SEND RECOVERY CODE"}
                </button>
                <button 
                  type="button" 
                  onClick={() => { setTab("signin"); setStep(1); setError(""); setMessage(""); }} 
                  className="w-full text-center text-[10px] text-slate-450 hover:text-slate-800 font-bold uppercase tracking-wider transition duration-200 cursor-pointer mt-2"
                >
                  ← Back to Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4 text-xs animate-fade-in-up">
                <div className="text-center pb-2 border-b border-slate-100">
                  <div className="text-xs font-black uppercase tracking-wider text-navy">Enter Recovery Code</div>
                  <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Check your email inbox</div>
                </div>
                <div className="space-y-4">
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Enter 6-Digit Email OTP</label>
                    <input
                      type="text" required maxLength={6}
                      value={otp} onChange={e=>setOtp(e.target.value)}
                      placeholder="------"
                      className="w-full px-4 py-2.5 text-center font-mono text-lg tracking-widest rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Enter New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"} required
                        value={newPassword} onChange={e=>setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c]/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 focus:outline-none select-none cursor-pointer"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815 3 3m-3-3a8.2 8.2 0 0 1-4.59 1.59M12.013 9.014a3 3 0 1 0 4.28 4.28" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer mt-2">
                  {loading ? "RESETTING..." : "RESET & SIGN IN"}
                </button>

                {/* Resend Code for forgot password */}
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-[10px] text-slate-400 font-semibold">
                      Resend code in <span className="text-brand-yellow font-bold">{resendTimer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={async () => {
                        setLoading(true); setError(""); setMessage("");
                        try {
                          const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email }),
                          });
                          const data = await res.json();
                          if (data.success) { setMessage("A new recovery code has been sent to your email."); startResendTimer(); }
                          else setError(data.message || "Failed to resend code.");
                        } catch { setError("Connection error."); }
                        finally { setLoading(false); }
                      }}
                      className="text-[10px] font-bold text-brand-blue hover:text-blue-800 underline underline-offset-2 transition cursor-pointer uppercase tracking-wider"
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                <button type="button" onClick={() => { setStep(1); setError(""); setMessage(""); }} className="w-full text-center text-[10px] text-slate-400 hover:text-slate-800 font-bold uppercase tracking-wider transition duration-200 cursor-pointer">← Back</button>
              </form>
            )
          )}

        </div>

      </div>

    </div>
  );
}
