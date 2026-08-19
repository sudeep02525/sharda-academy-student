"use client";
import { useState, useEffect } from "react";
import axios from "axios";


import { API_BASE_URL } from "@/utils/config";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function TimetableManagement() {
  const [timetable, setTimetable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classLevel, setClassLevel] = useState("");
  const [batch, setBatch] = useState("");

  const [formData, setFormData] = useState({
    classLevel: "",
    batch: "",
    subject: "",
    day: "",
    startTime: "",
    endTime: "",
    room: "",
  });

  useEffect(() => {
    if (classLevel && batch) {
      fetchTimetable();
    }
  }, [classLevel, batch]);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/timetable?classLevel=${classLevel}&batch=${batch}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setTimetable(response.data.data);
    } catch (error) {
      alert("Error fetching timetable: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/admin/timetable/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Timetable entry updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/admin/timetable`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Timetable entry added successfully");
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        classLevel: "",
        batch: "",
        subject: "",
        day: "",
        startTime: "",
        endTime: "",
        room: "",
      });
      fetchTimetable();
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this timetable entry?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/timetable/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Entry deleted successfully");
        fetchTimetable();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setEditingId(entry._id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Timetable Management</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                classLevel,
                batch,
                subject: "",
                day: "",
                startTime: "",
                endTime: "",
                room: "",
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Slot
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Class</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Batch</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="e.g., Batch A"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {editingId ? "Edit Timetable Entry" : "Add Timetable Slot"}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Day *</label>
                    <select
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select Day</option>
                      {DAYS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Room Number</label>
                    <input
                      type="text"
                      name="room"
                      value={formData.room}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time *</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time *</label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      {editingId ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                      }}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {classLevel && batch && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Day</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Room</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No timetable entries found
                      </td>
                    </tr>
                  ) : (
                    timetable.map((entry) => (
                      <tr key={entry._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium">{entry.day}</td>
                        <td className="px-6 py-3">{entry.subject}</td>
                        <td className="px-6 py-3">
                          {entry.startTime} - {entry.endTime}
                        </td>
                        <td className="px-6 py-3">{entry.room}</td>
                        <td className="px-6 py-3 space-x-2">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(entry._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
