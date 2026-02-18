"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function OfficesPage() {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    apiClient.getOffices()
      .then((data: any) => setOffices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight ">Global Offices</h2>
          <p className="text-gray-500">Oversee operational statuses across international branches.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Add Office
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offices.map((office: any, i) => (
          <div key={i} className="bg-white  rounded-xl overflow-hidden border border-gray-200  shadow-sm hover:shadow-md transition-all">
            <div className="h-40 bg-gray-100  relative">
              {office.image && <img src={office.image} className="w-full h-full object-cover"/>}
              <span className="absolute top-4 right-4 text-xs font-black uppercase px-2 py-1 rounded-md text-white bg-emerald-500">Active</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 ">{office.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {office.location}
              </div>
              <button className="w-full py-2 bg-gray-50  rounded-lg text-sm font-bold text-gray-700 ">View Office Portal</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
