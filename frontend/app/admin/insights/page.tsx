"use client";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export default function InsightsAdmin() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const data = await apiClient.getInsights();
      setInsights(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading insights:", error);
      setInsights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this insight?")) return;
    try {
      await apiClient.deleteInsight(id);
      loadInsights();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Insights & Articles</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {insights.map((insight) => (
              <tr key={insight.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{insight.title}</div>
                  <div className="text-sm text-gray-500">/insights/{insight.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                    {insight.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    insight.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {insight.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(insight.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <a
                      href={`/insights/${insight.slug}`}
                      target="_blank"
                      className="text-primary hover:underline text-sm"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(insight.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {insights.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No insights yet.
          </div>
        )}
      </div>
    </div>
  );
}
