"use client";
import { useState, useEffect } from "react";

export default function MediaAdminPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    type: "Press Release",
    content: "",
    excerpt: "",
    featured: false,
    attachments: ""
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      setMedia(await res.json());
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
      attachments: JSON.stringify(formData.attachments.split("\n").filter(Boolean))
    };

    try {
      const url = editingId ? `/api/media?id=${editingId}` : "/api/media";
      const method = editingId ? "PUT" : "POST";
      
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      fetchMedia();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      slug: item.slug,
      type: item.type,
      content: item.content,
      excerpt: item.excerpt,
      featured: item.featured,
      attachments: JSON.parse(item.attachments || "[]").join("\n")
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this media item?")) return;
    await fetch(`/api/media?id=${id}`, { method: "DELETE" });
    fetchMedia();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      type: "Press Release",
      content: "",
      excerpt: "",
      featured: false,
      attachments: ""
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
              <h1 className="text-3xl font-bold">Media Management</h1>
              <p className="text-gray-600 mt-1">Manage press releases and news</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">
              {showForm ? "Cancel" : "+ Add Media"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {showForm && (
          <div className="bg-white rounded border mb-8 p-6">
            <h2 className="text-xl font-semibold mb-6">{editingId ? "Edit Media" : "New Media"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type *</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none">
                  <option value="Press Release">Press Release</option>
                  <option value="News">News</option>
                  <option value="Announcement">Announcement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <textarea required rows={2} value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea required rows={8} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Attachments (URLs, one per line)</label>
                <textarea rows={3} value={formData.attachments} onChange={(e) => setFormData({...formData, attachments: e.target.value})} placeholder="/downloads/press-release.pdf" className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4" />
                <span className="text-sm font-medium">Featured Media</span>
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
            <h2 className="text-lg font-semibold">All Media ({media.length})</h2>
          </div>
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">Title</th>
                    <th className="text-left p-4 text-sm font-semibold">Type</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                    <th className="text-left p-4 text-sm font-semibold">Published</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {media.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.excerpt}</div>
                      </td>
                      <td className="p-4 text-sm">{item.type}</td>
                      <td className="p-4">
                        {item.featured && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Featured</span>}
                      </td>
                      <td className="p-4 text-sm text-gray-600">{new Date(item.publishedAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleEdit(item)} className="text-primary hover:underline text-sm mr-4">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-sm">Delete</button>
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
