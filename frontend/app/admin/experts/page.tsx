"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

interface Expert {
  id: number;
  name: string;
  title: string;
  expertise: string;
  bio: string;
  image: string;
}

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getExperts()
      .then((data: any) => setExperts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight ">Expert Directory</h2>
          <p className="text-gray-500">Manage and assign your global network of professional consultants.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Expert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white  p-6 rounded-xl border border-gray-200  shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Experts</p><h3 className="text-2xl font-bold ">{experts.length}</h3></div>
        </div>
        <div className="bg-white  p-6 rounded-xl border border-gray-200  shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          </div>
          <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Projects</p><h3 className="text-2xl font-bold ">84</h3></div>
        </div>
      </div>

      <div className="bg-white  rounded-xl border border-gray-200  overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading experts...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 /50 border-b border-gray-200 ">
              <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Expert Profile</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Primary Expertise</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100  text-sm">
              {experts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No experts found</td>
                </tr>
              ) : (
                experts.map((expert) => (
                  <tr key={expert.id} className="hover:bg-gray-50  transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          {expert.image && <img src={expert.image} alt={expert.name} className="w-full h-full object-cover"/>}
                        </div>
                        <div>
                          <p className="font-bold ">{expert.name}</p>
                          <p className="text-xs text-gray-500">{expert.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold ">{expert.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-bold rounded uppercase">{expert.expertise}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:bg-blue-50  p-1 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
