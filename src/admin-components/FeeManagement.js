"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { generateReceiptPDF } from "@/utils/generateReceipt";

export default function FeeManagement() {
  const [activeTab, setActiveTab] = useState("invoices"); // invoices, receipts, cash
  const [fees, setFees] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [students, setStudents] = useState([]);
  
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Invoice form
  const [formData, setFormData] = useState({
    studentId: "",
    amount: "",
    dueDate: "",
    description: "",
  });

  // Cash payment form
  const [cashData, setCashData] = useState({
    studentId: "",
    amountPaid: "",
  });
  
  const [selectedStudentSummary, setSelectedStudentSummary] = useState(null);

  useEffect(() => {
    fetchStudents();
    if (activeTab === "invoices") fetchFees();
    if (activeTab === "receipts") fetchReceipts();
  }, [activeTab]);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/fees/pending`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setFees(response.data.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/receipts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setReceipts(response.data.data);
    } catch (error) {
      console.error("Error fetching receipts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/students`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle Invoice Creation
  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/fees`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      alert("Fee invoice created successfully");
      setShowForm(false);
      setFormData({ studentId: "", amount: "", dueDate: "", description: "" });
      fetchFees();
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  // Handle Cash Payment
  const handleCashStudentSelect = (e) => {
    const sId = e.target.value;
    setCashData({ ...cashData, studentId: sId });
    if (!sId) {
      setSelectedStudentSummary(null);
      return;
    }
    const student = students.find(s => s._id === sId || s.studentObjId === sId);
    if (student) {
      let total = 0, paid = 0;
      student.fees.forEach(f => {
        total += f.amount || 0;
        paid += f.amountPaid || 0;
      });
      setSelectedStudentSummary({ total, paid, due: total - paid, name: student.name, rollNumber: student.rollNumber });
    }
  };

  const handleCashSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        studentId: cashData.studentId, // This might need to be studentObjId depending on schema, backend expects user ID for studentId? Backend recordCashPayment uses Student.findOne({ user: studentId }). So we must pass user ID (_id from mapped array).
        amountPaid: Number(cashData.amountPaid)
      };
      
      const res = await axios.post(`${API_BASE_URL}/admin/fees/cash`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      
      alert("Cash payment recorded successfully!");
      // Optionally download receipt
      if (confirm("Download Receipt?")) {
         generateReceiptPDF(res.data.data, selectedStudentSummary);
      }
      
      setCashData({ studentId: "", amountPaid: "" });
      setSelectedStudentSummary(null);
      fetchStudents(); // Refresh fees data
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const downloadReceipt = (receipt) => {
    const student = students.find(s => (s._id === receipt.studentId._id) || (s.studentObjId === receipt.studentId._id));
    generateReceiptPDF(receipt, {
      name: receipt.studentId?.name || (student?.name || 'Unknown'),
      rollNumber: student?.rollNumber || 'N/A'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Fee Management</h1>
        <div className="space-x-3">
          <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            + Assign Fee Invoice
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6 border-b">
        <button onClick={() => setActiveTab("invoices")} className={`pb-2 px-2 ${activeTab === 'invoices' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-500'}`}>Pending Invoices</button>
        <button onClick={() => setActiveTab("receipts")} className={`pb-2 px-2 ${activeTab === 'receipts' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-500'}`}>All Receipts</button>
        <button onClick={() => setActiveTab("cash")} className={`pb-2 px-2 ${activeTab === 'cash' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-500'}`}>Record Cash Payment</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Assign New Fee Invoice</h2>
            <form onSubmit={handleInvoiceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Student</label>
                <select name="studentId" value={formData.studentId} onChange={handleInvoiceChange} required className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Select Student</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>{s.name} ({s.rollNumber})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Invoice Amount (Rs)</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleInvoiceChange} required className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInvoiceChange} required className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Assign Fee</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-300 py-2 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "invoices" && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? <div className="p-6 text-center">Loading...</div> : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Student</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Invoice Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Paid Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Due Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee._id} className="border-b">
                    <td className="px-6 py-3">{fee.studentId?.name || "N/A"}</td>
                    <td className="px-6 py-3">₹{fee.amount}</td>
                    <td className="px-6 py-3 text-green-600">₹{fee.amountPaid || 0}</td>
                    <td className="px-6 py-3">{new Date(fee.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${fee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {fee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "receipts" && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? <div className="p-6 text-center">Loading...</div> : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Receipt No.</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Student</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount Paid</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Mode</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt) => (
                  <tr key={receipt._id} className="border-b">
                    <td className="px-6 py-3 font-medium text-gray-700">{receipt.receiptNumber}</td>
                    <td className="px-6 py-3">{new Date(receipt.paymentDate).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{receipt.studentId?.name || "N/A"}</td>
                    <td className="px-6 py-3 font-bold text-green-600">₹{receipt.amountPaid}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${receipt.paymentMode === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {receipt.paymentMode}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button onClick={() => downloadReceipt(receipt)} className="text-blue-600 hover:underline">Download PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "cash" && (
        <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
          <h2 className="text-xl font-bold mb-6">Record Offline Cash Payment</h2>
          <form onSubmit={handleCashSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Select Student</label>
              <select value={cashData.studentId} onChange={handleCashStudentSelect} required className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Choose Student --</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>{s.name} ({s.rollNumber})</option>
                ))}
              </select>
            </div>

            {selectedStudentSummary && (
              <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center border border-blue-100">
                <div>
                  <p className="text-sm text-gray-500">Total Assigned Fee</p>
                  <p className="font-bold text-lg">₹{selectedStudentSummary.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Paid Till Now</p>
                  <p className="font-bold text-lg text-green-600">₹{selectedStudentSummary.paid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remaining Due</p>
                  <p className="font-bold text-lg text-red-600">₹{selectedStudentSummary.due}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Cash Amount Received (Rs)</label>
              <input 
                type="number" 
                max={selectedStudentSummary ? selectedStudentSummary.due : ""} 
                value={cashData.amountPaid} 
                onChange={(e) => setCashData({...cashData, amountPaid: e.target.value})} 
                required 
                disabled={!selectedStudentSummary || selectedStudentSummary.due === 0}
                className="w-full px-3 py-2 border rounded-lg text-lg font-semibold" 
                placeholder="e.g. 5000"
              />
              {selectedStudentSummary && selectedStudentSummary.due === 0 && (
                <p className="text-green-600 text-sm mt-1 font-medium">This student has fully paid their fees.</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={!selectedStudentSummary || selectedStudentSummary.due === 0 || !cashData.amountPaid}
              className="w-full bg-green-600 disabled:bg-gray-400 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg shadow-md"
            >
              Record Payment & Generate Receipt
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
