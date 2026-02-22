"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CoursePricingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');
  const [pricingList, setPricingList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [pricing, setPricing] = useState({
    location: "Outside Rwanda",
    planType: "in_class",
    originalPrice: 0,
    discountedPrice: 0,
    features: "",
    active: true
  });

  useEffect(() => {
    if (courseId) fetchPricing();
  }, [courseId]);

  const fetchPricing = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const res = await fetch(`${BACKEND}/courses/${courseId}`);
      const data = await res.json();
      setPricingList(data.pricing || []);
    } catch (error) {
      console.error('Failed to fetch pricing');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const features = pricing.features.split('\n').filter(f => f.trim());
      await fetch(`${BACKEND}/course-pricing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pricing, courseId, features: JSON.stringify(features) })
      });
      setShowForm(false);
      fetchPricing();
      setPricing({ location: "Outside Rwanda", planType: "in_class", originalPrice: 0, discountedPrice: 0, features: "", active: true });
    } catch (error) {
      alert('Failed to save pricing');
    }
  };

  const deletePricing = async (id: string) => {
    if (!confirm('Delete this pricing plan?')) return;
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      await fetch(`${BACKEND}/course-pricing/${id}`, { method: 'DELETE' });
      fetchPricing();
    } catch (error) {
      alert('Failed to delete pricing');
    }
  };

  if (!courseId) return <div className="p-8">No course selected</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Course Pricing Plans</h1>
        <div className="flex gap-4">
          <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700">
            {showForm ? 'Cancel' : 'Add Pricing'}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select value={pricing.location} onChange={(e) => setPricing({...pricing, location: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="Outside Rwanda">Outside Rwanda</option>
                <option value="Inside Rwanda">Inside Rwanda (Up to 66% OFF)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
              <select value={pricing.planType} onChange={(e) => setPricing({...pricing, planType: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="in_class">In-Class Students</option>
                <option value="material_only">Material Access Only</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
              <input type="number" value={pricing.originalPrice} onChange={(e) => setPricing({...pricing, originalPrice: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
              <input type="number" value={pricing.discountedPrice} onChange={(e) => setPricing({...pricing, discountedPrice: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
            <textarea value={pricing.features} onChange={(e) => setPricing({...pricing, features: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={5} placeholder="Live interactive classes&#10;Access to all course materials&#10;Certificate upon completion" required />
          </div>
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700">Save Pricing</button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {pricingList.map((p) => {
            const features = typeof p.features === 'string' ? JSON.parse(p.features) : p.features;
            return (
              <div key={p.id} className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{p.planType === 'in_class' ? 'In-Class Students' : 'Material Access Only'}</h3>
                    <p className="text-sm text-gray-500">{p.location}</p>
                  </div>
                  <button onClick={() => deletePricing(p.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
                <div className="mb-4">
                  <span className="text-2xl text-gray-400 line-through">${p.originalPrice}</span>
                  <span className="text-4xl font-bold text-primary ml-3">${p.discountedPrice}</span>
                </div>
                <ul className="space-y-2">
                  {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
