"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  type: string;
  description?: string;
  image?: string;
  registerUrl?: string;
  status: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const loadEvents = () => {
    apiClient.getEvents()
      .then((data: any) => setEvents(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadEvents(); }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
      
      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', imageFile);
        const uploadRes = await fetch('http://localhost/Jacom-Platform/backend/upload.php?type=events', {
          method: 'POST',
          body: formDataUpload
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) imageUrl = uploadData.url;
      }
      
      const dataToSubmit = { ...formData, image: imageUrl };
      
      if (editingEvent) {
        await apiClient.updateEvent(editingEvent.id, dataToSubmit);
      } else {
        await apiClient.createEvent(dataToSubmit);
      }
      setShowModal(false);
      setFormData({});
      setImageFile(null);
      setImagePreview('');
      setEditingEvent(null);
      loadEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this event?')) {
      await apiClient.deleteEvent(id);
      loadEvents();
    }
  };

  const openModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData(event);
      setImagePreview(event.image || '');
    } else {
      setEditingEvent(null);
      setFormData({});
      setImagePreview('');
    }
    setImageFile(null);
    setShowModal(true);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Events & Webinars</h2>
          <p className="text-gray-500">Manage upcoming webinars and virtual events</p>
        </div>
        <button onClick={() => openModal()} className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading events...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No events found</td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {event.image ? (
                        <img src={event.image} alt={event.title} className="w-16 h-16 object-cover rounded-lg" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">No Image</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold">{event.title}</td>
                    <td className="px-6 py-4">{new Date(event.date).toLocaleDateString()} - {event.time}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-50 text-primary text-xs font-bold rounded uppercase">{event.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${event.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>{event.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openModal(event)} className="text-primary hover:bg-red-50 p-1 rounded-lg mr-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:bg-red-50 p-1 rounded-lg">
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
            <h3 className="text-2xl font-bold mb-6">{editingEvent ? 'Edit Event' : 'Add Event'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Title</label>
                <input type="text" required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Slug</label>
                <input type="text" required value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Date</label>
                  <input type="date" required value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Time</label>
                  <input type="text" required value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="2:00 PM JST" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Type</label>
                <select value={formData.type || 'webinar'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  <option value="webinar">Webinar</option>
                  <option value="roundtable">Roundtable</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-lg" />
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Register URL</label>
                <input type="text" value={formData.registerUrl || ''} onChange={e => setFormData({...formData, registerUrl: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Status</label>
                <select value={formData.status || 'published'} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
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
