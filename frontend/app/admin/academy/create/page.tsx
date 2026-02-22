"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    totalPrice: 0,
    fullPaymentPrice: 0,
    installmentCount: 0,
    installmentAmount: 0,
    startDate: "",
    duration: "",
    deliveryMode: "online",
    status: "upcoming",
    featured: false,
    maxStudents: 100
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const res = await fetch(`${BACKEND}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
      });
      if (res.ok) {
        alert('Course created successfully!');
        router.push('/admin/academy');
      }
    } catch (error) {
      alert('Failed to create course');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Course</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
            <input type="text" value={course.name} onChange={(e) => setCourse({...course, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input type="text" value={course.slug} onChange={(e) => setCourse({...course, slug: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <input type="text" value={course.category} onChange={(e) => setCourse({...course, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea value={course.description} onChange={(e) => setCourse({...course, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={4} required />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Price</label>
            <input type="number" value={course.totalPrice} onChange={(e) => setCourse({...course, totalPrice: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Payment Price</label>
            <input type="number" value={course.fullPaymentPrice} onChange={(e) => setCourse({...course, fullPaymentPrice: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input type="date" value={course.startDate} onChange={(e) => setCourse({...course, startDate: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input type="text" value={course.duration} onChange={(e) => setCourse({...course, duration: e.target.value})} placeholder="e.g., 12 weeks" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Students</label>
            <input type="number" value={course.maxStudents} onChange={(e) => setCourse({...course, maxStudents: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select value={course.status} onChange={(e) => setCourse({...course, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="upcoming">Upcoming</option>
              <option value="enrolling">Enrolling</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Mode</label>
            <select value={course.deliveryMode} onChange={(e) => setCourse({...course, deliveryMode: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
              <option value="in_person">In Person</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <input type="checkbox" checked={course.featured} onChange={(e) => setCourse({...course, featured: e.target.checked})} className="w-4 h-4 text-primary border-gray-300 rounded" />
          <label className="ml-2 text-sm text-gray-700">Featured Course</label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Course'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
