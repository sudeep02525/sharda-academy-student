"use client";
import { useState, useEffect } from "react";
import axios from "axios";



import { API_BASE_URL } from "@/utils/config";

export default function NoticeManagement() {
  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    classStandard: "",
    batch: "",
    sendEmail: false,
    sendDashboardNotification: true,
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/notices`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setNotices(response.data.data);
    } catch (error) {
      alert("Error fetching notices: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/admin/notices/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Notice updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/admin/notices`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Notice created successfully");
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: "",
        content: "",
        category: "General",
        classStandard: "",
        batch: "",
        sendEmail: false,
        sendDashboardNotification: true,
      });
      fetchNotices();
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this notice?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/notices/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Notice deleted successfully");
        fetchNotices();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleEdit = (notice) => {
    setFormData(notice);
    setEditingId(notice._id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Notice Management</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                title: "",
                content: "",
                category: "General",
                classStandard: "",
                batch: "",
                sendEmail: false,
                sendDashboardNotification: true,
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Create Notice
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {editingId ? "Edit Notice" : "Create Notice"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content *</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="General">General</option>
                        <option value="Student">Student</option>

                        <option value="Parent">Parent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Class</label>
                      <select
                        name="classStandard"
                        value={formData.classStandard}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="">All Classes</option>
                        {[
  {v:"1",l:"Class 1"}, {v:"2",l:"Class 2"}, {v:"3",l:"Class 3"}, {v:"4",l:"Class 4"}, {v:"5",l:"Class 5"}, {v:"6",l:"Class 6"}, {v:"7",l:"Class 7"}, {v:"8",l:"Class 8"}, {v:"9",l:"Class 9"}, {v:"10",l:"Class 10"}, {v:"11-Science",l:"11th Science"}, {v:"11-Commerce",l:"11th Commerce"}, {v:"12-Science",l:"12th Science"}, {v:"12-Commerce",l:"12th Commerce"}
].map((c) => (
  <option key={c.v} value={c.v}>{c.l}</option>
))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Batch</label>
                    <input
                      type="text"
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      placeholder="Leave empty for all batches"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sendDashboardNotification"
                        checked={formData.sendDashboardNotification}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Send Dashboard Notification</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sendEmail"
                        checked={formData.sendEmail}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Send Email to Students</span>
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      {editingId ? "Update" : "Create"}
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

        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : notices.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No notices found</div>
          ) : (
            <div className="divide-y">
              {notices.map((notice) => (
                <div key={notice._id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{notice.title}</h3>
                      <p className="text-sm text-gray-600">Category: {notice.category}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notice._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700">{notice.content}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(notice.date).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

