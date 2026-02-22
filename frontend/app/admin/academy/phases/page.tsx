"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CoursePhasesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');
  const [phases, setPhases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [phase, setPhase] = useState({
    phaseNumber: 1,
    title: "",
    description: "",
    materialPrice: 0,
    materialDiscountedPrice: 0,
    classPrice: 0,
    duration: "",
    order: 1
  });

  useEffect(() => {
    if (courseId) fetchPhases();
  }, [courseId]);

  const fetchPhases = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const res = await fetch(`${BACKEND}/courses/${courseId}`);
      const data = await res.json();
      setPhases(data.phases || []);
    } catch (error) {
      console.error('Failed to fetch phases');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      await fetch(`${BACKEND}/course-phases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...phase, courseId })
      });
      setShowForm(false);
      fetchPhases();
      setPhase({ phaseNumber: 1, title: "", description: "", materialPrice: 0, materialDiscountedPrice: 0, classPrice: 0, duration: "", order: 1 });
    } catch (error) {
      alert('Failed to save phase');
    }
  };

  const deletePhase = async (id: string) => {
    if (!confirm('Delete this phase?')) return;
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      await fetch(`${BACKEND}/course-phases/${id}`, { method: 'DELETE' });
      fetchPhases();
    } catch (error) {
      alert('Failed to delete phase');
    }
  };

  if (!courseId) return <div className="p-8">No course selected</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Course Curriculum (Phases)</h1>
        <div className="flex gap-4">
          <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700">
            {showForm ? 'Cancel' : 'Add Phase'}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Phase Number</label>
              <input type="number" value={phase.phaseNumber} onChange={(e) => setPhase({...phase, phaseNumber: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input type="text" value={phase.duration} onChange={(e) => setPhase({...phase, duration: e.target.value})} placeholder="e.g., 3 weeks" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" value={phase.title} onChange={(e) => setPhase({...phase, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea value={phase.description} onChange={(e) => setPhase({...phase, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={3} required />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material Price</label>
              <input type="number" value={phase.materialPrice} onChange={(e) => setPhase({...phase, materialPrice: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material Discounted</label>
              <input type="number" value={phase.materialDiscountedPrice} onChange={(e) => setPhase({...phase, materialDiscountedPrice: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Price</label>
              <input type="number" value={phase.classPrice} onChange={(e) => setPhase({...phase, classPrice: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
          </div>
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700">Save Phase</button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="space-y-4">
          {phases.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-primary rounded-full text-sm font-bold">Phase {p.phaseNumber}</span>
                    <span className="text-sm text-gray-500">{p.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-600 mb-4">{p.description}</p>
                  <div className="flex gap-6 text-sm">
                    <span>Material: <span className="line-through text-gray-400">${p.materialPrice}</span> <span className="text-primary font-bold">${p.materialDiscountedPrice}</span></span>
                    <span>Class: <span className="text-primary font-bold">${p.classPrice}</span></span>
                  </div>
                </div>
                <button onClick={() => deletePhase(p.id)} className="text-red-600 hover:text-red-900">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
