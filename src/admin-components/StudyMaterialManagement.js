"use client";
import { useState, useEffect } from "react";
import axios from "axios";



import { API_BASE_URL } from "@/utils/config";

export default function StudyMaterialManagement() {
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    classLevel: "",
    batch: "All Batches",
    materialType: "Notes",
    attachmentName: "",
    attachmentData: "",
    pages: "",
    fileSize: "",
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/study-materials`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setMaterials(response.data.data || response.data.materials || []);
    } catch (error) {
      alert("Error fetching materials: " + error.message);
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
          fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/admin/study-materials/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Material updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/admin/study-materials`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Material uploaded successfully");
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        subject: "",
        classLevel: "",
        batch: "All Batches",
        materialType: "Notes",
        attachmentName: "",
        attachmentData: "",
        pages: "",
        fileSize: "",
      });
      fetchMaterials();
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this material?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/study-materials/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Material deleted successfully");
        fetchMaterials();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleEdit = (material) => {
    setFormData(material);
    setEditingId(material._id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                title: "",
                description: "",
                subject: "",
                classLevel: "",
                batch: "All Batches",
                materialType: "Notes",
                attachmentName: "",
                attachmentData: "",
                pages: "",
                fileSize: "",
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Upload Material
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {editingId ? "Edit Material" : "Upload Study Material"}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium mb-1">Class *</label>
                    <select
                      name="classLevel"
                      value={formData.classLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select Class</option>
                      {[
  {v:"1",l:"Class 1"}, {v:"2",l:"Class 2"}, {v:"3",l:"Class 3"}, {v:"4",l:"Class 4"}, {v:"5",l:"Class 5"}, {v:"6",l:"Class 6"}, {v:"7",l:"Class 7"}, {v:"8",l:"Class 8"}, {v:"9",l:"Class 9"}, {v:"10",l:"Class 10"}, {v:"11-Science",l:"11th Science"}, {v:"11-Commerce",l:"11th Commerce"}, {v:"12-Science",l:"12th Science"}, {v:"12-Commerce",l:"12th Commerce"}
].map((c) => (
  <option key={c.v} value={c.v}>{c.l}</option>
))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Batch</label>
                    <input
                      type="text"
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Material Type</label>
                    <select
                      name="materialType"
                      value={formData.materialType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="Notes">Notes</option>
                      <option value="Worksheet">Worksheet</option>
                      <option value="Syllabus">Syllabus</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">File Upload</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    {formData.attachmentName && (
                      <p className="text-xs text-green-600 mt-1">{formData.attachmentName}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows="2"
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      {editingId ? "Update" : "Upload"}
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

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : materials.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No materials found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Class</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">File</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{material.title}</td>
                    <td className="px-6 py-3">{material.subject}</td>
                    <td className="px-6 py-3">Class {material.classLevel}</td>
                    <td className="px-6 py-3">{material.materialType}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{material.attachmentName}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => handleEdit(material)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(material._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

