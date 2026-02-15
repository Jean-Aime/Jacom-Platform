"use client";
import { useState, useEffect } from "react";
import { domainAPI } from "@/lib/domain-api";

export default function OfficesAdminPage() {
  const [offices, setOffices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    region: "",
    country: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    try {
      const data = await domainAPI.getOffices();
      setOffices(data);
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
      lat: parseFloat(formData.lat.toString()),
      lng: parseFloat(formData.lng.toString())
    };

    try {
      if (editingId) {
        await domainAPI.updateOffice(editingId, payload);
      } else {
        await domainAPI.createOffice(payload);
      }
      fetchOffices();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (office: any) => {
    setEditingId(office.id);
    setFormData(office);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this office?")) return;
    await domainAPI.deleteOffice(id);
    fetchOffices();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      region: "",
      country: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      lat: 0,
      lng: 0
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
              <h1 className="text-3xl font-bold">Offices Management</h1>
              <p className="text-gray-600 mt-1">Manage global office locations</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">
              {showForm ? "Cancel" : "+ Add Office"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {showForm && (
          <div className="bg-white rounded border mb-8 p-6">
            <h2 className="text-xl font-semibold mb-6">{editingId ? "Edit Office" : "New Office"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Office Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Region *</label>
                  <select required value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none">
                    <option value="">Select Region</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Latin America">Latin America</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <input type="text" required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Latitude *</label>
                  <input type="number" step="any" required value={formData.lat} onChange={(e) => setFormData({...formData, lat: parseFloat(e.target.value)})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Longitude *</label>
                  <input type="number" step="any" required value={formData.lng} onChange={(e) => setFormData({...formData, lng: parseFloat(e.target.value)})} className="w-full p-3 border rounded focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">{editingId ? "Update" : "Create"}</button>
                <button type="button" onClick={resetForm} className="border px-6 py-2 rounded hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">All Offices ({offices.length})</h2>
          </div>
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">Office</th>
                    <th className="text-left p-4 text-sm font-semibold">Location</th>
                    <th className="text-left p-4 text-sm font-semibold">Contact</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offices.map((office) => (
                    <tr key={office.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{office.name}</div>
                        <div className="text-sm text-gray-600">{office.slug}</div>
                      </td>
                      <td className="p-4 text-sm">
                        <div>{office.city}, {office.country}</div>
                        <div className="text-gray-600">{office.region}</div>
                      </td>
                      <td className="p-4 text-sm">
                        <div>{office.phone}</div>
                        <div className="text-gray-600">{office.email}</div>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleEdit(office)} className="text-primary hover:underline text-sm mr-4">Edit</button>
                        <button onClick={() => handleDelete(office.id)} className="text-red-600 hover:underline text-sm">Delete</button>
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
