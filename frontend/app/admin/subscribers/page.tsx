"use client";
import { useState, useEffect } from "react";

interface Subscriber {
  id: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

export default function SubscribersAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setError(null);
      const response = await fetch("/api/newsletter");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch subscribers');
      }
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setSubscribers(data);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      setError(error instanceof Error ? error.message : 'Failed to fetch subscribers');
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;
    
    try {
      await fetch(`/api/newsletter?id=${id}`, { method: "DELETE" });
      fetchSubscribers();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  const exportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Status,Source,Date\n"
      + subscribers.map(s => `${s.email},${s.status},${s.source},${new Date(s.createdAt).toLocaleDateString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
              <p className="text-gray-600 mt-1">Manage email newsletter subscriptions</p>
            </div>
            <button
              onClick={exportSubscribers}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="bg-white rounded border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">All Subscribers ({subscribers.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <div className="text-red-600 mb-4">{error}</div>
              <button
                onClick={fetchSubscribers}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : subscribers.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No subscribers found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">Email</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                    <th className="text-left p-4 text-sm font-semibold">Source</th>
                    <th className="text-left p-4 text-sm font-semibold">Subscribed</th>
                    <th className="text-right p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(subscribers) && subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{subscriber.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          subscriber.status === 'active' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{subscriber.source}</td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(subscriber.id)}
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