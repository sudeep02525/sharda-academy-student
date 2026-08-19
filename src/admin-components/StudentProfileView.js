"use client";

import React from "react";

import { API_BASE_URL } from "@/utils/config";

export default function StudentProfileView({ student, feesList, onClose }) {
  if (!student) return null;

  const initial = student.name ? student.name[0].toUpperCase() : "S";
  const isFoundation = (Number(student.classLevel) || 10) <= 5;
  const isMiddle = (Number(student.classLevel) || 10) > 5 && (Number(student.classLevel) || 10) <= 8;
  const avatarBg = isFoundation ? "bg-amber-500" : isMiddle ? "bg-[#0c46c4]" : "bg-[#0a1835]";

  const formatValue = (val) => val && val.trim() !== "" ? val : "N/A";

  // Filter fees belonging to this student
  const studentFees = feesList.filter((fee) => {
    const feeStudentId = fee.studentId?._id || fee.studentId;
    return feeStudentId === student._id;
  });

  return (
    <div className="flex flex-col w-full min-h-full bg-slate-50 dark:bg-[#060c18] animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-white dark:bg-[#0c1830] border-b border-slate-200 dark:border-white/10 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:text-slate-300 dark:bg-white/10 dark:hover:bg-white/20 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-white/10"></div>
          <h2 className="text-lg md:text-xl font-black text-[#0a1835] dark:text-white tracking-tight">
            STUDENT PROFILE
          </h2>
        </div>
        <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm ${student.status === "Inactive" ? "bg-red-100 text-red-600 border border-red-200" : "bg-emerald-100 text-emerald-600 border border-emerald-200"}`}>
          {student.status || "Active"}
        </span>
      </div>

      {/* CONTENT AREA */}
      <div className="p-6 md:p-8 space-y-8 flex-grow">
        
        {/* PREMIUM ID CARD HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1835] via-[#12285a] to-[#1e3a8a] p-8 md:p-10 text-white shadow-xl">
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
            {/* Photo Area */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className={`w-36 h-36 md:w-40 md:h-40 rounded-2xl border-[5px] border-white/20 shadow-2xl flex items-center justify-center text-6xl font-black ${avatarBg} relative overflow-hidden bg-white/10 backdrop-blur-md`}>
                {student.profilePhoto ? (
                  <img src={`${process.env.NEXT_PUBLIC_API_URL || `${API_BASE_URL}`}${student.profilePhoto}`} alt={student.name} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                ) : (
                  initial
                )}
              </div>
              <div className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-black tracking-widest uppercase text-emerald-300 shadow-sm">
                {student.biometricId ? `RFID: ${student.biometricId}` : "No RFID Tag"}
              </div>
            </div>

            {/* Main Info */}
            <div className="flex flex-col text-center md:text-left gap-3 w-full justify-center mt-2 md:mt-0">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">{student.name}</h1>
              <p className="text-base md:text-lg font-bold text-blue-200 opacity-90 uppercase tracking-[0.2em] mb-4">
                Standard {student.classLevel || "N/A"} {student.stream ? `• ${student.stream}` : ""}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 max-w-3xl">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col shadow-inner">
                  <span className="text-[10px] uppercase tracking-widest text-blue-300 font-black mb-1.5 opacity-80">Roll Number</span>
                  <span className="text-lg font-black text-white">{formatValue(student.rollNumber)}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col shadow-inner">
                  <span className="text-[10px] uppercase tracking-widest text-blue-300 font-black mb-1.5 opacity-80">Batch</span>
                  <span className="text-lg font-black text-white">{formatValue(student.batch)}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col shadow-inner">
                  <span className="text-[10px] uppercase tracking-widest text-blue-300 font-black mb-1.5 opacity-80">Gender</span>
                  <span className="text-lg font-black text-white">{formatValue(student.gender)}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col shadow-inner">
                  <span className="text-[10px] uppercase tracking-widest text-blue-300 font-black mb-1.5 opacity-80">Blood Group</span>
                  <span className="text-lg font-black text-white text-red-300">{formatValue(student.bloodGroup)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Personal & Contact Details */}
          <div className="space-y-8 xl:col-span-1">
            {/* Contact Details */}
            <div className="bg-white dark:bg-[#0c1830] border border-slate-200 dark:border-white/10 rounded-3xl p-7 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Info
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Student Phone</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.phone)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Student Email</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.email)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Home Address</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">{formatValue(student.homeAddress)}</p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white dark:bg-[#0c1830] border border-slate-200 dark:border-white/10 rounded-3xl p-7 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                Additional Info
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Date of Birth</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.dob)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Aadhaar No</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white font-mono">{formatValue(student.aadhaarNo)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Subjects Selected</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.subjects)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Parents & Fees */}
          <div className="space-y-8 xl:col-span-2">
            {/* Parent Details */}
            <div className="bg-white dark:bg-[#0c1830] border border-slate-200 dark:border-white/10 rounded-3xl p-7 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Guardian Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Father's Name</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.fatherName)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Father's Phone</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.fatherPhone)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Mother's Name</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.motherName)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Mother's Phone</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.motherPhone)}</p>
                  </div>
                </div>
                <div className="sm:col-span-2 mt-2 pt-4 border-t border-slate-50 dark:border-white/5">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Parent Email (Primary)</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{formatValue(student.parentEmail)}</p>
                </div>
              </div>
            </div>

            {/* Fee History Section */}
            <div className="bg-white dark:bg-[#0c1830] border border-slate-200 dark:border-white/10 rounded-3xl p-7 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Fees & Billing History
                </div>
                <span className="px-3 py-1 bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 rounded-lg text-xs font-bold">{studentFees.length} Records</span>
              </h3>
              
              {studentFees.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                  <p className="text-sm font-bold text-slate-400">No fee records found for this student.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-100 dark:border-white/10">
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice / Due Date</th>
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Total Amount</th>
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount Paid</th>
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {studentFees.map((fee) => {
                        const amount = fee.amount || 0;
                        let paid = fee.amountPaid || 0;
                        // Fallback: If status is Paid but amountPaid is missing (0), assume fully paid
                        if (fee.status === 'Paid' && paid === 0) {
                          paid = amount;
                        }
                        const pending = amount - paid;
                        
                        return (
                          <tr key={fee._id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <td className="py-4 px-2">
                              <p className="text-xs font-black text-slate-800 dark:text-white uppercase">{fee.invoiceId}</p>
                              <p className="text-[10px] font-bold text-slate-500 mt-1">Due: {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString('en-GB') : "N/A"}</p>
                            </td>
                            <td className="py-4 px-2 text-right">
                              <p className="text-sm font-black text-slate-800 dark:text-white">₹{amount.toLocaleString()}</p>
                            </td>
                            <td className="py-4 px-2 text-right">
                              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">₹{paid.toLocaleString()}</p>
                              {pending > 0 && <p className="text-[10px] font-bold text-red-500 mt-1">₹{pending.toLocaleString()} Pending</p>}
                            </td>
                            <td className="py-4 px-2 text-center">
                              <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest ${
                                fee.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                                fee.status === 'Partial' ? 'bg-amber-100 text-amber-700' : 
                                'bg-red-100 text-red-700'
                              }`}>
                                {fee.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
