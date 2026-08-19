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

export default function HomeworkManagement() {
  const [homeworks, setHomeworks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterClass, setFilterClass] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    classLevel: "",
    batch: "",
    dueDate: "",
    description: "",
    attachmentName: "",
    attachmentData: "",
  });

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const fetchHomeworks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/homework`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setHomeworks(response.data.homeworks);
    } catch (error) {
      alert("Error fetching homeworks: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          attachmentData: event.target.result,
          attachmentName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/admin/homework/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Homework updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/admin/homework`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Homework uploaded successfully");
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: "",
        subject: "",
        classLevel: "",
        batch: "",
        dueDate: "",
        description: "",
        attachmentName: "",
        attachmentData: "",
      });
      fetchHomeworks();
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this homework?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/homework/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Homework deleted successfully");
        fetchHomeworks();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleEdit = (homework) => {
    setFormData(homework);
    setEditingId(homework._id);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gold">Admin Portal</p>
            <h1 className="text-2xl font-black text-navy">Homework Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">{homeworks.length} homework assignment{homeworks.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                title: "",
                subject: "",
                classLevel: "",
                batch: "",
                dueDate: "",
                description: "",
                attachmentName: "",
                attachmentData: "",
              });
            }}
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Upload Homework
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-auto border border-navy/10">
              {/* Modal Header */}
              <div className="sticky top-0 bg-navy px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <h2 className="text-base font-black text-white uppercase tracking-wide">
                    {editingId ? "Edit Homework" : "Upload Homework"}
                  </h2>
                  <p className="text-[10px] text-gold font-semibold uppercase tracking-widest mt-0.5">Assignment Details</p>
                </div>
                <button
                  onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <SectionHeader title="Assignment Information" subtitle="Required Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <FormField label="Title" required>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="Assignment title" className={inputCls} />
                    </FormField>
                    <FormField label="Subject" required>
                      <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="Subject name" className={inputCls} />
                    </FormField>
                    <FormField label="Class" required>
                      <select name="classLevel" value={formData.classLevel} onChange={handleInputChange} required className={inputCls}>
                        <option value="">Select Class</option>
                        {[
  {v:"1",l:"Class 1"}, {v:"2",l:"Class 2"}, {v:"3",l:"Class 3"}, {v:"4",l:"Class 4"}, {v:"5",l:"Class 5"}, {v:"6",l:"Class 6"}, {v:"7",l:"Class 7"}, {v:"8",l:"Class 8"}, {v:"9",l:"Class 9"}, {v:"10",l:"Class 10"}, {v:"11-Science",l:"11th Science"}, {v:"11-Commerce",l:"11th Commerce"}, {v:"12-Science",l:"12th Science"}, {v:"12-Commerce",l:"12th Commerce"}
].map((c) => <option key={c.v} value={c.v}>{c.l}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Batch" required>
                      <input type="text" name="batch" value={formData.batch} onChange={handleInputChange} required placeholder="e.g., Batch A" className={inputCls} />
                    </FormField>
                    <FormField label="Due Date" required>
                      <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} required className={inputCls} />
                    </FormField>
                    <FormField label="Attachment">
                      <input type="file" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg"
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-navy file:text-white hover:file:bg-navy-light cursor-pointer" />
                      {formData.attachmentName && <p className="text-xs text-success mt-1">{formData.attachmentName}</p>}
                    </FormField>
                    <div className="md:col-span-2">
                      <FormField label="Description">
                        <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Assignment instructions" className={inputCls} />
                      </FormField>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-navy/8">
                  <button type="submit"
                    className="flex-1 bg-gold hover:bg-gold-dark text-navy font-black text-xs uppercase tracking-widest py-3 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95">
                    {editingId ? "Update Homework" : "Upload Homework"}
                  </button>
                  <button type="button"
                    onClick={() => { setShowForm(false); setEditingId(null); }}
                    className="flex-1 bg-navy/8 hover:bg-navy/15 text-navy font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all">
                    Cancel
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-navy/8 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-navy/20 border-t-gold rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Loading homework...</p>
            </div>
          ) : homeworks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-navy/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <p className="text-sm font-bold text-navy/40">No homework found</p>
              <p className="text-xs text-slate-400 mt-1">Upload your first assignment</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy">
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Title</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Subject</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Class</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Due Date</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {homeworks.map((hw) => (
                    <tr key={hw._id} className="hover:bg-beige transition-colors">
                      <td className="px-5 py-3 text-sm font-bold text-navy">{hw.title}</td>
                      <td className="px-5 py-3 text-sm text-navy/70">{hw.subject}</td>
                      <td className="px-5 py-3 text-sm text-navy/70">Class {hw.classLevel}</td>
                      <td className="px-5 py-3 text-sm text-navy/70">{hw.dueDate}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => handleEdit(hw)}
                            className="px-3 py-1.5 bg-gold/10 hover:bg-gold text-gold-dark hover:text-navy text-[10px] font-black uppercase rounded-lg transition-all">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(hw._id)}
                            className="px-3 py-1.5 bg-error-light hover:bg-error text-error hover:text-white text-[10px] font-black uppercase rounded-lg transition-all">
                            Delete
                          </button>
                        </div>
                      </td>
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

