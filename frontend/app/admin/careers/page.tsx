"use client";
import { useState, useEffect } from "react";

export default function CareersAdminPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    department: "",
    location: "",
    type: "Full-time",
    experience: "Mid-level",
    description: "",
    requirements: "",
    benefits: "",
    featured: false,
    expiresAt: ""
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await fetch("/api/careers");
      setCareers(await res.json());
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      requirements: JSON.stringify(formData.requirements.split("\n").filter(Boolean)),
      benefits: JSON.stringify(formData.benefits.split("\n").filter(Boolean)),
      expiresAt: new Date(formData.expiresAt).toISOString()
    };

    try {
      const url = editingId ? `/api/careers?id=${editingId}` : "/api/careers";
      const method = editingId ? "PUT" : "POST";
      
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      fetchCareers();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (career: any) => {
    setEditingId(career.id);
    setFormData({
      title: career.title,
      slug: career.slug,
      department: career.department,
      location: career.location,
      type: career.type,
      experience: career.experience,
      description: career.description,
      requirements: JSON.parse(career.requirements || "[]").join("\n"),
      benefits: JSON.parse(career.benefits || "[]").join("\n"),
      featured: career.featured,
      expiresAt: new Date(career.expiresAt).toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    await fetch(`/api/careers?id=${id}`, { method: "DELETE" });
    fetchCareers();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      department: "",
      location: "",
      type: "Full-time",
      experience: "Mid-level",
      description: "",
      requirements: "",
      benefits: "",
      featured: false,
      expiresAt: ""
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Careers Management</h1>
              <p className="text-gray-600 mt-1">Manage job postings and applications</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">
              {showForm ? "Cancel" : "+ Add Job"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {showForm && (
          <div className="bg-white rounded border mb-8 p-6">
            <h2 className="text-xl font-semibold mb-6">{editingId ? "Edit Job" : "New Job"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Department *</label>
                  <input type="text" required value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Type *</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none">
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience *</label>
                  <select value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none">
                    <option value="Entry">Entry</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expires At *</label>
                  <input type="date" required value={formData.expiresAt} onChange={(e) => setFormData({...formData, expiresAt: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Requirements (one per line)</label>
                  <textarea rows={4} value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Benefits (one per line)</label>
                  <textarea rows={4} value={formData.benefits} onChange={(e) => setFormData({...formData, benefits: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4" />
                <span className="text-sm font-medium">Featured Job</span>
              </label>
              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">{editingId ? "Update" : "Create"}</button>
                <button type="button" onClick={resetForm} className="border px-6 py-2 rounded hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">All Jobs ({careers.length})</h2>
          </div>
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">Job Title</th>
                    <th className="text-left p-4 text-sm font-semibold">Location</th>
                    <th className="text-left p-4 text-sm font-semibold">Type</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {careers.map((career) => (
                    <tr key={career.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{career.title}</div>
                        <div className="text-sm text-gray-600">{career.department}</div>
                      </td>
                      <td className="p-4 text-sm">{career.location}</td>
                      <td className="p-4 text-sm">{career.type}</td>
                      <td className="p-4">
                        {career.featured && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Featured</span>}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleEdit(career)} className="text-primary hover:underline text-sm mr-4">Edit</button>
                        <button onClick={() => handleDelete(career.id)} className="text-red-600 hover:underline text-sm">Delete</button>
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
