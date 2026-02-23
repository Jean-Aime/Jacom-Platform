"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  source: string;
  metadata: string;
  notes?: string;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    apiClient.getLeads()
      .then((data: any) => setLeads(data))
      .catch(err => {
        // Suppress auth errors during prefetch
        if (err.message !== 'Invalid session') {
          console.error(err);
        }
      })
      .finally(() => setLoading(false));
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await apiClient.updateLead(id, { source: status });
      fetchLeads();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteLead = (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    apiClient.deleteLead(id)
      .then(() => fetchLeads())
      .catch(err => console.error(err));
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      new: "bg-red-100 text-red-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Contact Inquiries</h2>
          <p className="text-gray-500 mt-1">Manage customer inquiries from contact form</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase text-left">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase text-left">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase text-left">Inquiry Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase text-left">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase text-left">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leads.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No inquiries found</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-gray-900">{lead.name}</div>
                      {JSON.parse(lead.metadata || '{}').furigana && <div className="text-xs text-gray-500">{JSON.parse(lead.metadata || '{}').furigana}</div>}
                      <div className="text-xs text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{lead.company || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-bold uppercase">
                        {JSON.parse(lead.metadata || '{}').inquiryType || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.source}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs font-bold uppercase border-none ${getStatusColor(lead.source)}`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => setSelectedLead(lead)} className="text-primary hover:underline text-sm font-bold">View</button>
                      <button onClick={() => deleteLead(lead.id)} className="text-red-600 hover:underline text-sm font-bold">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedLead(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Inquiry Details</h3>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">Name</label>
                  <p className="font-bold text-gray-900">{selectedLead.name}</p>
                  {JSON.parse(selectedLead.metadata || '{}').furigana && <p className="text-sm text-gray-500">{JSON.parse(selectedLead.metadata || '{}').furigana}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">Company</label>
                  <p className="font-bold text-gray-900">{selectedLead.company || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">Email</label>
                  <p className="font-bold text-gray-900">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">Phone</label>
                  <p className="font-bold text-gray-900">{selectedLead.phone || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">Inquiry Type</label>
                  <p className="font-bold text-gray-900">{JSON.parse(selectedLead.metadata || '{}').inquiryType || "General"}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">Status</label>
                  <p className="font-bold text-gray-900">{selectedLead.source}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Message</label>
                <p className="mt-1 p-3 bg-gray-50 rounded text-gray-900">{selectedLead.message || "No message"}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Internal Notes</label>
                <textarea
                  defaultValue={selectedLead.notes || ""}
                  placeholder="Add internal notes..."
                  className="w-full mt-1 p-3 border rounded bg-white text-gray-900"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setSelectedLead(null)} className="flex-1 px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 text-gray-900">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
