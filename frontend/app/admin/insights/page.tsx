"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MultiSelect from "@/components/Admin/MultiSelect";
import StatusBadge from "@/components/Admin/StatusBadge";
import WorkflowActions from "@/components/Admin/WorkflowActions";
import Modal from "@/components/Admin/Modal";

interface Insight {
  id: string;
  title: string;
  slug: string;
  type: string;
  featured: boolean;
  trending: boolean;
  gated: boolean;
  publishedAt: string;
}

export default function InsightsAdminPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [experts, setExperts] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    type: "Article",
    content: "",
    excerpt: "",
    image: "",
    authorId: "",
    readTime: 5,
    featured: false,
    trending: false,
    gated: false,
    downloadUrl: "",
    topics: "",
    regions: "",
    industryIds: [] as string[],
    serviceIds: [] as string[],
    status: "draft" as string,
    scheduledAt: "" as string
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
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
      const [insightsRes, expertsRes, industriesRes, servicesRes] = await Promise.all([
        fetch("/api/insights"),
        fetch("/api/experts"),
        fetch("/api/industries"),
        fetch("/api/services")
      ]);
      setInsights(await insightsRes.json());
      setExperts(await expertsRes.json());
      setIndustries(await industriesRes.json());
      setServices(await servicesRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      topics: JSON.stringify(formData.topics.split(",").map(t => t.trim()).filter(Boolean)),
      regions: JSON.stringify(formData.regions.split(",").map(r => r.trim()).filter(Boolean)),
      readTime: parseInt(formData.readTime.toString())
    };

    try {
      const url = editingId ? `/api/insights?id=${editingId}` : "/api/insights";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        fetchData();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving insight:", error);
    }
  };

  const handleEdit = (insight: any) => {
    setEditingId(insight.id);
    setFormData({
      title: insight.title,
      slug: insight.slug,
      type: insight.type,
      content: insight.content,
      excerpt: insight.excerpt,
      image: insight.image || "",
      authorId: insight.authorId,
      readTime: insight.readTime,
      featured: insight.featured,
      trending: insight.trending,
      gated: insight.gated,
      downloadUrl: insight.downloadUrl || "",
      topics: JSON.parse(insight.topics || "[]").join(", "),
      regions: JSON.parse(insight.regions || "[]").join(", "),
      industryIds: insight.industries?.map((i: any) => i.id) || [],
      serviceIds: insight.services?.map((s: any) => s.id) || [],
      status: insight.status || "draft",
      scheduledAt: insight.scheduledAt ? new Date(insight.scheduledAt).toISOString().slice(0, 16) : ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this insight?")) return;
    
    try {
      await fetch(`/api/insights?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error deleting insight:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      type: "Article",
      content: "",
      excerpt: "",
      image: "",
      authorId: "",
      readTime: 5,
      featured: false,
      trending: false,
      gated: false,
      downloadUrl: "",
      topics: "",
      regions: "",
      industryIds: [],
      serviceIds: [],
      status: "draft",
      scheduledAt: ""
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
              <h1 className="text-3xl font-bold">Insights Management</h1>
              <p className="text-gray-600 mt-1">Manage articles, whitepapers, and thought leadership</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              {showForm ? "Cancel" : "+ Add Insight"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <Modal isOpen={showForm} onClose={resetForm} title={editingId ? "Edit Insight" : "New Insight"}>
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., The Future of Banking: AI-Powered Customer Experience"
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="e.g., future-of-banking-ai-customer-experience"
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  >
                    <option value="Article">Article</option>
                    <option value="Whitepaper">Whitepaper</option>
                    <option value="Case Study">Case Study</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author *</label>
                  <select
                    required
                    value={formData.authorId}
                    onChange={(e) => setFormData({...formData, authorId: e.target.value})}
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  >
                    <option value="">Select Author</option>
                    {experts.map(expert => (
                      <option key={expert.id} value={expert.id}>{expert.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Read Time (min)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: parseInt(e.target.value)})}
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="e.g., Discover how artificial intelligence is revolutionizing customer service in the banking sector..."
                  className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="e.g., The banking industry is undergoing a profound transformation driven by artificial intelligence...\n\nKey trends include:\n- Personalized customer experiences\n- Automated fraud detection\n- Predictive analytics"
                  className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Topics (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.topics}
                    onChange={(e) => setFormData({...formData, topics: e.target.value})}
                    placeholder="AI, Digital Transformation, Innovation"
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Regions (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.regions}
                    onChange={(e) => setFormData({...formData, regions: e.target.value})}
                    placeholder="North America, Europe, Asia"
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
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
                <div>
                  <label className="block text-sm font-medium mb-2">Download URL (if gated)</label>
                  <input
                    type="text"
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                    placeholder="e.g., https://example.com/whitepaper.pdf"
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.trending}
                    onChange={(e) => setFormData({...formData, trending: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Trending</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.gated}
                    onChange={(e) => setFormData({...formData, gated: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Gated Content</span>
                </label>
              </div>

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

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Publishing Workflow</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="review">Review</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  {formData.status === 'scheduled' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Schedule Date & Time</label>
                      <input
                        type="datetime-local"
                        value={formData.scheduledAt}
                        onChange={(e) => setFormData({...formData, scheduledAt: e.target.value})}
                        className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  {editingId ? "Update Insight" : "Create Insight"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border px-6 py-2 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
        </Modal>

        <div className="bg-white rounded border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">All Insights ({insights.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">Image</th>
                    <th className="text-left p-4 text-sm font-semibold">Title</th>
                    <th className="text-left p-4 text-sm font-semibold">Type</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                    <th className="text-left p-4 text-sm font-semibold">Published</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {insights.map((insight: any) => (
                    <tr key={insight.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        {insight.image ? (
                          <img src={insight.image} alt={insight.title} className="h-12 w-20 object-cover rounded" />
                        ) : (
                          <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No image</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{insight.title}</div>
                        <div className="text-sm text-gray-600">{insight.slug}</div>
                      </td>
                      <td className="p-4 text-sm">{insight.type}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <StatusBadge status={insight.status || 'published'} />
                          {insight.featured && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Featured</span>
                          )}
                          {insight.trending && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">Trending</span>
                          )}
                          {insight.gated && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Gated</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(insight.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleEdit(insight)}
                          className="text-primary hover:underline text-sm mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(insight.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Delete
                        </button>
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
