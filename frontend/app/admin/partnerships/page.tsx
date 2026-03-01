"use client";
import { useState, useEffect } from "react";
import { Upload, Trash2, Edit2, Plus } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  displayOrder: number;
  status: string;
}

export default function PartnershipsPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    displayOrder: 0,
    status: "active"
  });

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await fetch(`${API_BASE}/partners`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setPartners(data);
      }
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `${API_BASE}/partners/${editingId}` : `${API_BASE}/partners`;
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchPartners();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save partner:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this partner logo?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/partners/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (res.ok) fetchPartners();
    } catch (error) {
      console.error('Failed to delete partner:', error);
    }
  };

  const handleEdit = (partner: Partner) => {
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website || "",
      displayOrder: partner.displayOrder,
      status: partner.status
    });
    setEditingId(partner.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", logo: "", website: "", displayOrder: 0, status: "active" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('folder', 'partners');

    try {
      const res = await fetch(`${API_BASE}/upload.php`, {
        method: 'POST',
        credentials: 'include',
        body: uploadFormData
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, logo: data.url }));
        alert('Image uploaded successfully!');
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + error);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Partner Logos</h2>
          <p className="text-gray-500">Manage partner logos displayed on homepage</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Partner Logo
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Partner Logo</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Partner Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Logo Image *</label>
              <div className="flex gap-4 items-start">
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="flex-1 px-4 py-2 border rounded-lg"
                  placeholder="Image URL or upload below"
                  required
                />
                <label className="bg-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              {formData.logo && (
                <img src={formData.logo} alt="Preview" className="mt-2 h-16 object-contain border rounded" />
              )}
            </div>

            <div className="flex gap-3">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold">
                {editingId ? 'Update' : 'Create'} Partner
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-200 px-6 py-2 rounded-lg font-semibold">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-xs font-bold text-gray-500 uppercase">
              <th className="px-6 py-4">Logo</th>
              <th className="px-6 py-4">Partner Name</th>
              <th className="px-6 py-4">Website</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : partners.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No partners yet</td></tr>
            ) : (
              partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4">
                    <img src={partner.logo} alt={partner.name} className="h-10 w-auto object-contain" />
                  </td>
                  <td className="px-6 py-4 font-semibold">{partner.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {partner.website ? (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Link
                      </a>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{partner.displayOrder}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                      partner.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(partner)} className="text-blue-600 hover:text-blue-800 mr-3">
                      <Edit2 className="w-4 h-4 inline" />
                    </button>
                    <button onClick={() => handleDelete(partner.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
