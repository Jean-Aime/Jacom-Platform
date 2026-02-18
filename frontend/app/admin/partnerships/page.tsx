"use client";
import { useState } from "react";

export default function PartnershipsPage() {
  const [partners] = useState([
    { id: 1, name: "JICA", type: "Strategic", location: "Japan (Global)", status: "Active" },
    { id: 2, name: "Nippon Foundation", type: "Strategic", location: "Japan (Global)", status: "Renewing" },
    { id: 3, name: "Washocook", type: "Academic", location: "Online/Japan", status: "Active" }
  ]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-900  tracking-tight">Partnership Management</h2>
          <p className="text-gray-500">Oversee global and local institutional relationships and MOUs.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg">
          Add New Partner
        </button>
      </div>

      <div className="bg-white  rounded-xl border border-gray-200  overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 /50 border-b border-gray-200 ">
            <tr className="text-xs font-bold text-gray-500 uppercase">
              <th className="px-6 py-4">Partner</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100  text-sm">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-blue-50  transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold ">{partner.name}</p>
                  <p className="text-xs text-gray-500">{partner.type} Partner</p>
                </td>
                <td className="px-6 py-4 text-gray-600 ">{partner.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${partner.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                    {partner.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right"><button className="text-blue-600 font-bold">Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
