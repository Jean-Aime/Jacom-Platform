"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function IndustriesPage() {
  const [industries, setIndustries] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    slug: '', 
    description: '', 
    challenges: '', 
    trends: '', 
    image: '', 
    serviceIds: [] as string[],
    status: 'published' 
  });

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

  useEffect(() => {
    fetchIndustries();
    apiClient.getServices().then((data: any) => setServices(data)).catch(err => console.error(err));
  }, []);

  const fetchIndustries = () => {
    apiClient.getIndustries()
      .then((data: any) => setIndustries(data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert newline-separated strings to JSON arrays
    const payload = {
      ...formData,
      challenges: JSON.stringify(formData.challenges.split('\n').filter(c => c.trim())),
      trends: JSON.stringify(formData.trends.split('\n').filter(t => t.trim()))
    };
    
    if (editId) {
      apiClient.updateIndustry(editId, payload)
        .then(() => { fetchIndustries(); closeModal(); })
        .catch(err => alert(err.message));
    } else {
      apiClient.createIndustry(payload)
        .then(() => { fetchIndustries(); closeModal(); })
        .catch(err => alert(err.message));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ name: '', slug: '', description: '', challenges: '', trends: '', image: '', serviceIds: [], status: 'published' });
  };

  const handleEdit = (ind: any) => {
    setEditId(ind.id);
    
    // Parse JSON arrays to newline-separated strings
    let challengesText = '';
    let trendsText = '';
    
    try {
      const challengesArray = JSON.parse(ind.challenges || '[]');
      challengesText = challengesArray.join('\n');
    } catch {
      challengesText = ind.challenges || '';
    }
    
    try {
      const trendsArray = JSON.parse(ind.trends || '[]');
      trendsText = trendsArray.join('\n');
    } catch {
      trendsText = ind.trends || '';
    }
    
    setFormData({ 
      name: ind.name, 
      slug: ind.slug, 
      description: ind.description, 
      challenges: challengesText, 
      trends: trendsText, 
      image: ind.image || '', 
      serviceIds: ind.serviceIds || [],
      status: ind.status 
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this industry?')) return;
    apiClient.deleteIndustry(id)
      .then(() => fetchIndustries())
      .catch(err => alert(err.message));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Industries & Services</h2>
          <p className="text-gray-500">Manage core corporate sectors and specialized capabilities.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Industry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {industries.map((ind: any) => (
          <div key={ind.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(ind)} className="p-2 text-gray-400 hover:text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(ind.id)} className="p-2 text-gray-400 hover:text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">{ind.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{ind.description}</p>
            {ind.serviceIds && ind.serviceIds.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase">Linked Services</span>
                <p className="text-sm font-bold text-primary mt-1">{ind.serviceIds.length} service{ind.serviceIds.length !== 1 ? 's' : ''}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">{editId ? 'Edit' : 'Add'} Industry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Industry Name *</label>
                  <input type="text" required value={formData.name} onChange={e => handleNameChange(e.target.value)} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" placeholder="Technology & IoT" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">URL Slug *</label>
                  <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" placeholder="technology-iot" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Hero Description *</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" rows={3} placeholder="Brief description shown in hero section" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Hero Background Image URL</label>
                <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" placeholder="https://example.com/image.jpg" />
                <p className="text-xs text-gray-500 mt-1">Used in hero section and partnership section</p>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-bold mb-4 text-gray-900">Hero Diagram Content</h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Industry Challenges (one per line, max 4 shown)</label>
                  <textarea value={formData.challenges} onChange={e => setFormData({...formData, challenges: e.target.value})} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" rows={4} placeholder="Legacy system integration&#10;Data security concerns&#10;Scalability issues&#10;Regulatory compliance" />
                  <p className="text-xs text-gray-500 mt-1">First 4 challenges appear as icons in hero diagram</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Industry Trends (one per line)</label>
                <textarea value={formData.trends} onChange={e => setFormData({...formData, trends: e.target.value})} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" rows={4} placeholder="AI adoption increasing&#10;Cloud migration accelerating&#10;Remote work transformation&#10;Sustainability focus" />
                <p className="text-xs text-gray-500 mt-1">Count shown in hero stats badge</p>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-bold mb-4 text-gray-900">Link Services to This Industry</h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Select Services</label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((svc: any) => (
                        <label key={svc.id} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition">
                          <input 
                            type="checkbox" 
                            checked={formData.serviceIds.includes(svc.id)}
                            onChange={e => {
                              if (e.target.checked) {
                                setFormData({...formData, serviceIds: [...formData.serviceIds, svc.id]});
                              } else {
                                setFormData({...formData, serviceIds: formData.serviceIds.filter(id => id !== svc.id)});
                              }
                            }}
                            className="w-4 h-4 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-900">{svc.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Selected services appear in Capabilities section on public industry page</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700"><strong>Note:</strong> Insights and Experts are linked automatically based on tags and categories.</p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded-lg font-semibold">Save Industry</button>
                <button type="button" onClick={closeModal} className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold text-gray-900 hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
