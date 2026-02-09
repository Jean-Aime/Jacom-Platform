"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MultiSelect from "@/components/Admin/MultiSelect";
import Modal from "@/components/Admin/Modal";

export default function ExpertsAdminPage() {
  const [experts, setExperts] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    role: "",
    bio: "",
    image: "",
    expertise: "",
    locations: "",
    email: "",
    linkedin: "",
    featured: false,
    industryIds: [] as string[],
    serviceIds: [] as string[]
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setFormData(prev => ({...prev, image: data.url}));
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expertsRes, industriesRes, servicesRes] = await Promise.all([
        fetch("/api/experts").then(r => r.json()),
        fetch("/api/industries").then(r => r.json()),
        fetch("/api/services").then(r => r.json())
      ]);
      setExperts(expertsRes);
      setIndustries(industriesRes);
      setServices(servicesRes);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingId ? `/api/experts?id=${editingId}` : "/api/experts";
      const method = editingId ? "PUT" : "POST";
      
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      await fetchData();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expert: any) => {
    setEditingId(expert.id);
    setFormData({
      name: expert.name,
      slug: expert.slug,
      role: expert.role,
      bio: expert.bio,
      image: expert.image || "",
      expertise: expert.expertise || "",
      locations: expert.locations || "",
      email: expert.email || "",
      linkedin: expert.linkedin || "",
      featured: expert.featured,
      industryIds: expert.industries?.map((i: any) => i.id) || [],
      serviceIds: expert.services?.map((s: any) => s.id) || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expert?")) return;
    await fetch(`/api/experts?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      role: "",
      bio: "",
      image: "",
      expertise: "",
      locations: "",
      email: "",
      linkedin: "",
      featured: false,
      industryIds: [],
      serviceIds: []
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
              <h1 className="text-3xl font-bold">Experts Management</h1>
              <p className="text-gray-600 mt-1">Manage team members and expert profiles</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">
              {showForm ? "Cancel" : "+ Add Expert"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <Modal isOpen={showForm} onClose={resetForm} title={editingId ? "Edit Expert" : "New Expert"}>
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Sarah Chen" className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="e.g., sarah-chen" className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <input type="text" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="e.g., Senior Partner, Digital Transformation" className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio *</label>
                <textarea required rows={4} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} placeholder="e.g., Sarah is a seasoned consultant with over 15 years of experience in digital transformation..." className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Profile Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="w-full p-2 border rounded focus:border-primary focus:outline-none" />
                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="h-32 w-32 rounded-full object-cover border" />
                    <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>
                  </div>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Expertise (comma-separated)</label>
                  <input type="text" value={formData.expertise} onChange={(e) => setFormData({...formData, expertise: e.target.value})} placeholder="Strategy, Digital, AI" className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Locations (comma-separated)</label>
                  <input type="text" value={formData.locations} onChange={(e) => setFormData({...formData, locations: e.target.value})} placeholder="New York, London" className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="e.g., sarah.chen@jas.com" className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input type="url" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="e.g., https://linkedin.com/in/sarahchen" className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4" />
                <span className="text-sm font-medium">Featured Expert</span>
              </label>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Cross-Linking</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <MultiSelect
                    label="Related Industries"
                    options={industries}
                    selected={formData.industryIds}
                    onChange={(ids) => setFormData({...formData, industryIds: ids})}
                  />
                  <MultiSelect
                    label="Related Services"
                    options={services}
                    selected={formData.serviceIds}
                    onChange={(ids) => setFormData({...formData, serviceIds: ids})}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">{editingId ? "Update" : "Create"}</button>
                <button type="button" onClick={resetForm} className="border px-6 py-2 rounded hover:bg-gray-50">Cancel</button>
              </div>
            </form>
        </Modal>

        <div className="bg-white rounded border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">All Experts ({experts.length})</h2>
          </div>
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">Image</th>
                    <th className="text-left p-4 text-sm font-semibold">Name</th>
                    <th className="text-left p-4 text-sm font-semibold">Role</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {experts.map((expert) => (
                    <tr key={expert.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        {expert.image ? (
                          <img src={expert.image} alt={expert.name} className="h-12 w-12 rounded-full object-cover" />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-400">No img</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{expert.name}</div>
                        <div className="text-sm text-gray-600">{expert.slug}</div>
                      </td>
                      <td className="p-4 text-sm">{expert.role}</td>
                      <td className="p-4">
                        {expert.featured && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Featured</span>}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleEdit(expert)} className="text-primary hover:underline text-sm mr-4">Edit</button>
                        <button onClick={() => handleDelete(expert.id)} className="text-red-600 hover:underline text-sm">Delete</button>
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
