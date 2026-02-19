"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', slug: '', tagline: '', description: '', challenge: '', approach: '', outcomes: '',
    industryIds: [] as string[], serviceIds: [] as string[],
    featured: false, status: 'published',
    benefits: [
      { icon: 'zap', title: '', description: '' },
      { icon: 'target', title: '', description: '' },
      { icon: 'bar-chart', title: '', description: '' },
      { icon: 'users', title: '', description: '' }
    ],
    implementationSteps: [
      { number: '01', title: '', description: '' },
      { number: '02', title: '', description: '' },
      { number: '03', title: '', description: '' },
      { number: '04', title: '', description: '' }
    ]
  });

  useEffect(() => {
    fetchSolutions();
    apiClient.getIndustries().then((data: any) => setIndustries(data)).catch(console.error);
    apiClient.getServices().then((data: any) => setServices(data)).catch(console.error);
  }, []);

  const fetchSolutions = () => {
    apiClient.getSolutions().then((data: any) => setSolutions(data)).catch(err => console.error(err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      apiClient.updateSolution(editId, formData).then(() => { fetchSolutions(); closeModal(); }).catch(err => alert(err.message));
    } else {
      apiClient.createSolution(formData).then(() => { fetchSolutions(); closeModal(); }).catch(err => alert(err.message));
    }
  };

  const handleEdit = (sol: any) => {
    setEditId(sol.id);
    setFormData({ 
      name: sol.name, slug: sol.slug, tagline: sol.tagline || '', 
      description: sol.description, challenge: sol.challenge || '', 
      approach: sol.approach || '', outcomes: sol.outcomes || '',
      industryIds: sol.industryIds || [], serviceIds: sol.serviceIds || [], 
      featured: sol.featured || false, status: sol.status,
      benefits: sol.benefits?.length ? sol.benefits : [
        { icon: 'zap', title: '', description: '' },
        { icon: 'target', title: '', description: '' },
        { icon: 'bar-chart', title: '', description: '' },
        { icon: 'users', title: '', description: '' }
      ],
      implementationSteps: sol.implementationSteps?.length ? sol.implementationSteps : [
        { number: '01', title: '', description: '' },
        { number: '02', title: '', description: '' },
        { number: '03', title: '', description: '' },
        { number: '04', title: '', description: '' }
      ]
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this solution?')) return;
    apiClient.deleteSolution(id).then(() => fetchSolutions()).catch(err => alert(err.message));
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ 
      name: '', slug: '', tagline: '', description: '', challenge: '', approach: '', outcomes: '', 
      industryIds: [], serviceIds: [], featured: false, status: 'published',
      benefits: [
        { icon: 'zap', title: '', description: '' },
        { icon: 'target', title: '', description: '' },
        { icon: 'bar-chart', title: '', description: '' },
        { icon: 'users', title: '', description: '' }
      ],
      implementationSteps: [
        { number: '01', title: '', description: '' },
        { number: '02', title: '', description: '' },
        { number: '03', title: '', description: '' },
        { number: '04', title: '', description: '' }
      ]
    });
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Solutions Management</h2>
          <p className="text-gray-500">Manage integrated solutions with industries, services, and experts</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Solution
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((sol: any) => (
          <div key={sol.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(sol)} className="p-2 text-gray-400 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(sol.id)} className="p-2 text-gray-400 hover:text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">{sol.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{sol.description}</p>
            {sol.featured && <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">Featured</span>}
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-xs text-gray-500">
              <span>{sol.industryIds?.length || 0} Industries</span>
              <span>{sol.serviceIds?.length || 0} Services</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">{editId ? 'Edit' : 'Add'} Solution</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Solution Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2.5" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">URL Slug *</label>
                  <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border rounded-lg px-4 py-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Tagline</label>
                <input type="text" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="w-full border rounded-lg px-4 py-2.5" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description *</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg px-4 py-2.5" rows={3} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Challenge</label>
                  <textarea value={formData.challenge} onChange={e => setFormData({...formData, challenge: e.target.value})} className="w-full border rounded-lg px-4 py-2.5" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Approach</label>
                  <textarea value={formData.approach} onChange={e => setFormData({...formData, approach: e.target.value})} className="w-full border rounded-lg px-4 py-2.5" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Outcomes</label>
                  <textarea value={formData.outcomes} onChange={e => setFormData({...formData, outcomes: e.target.value})} className="w-full border rounded-lg px-4 py-2.5" rows={3} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Industries</label>
                  <select multiple value={formData.industryIds} onChange={e => setFormData({...formData, industryIds: Array.from(e.target.selectedOptions, opt => opt.value)})} className="w-full border rounded-lg px-4 py-2.5" size={4}>
                    {industries.map((ind: any) => <option key={ind.id} value={ind.id}>{ind.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Services</label>
                  <select multiple value={formData.serviceIds} onChange={e => setFormData({...formData, serviceIds: Array.from(e.target.selectedOptions, opt => opt.value)})} className="w-full border rounded-lg px-4 py-2.5" size={4}>
                    {services.map((srv: any) => <option key={srv.id} value={srv.id}>{srv.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Benefits (4 items)</label>
                <div className="space-y-3">
                  {formData.benefits.map((benefit, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-start">
                      <input type="text" placeholder="Icon" value={benefit.icon} onChange={e => setFormData({...formData, benefits: formData.benefits.map((b, i) => i === idx ? {...b, icon: e.target.value} : b)})} className="col-span-2 border rounded-lg px-3 py-2 text-sm" />
                      <input type="text" placeholder="Title" value={benefit.title} onChange={e => setFormData({...formData, benefits: formData.benefits.map((b, i) => i === idx ? {...b, title: e.target.value} : b)})} className="col-span-4 border rounded-lg px-3 py-2 text-sm" />
                      <input type="text" placeholder="Description" value={benefit.description} onChange={e => setFormData({...formData, benefits: formData.benefits.map((b, i) => i === idx ? {...b, description: e.target.value} : b)})} className="col-span-6 border rounded-lg px-3 py-2 text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Implementation Steps (4 steps)</label>
                <div className="space-y-3">
                  {formData.implementationSteps.map((step, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-start">
                      <input type="text" placeholder="#" value={step.number} onChange={e => setFormData({...formData, implementationSteps: formData.implementationSteps.map((s, i) => i === idx ? {...s, number: e.target.value} : s)})} className="col-span-1 border rounded-lg px-3 py-2 text-sm" />
                      <input type="text" placeholder="Title" value={step.title} onChange={e => setFormData({...formData, implementationSteps: formData.implementationSteps.map((s, i) => i === idx ? {...s, title: e.target.value} : s)})} className="col-span-4 border rounded-lg px-3 py-2 text-sm" />
                      <input type="text" placeholder="Description" value={step.description} onChange={e => setFormData({...formData, implementationSteps: formData.implementationSteps.map((s, i) => i === idx ? {...s, description: e.target.value} : s)})} className="col-span-7 border rounded-lg px-3 py-2 text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-semibold">Featured Solution</span>
                </label>
                <div>
                  <label className="block text-sm font-semibold mb-2">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="border rounded-lg px-4 py-2">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700">
                  {editId ? 'Update' : 'Create'} Solution
                </button>
                <button type="button" onClick={closeModal} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
