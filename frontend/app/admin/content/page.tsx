"use client";
import { useState, useEffect } from "react";

export default function ContentAdminPage() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ key: "", page: "", section: "", type: "text", content: "", image: "", order: 0 });

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const res = await fetch("/api/content");
      setBlocks(await res.json());
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/content?id=${editingId}` : "/api/content";
      const method = editingId ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      fetchBlocks();
      resetForm();
    } catch (error) {
      alert("Error saving content");
    }
  };

  const handleEdit = (block: any) => {
    setEditingId(block.id);
    setFormData({ key: block.key, page: block.page, section: block.section, type: block.type, content: block.content, image: block.image || "", order: block.order });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/content?id=${id}`, { method: "DELETE" });
    fetchBlocks();
  };

  const resetForm = () => {
    setFormData({ key: "", page: "", section: "", type: "text", content: "", image: "", order: 0 });
    setEditingId(null);
  };

  const filteredBlocks = blocks.filter(b => 
    (selectedPage === "all" || b.page === selectedPage) &&
    (searchQuery === "" || b.key.toLowerCase().includes(searchQuery.toLowerCase()) || b.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pages = ["all", ...new Set(blocks.map(b => b.page))];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">Content Editor</h2>
          <p className="text-xs text-gray-500 mt-1">Manage website content</p>
        </div>
        
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="p-4 border-b">
          <label className="text-xs font-semibold text-gray-600 uppercase mb-2 block">Filter by Page</label>
          <div className="space-y-1">
            {pages.map(page => (
              <button
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPage === page ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="capitalize">{page}</span>
                <span className="float-right text-xs opacity-75">
                  {page === "all" ? blocks.length : blocks.filter(b => b.page === page).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <label className="text-xs font-semibold text-gray-600 uppercase mb-2 block">Quick Stats</label>
          <div className="space-y-2">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{blocks.length}</div>
              <div className="text-xs text-blue-600">Total Blocks</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{new Set(blocks.map(b => b.page)).size}</div>
              <div className="text-xs text-green-600">Pages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingId ? "Edit Content Block" : "Content Blocks"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredBlocks.length} {filteredBlocks.length === 1 ? "item" : "items"} found
            </p>
          </div>
          {editingId && (
            <button onClick={resetForm} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              ✕ Cancel Edit
            </button>
          )}
        </div>

        <div className="flex-1 overflow-auto p-8">
          {editingId ? (
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Key</label>
                    <input type="text" required value={formData.key} onChange={(e) => setFormData({...formData, key: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Page</label>
                    <select required value={formData.page} onChange={(e) => setFormData({...formData, page: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select</option>
                      <option value="home">Home</option>
                      <option value="about">About</option>
                      <option value="contact">Contact</option>
                      <option value="digital">Digital</option>
                      <option value="global">Global</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                    <input type="text" required value={formData.section} onChange={(e) => setFormData({...formData, section: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="text">Text</option>
                      <option value="json">JSON</option>
                      <option value="html">HTML</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea required rows={10} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const fd = new FormData();
                      fd.append('file', file);
                      const res = await fetch('/api/upload', { method: 'POST', body: fd });
                      const data = await res.json();
                      setFormData(prev => ({ ...prev, image: data.url }));
                    }}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {formData.image && <img src={formData.image} alt="" className="mt-2 w-32 h-32 object-cover rounded" />}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Save Changes
                  </button>
                  <button type="button" onClick={resetForm} className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-4">
                {filteredBlocks.map((block) => (
                  <div key={block.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="p-6 flex items-start gap-4">
                      {block.image && <img src={block.image} alt="" className="w-16 h-16 object-cover rounded" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{block.key}</h3>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-medium">{block.type}</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded font-medium capitalize">{block.page}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{block.content}</p>
                        <div className="mt-2 text-xs text-gray-400">Section: {block.section} • Order: {block.order}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(block)} className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(block.id)} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
