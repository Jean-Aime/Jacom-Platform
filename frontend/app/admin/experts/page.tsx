"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

interface Expert {
  id: string;
  name: string;
  slug: string;
  role: string;
  type?: string;
  title?: string;
  bio: string;
  expertise: string;
  locations?: string;
  email?: string;
  image?: string;
  linkedin?: string;
  featured?: boolean;
  status?: string;
}

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExpert, setEditingExpert] = useState<Expert | null>(null);
  const [formData, setFormData] = useState<Partial<Expert>>({});

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };

  const loadExperts = () => {
    apiClient.getExperts()
      .then((data: any) => setExperts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadExperts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExpert) {
        await apiClient.updateExpert(editingExpert.id, formData);
      } else {
        await apiClient.createExpert(formData);
      }
      setShowModal(false);
      setFormData({});
      setEditingExpert(null);
      loadExperts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this expert?')) {
      await apiClient.deleteExpert(id);
      loadExperts();
    }
  };

  const openModal = (expert?: Expert) => {
    if (expert) {
      setEditingExpert(expert);
      setFormData(expert);
    } else {
      setEditingExpert(null);
      setFormData({});
    }
    setShowModal(true);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight ">Expert Directory</h2>
          <p className="text-gray-500">Manage and assign your global network of professional consultants.</p>
        </div>
        <button onClick={() => openModal()} className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Expert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white  p-6 rounded-xl border border-gray-200  shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-primary rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Experts</p><h3 className="text-2xl font-bold ">{experts.length}</h3></div>
        </div>
        <div className="bg-white  p-6 rounded-xl border border-gray-200  shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          </div>
          <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Projects</p><h3 className="text-2xl font-bold ">84</h3></div>
        </div>
      </div>

      <div className="bg-white  rounded-xl border border-gray-200  overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading experts...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 /50 border-b border-gray-200 ">
              <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Expertise</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100  text-sm">
              {experts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No experts found</td>
                </tr>
              ) : (
                experts.map((expert) => (
                  <tr key={expert.id} className="hover:bg-gray-50  transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          {expert.image && <img src={expert.image} alt={expert.name} className="w-full h-full object-cover"/>}
                        </div>
                        <div>
                          <p className="font-bold ">{expert.name}</p>
                          <p className="text-xs text-gray-500">{expert.locations}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold ">{expert.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${expert.type === 'team' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{expert.type || 'expert'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-primary text-xs font-bold rounded uppercase">{expert.expertise?.split(',')[0]}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${expert.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>{expert.status || 'draft'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openModal(expert)} className="text-primary hover:bg-red-50 p-1 rounded-lg mr-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(expert.id)} className="text-red-600 hover:bg-red-50 p-1 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">{editingExpert ? 'Edit Expert' : 'Add Expert'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">Name</label>
                <input type="text" required value={formData.name || ''} onChange={e => handleNameChange(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Slug</label>
                <input type="text" required value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Role</label>
                <input type="text" required value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Type</label>
                <select value={formData.type || 'expert'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  <option value="expert">Expert</option>
                  <option value="team">Team Member</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Bio</label>
                <textarea required value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Expertise (comma-separated)</label>
                <input type="text" required value={formData.expertise || ''} onChange={e => setFormData({...formData, expertise: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Locations</label>
                <input type="text" value={formData.locations || ''} onChange={e => setFormData({...formData, locations: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Image URL</label>
                <input type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">LinkedIn</label>
                <input type="text" value={formData.linkedin || ''} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Featured</label>
                  <select value={formData.featured ? '1' : '0'} onChange={e => setFormData({...formData, featured: e.target.value === '1'})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Status</label>
                  <select value={formData.status || 'published'} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Save</button>
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-200 px-6 py-2 rounded-lg font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
