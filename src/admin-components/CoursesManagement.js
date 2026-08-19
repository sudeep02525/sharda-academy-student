"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";


import { API_BASE_URL } from "@/utils/config";

const inputCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-brand-yellow focus:ring-2 focus:ring-amber-200/50 transition-all";

export default function CoursesManagement({ token }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({ name: "", classLevel: "", description: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (token) {
      fetchCourses();
    }
  }, [token]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/admin/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE_URL}/admin/courses/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE_URL}/admin/courses`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleEdit = (course) => {
    setEditId(course._id);
    setFormData({
      name: course.name,
      classLevel: course.classLevel,
      description: course.description || ""
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-black text-[#0a1835] uppercase tracking-wider">Courses & Classes</h2>
          <p className="text-xs text-slate-500 font-semibold">{courses.length} active courses</p>
        </div>
        <button
          onClick={() => {
            setEditId(null);
            setFormData({ name: "", classLevel: "", description: "" });
            setShowModal(true);
          }}
          className="bg-brand-yellow hover:bg-amber-400 text-[#0a1835] px-5 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Create Course
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Class</th>
                <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Course Name</th>
                <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Description</th>
                <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map(c => (
                <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-[#0a1835]">Class {c.classLevel}</td>
                  <td className="px-4 py-3 text-sm font-bold text-[#0a1835]">{c.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 max-w-xs truncate">{c.description || "-"}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(c)} className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors">Edit</button>
                    <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr><td colSpan="5" className="text-center py-8 text-slate-400 text-sm">No courses created yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-100">
            <h3 className="text-lg font-black uppercase tracking-wider text-[#0a1835] mb-4">
              {editId ? "Edit Course" : "Create New Course"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Course Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Mathematics" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Class Level *</label>
                  <input type="number" min="1" max="12" required value={formData.classLevel} onChange={e => setFormData({...formData, classLevel: e.target.value})} placeholder="e.g. 10" className={inputCls} />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Description (Optional)</label>
                  <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={inputCls}></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-500 font-bold uppercase text-xs hover:bg-slate-100 rounded-xl transition-all">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#0a1835] text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-md hover:bg-blue-900 transition-all">
                  {editId ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
