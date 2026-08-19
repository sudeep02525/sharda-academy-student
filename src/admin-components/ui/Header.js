"use client";

import React from "react";

export default function Header({
  setSidebarOpen,
  title,
  toggleTheme,
  darkMode,
  showThemeToggle = true,
}) {
  return (
    <header className="p-4 bg-[#0a1835] border-b-2 border-brand-yellow flex items-center justify-between sticky top-0 z-20 shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white md:hidden cursor-pointer"
          aria-label="Open Sidebar"
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <h2 className="text-sm font-black uppercase tracking-wider text-white">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {showThemeToggle && toggleTheme && (
          <button
            onClick={toggleTheme}
            className="hidden sm:flex p-2.5 rounded-xl border border-white/10 bg-white/5 text-white cursor-pointer transition-all items-center justify-center gap-1.5 theme-toggle-btn"
            title="Toggle Theme"
          >
            {darkMode ? (
              // Moon Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="#F4B63D"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              // Sun Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="#F4B63D"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m0 13.5V21m9.75-9h-2.25M4.95 19.05l1.59-1.59m11.92-11.92l1.59-1.59M3.52 12h2.25m11.92 7.05l-1.59-1.59M4.95 4.95l1.59 1.59M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
