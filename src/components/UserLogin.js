"use client";

import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function UserLogin({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // Tab states: "signin", "register", "forgot"
  const [tab, setTab] = useState("signin");
  const [step, setStep] = useState(1); // For register (1=Email/Pass, 2=OTP verification) or forgot (1=Email, 2=OTP/Pass)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
      console.error(err);
      setError("Unable to connect to SAMS backend server.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        setStep(2);
        setMessage("A 6-digit registration code has been dispatched to your email (check backend console logs)!");
      } else {
        setError(data.message || "Failed to request registration code.");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterVerify = async (e) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("user_role", data.user.role);
        localStorage.setItem("user_name", data.user.name);
        localStorage.setItem("user_email", data.user.email);
        onAuthSuccess(data.token, data.user.role);
      } else {
        setError(data.message || "Invalid or expired verification code.");
      }
    } catch (err) {
      console.error(err);
      setError("Activation failed.");
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
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStep(2);
        setMessage("A 6-digit recovery code has been dispatched to your email (check backend console logs)!");
      } else {
        setError(data.message || "Failed to request recovery code.");
      }
    } catch (err) {
      console.error(err);
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
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
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
      console.error(err);
      setError("Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-beige flex flex-col items-center justify-center p-4 overflow-hidden noise dotbg">
      
      {/* Glowing backdrop ambient decorations */}
      <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-brand-blue/15 blur-3xl pointer-events-none animate-float-slow"></div>
      <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-brand-yellow/15 blur-3xl pointer-events-none animate-float-reverse"></div>

      {/* Premium Frosted Login Frame with Golden Neon Glow Card overlay and fade-in-up entry */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/75 border border-white/50 shadow-2xl space-y-6 transition-all hover:shadow-brand-yellow/15 glow-card-gold animate-fade-in-up">
        
        {/* Logo and branding */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-3 rounded-2xl bg-brand-blue flex items-center justify-center shadow-md shadow-brand-blue/20">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <h2 className="text-lg font-black text-brand-blue uppercase tracking-tight">SHARDA ACADEMY</h2>
          <p className="text-[9px] font-bold text-brand-yellow uppercase tracking-widest leading-none mt-1">Student Portal Gateway</p>
        </div>

        {/* Tab Swappers (Sign In vs Sign Up) */}
        {tab !== "forgot" && (
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/50 rounded-2xl border border-slate-300/20">
            <button
              onClick={() => { setTab("signin"); setError(""); setMessage(""); setStep(1); }}
              className={`py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                tab === "signin" 
                  ? "bg-brand-blue text-white shadow" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/30"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab("register"); setError(""); setMessage(""); setStep(1); }}
              className={`py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                tab === "register" 
                  ? "bg-brand-blue text-white shadow" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/30"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Message / Error alerts */}
        {error && (
          <div className="p-3.5 text-xs font-bold text-white bg-brand-red/90 rounded-2xl animate-pulse flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="p-3.5 text-xs font-bold text-brand-blue bg-brand-yellow rounded-2xl flex items-center gap-2">
            <span>📧</span>
            <span>{message}</span>
          </div>
        )}

        {/* ========================================================
            1. SIGN IN FORM
            ======================================================== */}
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-4 text-xs animate-fade-in-up">
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-650 mb-1.5 uppercase tracking-wider text-[10px]">Registered Email</label>
                <input
                  type="email" required
                  value={email} onChange={e=>setEmail(e.target.value)}
                  placeholder="e.g. pooja@sharda.com"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:outline-none focus:border-brand-yellow transition-all"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-655 mb-1.5 uppercase tracking-wider text-[10px]">Password</label>
                <input
                  type="password" required
                  value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:outline-none focus:border-brand-yellow transition-all"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl text-xs font-black text-white bg-brand-blue hover:bg-brand-blue-light shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer">
              {loading ? "AUTHENTICATING..." : "SIGN IN TO PORTAL"}
            </button>

            <button
              type="button"
              onClick={() => { setTab("forgot"); setStep(1); setError(""); setMessage(""); }}
              className="block w-full text-center text-[10px] font-bold text-slate-450 hover:text-brand-blue transition uppercase tracking-wider cursor-pointer"
            >
              Forgot Password?
            </button>
          </form>
        )}

        {/* ========================================================
            2. SIGN UP FORM (Enrolled Students Only)
            ======================================================== */}
        {tab === "register" && (
          step === 1 ? (
            <form onSubmit={handleRegisterRequest} className="space-y-4 text-xs animate-fade-in-up">
              <div className="p-3 bg-blue-50/60 border border-brand-blue/10 text-[10px] text-slate-500 rounded-xl leading-relaxed text-left font-semibold">
                ℹ️ <strong>Enrolled Students Only:</strong> Your email address must be pre-created by the Sharda Academy administration to sign up for portal access.
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-650 mb-1.5 uppercase tracking-wider text-[10px]">Enrolled Email Address</label>
                  <input
                    type="email" required
                    value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="e.g. student@sharda.com"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:outline-none focus:border-brand-yellow transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-650 mb-1.5 uppercase tracking-wider text-[10px]">Create Secure Password</label>
                  <input
                    type="password" required
                    value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="Create your portal password"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:outline-none focus:border-brand-yellow transition-all"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl text-xs font-black text-white bg-brand-blue hover:bg-brand-blue-light transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer">
                {loading ? "SENDING VERIFICATION..." : "CREATE PORTAL PASSWORD"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterVerify} className="space-y-4 text-xs animate-fade-in-up">
              <div>
                <label className="block font-bold text-slate-650 mb-1.5 uppercase tracking-wider text-[10px] text-center">Enter 6-Digit Email OTP</label>
                <input
                  type="text" required maxLength={6}
                  value={otp} onChange={e=>setOtp(e.target.value)}
                  placeholder="------"
                  className="w-full px-4 py-3 text-center font-mono text-lg tracking-widest rounded-2xl border border-slate-200 bg-white/80 focus:outline-none focus:border-brand-yellow transition-all"
                />
              </div>
              
              <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer">
                {loading ? "ACTIVATING..." : "VERIFY & ACTIVATE"}
              </button>
            </form>
          )
        )}

        {/* ========================================================
            3. FORGOT PASSWORD RECOVERY FORM
            ======================================================== */}
        {tab === "forgot" && (
          step === 1 ? (
            <form onSubmit={handleForgotRequest} className="space-y-4 text-xs animate-fade-in-up">
              <div>
                <label className="block font-bold text-slate-650 mb-1.5 uppercase tracking-wider text-[10px]">Registered Email</label>
                <input
                  type="email" required
                  value={email} onChange={e=>setEmail(e.target.value)}
                  placeholder="e.g. pooja@sharda.com"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:outline-none focus:border-brand-yellow transition-all"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl text-xs font-black text-white bg-brand-blue hover:bg-brand-blue-light transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer">
                {loading ? "SENDING OTP..." : "SEND RECOVERY CODE"}
              </button>
              <button type="button" onClick={() => { setTab("signin"); setStep(1); }} className="w-full text-center text-[10px] text-slate-400 hover:text-slate-800 font-bold uppercase tracking-wider transition duration-200 cursor-pointer">← Back to Sign In</button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4 text-xs animate-fade-in-up">
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-650 mb-1.5 uppercase tracking-wider text-[10px]">Enter 6-Digit Email OTP</label>
                  <input
                    type="text" required maxLength={6}
                    value={otp} onChange={e=>setOtp(e.target.value)}
                    placeholder="------"
                    className="w-full px-4 py-3 text-center font-mono text-lg tracking-widest rounded-2xl border border-slate-200 bg-white/80 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-650 mb-1.5 uppercase tracking-wider text-[10px]">Enter New Password</label>
                  <input
                    type="password" required
                    value={newPassword} onChange={e=>setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 focus:outline-none"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer">
                {loading ? "RESETTING..." : "RESET & SIGN IN"}
              </button>
            </form>
          )
        )}

        {/* Sandbox credentials preview */}
        <div className="p-4 mt-4 rounded-2xl bg-slate-100/50 border border-slate-200/20 text-[10px] text-slate-500 space-y-1.5 text-left">
          <p className="font-bold uppercase tracking-wider text-slate-450 text-[8.5px]">Sandbox Preview Options:</p>
          <p><span className="font-semibold text-brand-blue">Active Logins (Pooja):</span> pooja@sharda.com (Pass: student123)</p>
          <p><span className="font-semibold text-brand-blue">Sign Up (Amit):</span> student@sharda.com (No password pre-set!)</p>
          <p className="text-[9px] italic text-slate-400">OTP dispatched to email prints in backend console logs.</p>
        </div>

      </div>
    </div>
  );
}
