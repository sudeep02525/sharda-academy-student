"use client";
import { useState, useEffect } from "react";
import axios from "axios";



import { API_BASE_URL } from "@/utils/config";

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-1">
    <p className="text-[10px] font-black uppercase tracking-widest text-gold mb-0.5">{subtitle}</p>
    <h3 className="text-sm font-bold text-navy border-b border-gold/20 pb-2">{title}</h3>
  </div>
);

const FormField = ({ label, required, children }) => (
  <div>
    <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full px-3 py-2 text-sm border border-navy/10 rounded-lg bg-white text-navy placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all";

export default function AttendanceManagement() {
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [classLevel, setClassLevel] = useState("");
  const [batch, setBatch] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (classLevel && batch) {
      fetchStudentsForClass();
    }
  }, [classLevel, batch]);

  const fetchStudentsForClass = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/students?classLevel=${classLevel}&batch=${batch}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setStudents(response.data.data);
      const initialMarks = {};
      response.data.data.forEach((s) => {
        initialMarks[s._id] = "Present";
      });
      setMarks(initialMarks);
    } catch (error) {
      alert("Error fetching students: " + error.message);
    }
  };

  const handleMarkChange = (studentId, value) => {
    setMarks((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmitAttendance = async (e) => {
    e.preventDefault();
    try {
      const attendanceRecords = Object.entries(marks).map(([studentId, status]) => ({
        studentId,
        status,
      }));

      await axios.post(
        `${API_BASE_URL}/admin/attendance/mark`,
        {
          date,
          classLevel: parseInt(classLevel),
          batch,
          attendanceRecords,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        }
      );
      alert("Attendance marked successfully");
      setMarks({});
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  const handleGenerateMonthlyReport = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/admin/attendance/monthly-report?classLevel=${classLevel}&batch=${batch}&month=${month}&year=${year}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        }
      );
      setReport(response.data.data);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-gold">Admin Portal</p>
          <h1 className="text-2xl font-black text-navy">Attendance Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Mark and track student attendance</p>
        </div>

        {/* Mark Attendance Section */}
        <div className="bg-white rounded-xl border border-navy/8 shadow-sm p-6 mb-6">
          <SectionHeader title="Mark Attendance" subtitle="Daily Tracking" />
          <form onSubmit={handleSubmitAttendance} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField label="Date">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
              </FormField>
              <FormField label="Class">
                <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)} className={inputCls}>
                  <option value="">Select Class</option>
                  {[
  {v:"1",l:"Class 1"}, {v:"2",l:"Class 2"}, {v:"3",l:"Class 3"}, {v:"4",l:"Class 4"}, {v:"5",l:"Class 5"}, {v:"6",l:"Class 6"}, {v:"7",l:"Class 7"}, {v:"8",l:"Class 8"}, {v:"9",l:"Class 9"}, {v:"10",l:"Class 10"}, {v:"11-Science",l:"11th Science"}, {v:"11-Commerce",l:"11th Commerce"}, {v:"12-Science",l:"12th Science"}, {v:"12-Commerce",l:"12th Commerce"}
].map((c) => <option key={c.v} value={c.v}>{c.l}</option>)}
                </select>
              </FormField>
              <FormField label="Batch">
                <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="e.g., Batch A" className={inputCls} />
              </FormField>
              <div className="flex items-end">
                <button type="button" onClick={fetchStudentsForClass}
                  className="w-full bg-navy hover:bg-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95">
                  Load Students
                </button>
              </div>
            </div>

            {students.length > 0 && (
              <>
                <div className="overflow-x-auto border border-navy/8 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-navy">
                        <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Name</th>
                        <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Roll Number</th>
                        <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/5">
                      {students.map((student) => (
                        <tr key={student._id} className="hover:bg-beige transition-colors">
                          <td className="px-5 py-3 text-sm font-bold text-navy">{student.name}</td>
                          <td className="px-5 py-3 text-sm text-navy/70">{student.rollNumber}</td>
                          <td className="px-5 py-3">
                            <select value={marks[student._id] || "Present"} onChange={(e) => handleMarkChange(student._id, e.target.value)}
                              className="px-3 py-1.5 text-xs font-bold border border-navy/10 rounded-lg bg-white text-navy focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all">
                              <option value="Present">Present</option>
                              <option value="Absent">Absent</option>
                              <option value="Late">Late</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button type="submit"
                  className="bg-gold hover:bg-gold-dark text-navy font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95">
                  Save Attendance
                </button>
              </>
            )}
          </form>
        </div>

        {/* Monthly Report Section */}
        <div className="bg-white rounded-xl border border-navy/8 shadow-sm p-6">
          <SectionHeader title="Monthly Attendance Report" subtitle="Analytics" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 mt-4">
            <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)} className={inputCls}>
              <option value="">Select Class</option>
              {[
  {v:"1",l:"Class 1"}, {v:"2",l:"Class 2"}, {v:"3",l:"Class 3"}, {v:"4",l:"Class 4"}, {v:"5",l:"Class 5"}, {v:"6",l:"Class 6"}, {v:"7",l:"Class 7"}, {v:"8",l:"Class 8"}, {v:"9",l:"Class 9"}, {v:"10",l:"Class 10"}, {v:"11-Science",l:"11th Science"}, {v:"11-Commerce",l:"11th Commerce"}, {v:"12-Science",l:"12th Science"}, {v:"12-Commerce",l:"12th Commerce"}
].map((c) => <option key={c.v} value={c.v}>{c.l}</option>)}
            </select>
            <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="Batch" className={inputCls} />
            <select value={month} onChange={(e) => setMonth(e.target.value)} className={inputCls}>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{new Date(2024, i).toLocaleString("default", { month: "long" })}</option>
              ))}
            </select>
            <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className={inputCls}>
              {[2024, 2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <button onClick={handleGenerateMonthlyReport}
              className="bg-navy hover:bg-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95">
              Generate Report
            </button>
          </div>

          {report && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Roll Number</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold">Present</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold">Absent</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold">Late</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {report.students.map((student) => (
                    <tr key={student.studentId} className="border-b">
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.rollNumber}</td>
                      <td className="px-4 py-2 text-center text-green-600">{student.presentCount}</td>
                      <td className="px-4 py-2 text-center text-red-600">{student.absentCount}</td>
                      <td className="px-4 py-2 text-center text-orange-600">{student.lateCount}</td>
                      <td className="px-4 py-2 text-center font-semibold">{student.attendancePercentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

