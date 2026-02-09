"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  source: string;
  score: number;
  jobTitle: string | null;
  createdAt: string;
}

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === "all" || lead.source === filter;
    const matchesScore = scoreFilter === "all" || 
      (scoreFilter === "hot" && lead.score >= 70) ||
      (scoreFilter === "warm" && lead.score >= 40 && lead.score < 70) ||
      (scoreFilter === "cold" && lead.score < 40);
    return matchesSearch && matchesFilter && matchesScore;
  });

  const paginatedLeads = filteredLeads.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Company", "Phone", "Source", "Date"];
    const rows = filteredLeads.map(lead => [
      lead.name,
      lead.email,
      lead.company || "",
      lead.phone || "",
      lead.source,
      new Date(lead.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const sourceStats = {
    total: leads.length,
    contact_form: leads.filter(l => l.source === "contact_form").length,
    newsletter: leads.filter(l => l.source === "newsletter").length,
    gated_content: leads.filter(l => l.source === "gated_content").length,
    hot: leads.filter(l => l.score >= 70).length,
    warm: leads.filter(l => l.score >= 40 && l.score < 70).length,
    cold: leads.filter(l => l.score < 40).length
  };

  return (
    <div>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Lead Management</h1>
              <p className="text-gray-600 mt-1">View and manage contact form submissions</p>
            </div>
            <button onClick={exportToCSV} className="border border-primary text-primary px-6 py-2 rounded hover:bg-primary hover:text-white transition-colors">
              Export to CSV
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded border p-6">
            <div className="text-sm text-gray-600 mb-1">Total Leads</div>
            <div className="text-3xl font-bold">{sourceStats.total}</div>
          </div>
          <div className="bg-white rounded border p-6">
            <div className="text-sm text-gray-600 mb-1">🔥 Hot Leads</div>
            <div className="text-3xl font-bold text-red-600">{sourceStats.hot}</div>
            <div className="text-xs text-gray-500 mt-1">Score ≥ 70</div>
          </div>
          <div className="bg-white rounded border p-6">
            <div className="text-sm text-gray-600 mb-1">⚡ Warm Leads</div>
            <div className="text-3xl font-bold text-orange-600">{sourceStats.warm}</div>
            <div className="text-xs text-gray-500 mt-1">Score 40-69</div>
          </div>
          <div className="bg-white rounded border p-6">
            <div className="text-sm text-gray-600 mb-1">❄️ Cold Leads</div>
            <div className="text-3xl font-bold text-blue-600">{sourceStats.cold}</div>
            <div className="text-xs text-gray-500 mt-1">Score &lt; 40</div>
          </div>
        </div>

        <div className="bg-white rounded border mb-6 p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, email, or company..." className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Source</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-3 border rounded focus:border-primary focus:outline-none">
                <option value="all">All Sources</option>
                <option value="contact_form">Contact Form</option>
                <option value="newsletter">Newsletter</option>
                <option value="gated_content">Gated Content</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Score</label>
              <select value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)} className="w-full p-3 border rounded focus:border-primary focus:outline-none">
                <option value="all">All Scores</option>
                <option value="hot">🔥 Hot (≥70)</option>
                <option value="warm">⚡ Warm (40-69)</option>
                <option value="cold">❄️ Cold (&lt;40)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">All Leads ({filteredLeads.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">Contact</th>
                    <th className="text-left p-4 text-sm font-semibold">Message</th>
                    <th className="text-left p-4 text-sm font-semibold">Company</th>
                    <th className="text-left p-4 text-sm font-semibold">Source</th>
                    <th className="text-left p-4 text-sm font-semibold">Date</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-gray-600">{lead.email}</div>
                        {lead.phone && <div className="text-sm text-gray-600">{lead.phone}</div>}
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-700 max-w-md">
                          {lead.message ? (
                            <div className="line-clamp-2" title={lead.message}>{lead.message}</div>
                          ) : (
                            <span className="text-gray-400">No message</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        <div>{lead.company || "-"}</div>
                        {lead.jobTitle && <div className="text-xs text-gray-500">{lead.jobTitle}</div>}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">{lead.source.replace("_", " ")}</span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <a href={`mailto:${lead.email}`} className="text-primary hover:underline text-sm">Email</a>
                      </td>
                    </tr>
                  ))}}
                </tbody>
              </table>
            </div>
          )}

          {filteredLeads.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-500">No leads found</div>
          )}

          {totalPages > 1 && (
            <div className="p-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, filteredLeads.length)} of {filteredLeads.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
