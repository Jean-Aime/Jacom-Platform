"use client";
import { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">Failed to load</div>;

  return (
    <div>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6">
            <div className="text-3xl font-bold text-primary">{data.overview.totalLeads}</div>
            <div className="text-sm text-gray-600 mt-2">Total Leads</div>
            <div className="text-xs text-green-600 mt-1">+{data.overview.leadsThisMonth} this month</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-3xl font-bold text-primary">{data.overview.totalApplications}</div>
            <div className="text-sm text-gray-600 mt-2">Applications</div>
            <div className="text-xs text-green-600 mt-1">+{data.overview.applicationsThisMonth} this month</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-3xl font-bold text-primary">{data.overview.totalInsights}</div>
            <div className="text-sm text-gray-600 mt-2">Insights</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-3xl font-bold text-primary">
              {data.overview.totalLeads > 0 ? Math.round((data.overview.leadsThisMonth / data.overview.totalLeads) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600 mt-2">Conversion</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-3xl font-bold text-primary">
              {data.applicationsByStatus.find((s: any) => s.name === 'accepted')?._count || 0}
            </div>
            <div className="text-sm text-gray-600 mt-2">Hired</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Leads by Source</h2>
            <div className="space-y-3">
              {data.leadsBySource.map((item: any) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: `${(item.value / data.overview.totalLeads) * 100}%`}}></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Applications by Status</h2>
            <div className="space-y-3">
              {data.applicationsByStatus.map((item: any) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: `${(item.value / data.overview.totalApplications) * 100}%`}}></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
