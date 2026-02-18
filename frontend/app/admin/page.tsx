"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalLeads: 0, activeStudents: 0, regionalOffices: 3, annualRevenue: "¥12.5M" });

  useEffect(() => {
    apiClient.getLeads()
      .then((data: any) => setStats(prev => ({ ...prev, totalLeads: data.length || 0 })))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Main Overview</h2>
          <p className="text-gray-600 mt-1">Enterprise management status across all JACOM regional branches.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <span>↗</span> +12%
            </span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Leads</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{stats.totalLeads}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <span>↗</span> +5%
            </span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Active Students</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{stats.activeStudents}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-gray-400 text-xs font-bold">Global</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Regional Offices</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{stats.regionalOffices}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <span>↗</span> +8.1%
            </span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Annual Revenue</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{stats.annualRevenue}</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-6">Lead Conversion Trends</h4>
          <div className="relative h-64 w-full">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
              <path d="M0,120 Q50,80 100,100 T200,40 T300,70 T400,20 V150 H0 Z" fill="rgba(37, 99, 235, 0.1)"></path>
              <path d="M0,120 Q50,80 100,100 T200,40 T300,70 T400,20" fill="none" stroke="#2563eb" strokeWidth="3"></path>
            </svg>
            <div className="flex justify-between mt-4 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-6">Enrollment Goal</h4>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[60, 85, 45, 95, 70, 80].map((h, i) => (
              <div key={i} className="group relative flex-1">
                <div className="bg-blue-600 rounded-t-lg w-full transition-all duration-500" style={{height: `${h}%`}}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h4 className="font-bold text-gray-900">Recent Inquiries</h4>
          <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
            <div className="mt-1 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">New inquiry from Toyota</p>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Strategic partnership inquiry for Corporate Academy program.</p>
            </div>
          </div>
          <div className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
            <div className="mt-1 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Student 'Taro Yamada' completed Phase 1</p>
                <span className="text-xs text-gray-400">5 hours ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Successfully finished the 'Global Business Foundations' module.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
