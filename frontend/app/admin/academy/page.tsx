"use client";
import { useState } from "react";

export default function AcademyPage() {
  const [students] = useState([
    { id: 1, name: "Satoshi Nakamoto", email: "sat@bitcoin.org", batch: "Feb 2023 - Core", progress: 65, status: "Active" },
    { id: 2, name: "Yuki Kimura", email: "yuki.k@example.com", batch: "June 2023 - Adv", progress: 32, status: "Active" },
    { id: 3, name: "Hina Sato", email: "hina.s@example.com", batch: "Feb 2023 - Core", progress: 92, status: "Completed" }
  ]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight ">Academy Management</h2>
          <p className="text-gray-500">Monitor and manage your students and curriculum.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-sm transition-all shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white  p-6 rounded-xl border border-gray-200  shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">Active Students</p>
          <h3 className="text-2xl font-bold ">1,284</h3>
        </div>
        <div className="bg-white  p-6 rounded-xl border border-gray-200  shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">Batches</p>
          <h3 className="text-2xl font-bold ">24</h3>
        </div>
      </div>

      <div className="bg-white  rounded-xl border border-gray-200  overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200  flex justify-between">
          <h3 className="font-bold ">Student Progress</h3>
          <input className="w-64 px-3 py-1.5 bg-gray-50  border-none rounded-lg text-sm" placeholder="Search students..."/>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 /50 border-y border-gray-200 ">
            <tr className="text-xs uppercase font-bold text-gray-500">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Batch</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100  text-sm">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50  transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold ">{student.name}</div>
                  <div className="text-xs text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-4 ">{student.batch}</td>
                <td className="px-6 py-4">
                  <div className="w-32 bg-gray-100  rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${student.progress}%`}}></div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 block">{student.progress}% Complete</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${student.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
