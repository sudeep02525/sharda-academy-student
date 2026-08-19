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

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterBatch, setFilterBatch] = useState("");

  const emptyForm = {
    name: "", email: "", phone: "", parentEmail: "",
    classLevel: "", batch: "", rollNumber: "", password: "12345678",
    dob: "", gender: "", bloodGroup: "", aadhaarNo: "",
    fatherName: "", fatherPhone: "", motherName: "", motherPhone: "",
    homeAddress: "", biometricId: "", profilePhoto: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => { fetchStudents(); }, [search, filterClass, filterBatch]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (filterClass) params.append("classLevel", filterClass);
      if (filterBatch) params.append("batch", filterBatch);
      const response = await axios.get(`${API_BASE_URL}/admin/students?${params}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setStudents(response.data.data || []);
    } catch (error) {
      alert("Error fetching students: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profilePhoto") return;
        if (formData[key] !== undefined && formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      if (profilePhotoFile) {
        data.append("profilePhoto", profilePhotoFile);
      } else if (formData.profilePhoto === "") {
        data.append("profilePhoto", "");
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data",
      };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/admin/students/${editingId}`, data, { headers });
        alert("Student updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/admin/students`, data, { headers });
        alert("Student added successfully");
      }
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      setProfilePhotoFile(null);
      setPhotoPreview("");
      fetchStudents();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name || "", email: student.email || "", phone: student.phone || "",
      parentEmail: student.parentEmail || "", classLevel: student.classLevel || "",
      batch: student.batch || "", rollNumber: student.rollNumber || "", password: "",
      dob: student.dob || "", gender: student.gender || "", bloodGroup: student.bloodGroup || "",
      aadhaarNo: student.aadhaarNo || "", fatherName: student.fatherName || "",
      fatherPhone: student.fatherPhone || "", motherName: student.motherName || "",
      motherPhone: student.motherPhone || "", homeAddress: student.homeAddress || "",
      biometricId: student.biometricId || "", profilePhoto: student.profilePhoto || "",
    });
    setProfilePhotoFile(null);
    setPhotoPreview("");
    setEditingId(student._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/students/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Student deleted successfully");
        fetchStudents();
      } catch (error) { alert("Error: " + error.message); }
    }
  };

  const handleActivate = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/students/${id}/activate`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      fetchStudents();
    } catch (error) { alert("Error: " + error.message); }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/students/${id}/deactivate`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      fetchStudents();
    } catch (error) { alert("Error: " + error.message); }
  };

  return (
    <div className="p-6 bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gold">Admin Portal</p>
            <h1 className="text-2xl font-black text-navy">Student Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">{students.length} enrolled student{students.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setFormData(emptyForm); }}
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Student
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-navy/8 shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder="Search student name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-full bg-white text-sm focus:border-[#f1af3c] focus:ring-1 focus:ring-[#f1af3c] transition-all outline-none"
              />
            </div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className={inputCls}
            >
              <option value="">All Classes</option>
              {[
                {v:"1",l:"Class 1"}, {v:"2",l:"Class 2"}, {v:"3",l:"Class 3"}, {v:"4",l:"Class 4"}, {v:"5",l:"Class 5"}, {v:"6",l:"Class 6"}, {v:"7",l:"Class 7"}, {v:"8",l:"Class 8"}, {v:"9",l:"Class 9"}, {v:"10",l:"Class 10 (SSC)"}, {v:"11-Science",l:"11th Science"}, {v:"11-Commerce",l:"11th Commerce"}, {v:"12-Science",l:"12th Science (HSC)"}, {v:"12-Commerce",l:"12th Commerce (HSC)"}
              ].map((c) => (
                <option key={c.v} value={c.v}>{c.l}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Filter by batch..."
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-auto border border-navy/10">
              {/* Modal Header */}
              <div className="sticky top-0 bg-navy px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <h2 className="text-base font-black text-white uppercase tracking-wide">
                    {editingId ? "Edit Student" : "Add New Student"}
                  </h2>
                  <p className="text-[10px] text-gold font-semibold uppercase tracking-widest mt-0.5">Student Record</p>
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

                {/* Profile Photo */}
                <div className="flex items-center gap-4 p-4 bg-beige rounded-xl border border-navy/8">
                  <div className="relative w-16 h-16 rounded-full bg-navy/10 border-2 border-gold/30 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : formData.profilePhoto ? (
                      <img src={formData.profilePhoto.startsWith("http") || formData.profilePhoto.startsWith("data:") ? formData.profilePhoto : `${process.env.NEXT_PUBLIC_API_URL || `${API_BASE_URL}`}${formData.profilePhoto}`} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-navy/30">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">Profile Photo</label>
                    <input type="file" accept="image/*" onChange={handlePhotoChange}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-navy file:text-white hover:file:bg-navy-light cursor-pointer mb-2" />
                    {(photoPreview || formData.profilePhoto) && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfilePhotoFile(null);
                          setPhotoPreview("");
                          setFormData((prev) => ({ ...prev, profilePhoto: "" }));
                        }}
                        className="text-[10px] font-extrabold text-red-500 hover:text-red-700 uppercase tracking-wider transition-colors"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>

                {/* Basic Info */}
                <div>
                  <SectionHeader title="Basic Information" subtitle="Required Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <FormField label="Full Name" required>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Student full name" className={inputCls} />
                    </FormField>
                    <FormField label="Email Address" required>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="student@email.com" className={inputCls} />
                    </FormField>
                    <FormField label="Mobile Number" required>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="10-digit mobile" className={inputCls} />
                    </FormField>
                    <FormField label="Parent Email">
                      <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleInputChange} placeholder="parent@email.com" className={inputCls} />
                    </FormField>
                    <FormField label="Class" required>
                      <select name="classLevel" value={formData.classLevel} onChange={handleInputChange} required className={inputCls}>
                        <option value="">Select Class</option>
                        {[
                          {v:"1",l:"Class 1"}, {v:"2",l:"Class 2"}, {v:"3",l:"Class 3"}, {v:"4",l:"Class 4"}, {v:"5",l:"Class 5"}, {v:"6",l:"Class 6"}, {v:"7",l:"Class 7"}, {v:"8",l:"Class 8"}, {v:"9",l:"Class 9"}, {v:"10",l:"Class 10 (SSC)"}, {v:"11-Science",l:"11th Science"}, {v:"11-Commerce",l:"11th Commerce"}, {v:"12-Science",l:"12th Science (HSC)"}, {v:"12-Commerce",l:"12th Commerce (HSC)"}
                        ].map((c) => (
                          <option key={c.v} value={c.v}>{c.l}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Batch" required>
                      <input type="text" name="batch" value={formData.batch} onChange={handleInputChange} required placeholder="e.g., Batch A" className={inputCls} />
                    </FormField>
                    <FormField label="Roll Number" required>
                      <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} required className={inputCls} />
                    </FormField>
                    {!editingId && (
                      <FormField label="Password">
                        <input type="text" name="password" value={formData.password} onChange={handleInputChange} className={inputCls} />
                      </FormField>
                    )}
                  </div>
                </div>

                {/* Personal Details */}
                <div>
                  <SectionHeader title="Personal Details" subtitle="Student Profile" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <FormField label="Date of Birth">
                      <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className={inputCls} />
                    </FormField>
                    <FormField label="Gender">
                      <select name="gender" value={formData.gender} onChange={handleInputChange} className={inputCls}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormField>
                    <FormField label="Blood Group">
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className={inputCls}>
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Aadhaar Number">
                      <input type="text" name="aadhaarNo" value={formData.aadhaarNo} onChange={handleInputChange} placeholder="12-digit Aadhaar" maxLength={12} className={inputCls} />
                    </FormField>
                    <FormField label="Biometric Card ID">
                      <input type="text" name="biometricId" value={formData.biometricId} onChange={handleInputChange} placeholder="RFID card ID" className={inputCls} />
                    </FormField>
                  </div>
                </div>

                {/* Parent Details */}
                <div>
                  <SectionHeader title="Parent / Guardian Details" subtitle="Family Info" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <FormField label="Father's Name">
                      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} className={inputCls} />
                    </FormField>
                    <FormField label="Father's Phone">
                      <input type="tel" name="fatherPhone" value={formData.fatherPhone} onChange={handleInputChange} className={inputCls} />
                    </FormField>
                    <FormField label="Mother's Name">
                      <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} className={inputCls} />
                    </FormField>
                    <FormField label="Mother's Phone">
                      <input type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleInputChange} className={inputCls} />
                    </FormField>
                    <div className="md:col-span-2">
                      <FormField label="Home Address">
                        <textarea name="homeAddress" value={formData.homeAddress} onChange={handleInputChange} rows="2" placeholder="Full residential address" className={inputCls} />
                      </FormField>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-navy/8">
                  <button type="submit"
                    className="flex-1 bg-gold hover:bg-gold-dark text-navy font-black text-xs uppercase tracking-widest py-3 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:scale-95">
                    {editingId ? "Update Student" : "Add Student"}
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
        )}

        {/* Students Table */}
        <div className="bg-white rounded-xl border border-navy/8 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-navy/20 border-t-gold rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-navy/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-navy/40">No students found</p>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or add a new student</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy">
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Student</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Roll No.</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Class</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Batch</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Status</th>
                    <th className="px-5 py-3 text-left text-[10px] font-black text-white/70 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {students.map((student) => (
                    <tr key={student._id} className="hover:bg-beige transition-colors group">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-navy/10 border border-gold/20 overflow-hidden flex items-center justify-center flex-shrink-0">
                            {student.profilePhoto ? (
                              <img src={student.profilePhoto.startsWith("http") || student.profilePhoto.startsWith("data:") ? student.profilePhoto : `${process.env.NEXT_PUBLIC_API_URL || `${API_BASE_URL}`}${student.profilePhoto}`} alt={student.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs font-black text-navy/50">{student.name?.[0]?.toUpperCase()}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-navy">{student.name}</p>
                            <p className="text-[11px] text-slate-400">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm font-semibold text-navy/70">{student.rollNumber || "—"}</td>
                      <td className="px-5 py-3 text-sm text-navy/70">Class {student.classLevel}</td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-0.5 bg-gold/10 text-gold-dark text-[11px] font-bold rounded-full border border-gold/20">{student.batch}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${student.accountStatus ? "bg-success-light text-success" : "bg-error-light text-error"}`}>
                          {student.accountStatus ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => handleEdit(student)}
                            className="px-3 py-1.5 bg-gold/10 hover:bg-gold text-gold-dark hover:text-navy text-[10px] font-black uppercase rounded-lg transition-all">
                            Edit
                          </button>
                          {student.accountStatus ? (
                            <button onClick={() => handleDeactivate(student._id)}
                              className="px-3 py-1.5 bg-warning-light hover:bg-warning text-warning hover:text-white text-[10px] font-black uppercase rounded-lg transition-all">
                              Deactivate
                            </button>
                          ) : (
                            <button onClick={() => handleActivate(student._id)}
                              className="px-3 py-1.5 bg-success-light hover:bg-success text-success hover:text-white text-[10px] font-black uppercase rounded-lg transition-all">
                              Activate
                            </button>
                          )}
                          <button onClick={() => handleDelete(student._id)}
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

