"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', slug: '', description: '', overview: '',
    subServices: [] as string[], status: 'published' 
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
    console.log('Admin Services: Fetching data...');
    fetchServices();
    apiClient.getIndustries()
      .then((data: any) => {
        console.log('Industries loaded:', data);
        setIndustries(data);
      })
      .catch(err => console.error('Industries error:', err));
  }, []);

  const fetchServices = () => {
    console.log('Fetching services from API...');
    apiClient.getServices()
      .then((data: any) => {
        console.log('Services loaded:', data);
        setServices(data);
      })
      .catch(err => console.error('Services error:', err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      apiClient.updateService(editId, formData)
        .then(() => { fetchServices(); closeModal(); })
        .catch(err => alert(err.message));
    } else {
      apiClient.createService(formData)
        .then(() => { fetchServices(); closeModal(); })
        .catch(err => alert(err.message));
    }
  };

  const handleEdit = (svc: any) => {
    setEditId(svc.id);
    setFormData({ 
      name: svc.name, slug: svc.slug, description: svc.description, 
      overview: svc.overview || '', subServices: svc.subServices || [], status: svc.status 
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this service?')) return;
    apiClient.deleteService(id).then(() => fetchServices()).catch(err => alert(err.message));
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ name: '', slug: '', description: '', overview: '', subServices: [], status: 'published' });
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Services Management</h2>
          <p className="text-gray-500">Manage service offerings and capabilities</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc: any) => (
          <div key={svc.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(svc)} className="p-2 text-gray-400 hover:text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(svc.id)} className="p-2 text-gray-400 hover:text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">{svc.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{svc.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">{editId ? 'Edit' : 'Add'} Service</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Service Name *</label>
                  <input type="text" required value={formData.name} onChange={e => handleNameChange(e.target.value)} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">URL Slug *</label>
                  <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Overview</label>
                <textarea value={formData.overview} onChange={e => setFormData({...formData, overview: e.target.value})} className="w-full border rounded-lg px-4 py-2.5 bg-white text-gray-900" rows={3} placeholder="Detailed service overview" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Sub-Services</label>
                <div className="space-y-2">
                  {formData.subServices.map((sub, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={sub}
                        onChange={e => {
                          const updated = [...formData.subServices];
                          updated[idx] = e.target.value;
                          setFormData({...formData, subServices: updated});
                        }}
                        className="flex-1 border rounded-lg px-4 py-2 bg-white text-gray-900"
                        placeholder="Sub-service name"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, subServices: formData.subServices.filter((_, i) => i !== idx)})}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, subServices: [...formData.subServices, '']})}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 text-gray-600 hover:border-primary hover:text-primary transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Sub-Service
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded-lg font-semibold">Save</button>
                <button type="button" onClick={closeModal} className="flex-1 border py-3 rounded-lg font-semibold text-gray-900 hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
