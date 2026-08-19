"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";



import { API_BASE_URL } from "@/utils/config";

export default function SystemManagement({ token }) {
  const [loadingBackup, setLoadingBackup] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const downloadBackup = async () => {
    try {
      setLoadingBackup(true);
      const res = await axios.get(`${API_BASE_URL}/admin/system/backup`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res.data.data, null, 2));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `sharda_academy_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } catch (err) {
      alert("Failed to download backup: " + (err.response?.data?.message || err.message));
    } finally {
      setLoadingBackup(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/system/roles/${userId}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Backup Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#0a1835]">Data Backup</h3>
                <p className="text-[10px] font-semibold text-slate-400">Download a full JSON snapshot of the database</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 mb-6">Create a secure backup of all students, fees, attendance records, and notices. Store this safely.</p>
          </div>
          <button
            onClick={downloadBackup}
            disabled={loadingBackup}
            className="w-full py-3 rounded-xl bg-[#0a1835] hover:bg-blue-900 text-white text-xs font-black uppercase tracking-widest transition-all shadow-md disabled:opacity-50"
          >
            {loadingBackup ? "Generating Backup..." : "Download Full Backup"}
          </button>
        </div>

        {/* Global Settings Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0a1835]">Global Settings</h3>
              <p className="text-[10px] font-semibold text-slate-400">Academy configurations</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-600">Maintenance Mode</span>
              <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-not-allowed opacity-50">
                <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow"></div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-600">Auto-Approve Students</span>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-not-allowed opacity-50">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
              </div>
            </div>
            <p className="text-[9px] text-center text-slate-400 font-semibold mt-2">(Global settings are currently managed via ENV variables)</p>
          </div>
        </div>
      </div>

      {/* Role Management */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-black uppercase tracking-wider text-[#0a1835] mb-1">Role Management</h3>
        <p className="text-[10px] font-semibold text-slate-400 mb-4">View and re-assign system roles for all registered users.</p>
        
        <input 
          type="text" 
          placeholder="Search users..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/3 mb-4 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-brand-yellow focus:ring-1 focus:ring-amber-200 transition-all"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="px-4 py-2 font-bold uppercase tracking-wider text-slate-400 text-[9px]">Name</th>
                <th className="px-4 py-2 font-bold uppercase tracking-wider text-slate-400 text-[9px]">Email</th>
                <th className="px-4 py-2 font-bold uppercase tracking-wider text-slate-400 text-[9px]">Current Role</th>
                <th className="px-4 py-2 font-bold uppercase tracking-wider text-slate-400 text-[9px]">Change Role To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(u => (
                <tr key={u._id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 font-bold text-[#0a1835]">{u.name}</td>
                  <td className="px-4 py-2 text-slate-500">{u.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      u.role === 'admin' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <select 
                      value={u.role}
                      onChange={(e) => {
                        if(confirm(`Are you sure you want to change ${u.name}'s role to ${e.target.value}?`)) {
                          handleRoleChange(u._id, e.target.value);
                        }
                      }}
                      className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 rounded px-2 py-1 outline-none"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
