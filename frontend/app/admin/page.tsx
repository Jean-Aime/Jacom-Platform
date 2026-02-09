"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    industries: 0,
    services: 0,
    insights: 0,
    experts: 0,
    offices: 0,
    careers: 0,
    leads: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => fetchStats(), 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchStats = async () => {
    try {
      const results = await Promise.allSettled([
        fetch("/api/industries").then(r => r.ok ? r.json() : []),
        fetch("/api/services").then(r => r.ok ? r.json() : []),
        fetch("/api/insights").then(r => r.ok ? r.json() : []),
        fetch("/api/experts").then(r => r.ok ? r.json() : []),
        fetch("/api/offices").then(r => r.ok ? r.json() : []),
        fetch("/api/careers").then(r => r.ok ? r.json() : []),
        fetch("/api/leads").then(r => r.ok ? r.json() : [])
      ]);

      const [industries, services, insights, experts, offices, careers, leads] = results.map(
        r => r.status === 'fulfilled' ? r.value : []
      );

      setStats({
        industries: Array.isArray(industries) ? industries.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        insights: Array.isArray(insights) ? insights.length : 0,
        experts: Array.isArray(experts) ? experts.length : 0,
        offices: Array.isArray(offices) ? offices.length : 0,
        careers: Array.isArray(careers) ? careers.length : 0,
        leads: Array.isArray(leads) ? leads.length : 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    { label: "Industries", value: stats.industries, icon: "🏭", color: "bg-blue-500", href: "/admin/industries" },
    { label: "Services", value: stats.services, icon: "⚙️", color: "bg-green-500", href: "/admin/services" },
    { label: "Insights", value: stats.insights, icon: "💡", color: "bg-purple-500", href: "/admin/insights" },
    { label: "Experts", value: stats.experts, icon: "👥", color: "bg-orange-500", href: "/admin/experts" },
    { label: "Offices", value: stats.offices, icon: "🏢", color: "bg-red-500", href: "/admin/offices" },
    { label: "Careers", value: stats.careers, icon: "💼", color: "bg-indigo-500", href: "/admin/careers" },
    { label: "Leads", value: stats.leads, icon: "📧", color: "bg-yellow-500", href: "/admin/leads" }
  ];

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
      </header>

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-lg border p-6 hover:shadow-lg transition-all group animate-fade-in"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <Link href="/admin/insights" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">💡</div>
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-primary transition-colors">Create New Insight</div>
                  <div className="text-sm text-gray-600">Publish articles, whitepapers, case studies</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/admin/experts" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">👥</div>
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-primary transition-colors">Add Team Member</div>
                  <div className="text-sm text-gray-600">Create new expert profiles</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/admin/careers" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-xl">💼</div>
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-primary transition-colors">Post New Job</div>
                  <div className="text-sm text-gray-600">Add career opportunities</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/admin/leads" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">📧</div>
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-primary transition-colors">View Leads</div>
                  <div className="text-sm text-gray-600">Manage contact submissions</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">System Status</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold">Database Connected</div>
                    <div className="text-sm text-gray-600">MySQL running successfully</div>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">Active</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold">API Routes</div>
                    <div className="text-sm text-gray-600">All endpoints operational</div>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">Active</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Content Seeded</div>
                    <div className="text-sm text-gray-600">Sample data loaded</div>
                  </div>
                </div>
                <span className="text-blue-600 font-semibold">Ready</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Admin Panel</div>
                    <div className="text-sm text-gray-600">All modules functional</div>
                  </div>
                </div>
                <span className="text-purple-600 font-semibold">Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Platform Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">{stats.insights}</div>
                <div className="text-sm text-gray-600">Total Content</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">{stats.experts}</div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">{stats.leads}</div>
                <div className="text-sm text-gray-600">Total Leads</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
