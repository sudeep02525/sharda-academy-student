"use client";

import { useState, useEffect } from "react";
import UserLogin from "@/components/UserLogin";
import StudentDashboard from "@/components/StudentDashboard";

export default function SAMSUserPortal() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admissions inquiry form states
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryClass, setInquiryClass] = useState("10");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("user_token");
    const savedRole = localStorage.getItem("user_role");
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole || "");
    }
  }, []);

  const handleAuthSuccess = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    setToken("");
    setRole("");
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquirySuccess(true);
    
    // Simulate WhatsApp redirect / sync just like the main landing page
    const whatsappNum = "919324444269"; 
    const defaultMsg = `Hello Sharda Academy, I have submitted the admissions enquiry form on the Student Portal. Details:
- Candidate Name: ${inquiryName}
- Target Class: Class ${inquiryClass}
- Contact Phone: ${inquiryPhone}
Please contact us to guide us further on the admission and counselling process. Thank you!`;
    const encodedMsg = encodeURIComponent(defaultMsg);
    
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNum}?text=${encodedMsg}`, "_blank");
      setInquiryName("");
      setInquiryPhone("");
      setInquirySuccess(false);
    }, 1000);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Render Student Dashboard if authenticated
  if (token) {
    return <StudentDashboard token={token} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-brand-beige text-[#0f1a30] flex flex-col justify-between noise dotbg relative overflow-x-hidden">
      
      {/* 🌌 Premium Ambient Backdrop Blur Blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-brand-yellow/5 blur-3xl pointer-events-none animate-float-slow"></div>
      <div className="absolute top-[800px] left-5 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none animate-float-reverse"></div>

      {/* 🖥️ Responsive Header & Navigation Bar */}
      <header className="bg-brand-blue border-b-2 border-brand-yellow py-3.5 px-6 sticky top-0 z-40 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand Details */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 rounded-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="text-left">
              <h1 className="text-sm font-black tracking-tight text-white uppercase leading-none">
                SHARDA ACADEMY
              </h1>
              <p className="text-[8px] font-black tracking-widest text-brand-yellow uppercase mt-1">
                Student Portal Gateway
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: "about", label: "Academy Profile" },
              { id: "courses", label: "Coaching Courses" },
              { id: "faculty", label: "Elite Faculty" },
              { id: "admission", label: "Admission Desk" },
              { id: "contact", label: "Support Desks" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs font-extrabold uppercase tracking-wider text-slate-300 hover:text-brand-yellow transition cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLogin(true)}
              className="px-4.5 py-2 text-xs font-black uppercase tracking-widest text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Sign In
            </button>
            
            {/* Hamburger menu for small devices */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold cursor-pointer"
              aria-label="Toggle Navigation"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile touch Drawer menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full p-4 bg-brand-blue/98 border-t border-brand-yellow/30 animate-slide-up space-y-2 shadow-2xl md:hidden">
            {[
              { id: "about", label: "🏫 Academy Profile" },
              { id: "courses", label: "📚 Coaching Courses" },
              { id: "faculty", label: "🎓 Elite Faculty" },
              { id: "admission", label: "📝 Admission Desk" },
              { id: "contact", label: "📞 Support Desks" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => scrollToSection(t.id)}
                className="block w-full py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-left rounded-xl bg-white/5 text-slate-200 hover:text-brand-yellow hover:bg-white/10 transition"
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ========================================================
          MAIN PORTAL VIEWPORTS (FLOWING LANDING PAGE)
          ======================================================== */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-16">
        
        {/* 🚀 HERO WELCOME WING */}
        <section id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
          <div className="md:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#fef3c7] border border-[#f1af3c] px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-ping"></span>
              <span className="text-[9px] font-black uppercase text-brand-yellow tracking-wider">Admissions Open For Session 2026-27</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-brand-blue leading-tight tracking-tight">
              Shaping Minds, Inspiring <br />
              <span className="text-brand-yellow">Academic Excellence</span>
            </h2>
            
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
              Welcome to Sharda Academy Mankhurd-43 — Mumbai's premium coaching institute for academic toppers. 
              We combine board specialist mentor squads, high-tech smart classrooms, and live biometric safety punching arrays to prepare Classes 1st to 12th students for historic board scores.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("admission")}
                className="px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white gradient-brand-header rounded-xl shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
              >
                Apply Online
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-3.5 text-xs font-black uppercase tracking-widest text-brand-blue bg-brand-yellow hover:bg-amber-400 rounded-xl shadow hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
              >
                Enter Portal
              </button>
            </div>
          </div>

          {/* Right Live Biometric Scanner Feature Card */}
          <div className="md:col-span-5 w-full">
            <div className="p-6 rounded-3xl bg-white border border-[#0a1835]/8 shadow-xl text-left space-y-5 hover-glow transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-brand-blue bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 tracking-wider">Real-Time Sync</span>
                <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>ACTIVE DEVICELINK</span>
              </div>
              
              <h3 className="text-base font-black text-brand-blue leading-snug">Smart Biometric Safety System</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                SAMS integrates physical biometric RFID scanning nodes. Daily entry punches sync instantly with this parent dashboard, triggering immediate email notifications.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/40 text-xs space-y-2 font-bold text-[#0a1835]">
                <div className="flex items-center gap-2 text-[10.5px]">
                  <span>🔒</span>
                  <span>100% Student Entry Punch Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-[10.5px]">
                  <span>📧</span>
                  <span>Instant parent email notifications</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🏫 ACADEMY PROFILE / ABOUT */}
        <section id="about" className="pt-4 border-t border-slate-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <span className="text-[9px] font-black uppercase text-brand-yellow tracking-widest block">Est. 2009 / Mumbai</span>
              <h3 className="text-2xl font-black text-brand-blue">Premier SSC, HSC & Board Coaching</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                For over a decade, Sharda Academy has dedicated itself to shaping secondary and high school minds, preparing board aspirants for rigorous examinations like Maharashtra State Board SSC Exams (10th) and HSC Exams (12th).
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Our classrooms are integrated with smart biometric smartboards and real-time syncing hardware, guaranteeing secure daily student oversight logs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "15+ Years", desc: "Coaching Excellence" },
                { label: "92%+", desc: "Board Toppers Success" },
                { label: "2,500+", desc: "Students Mentored" },
                { label: "100%", desc: "Concept Clarity Rate" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200/40 rounded-2xl shadow-sm text-center space-y-1">
                  <div className="text-xl font-black text-brand-blue">{item.label}</div>
                  <div className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📚 COACHING COURSES */}
        <section id="courses" className="space-y-6 pt-4 border-t border-slate-200/50">
          <div className="text-center space-y-2">
            <span className="text-[9px] font-black uppercase text-brand-yellow tracking-widest block">Academic Syllabus</span>
            <h3 className="text-2xl font-black text-brand-blue">Coaching Programs (1st - 12th)</h3>
            <p className="text-xs text-slate-400 font-semibold max-w-lg mx-auto">
              SAMS curriculum designs are engineered to deliver conceptual foundations and elite board grades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { class: "Classes 11th & 12th", title: "HSC Board Excellence Program", desc: "Rigorous physical, chemical, and mathematical modules preparing candidates for outstanding performance in HSC State Board exams.", border: "border-l-brand-blue" },
              { class: "Classes 8th to 10th", title: "Pre-Foundation Elite Program", desc: "Strengthening elementary math, logical science, and language skills for exceptional scores in SSC State Board exams.", border: "border-l-brand-yellow" },
              { class: "Classes 1st to 7th", title: "Primary Nurture Academy", desc: "Fun-oriented, logical reasoning and mathematical arithmetic basic building blocks classes.", border: "border-l-[#dc2626]" }
            ].map((c, idx) => (
              <div key={idx} className={`p-6 bg-white border border-slate-200/50 border-l-4 ${c.border} rounded-2xl shadow-sm text-left space-y-3 hover-glow transition-all duration-300`}>
                <span className="text-[8px] font-extrabold text-brand-blue bg-[#dbeafe] px-2 py-0.5 rounded uppercase tracking-wider">{c.class}</span>
                <h4 className="text-xs font-black text-slate-900 leading-tight pt-1">{c.title}</h4>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🎓 ELITE FACULTY */}
        <section id="faculty" className="space-y-6 pt-4 border-t border-slate-200/50">
          <div className="text-center space-y-2">
            <span className="text-[9px] font-black uppercase text-brand-yellow tracking-widest block">Board Specialists</span>
            <h3 className="text-2xl font-black text-brand-blue">Our Dedicated Evaluator Squad</h3>
            <p className="text-xs text-slate-400 font-semibold max-w-lg mx-auto">
              Our teachers are veteran educators, including state-board evaluators with decades of syllabus guidance experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Prof. Sudeep Das", subject: "Mathematics / Senior Director", edu: "Board Exam Specialist", initial: "S", desc: "Over 15+ years mentoring high school board candidates with standard exam preparation." },
              { name: "Dr. Ananya Sen", subject: "Chemistry Lead Evaluator", edu: "Ph.D. in Chemistry, Board Panelist", initial: "A", desc: "Expert chemistry educator clarifying complex formulas and reaction routes for board toppers." }
            ].map((f, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200/40 rounded-2xl shadow-sm flex gap-4 items-center text-left hover-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg flex-shrink-0 border border-brand-yellow">
                  {f.initial}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900 leading-tight">{f.name}</h4>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[7.5px] font-extrabold uppercase tracking-wider text-brand-red bg-red-50 border px-1.5 py-0.5 rounded">{f.subject}</span>
                    <span className="text-[8px] font-bold text-slate-400">{f.edu}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1.5 leading-normal">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📝 ADMISSION DESK */}
        <section id="admission" className="pt-4 border-t border-slate-200/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Wing highlights */}
            <div className="md:col-span-5 space-y-6 text-left flex flex-col justify-center">
              <span className="text-[9px] font-black uppercase text-brand-yellow tracking-widest">Get Enrolled</span>
              <h3 className="text-2xl font-black text-brand-blue">Instant Admission Desk</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Submit an inquiry request here. Your details will be synchronized instantly with our central administration desk, and we will contact you directly to schedule a free academic counselling and mock test assessment session.
              </p>
              
              <div className="space-y-2.5 text-xs text-slate-500 font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-brand-yellow">✓</span>
                  <span>Free board prep syllabus mapping guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-yellow">✓</span>
                  <span>Scholarship eligibility checking scans</span>
                </div>
              </div>
            </div>

            {/* Right form wing */}
            <div className="md:col-span-7 w-full">
              <div className="p-6 md:p-8 bg-white border border-[#0a1835]/10 rounded-3xl shadow-lg relative overflow-hidden">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-4 border-b pb-2 text-left">Admission Inquiry Form</h3>
                
                {inquirySuccess ? (
                  <div className="py-12 text-center space-y-3">
                    <span className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto shadow-sm">✓</span>
                    <h4 className="text-sm font-black text-emerald-650 uppercase tracking-widest">Inquiry Received!</h4>
                    <p className="text-xs text-slate-400 font-semibold">Opening WhatsApp desk for immediate session booking...</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs text-left">
                    <div>
                      <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[9px]">Candidate Full Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Enter student full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[9px]">Target Study Standard</label>
                        <select
                          value={inquiryClass}
                          onChange={(e) => setInquiryClass(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none font-bold text-slate-800"
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map((num) => (
                            <option key={num} value={num.toString()}>Standard Class {num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[9px]">Parent Contact Number</label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="e.g. 9324444269"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 text-xs font-black uppercase tracking-widest text-white gradient-brand-header rounded-xl shadow-md shadow-brand-blue/20 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                    >
                      SUBMIT INQUIRY REGISTRATION
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 📞 SUPPORT DESKS */}
        <section id="contact" className="space-y-6 pt-4 border-t border-slate-200/50">
          <div className="text-center space-y-2">
            <span className="text-[9px] font-black uppercase text-brand-yellow tracking-widest block">Contact Us</span>
            <h3 className="text-2xl font-black text-brand-blue">Coaching Support Desks</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white border border-slate-200/40 rounded-2xl shadow-sm text-left space-y-1.5 hover-glow transition-all duration-300">
              <span className="text-xl">📍</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Office Location</p>
              <p className="text-xs font-bold text-[#0a1835]">Sector 3, Mankhurd, Mumbai - 400043</p>
            </div>
            <div className="p-5 bg-white border border-slate-200/40 rounded-2xl shadow-sm text-left space-y-1.5 hover-glow transition-all duration-300">
              <span className="text-xl">📞</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Direct Phone Line</p>
              <p className="text-xs font-bold text-brand-blue">+91 93244 44269</p>
            </div>
            <div className="p-5 bg-white border border-slate-200/40 rounded-2xl shadow-sm text-left space-y-1.5 hover-glow transition-all duration-300">
              <span className="text-xl">✉️</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email Support</p>
              <p className="text-xs font-bold text-brand-blue">sudeepdas2525@zohomail.in</p>
            </div>
          </div>
        </section>

      </main>

      {/* 📱 Footer */}
      <footer className="py-6 text-center border-t border-slate-200/30 bg-brand-blue text-white/60 relative z-10">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          © {new Date().getFullYear()} Sharda Academy Mankhurd-43. All Rights Reserved.
        </p>
        <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">
          Designed professionally with Biometric Hardware API integration
        </p>
      </footer>

      {/* 🔐 PREMIUM FROSTED OVERLAY MODAL FOR AUTHENTICATION */}
      {showLogin && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute top-4 left-4 z-50">
            <button
              onClick={() => setShowLogin(false)}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-brand-blue bg-brand-yellow hover:bg-amber-400 shadow-md cursor-pointer transition-all active:scale-95 duration-200"
            >
              ← Back to Portal Home
            </button>
          </div>
          <div className="w-full max-w-lg animate-fade-in-up">
            <UserLogin onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      )}

    </div>
  );
}
