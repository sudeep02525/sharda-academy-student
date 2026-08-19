import React from "react";

export default function StatCard({
  label,
  value,
  sub,
  color = "#0a1835",
  bg = "#f8fafc",
  icon,
}) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-blue/6 hover-glow transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: bg,
            color: color,
          }}
        >
          {icon}
        </div>
      </div>
      <div
        className="text-xl font-black tracking-tight"
        style={{ color: color }}
      >
        {value}
      </div>
      <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 mt-0.5">
        {label}
      </p>
      {sub && (
        <p
          className="text-[8px] font-semibold mt-0.5"
          style={{ color: color + "aa" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
