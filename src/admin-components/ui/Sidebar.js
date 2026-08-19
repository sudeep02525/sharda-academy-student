"use client";

import React from "react";
import Image from "next/image";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  title,
  subtitle,
  activeTab,
  setActiveTab,
  menuItems,
  getIcon,
  userName,
  userRole,
  onLogout,
}) {
  return (
    <>
      {/* Mobile Sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* 🖥️ Collapsible Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 md:sticky md:top-0 md:h-screen shrink-0 border-r border-white/10 bg-[#0a1835] text-white overflow-hidden ${
          sidebarOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:w-16 md:translate-x-0"
        }`}
      >
        {/* Soft floating background spheres in dashboard sidebar */}
        <div
          className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-[#f1af3c]/15 to-amber-500/10 rounded-full pointer-events-none animate-pulse-glow"
          style={{ filter: "blur(70px)" }}
        ></div>
        <div
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tr from-[#0f2347]/45 to-[#f1af3c]/10 rounded-full pointer-events-none"
          style={{ filter: "blur(80px)" }}
        ></div>

        {sidebarOpen ? (
          <div className="px-4 py-4 border-b border-white/10 relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="text-left min-w-0">
                <span className="block text-[12.5px] font-black text-white uppercase tracking-wider leading-none whitespace-nowrap">
                  {title}
                </span>
                <div className="flex items-center gap-1 mt-1 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest leading-none">
                    {subtitle}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-xl bg-white/5 text-white/60 hover:text-white cursor-pointer transition-all hover:bg-white/10 ml-2 flex-shrink-0"
              aria-label="Collapse Sidebar"
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
                  d="M15.75 19.5 8.25 12l7.5-7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="p-3.5 flex flex-col items-center gap-3 border-b border-white/10 relative z-10">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain flex-shrink-0"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-xl bg-white/5 text-white/60 hover:text-white cursor-pointer transition-all hover:bg-white/10"
              aria-label="Expand Sidebar"
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
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}

        <nav className="p-3 flex-grow space-y-1.5 overflow-y-auto no-scrollbar relative z-10">
          {menuItems.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  // Auto-close sidebar on mobile after choosing a tab
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center cursor-pointer group ${
                  sidebarOpen ? "px-3.5 gap-3" : "justify-center px-1"
                } ${
                  isActive
                    ? "bg-[#f1af3c] text-[#0a1835] shadow-lg shadow-[#f1af3c]/25 translate-x-1 border-l-4 border-[#0a1835]"
                    : "text-slate-100 hover:text-[#f1af3c] hover:bg-white/10 hover:translate-x-0.5 border-l-2 border-transparent hover:border-[#f1af3c]"
                }`}
                title={!sidebarOpen ? t.label : ""}
              >
                {getIcon(
                  t.id,
                  `h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? "text-[#0a1835]" : "text-slate-300 group-hover:text-[#f1af3c]"
                  }`
                )}
                {sidebarOpen && <span className="truncate whitespace-nowrap">{t.label.toUpperCase()}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar user pill */}
        <div className="p-4 border-t border-white/10 bg-[#030814]/30 relative z-10">
          {sidebarOpen ? (
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-full bg-brand-yellow text-[#0a1835] flex items-center justify-center font-black text-sm flex-shrink-0 overflow-hidden">
                  {userName?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="text-left min-w-0">
                  <span
                    className="text-xs font-bold truncate block leading-none text-white"
                    style={{ color: "#ffffff" }}
                  >
                    {userName?.toUpperCase() || "USER"}
                  </span>
                  <p
                    className="text-[10px] font-semibold truncate mt-1.5"
                    style={{ color: "#cbd5e1" }}
                  >
                    {userRole}
                  </p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white hover:border-transparent transition-all cursor-pointer flex-shrink-0"
                title="Sign Out"
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
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={onLogout}
                className="w-10 h-10 rounded-full border border-red-500/35 bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-red-600/15"
                title="Sign Out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="h-4.5 w-4.5 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
