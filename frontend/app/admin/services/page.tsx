"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MultiSelect from "@/components/Admin/MultiSelect";
import Modal from "@/components/Admin/Modal";
import { domainAPI } from "@/lib/domain-api";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  featured: boolean;
  createdAt: string;
}

interface Industry {
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

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    overview: "",
    methodologies: "",
    tools: "",
    tagline: "",
    featured: false,
    industryIds: [] as string[],
    expertIds: [] as string[],
    insightIds: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, industriesRes, expertsRes, insightsRes] = await Promise.all([
        domainAPI.getServices(),
        domainAPI.getIndustries(),
        domainAPI.getExperts(),
        domainAPI.getInsights()
      ]);
      setServices(servicesRes);
      setIndustries(industriesRes);
      setExperts(expertsRes);
      setInsights(insightsRes);
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
      methodologies: JSON.stringify(formData.methodologies.split("\n").filter(Boolean)),
      tools: JSON.stringify(formData.tools.split("\n").filter(Boolean))
    };

    try {
      if (editingId) {
        await domainAPI.updateService(editingId, payload);
      } else {
        await domainAPI.createService(payload);
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    
    let methodologies = "";
    let tools = "";
    try {
      methodologies = JSON.parse(service.methodologies || "[]").join("\n");
      tools = JSON.parse(service.tools || "[]").join("\n");
    } catch {
      methodologies = service.methodologies || "";
      tools = service.tools || "";
    }
    
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      overview: service.overview,
      methodologies,
      tools,
      tagline: service.tagline || "",
      featured: service.featured,
      industryIds: service.industries?.map((i: any) => i.id) || [],
      expertIds: service.experts?.map((e: any) => e.id) || [],
      insightIds: service.insights?.map((i: any) => i.id) || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    
    try {
      await domainAPI.deleteService(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      overview: "",
      methodologies: "",
      tools: "",
      tagline: "",
      featured: false,
      industryIds: [],
      expertIds: [],
      insightIds: []
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
              <h1 className="text-3xl font-bold">Services Management</h1>
              <p className="text-gray-600 mt-1">Manage consulting services and capabilities</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              {showForm ? "Cancel" : "+ Add Service"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Form - Bain Style */}
        <Modal isOpen={showForm} onClose={resetForm} title={editingId ? "Edit Service" : "New Service"}>
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Digital Transformation"
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
                    placeholder="e.g., digital-transformation"
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
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
                  placeholder="e.g., Accelerating digital innovation and business transformation"
                  className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Overview *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.overview}
                  onChange={(e) => setFormData({...formData, overview: e.target.value})}
                  placeholder="e.g., We help organizations leverage technology to transform operations, enhance customer experiences, and drive sustainable growth..."
                  className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Methodologies (one per line)</label>
                  <textarea
                    rows={4}
                    value={formData.methodologies}
                    onChange={(e) => setFormData({...formData, methodologies: e.target.value})}
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tools (one per line)</label>
                  <textarea
                    rows={4}
                    value={formData.tools}
                    onChange={(e) => setFormData({...formData, tools: e.target.value})}
                    className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold mb-4 text-lg">Service Detail Page</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tagline</label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                      placeholder="e.g., Transform your business with cutting-edge digital solutions"
                      className="w-full p-3 border rounded focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      To manage Capabilities, Process Steps, Metrics, and Case Study, save this service first, then click "Manage Details" from the services list.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Service</label>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Cross-Linking</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <MultiSelect
                    label="Related Industries"
                    options={industries}
                    selected={formData.industryIds}
                    onChange={(ids) => setFormData({...formData, industryIds: ids})}
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

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  {editingId ? "Update Service" : "Create Service"}
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

        {/* Table - Bain Style */}
        <div className="bg-white rounded border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">All Services ({services.length})</h2>
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
                    <th className="text-left p-4 text-sm font-semibold">Service Name</th>
                    <th className="text-left p-4 text-sm font-semibold">Slug</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                    <th className="text-left p-4 text-sm font-semibold">Created</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-600">{service.description}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{service.slug}</td>
                      <td className="p-4">
                        {service.featured ? (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Featured</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Standard</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={`/admin/services/${service.id}/details`}
                          className="text-green-600 hover:underline text-sm mr-4"
                        >
                          Manage Details
                        </a>
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-primary hover:underline text-sm mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
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
