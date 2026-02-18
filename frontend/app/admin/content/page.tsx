"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function ContentPage() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    apiClient.getContent()
      .then((data: any) => setContent(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end border-b border-gray-200  pb-6">
        <div>
          <h2 className="text-3xl font-bold ">Content & Insights</h2>
          <p className="text-gray-500">Manage your publication library and tracking statuses.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Create Post
        </button>
      </div>

      <div className="bg-white  rounded-2xl border border-blue-100  shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 /50 border-b border-blue-100 ">
            <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50  text-sm">
            {content.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No content found</td></tr>
            ) : (
              content.map((post: any, i) => (
                <tr key={i} className="hover:bg-gray-50  transition-colors">
                  <td className="px-6 py-4 font-semibold ">{post.title || post.key}</td>
                  <td className="px-6 py-4"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-bold uppercase">{post.type || "Content"}</span></td>
                  <td className="px-6 py-4"><span className="text-xs font-bold text-green-500">Published</span></td>
                  <td className="px-6 py-4"><button className="text-blue-600 hover:underline font-bold">Edit</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
