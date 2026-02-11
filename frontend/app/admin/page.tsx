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
    leads: 0,
    testimonials: 0,
    subscribers: 0
  });

  const [recentActivity] = useState([
    { type: 'insight', title: 'New article published', time: '2 hours ago', status: 'success' },
    { type: 'lead', title: 'Contact form submission', time: '4 hours ago', status: 'pending' },
    { type: 'expert', title: 'Expert profile updated', time: '1 day ago', status: 'info' },
    { type: 'service', title: 'Service page modified', time: '2 days ago', status: 'info' }
  ]);

  useEffect(() => {
    fetchStats();
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
        fetch("/api/leads").then(r => r.ok ? r.json() : []),
        fetch("/api/testimonials").then(r => r.ok ? r.json() : []),
        fetch("/api/newsletter").then(r => r.ok ? r.json() : [])
      ]);

      const [industries, services, insights, experts, offices, careers, leads, testimonials, subscribers] = results.map(
        r => r.status === 'fulfilled' ? r.value : []
      );

      setStats({
        industries: Array.isArray(industries) ? industries.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        insights: Array.isArray(insights) ? insights.length : 0,
        experts: Array.isArray(experts) ? experts.length : 0,
        offices: Array.isArray(offices) ? offices.length : 0,
        careers: Array.isArray(careers) ? careers.length : 0,
        leads: Array.isArray(leads) ? leads.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        subscribers: Array.isArray(subscribers) ? subscribers.length : 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's your platform overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">System Online</span>
                </div>
              </div>
              <Link href="/" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-3xl font-bold text-gray-900">{stats.insights + stats.services + stats.industries}</p>
                <p className="text-sm text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Leads</p>
                <p className="text-3xl font-bold text-gray-900">{stats.leads}</p>
                <p className="text-sm text-orange-600 mt-1">Needs attention</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.experts}</p>
                <p className="text-sm text-blue-600 mt-1">Across {stats.offices} offices</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Subscribers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.subscribers}</p>
                <p className="text-sm text-green-600 mt-1">+8% this week</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Content Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Content Management</h2>
                <p className="text-gray-600 text-sm mt-1">Manage your platform content</p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Link href="/admin/industries" className="group p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-2xl font-bold text-primary">{stats.industries}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Industries</h3>
                    <p className="text-sm text-gray-600 mt-1">Manage industry sectors</p>
                  </Link>

                  <Link href="/admin/services" className="group p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-2xl font-bold text-primary">{stats.services}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Services</h3>
                    <p className="text-sm text-gray-600 mt-1">Consulting services</p>
                  </Link>

                  <Link href="/admin/insights" className="group p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                      </div>
                      <span className="text-2xl font-bold text-primary">{stats.insights}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Insights</h3>
                    <p className="text-sm text-gray-600 mt-1">Articles & research</p>
                  </Link>

                  <Link href="/admin/testimonials" className="group p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <span className="text-2xl font-bold text-primary">{stats.testimonials}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Testimonials</h3>
                    <p className="text-sm text-gray-600 mt-1">Client reviews</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'pending' ? 'bg-orange-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link href="/admin/insights" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Create Insight</span>
                </Link>
                <Link href="/admin/leads" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">View Leads</span>
                </Link>
                <Link href="/admin/subscribers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Manage Subscribers</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Team & Operations */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Team & Operations</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/experts" className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stats.experts}</div>
                  <div className="text-sm font-medium text-gray-900">Experts</div>
                </Link>
                <Link href="/admin/offices" className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stats.offices}</div>
                  <div className="text-sm font-medium text-gray-900">Offices</div>
                </Link>
                <Link href="/admin/careers" className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stats.careers}</div>
                  <div className="text-sm font-medium text-gray-900">Open Roles</div>
                </Link>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-400 mb-1">24/7</div>
                  <div className="text-sm font-medium text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Platform Health</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold text-green-900">Database</div>
                    <div className="text-sm text-green-700">MySQL operational</div>
                  </div>
                </div>
                <span className="text-green-600 font-semibold text-sm">Online</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold text-green-900">API Services</div>
                    <div className="text-sm text-green-700">All endpoints active</div>
                  </div>
                </div>
                <span className="text-green-600 font-semibold text-sm">Healthy</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-blue-900">Content Delivery</div>
                    <div className="text-sm text-blue-700">CDN optimized</div>
                  </div>
                </div>
                <span className="text-blue-600 font-semibold text-sm">Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
