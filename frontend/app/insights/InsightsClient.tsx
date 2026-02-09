"use client";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import Image from "next/image";

interface InsightsClientProps {
  insights: any[];
}

export default function InsightsClient({ insights }: InsightsClientProps) {
  const [filteredInsights, setFilteredInsights] = useState(insights);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    industry: "",
    topic: ""
  });

  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      let filtered = insights;

      if (filters.type) {
        filtered = filtered.filter(insight => insight.type.toLowerCase() === filters.type.toLowerCase());
      }
      if (filters.industry) {
        filtered = filtered.filter(insight => 
          insight.industries.some((ind: any) => ind.slug === filters.industry)
        );
      }
      if (filters.topic) {
        filtered = filtered.filter(insight => 
          insight.topics.includes(filters.topic)
        );
      }

      setFilteredInsights(filtered);
      setIsFiltering(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [filters, insights]);

  const featuredInsights = filteredInsights.filter(i => i.featured);
  const trendingInsights = filteredInsights.filter(i => i.trending);
  const regularInsights = filteredInsights.filter(i => !i.featured && !i.trending);

  const industries = Array.from(
    new Map(
      insights.flatMap(i => i.industries).map(ind => [ind.id, ind])
    ).values()
  ).slice(0, 10);
  
  const topics = Array.from(new Set(insights.flatMap(i => i.topics))).filter(Boolean).slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h3 className="font-semibold mb-4">Filter Content</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Content Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full p-2 border rounded focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 filter-transition"
                >
                  <option value="">All Content</option>
                  <option value="article">Articles</option>
                  <option value="whitepaper">Whitepapers</option>
                  <option value="case-study">Case Studies</option>
                  <option value="video">Videos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <select
                  value={filters.industry}
                  onChange={(e) => setFilters({...filters, industry: e.target.value})}
                  className="w-full p-2 border rounded focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 filter-transition"
                >
                  <option value="">All Industries</option>
                  {industries.map((ind: any) => (
                    <option key={ind.id} value={ind.slug}>{ind.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <select
                  value={filters.topic}
                  onChange={(e) => setFilters({...filters, topic: e.target.value})}
                  className="w-full p-2 border rounded focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 filter-transition"
                >
                  <option value="">All Topics</option>
                  {topics.map((topic: string) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setFilters({ type: "", industry: "", topic: "" })}
                className="w-full text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded p-1 cursor-scale"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {isFiltering && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          <div className={`${isFiltering ? 'opacity-50' : 'opacity-100'} filter-transition`}>
            {featuredInsights.length > 0 && (
              <section className="mb-12 results-enter" ref={ref1}>
                <h2 className="text-2xl font-bold mb-6 animate-on-scroll">Featured Insights</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredInsights.slice(0, 2).map((insight, i) => (
                    <a
                      key={insight.id}
                      href={`/insights/${insight.slug}`}
                      className={`group bg-white border rounded-lg overflow-hidden card-hover cursor-scale animate-on-scroll stagger-${i + 1}`}
                    >
                      <div className="relative aspect-video">
                        {insight.image ? (
                          <Image
                            src={insight.image}
                            alt={insight.title}
                            fill
                            className="object-cover image-reveal"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-primary/20 to-red-100"></div>
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
                        <p className="text-gray-600 mb-4">{insight.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            By {insight.author.name}
                          </div>
                          <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                            Read More →
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {trendingInsights.length > 0 && (
              <section className="mb-12 results-enter" ref={ref2}>
                <h2 className="text-2xl font-bold mb-6 animate-on-scroll">Trending Now</h2>
                <div className="grid gap-4">
                  {trendingInsights.map((insight, i) => (
                    <a
                      key={insight.id}
                      href={`/insights/${insight.slug}`}
                      className={`group bg-white border rounded-lg p-6 card-hover cursor-scale animate-on-scroll stagger-${i + 1}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          {insight.image ? (
                            <Image
                              src={insight.image}
                              alt={insight.title}
                              fill
                              className="rounded object-cover image-reveal"
                              sizes="80px"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-red-100 rounded"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded uppercase font-medium">
                              Trending
                            </span>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-medium">
                              {insight.type}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {insight.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{insight.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              By {insight.author.name} • {insight.readTime} min read
                            </div>
                            <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                              Read →
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section className="results-enter">
              <h2 className="text-2xl font-bold mb-6">
                {featuredInsights.length > 0 || trendingInsights.length > 0 ? 'More Insights' : 'All Insights'} ({regularInsights.length})
              </h2>
              {regularInsights.length > 0 ? (
                <div className="grid gap-6">
                  {regularInsights.map((insight) => (
                    <a
                      key={insight.id}
                      href={`/insights/${insight.slug}`}
                      className="group bg-white border rounded-lg p-6 card-hover cursor-scale"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          {insight.image ? (
                            <Image
                              src={insight.image}
                              alt={insight.title}
                              fill
                              className="rounded object-cover image-reveal"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-100 rounded"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-medium">
                              {insight.type}
                            </span>
                            <span className="text-xs text-gray-500">{insight.readTime} min read</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {insight.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">{insight.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              By {insight.author.name}
                            </div>
                            <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                              Read More →
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                featuredInsights.length === 0 && trendingInsights.length === 0 && (
                  <div className="text-center py-12 bg-white border rounded-lg">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">No insights available yet</h3>
                    <p className="text-gray-600">Check back soon for our latest thought leadership and insights.</p>
                  </div>
                )
              )}
            </section>
          </div>

          {!isFiltering && filteredInsights.length === 0 && (
            <div className="text-center py-12 results-enter">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 className="text-xl font-semibold mb-2">No insights found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
