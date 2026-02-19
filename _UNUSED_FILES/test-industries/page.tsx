"use client";
import { useEffect, useState } from "react";

export default function TestIndustries() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost/Jacom-Platform/backend/industries")
      .then(r => r.json())
      .then(setData)
      .catch(e => setError(e.message));
  }, []);

  if (error) return <div className="p-8">Error: {error}</div>;
  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Available Industries</h1>
      <div className="space-y-4">
        {data.map((ind: any) => (
          <div key={ind.id} className="border p-4 rounded">
            <h2 className="font-bold">{ind.name}</h2>
            <p className="text-sm text-gray-600">Slug: {ind.slug}</p>
            <a 
              href={`/industries/${ind.slug}`}
              className="text-blue-600 hover:underline"
            >
              View Page →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
