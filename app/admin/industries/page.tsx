"use client";
import { useState, useEffect } from "react";
import MultiSelect from "@/components/Admin/MultiSelect";

interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  overview: string;
  challenges: string;
  trends: string;
  featured: boolean;
  image?: string;
}

interface Service {
  id: string;
  name: string;
}

interface Expert {
  id: string;
  name: string;
}

interface Insight {
  id: string;
  title: string;
}

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    overview: "",
    challenges: "[]",
    trends: "[]",
    featured: false,
    image: "",
    serviceIds: [] as string[],
    expertIds: [] as string[],
    insightIds: [] as string[]
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
      console.log('Upload response:', data);
      if (data.url) {
        setFormData(prev => ({...prev, image: data.url}));
        console.log('Image URL set:', data.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [industriesRes, servicesRes, expertsRes, insightsRes] = await Promise.all([
      fetch('/api/industries').then(r => r.json()),
      fetch('/api/services').then(r => r.json()),
      fetch('/api/experts').then(r => r.json()),
      fetch('/api/insights').then(r => r.json())
    ]);
    setIndustries(industriesRes);
    setServices(servicesRes);
    setExperts(expertsRes);
    setInsights(insightsRes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      challenges: formData.challenges,
      trends: formData.trends
    };

    console.log('Submitting industry with image:', payload.image);

    try {
      if (editingId) {
        await fetch('/api/industries', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingId })
        });
        alert("Industry updated successfully!");
      } else {
        await fetch('/api/industries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        alert("Industry created successfully!");
      }
      resetForm();
      loadData();
    } catch (error) {
      alert("Error saving industry");
    }
  };

  const handleEdit = (industry: any) => {
    setFormData({
      name: industry.name,
      slug: industry.slug,
      description: industry.description,
      overview: industry.overview,
      challenges: industry.challenges || "[]",
      trends: industry.trends || "[]",
      featured: industry.featured,
      image: industry.image || "",
      serviceIds: industry.services?.map((s: any) => s.id) || [],
      expertIds: industry.experts?.map((e: any) => e.id) || [],
      insightIds: industry.insights?.map((i: any) => i.id) || []
    });
    setEditingId(industry.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this industry?")) {
      await fetch(`/api/industries?id=${id}`, { method: 'DELETE' });
      alert("Industry deleted successfully!");
      loadData();
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", 
      slug: "", 
      description: "", 
      overview: "", 
      challenges: "[]",
      trends: "[]",
      featured: false,
      image: "",
      serviceIds: [],
      expertIds: [],
      insightIds: []
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Industries Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            {showForm ? "Cancel" : "+ Add Industry"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Industry" : "Create New Industry"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Overview</label>
                <textarea
                  rows={4}
                  value={formData.overview}
                  onChange={(e) => setFormData({...formData, overview: e.target.value})}
                  className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Industry Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                />
                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="h-32 w-auto rounded border" />
                    <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Featured Industry</label>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Cross-Linking</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <MultiSelect
                    label="Related Services"
                    options={services}
                    selected={formData.serviceIds}
                    onChange={(ids) => setFormData({...formData, serviceIds: ids})}
                  />
                  <MultiSelect
                    label="Related Experts"
                    options={experts}
                    selected={formData.expertIds}
                    onChange={(ids) => setFormData({...formData, expertIds: ids})}
                  />
                  <MultiSelect
                    label="Related Insights"
                    options={insights}
                    selected={formData.insightIds}
                    onChange={(ids) => setFormData({...formData, insightIds: ids})}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                  {editingId ? "Update" : "Create"}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Image</th>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Slug</th>
                <th className="text-left p-4 font-semibold">Featured</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {industries.map((industry) => (
                <tr key={industry.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {industry.image ? (
                      <img src={industry.image} alt={industry.name} className="h-12 w-20 object-cover rounded" />
                    ) : (
                      <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No image</div>
                    )}
                  </td>
                  <td className="p-4">{industry.name}</td>
                  <td className="p-4 text-gray-600">{industry.slug}</td>
                  <td className="p-4">
                    {industry.featured && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Featured</span>}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(industry)} className="text-primary hover:underline mr-4">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(industry.id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}