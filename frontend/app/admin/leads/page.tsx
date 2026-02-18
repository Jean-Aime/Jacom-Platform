"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  status: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "all", region: "all" });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    apiClient.getLeads()
      .then((data: any) => setLeads(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const updateLeadStatus = (id: number, status: string) => {
    apiClient.updateLead(id.toString(), { status })
      .then(() => fetchLeads())
      .catch(err => console.error(err));
  };

  const deleteLead = (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    apiClient.deleteLead(id.toString())
      .then(() => fetchLeads())
      .catch(err => console.error(err));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-900  tracking-tight">Leads & Inquiry Management</h2>
          <p className="text-gray-500 mt-1">Centralized tracking for professional inquiries from Japan, Nepal, and Ethiopia.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Create Lead
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white  p-4 rounded-xl border border-blue-100  shadow-sm flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Status</label>
            <select 
              value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
              className="w-full border-gray-200    rounded-lg text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Region</label>
            <select 
              value={filter.region}
              onChange={(e) => setFilter({...filter, region: e.target.value})}
              className="w-full border-gray-200    rounded-lg text-sm"
            >
              <option value="all">Global View</option>
              <option value="japan">Japan</option>
              <option value="nepal">Nepal</option>
              <option value="ethiopia">Ethiopia</option>
            </select>
          </div>
          <button className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-100  transition-colors mt-4">
            Apply Filters
          </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white  rounded-xl border border-blue-100  shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading leads...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 /50 border-b border-blue-100 ">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Lead Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 ">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No leads found</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50  transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm ">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium ">{lead.company || "N/A"}</td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-bold px-2 py-1 rounded uppercase border-none"
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm ">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deleteLead(lead.id)}
                        className="text-red-600 hover:underline text-sm font-bold"
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
    </div>
  );
}
