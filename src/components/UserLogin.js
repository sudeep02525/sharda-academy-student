"use client";

import { useState, useEffect, useRef } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function UserLogin({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        setMessage(`A 6-digit recovery code has been sent to ${email}. Check your email inbox.`);
        startResendTimer();
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-brand-beige dotbg noise">
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Logo & branding header (Outside/Above the Card) */}
        <div className="flex flex-col items-center mb-6 text-center">
          <img src="/logo.png" alt="Sharda Academy Logo" className="w-16 h-16 mb-2"
            onError={(e) => { e.target.style.display = 'none'; }} style={{ objectFit: "contain" }} />
          <h2 className="text-xl font-black text-brand-blue uppercase tracking-tight">SHARDA ACADEMY</h2>
          <p className="text-[9px] font-bold text-brand-yellow uppercase tracking-widest mt-0.5">Student Portal Gateway</p>
        </div>

        {/* Unified White Card with Gold highlight */}
        <div className="w-full max-w-md p-8 rounded-2xl bg-white border border-brand-yellow/30 shadow-2xl space-y-6">

          {/* Header Label */}
          {tab !== "forgot" && (
            <div className="text-center pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-brand-blue">Sign In To Student Portal</h3>
              <p className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">Enrolled Academy Students Only</p>
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
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-brand-yellow/30 text-xs font-semibold text-brand-yellow-dark w-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4 text-brand-yellow-dark shrink-0 mt-0.5">
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
                <div>
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Registered Email</label>
                  <input
                    type="email" required
                    value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="e.g. pooja@sharda.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} required
                      value={password} onChange={e=>setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
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

              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 shadow-md shadow-brand-yellow/20 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer mt-2">
                {loading ? "AUTHENTICATING..." : "SIGN IN TO PORTAL"}
              </button>

              <button
                type="button"
                onClick={() => { setTab("forgot"); setStep(1); setError(""); setMessage(""); }}
                className="block w-full text-center text-[10px] font-bold text-slate-500 hover:text-brand-blue transition uppercase tracking-wider cursor-pointer"
              >
                Forgot Password?
              </button>
            </form>
          )}

          {/* ========================================================
              2. FORGOT PASSWORD RECOVERY FORM
              ======================================================== */}
          {tab === "forgot" && (
            step === 1 ? (
              <form onSubmit={handleForgotRequest} className="space-y-4 text-xs animate-fade-in-up">
                <div className="text-center pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-blue">Reset Your Password</h3>
                  <p className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">Enter your registered email</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Registered Email</label>
                  <input
                    type="email" required
                    value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="e.g. pooja@sharda.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-xs font-extrabold text-brand-blue bg-brand-yellow hover:bg-amber-400 shadow-md shadow-brand-yellow/20 uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer mt-2">
                  {loading ? "SENDING OTP..." : "SEND RECOVERY CODE"}
                </button>
                <button type="button" onClick={() => { setTab("signin"); setStep(1); setError(""); setMessage(""); }} className="w-full text-center text-[10px] text-slate-400 hover:text-slate-800 font-bold uppercase tracking-wider transition duration-200 cursor-pointer">← Back to Sign In</button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4 text-xs animate-fade-in-up">
                <div className="text-center pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-blue">Enter Recovery Code</h3>
                  <p className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">Check your email inbox</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Enter 6-Digit Email OTP</label>
                    <input
                      type="text" required maxLength={6}
                      value={otp} onChange={e=>setOtp(e.target.value)}
                      placeholder="------"
                      className="w-full px-4 py-2.5 text-center font-mono text-lg tracking-widest rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">Enter New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"} required
                        value={newPassword} onChange={e=>setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 transition-all"
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
                          const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
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
