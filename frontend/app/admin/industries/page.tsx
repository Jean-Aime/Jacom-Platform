"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function IndustriesPage() {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    apiClient.getIndustries()
      .then((data: any) => setIndustries(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight ">Industries & Services</h2>
          <p className="text-gray-500">Manage core corporate sectors and specialized capabilities.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Industry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {industries.map((ind: any, i) => (
          <div key={i} className="group bg-white  border border-gray-200  rounded-2xl p-6 hover:border-orange-600 transition-all cursor-pointer shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
            </div>
            <h3 className="text-lg font-bold ">{ind.name}</h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{ind.description}</p>
            <div className="mt-6 flex gap-4 pt-4 border-t border-gray-100 ">
              <div><span className="text-xs uppercase font-bold text-gray-400">Projects</span><p className="text-sm font-bold ">24 Active</p></div>
              <div><span className="text-xs uppercase font-bold text-gray-400">Experts</span><p className="text-sm font-bold ">12 Assigned</p></div>
            </div>
          </div>
        ))}
        <div className="border-2 border-dashed border-gray-200  rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:border-blue-600 hover:bg-blue-50  transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-gray-100  flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <p className="mt-4 font-bold text-gray-500 group-hover:text-blue-600">Add New Industry</p>
        </div>
      </div>
    </div>
  );
}
