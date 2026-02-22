"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CourseSchedulePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [schedule, setSchedule] = useState({
    sessionType: "live_class",
    groupNumber: null as number | null,
    daysOfWeek: "",
    timeEST: "",
    timePST: "",
    timeEAT: "",
    timeETH: "",
    active: true
  });

  useEffect(() => {
    if (courseId) fetchSchedules();
  }, [courseId]);

  const fetchSchedules = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const res = await fetch(`${BACKEND}/courses/${courseId}`);
      const data = await res.json();
      setSchedules(data.schedule || []);
    } catch (error) {
      console.error('Failed to fetch schedules');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      await fetch(`${BACKEND}/class-schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...schedule, courseId })
      });
      setShowForm(false);
      fetchSchedules();
      setSchedule({ sessionType: "live_class", groupNumber: null, daysOfWeek: "", timeEST: "", timePST: "", timeEAT: "", timeETH: "", active: true });
    } catch (error) {
      alert('Failed to save schedule');
    }
  };

  const deleteSchedule = async (id: string) => {
    if (!confirm('Delete this schedule?')) return;
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      await fetch(`${BACKEND}/class-schedule/${id}`, { method: 'DELETE' });
      fetchSchedules();
    } catch (error) {
      alert('Failed to delete schedule');
    }
  };

  if (!courseId) return <div className="p-8">No course selected</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
        <div className="flex gap-4">
          <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700">
            {showForm ? 'Cancel' : 'Add Schedule'}
          </button>
          <button onClick={() => router.back()} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Back
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
              <select value={schedule.sessionType} onChange={(e) => setSchedule({...schedule, sessionType: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="live_class">Live Class</option>
                <option value="group_discussion">Group Discussion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Number (optional)</label>
              <input type="number" value={schedule.groupNumber || ''} onChange={(e) => setSchedule({...schedule, groupNumber: e.target.value ? Number(e.target.value) : null})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Days of Week</label>
            <input type="text" value={schedule.daysOfWeek} onChange={(e) => setSchedule({...schedule, daysOfWeek: e.target.value})} placeholder="e.g., Monday,Wednesday" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time EST</label>
              <input type="text" value={schedule.timeEST} onChange={(e) => setSchedule({...schedule, timeEST: e.target.value})} placeholder="10:00am - 12:00pm" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time PST</label>
              <input type="text" value={schedule.timePST} onChange={(e) => setSchedule({...schedule, timePST: e.target.value})} placeholder="7:00am - 9:00am" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time EAT</label>
              <input type="text" value={schedule.timeEAT} onChange={(e) => setSchedule({...schedule, timeEAT: e.target.value})} placeholder="6:00pm - 8:00pm" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time ETH-LT</label>
              <input type="text" value={schedule.timeETH} onChange={(e) => setSchedule({...schedule, timeETH: e.target.value})} placeholder="5:00pm - 7:00pm" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
          </div>
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700">Save Schedule</button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {schedules.map((s) => (
            <div key={s.id} className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{s.sessionType === 'live_class' ? 'Live Classes' : `Group ${s.groupNumber}`}</h3>
                  <p className="text-sm text-gray-600">{s.daysOfWeek.replace(',', ' & ')}</p>
                </div>
                <button onClick={() => deleteSchedule(s.id)} className="text-red-600 hover:text-red-900">Delete</button>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'EST', time: s.timeEST },
                  { label: 'PST', time: s.timePST },
                  { label: 'EAT', time: s.timeEAT },
                  { label: 'ETH-LT', time: s.timeETH }
                ].map((tz, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="font-semibold text-gray-700">{tz.label}</span>
                    <span className="text-gray-600 text-sm">{tz.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
