"use client";
import { useState, useEffect } from "react";
import MultiSelect from "@/components/Admin/MultiSelect";
import Modal from "@/components/Admin/Modal";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  featured: boolean;
  createdAt: string;
}

interface Industry {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    featured: false,
    industryIds: [] as string[],
    serviceIds: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [testimonialsRes, industriesRes, servicesRes] = await Promise.all([
        fetch("/api/testimonials").then(r => r.json()),
        fetch("/api/industries").then(r => r.json()),
        fetch("/api/services").then(r => r.json())
      ]);
      setTestimonials(testimonialsRes);
      setIndustries(industriesRes);
      setServices(servicesRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? "/api/testimonials" : "/api/testimonials";
      const method = editingId ? "PUT" : "POST";
      
      const payload = editingId ? { ...formData, id: editingId } : formData;
      
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
      console.error("Error saving testimonial:", error);
    }
  };

  const handleEdit = (testimonial: any) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      featured: testimonial.featured,
      industryIds: testimonial.industries?.map((i: any) => i.id) || [],
      serviceIds: testimonial.services?.map((s: any) => s.id) || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
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
              <h1 className="text-3xl font-bold">Testimonials Management</h1>
              <p className="text-gray-600 mt-1">Manage client testimonials and reviews</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              {showForm ? "Cancel" : "+ Add Testimonial"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <Modal isOpen={showForm} onClose={resetForm} title={editingId ? "Edit Testimonial" : "New Testimonial"}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full p-3 border rounded focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Testimonial Content *</label>
              <textarea
                required
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-3 border rounded focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-8">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Testimonial</label>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Related Content</h3>
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
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                {editingId ? "Update Testimonial" : "Create Testimonial"}
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
            <h2 className="text-lg font-semibold">All Testimonials ({testimonials.length})</h2>
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
                    <th className="text-left p-4 text-sm font-semibold">Client</th>
                    <th className="text-left p-4 text-sm font-semibold">Company</th>
                    <th className="text-left p-4 text-sm font-semibold">Rating</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </td>
                      <td className="p-4 text-sm">{testimonial.company}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className={`w-4 h-4 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        {testimonial.featured ? (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Featured</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Standard</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="text-primary hover:underline text-sm mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
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