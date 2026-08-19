"use client";

import React from "react";

export default function ConfirmModal({ config }) {
  if (!config?.isOpen) return null;

  const { title, message, onConfirm, onCancel, type = "danger" } = config;

  const getThemeColors = () => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-500",
          hover: "hover:bg-red-600",
          text: "text-red-600",
          iconBg: "bg-red-50",
          iconColor: "text-red-500",
        };
      case "warning":
        return {
          bg: "bg-brand-yellow",
          hover: "hover:bg-amber-400",
          text: "text-[#0a1835]",
          iconBg: "bg-amber-50",
          iconColor: "text-brand-yellow",
        };
      default:
        return {
          bg: "bg-brand-blue",
          hover: "hover:bg-blue-800",
          text: "text-white",
          iconBg: "bg-blue-50",
          iconColor: "text-brand-blue",
        };
    }
  };

  const theme = getThemeColors();

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden text-center p-6 scale-up">
        <div className={`mx-auto w-16 h-16 ${theme.iconBg} rounded-full flex items-center justify-center mb-4`}>
          {type === "danger" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-8 h-8 ${theme.iconColor}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-8 h-8 ${theme.iconColor}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          )}
        </div>
        
        <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-wide">
          {title || "Confirm Action"}
        </h3>
        
        <p className="text-xs text-slate-500 font-semibold mb-6">
          {message || "Are you sure you want to proceed?"}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 text-[11px] font-extrabold uppercase tracking-widest text-white ${theme.bg} ${theme.hover} rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95 duration-200 cursor-pointer`}
          >
            Confirm
          </button>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .scale-up {
          animation: scaleUp 0.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
