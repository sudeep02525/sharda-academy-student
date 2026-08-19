"use client";
import { useState, useEffect } from "react";
import axios from "axios";



import { API_BASE_URL } from "@/utils/config";

export default function ResultsManagement() {
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterExam, setFilterExam] = useState("");

  // Step 1: exam info + class/batch selection
  const [examName, setExamName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [batch, setBatch] = useState("");

  // Step 2: students loaded for that class/batch
  const [studentsForExam, setStudentsForExam] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  // subjects list (shared across all students)
  const [subjects, setSubjects] = useState([{ subject: "", max: 100 }]);

  // per-student marks: { [studentId]: { [subjectIndex]: obtainedValue } }
  const [studentMarks, setStudentMarks] = useState({});

  useEffect(() => {
    fetchResults();
  }, [filterExam]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterExam) params.append("examName", filterExam);
      const response = await axios.get(`${API_BASE_URL}/admin/results?${params}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setResults(response.data.data || response.data.results || []);
    } catch (error) {
      alert("Error fetching results: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentsForExam = async () => {
    if (!classLevel || !batch) {
      alert("Please select both class and batch first.");
      return;
    }
    try {
      setStudentsLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/admin/students?classLevel=${classLevel}&batch=${encodeURIComponent(batch)}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      const loaded = response.data.data || [];
      setStudentsForExam(loaded);
      // Initialize marks for each student
      const initMarks = {};
      loaded.forEach((s) => {
        initMarks[s._id] = {};
      });
      setStudentMarks(initMarks);
    } catch (error) {
      alert("Error loading students: " + error.message);
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects((prev) => [...prev, { subject: "", max: 100 }]);
  };

  const removeSubject = (index) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMarkChange = (studentId, subjectIndex, value) => {
    setStudentMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectIndex]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!examName) { alert("Please enter an exam name."); return; }
    if (studentsForExam.length === 0) { alert("Please load students first."); return; }
    if (subjects.some((s) => !s.subject)) { alert("Please fill in all subject names."); return; }

    try {
      const resultsArray = studentsForExam.map((student) => ({
        studentId: student._id,
        marks: subjects.map((subj, idx) => ({
          subject: subj.subject,
          obtained: parseFloat(studentMarks[student._id]?.[idx] || 0),
          max: parseFloat(subj.max || 100),
        })),
      }));

      await axios.post(
        `${API_BASE_URL}/admin/results`,
        {
          examName,
          classLevel: parseInt(classLevel),
          batch,
          results: resultsArray,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      alert("Results uploaded successfully");
      setShowForm(false);
      resetForm();
      fetchResults();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setExamName("");
    setClassLevel("");
    setBatch("");
    setStudentsForExam([]);
    setSubjects([{ subject: "", max: 100 }]);
    setStudentMarks({});
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this result?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/results/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        alert("Result deleted successfully");
        fetchResults();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Results Management</h1>
          <button
            onClick={() => { setShowForm(true); resetForm(); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Upload Results
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Upload Exam Results</h2>
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Step 1: Exam Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Exam Name *</label>
                      <input
                        type="text"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        required
                        placeholder="e.g., Unit Test 1"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Class *</label>
                      <select
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
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
                      <label className="block text-sm font-medium mb-1">Batch *</label>
                      <input
                        type="text"
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        required
                        placeholder="e.g., Batch A"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={loadStudentsForExam}
                    disabled={studentsLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    {studentsLoading ? "Loading..." : "Load Students"}
                  </button>

                  {/* Step 2: Subjects */}
                  <div>
                    <h3 className="font-bold mb-2 text-sm">Subjects</h3>
                    <div className="space-y-2">
                      {subjects.map((subj, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Subject name"
                            value={subj.subject}
                            onChange={(e) => handleSubjectChange(idx, "subject", e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-lg text-sm"
                          />
                          <input
                            type="number"
                            placeholder="Max marks"
                            value={subj.max}
                            onChange={(e) => handleSubjectChange(idx, "max", e.target.value)}
                            className="w-28 px-3 py-2 border rounded-lg text-sm"
                          />
                          {subjects.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSubject(idx)}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addSubject}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Subject
                    </button>
                  </div>

                  {/* Step 3: Per-student marks table */}
                  {studentsForExam.length > 0 && (
                    <div>
                      <h3 className="font-bold mb-2 text-sm">
                        Enter Marks — {studentsForExam.length} student(s) loaded
                      </h3>
                      <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left font-semibold">Student</th>
                              <th className="px-4 py-2 text-left font-semibold">Roll No.</th>
                              {subjects.map((subj, idx) => (
                                <th key={idx} className="px-4 py-2 text-center font-semibold">
                                  {subj.subject || `Subject ${idx + 1}`}
                                  <span className="text-gray-400 font-normal"> /{subj.max}</span>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {studentsForExam.map((student) => (
                              <tr key={student._id} className="border-t">
                                <td className="px-4 py-2 font-medium">{student.name}</td>
                                <td className="px-4 py-2 text-gray-500">{student.rollNumber}</td>
                                {subjects.map((_, idx) => (
                                  <td key={idx} className="px-4 py-2">
                                    <input
                                      type="number"
                                      min="0"
                                      max={subjects[idx]?.max || 100}
                                      value={studentMarks[student._id]?.[idx] ?? ""}
                                      onChange={(e) =>
                                        handleMarkChange(student._id, idx, e.target.value)
                                      }
                                      placeholder="0"
                                      className="w-20 px-2 py-1 border rounded text-center"
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Upload Results
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); resetForm(); }}
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

        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by exam name..."
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No results found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Student</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Exam</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Percentage</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Grade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{result.studentId?.name || "N/A"}</td>
                    <td className="px-6 py-3">{result.examName}</td>
                    <td className="px-6 py-3 text-center">{result.percentage}%</td>
                    <td className="px-6 py-3 text-center font-bold">{result.grade}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleDelete(result._id)}
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

