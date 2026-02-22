"use client";
import { useState, useEffect } from "react";

export default function AcademySettingsPage() {
  const [settings, setSettings] = useState({
    heroTitle: '',
    heroSubtitle: '',
    classStartDate: '',
    scholarshipAnnouncementDate: '',
    registrationOpen: true,
    contactPhone: '',
    featuredCourseId: ''
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
    Promise.all([
      fetch(`${BACKEND}/academy-settings`).then(r => r.json()),
      fetch(`${BACKEND}/courses`).then(r => r.json())
    ]).then(([settingsData, coursesData]) => {
      if (settingsData) setSettings(settingsData);
      setCourses(coursesData);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      await fetch(`${BACKEND}/academy-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Academy Settings</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
            <input
              type="text"
              value={settings.heroTitle}
              onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
            <textarea
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({...settings, heroSubtitle: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Start Date</label>
              <input
                type="date"
                value={settings.classStartDate}
                onChange={(e) => setSettings({...settings, classStartDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Date</label>
              <input
                type="date"
                value={settings.scholarshipAnnouncementDate}
                onChange={(e) => setSettings({...settings, scholarshipAnnouncementDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
            <input
              type="tel"
              value={settings.contactPhone}
              onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="202-386-2702"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Course</label>
            <select
              value={settings.featuredCourseId}
              onChange={(e) => setSettings({...settings, featuredCourseId: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select a course</option>
              {courses.map((course: any) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.registrationOpen}
              onChange={(e) => setSettings({...settings, registrationOpen: e.target.checked})}
              className="w-4 h-4 text-primary border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Registration Open</label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
    </div>
  );
}
