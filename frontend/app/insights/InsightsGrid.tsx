"use client";
import { useState } from "react";
import Image from "next/image";

export default function InsightsGrid({ insights }: { insights: any[] }) {
  const [filter, setFilter] = useState("");

  const filtered = filter
    ? insights.filter((i) => i.type.toLowerCase() === filter.toLowerCase())
    : insights;

  return (
    <>
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setFilter("")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All ({insights.length})
        </button>
        <button
          onClick={() => setFilter("Article")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "Article" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Articles
        </button>
        <button
          onClick={() => setFilter("Report")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "Report" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Reports
        </button>
        <button
          onClick={() => setFilter("Whitepaper")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "Whitepaper" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Whitepapers
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">No insights found</h2>
          <p className="text-gray-600">Try a different filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((insight, idx) => (
            <a
              key={insight.id}
              href={`/insights/${insight.slug}`}
              className="group bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video bg-gray-100">
                {insight.image && (
                  <Image
                    src={insight.image}
                    alt={insight.title}
                    fill
                    priority={idx < 3}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-medium">
                    {insight.type}
                  </span>
                  <span className="text-xs text-gray-500">{insight.readTime} min read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{insight.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">By {insight.author.name}</div>
                  <div className="text-primary font-medium">Read More →</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
